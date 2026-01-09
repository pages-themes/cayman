---
title: "Arquitectura de Networking en Azure con Terraform: Guía Completa"
date: 2025-10-09
categories:
  - blog
tags:
  - Azure
  - Terraform
  - Networking
  - IaC
  - Cloud
---

## Introducción

La implementación de una arquitectura de red sólida en Azure es fundamental para cualquier despliegue en la nube. En este artículo, exploraremos cómo diseñar e implementar una infraestructura de red completa utilizando Terraform.

![Arquitectura de Red Azure](/assets/images/posts/azure-networking/azure-network-arch.png)

## Diseño de la Red Virtual

```hcl
# Definición de la Red Virtual
resource "azurerm_virtual_network" "main" {
  name                = "main-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  tags = {
    environment = "Production"
    managed_by  = "Terraform"
  }
}

# Subredes para diferentes capas
resource "azurerm_subnet" "frontend" {
  name                 = "frontend-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]

  service_endpoints = ["Microsoft.Web"]
}

resource "azurerm_subnet" "backend" {
  name                 = "backend-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]

  service_endpoints = ["Microsoft.Sql", "Microsoft.Storage"]
}
```

![Subnets y Segmentación](../assets/images/posts/azure-networking/subnet.png)

## Network Security Groups

```hcl
resource "azurerm_network_security_group" "frontend" {
  name                = "frontend-nsg"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  security_rule {
    name                       = "allow-https"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "deny-all"
    priority                   = 4096
    direction                  = "Inbound"
    access                     = "Deny"
    protocol                   = "*"
    source_port_range         = "*"
    destination_port_range    = "*"
    source_address_prefix     = "*"
    destination_address_prefix = "*"
  }
}
```

## Azure Application Gateway

```hcl
resource "azurerm_application_gateway" "main" {
  name                = "main-appgw"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location

  sku {
    name     = "Standard_v2"
    tier     = "Standard_v2"
    capacity = 2
  }

  gateway_ip_configuration {
    name      = "gateway-ip-config"
    subnet_id = azurerm_subnet.frontend.id
  }

  frontend_port {
    name = "https-port"
    port = 443
  }

  frontend_ip_configuration {
    name                 = "frontend-ip-config"
    public_ip_address_id = azurerm_public_ip.gateway.id
  }

  backend_address_pool {
    name = "backend-pool"
  }

  backend_http_settings {
    name                  = "https-settings"
    cookie_based_affinity = "Disabled"
    port                  = 443
    protocol             = "Https"
    request_timeout      = 60
  }

  http_listener {
    name                           = "https-listener"
    frontend_ip_configuration_name = "frontend-ip-config"
    frontend_port_name             = "https-port"
    protocol                       = "Https"
    ssl_certificate_name           = "ssl-cert"
  }
}
```

## Configuración de VPN Gateway

```hcl
resource "azurerm_virtual_network_gateway" "vpn" {
  name                = "main-vpn-gateway"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  type               = "Vpn"
  vpn_type           = "RouteBased"

  sku           = "VpnGw1"
  active_active = false
  enable_bgp    = false

  ip_configuration {
    name                          = "vnetGatewayConfig"
    public_ip_address_id         = azurerm_public_ip.vpn.id
    private_ip_address_allocation = "Dynamic"
    subnet_id                     = azurerm_subnet.gateway.id
  }
}
```

## Peering entre Redes Virtuales

```hcl
resource "azurerm_virtual_network_peering" "peering1to2" {
  name                      = "peer1to2"
  resource_group_name       = azurerm_resource_group.main.name
  virtual_network_name      = azurerm_virtual_network.vnet1.name
  remote_virtual_network_id = azurerm_virtual_network.vnet2.id

  allow_virtual_network_access = true
  allow_forwarded_traffic     = true
  allow_gateway_transit       = false
  use_remote_gateways        = true
}
```

## Monitorización y Diagnóstico

```hcl
resource "azurerm_network_watcher" "main" {
  name                = "main-network-watcher"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_network_watcher_flow_log" "main" {
  network_watcher_name = azurerm_network_watcher.main.name
  resource_group_name  = azurerm_resource_group.main.name

  network_security_group_id = azurerm_network_security_group.main.id
  storage_account_id        = azurerm_storage_account.logs.id
  enabled                   = true

  retention_policy {
    enabled = true
    days    = 7
  }
}
```

## Referencias y Recursos

- [Documentación de Azure Networking](https://docs.microsoft.com/en-us/azure/networking/)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Azure Network Security Best Practices](https://docs.microsoft.com/en-us/azure/security/fundamentals/network-best-practices)
