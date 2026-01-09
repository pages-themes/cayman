---
title: "Arquitectura de Direccionamiento IP en Azure: Una Guía Completa para 2026"
date: 2025-11-07
categories:
  - blog
tags:
  - Azure
  - Networking
  - IP Addressing
  - VNET
  - Subnet
  - Security
  - Peering
seo:
  type: TechArticle
  description: "Guía definitiva sobre planificación y gestión de direccionamiento IP en Azure. Aprende sobre diseño de VNETs, subnetting y mejores prácticas de seguridad."
---

## Fundamentos del Direccionamiento IP en Azure

El diseño eficiente del direccionamiento IP es crucial para cualquier infraestructura en la nube. Este artículo proporciona una guía completa sobre cómo planificar y gestionar direccionamientos IP en Azure.

## Planificación de VNETs

### 1. Selección de Rangos IP

```plaintext
Production VNET: 10.0.0.0/16 (65,536 direcciones)
├── App Subnet: 10.0.0.0/24 (256 direcciones)
├── Database Subnet: 10.0.1.0/24 (256 direcciones)
├── Gateway Subnet: 10.0.255.0/27 (32 direcciones)
└── AzureBastionSubnet: 10.0.254.0/27 (32 direcciones)

Development VNET: 10.1.0.0/16 (65,536 direcciones)
├── App Subnet: 10.1.0.0/24 (256 direcciones)
└── Database Subnet: 10.1.1.0/24 (256 direcciones)
```

### 2. Implementación con Terraform

```hcl
# network/main.tf
resource "azurerm_virtual_network" "prod" {
  name                = "prod-vnet"
  location            = var.location
  resource_group_name = var.resource_group_name
  address_space       = ["10.0.0.0/16"]

  subnet {
    name           = "app-subnet"
    address_prefix = "10.0.0.0/24"
  }

  subnet {
    name           = "db-subnet"
    address_prefix = "10.0.1.0/24"
  }

  subnet {
    name           = "GatewaySubnet"
    address_prefix = "10.0.255.0/27"
  }

  subnet {
    name           = "AzureBastionSubnet"
    address_prefix = "10.0.254.0/27"
  }

  tags = {
    Environment = "Production"
  }
}

resource "azurerm_subnet" "app" {
  name                 = "app-subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.prod.name
  address_prefixes     = ["10.0.0.0/24"]

  service_endpoints = [
    "Microsoft.Web",
    "Microsoft.Sql"
  ]

  delegation {
    name = "app-service-delegation"
    service_delegation {
      name    = "Microsoft.Web/serverFarms"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }
}
```

## Network Security Groups (NSGs)

### 1. Reglas de Seguridad Básicas

```hcl
resource "azurerm_network_security_group" "app" {
  name                = "app-nsg"
  location            = var.location
  resource_group_name = var.resource_group_name

  security_rule {
    name                       = "allow-https"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range         = "*"
    destination_port_range     = "443"
    source_address_prefix     = "*"
    destination_address_prefix = "10.0.0.0/24"
  }

  security_rule {
    name                       = "deny-all"
    priority                   = 4096
    direction                  = "Inbound"
    access                     = "Deny"
    protocol                   = "*"
    source_port_range         = "*"
    destination_port_range     = "*"
    source_address_prefix     = "*"
    destination_address_prefix = "*"
  }
}
```

## Azure Private Link y Private Endpoints

### 1. Configuración de Private Link

```hcl
resource "azurerm_private_endpoint" "sql" {
  name                = "sql-endpoint"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = azurerm_subnet.db.id

  private_service_connection {
    name                           = "sql-privateserviceconnection"
    private_connection_resource_id = azurerm_mssql_server.example.id
    is_manual_connection          = false
    subresource_names            = ["sqlServer"]
  }

  private_dns_zone_group {
    name                 = "privatelink-database-windows-net"
    private_dns_zone_ids = [azurerm_private_dns_zone.sql.id]
  }
}
```

## Gestión de DNS

### 1. DNS Privado

```hcl
resource "azurerm_private_dns_zone" "example" {
  name                = "privatelink.database.windows.net"
  resource_group_name = var.resource_group_name
}

resource "azurerm_private_dns_zone_virtual_network_link" "example" {
  name                  = "sql-dns-link"
  resource_group_name   = var.resource_group_name
  private_dns_zone_name = azurerm_private_dns_zone.example.name
  virtual_network_id    = azurerm_virtual_network.prod.id
  registration_enabled  = true
}
```

## VNET Peering

### 1. Configuración de Peering

```hcl
resource "azurerm_virtual_network_peering" "prod_to_dev" {
  name                         = "prod-to-dev"
  resource_group_name          = var.resource_group_name
  virtual_network_name         = azurerm_virtual_network.prod.name
  remote_virtual_network_id    = azurerm_virtual_network.dev.id
  allow_virtual_network_access = true
  allow_forwarded_traffic     = true
  allow_gateway_transit       = false
  use_remote_gateways        = false
}

resource "azurerm_virtual_network_peering" "dev_to_prod" {
  name                         = "dev-to-prod"
  resource_group_name          = var.resource_group_name
  virtual_network_name         = azurerm_virtual_network.dev.name
  remote_virtual_network_id    = azurerm_virtual_network.prod.id
  allow_virtual_network_access = true
  allow_forwarded_traffic     = true
  allow_gateway_transit       = false
  use_remote_gateways        = false
}
```

## IP Address Management (IPAM)

### 1. Gestión de IPs Públicas

```hcl
resource "azurerm_public_ip" "example" {
  name                = "example-pip"
  location            = var.location
  resource_group_name = var.resource_group_name
  allocation_method   = "Static"
  sku                = "Standard"
  zones              = ["1", "2", "3"]

  tags = {
    environment = "Production"
  }
}
```

### 2. Gestión de IPs Privadas

```hcl
resource "azurerm_network_interface" "example" {
  name                = "example-nic"
  location            = var.location
  resource_group_name = var.resource_group_name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.app.id
    private_ip_address_allocation = "Static"
    private_ip_address           = "10.0.0.10"
  }
}
```

## Mejores Prácticas

1. **Planificación de Direccionamiento**
   - Usar rangos no superpuestos
   - Reservar espacio para crecimiento
   - Documentar asignaciones

2. **Seguridad**
   - Implementar NSGs en todas las subnets
   - Usar Service Endpoints donde sea posible
   - Habilitar Azure Private Link

3. **Monitorización**
   - Network Watcher
   - Flow Logs
   - NSG Flow Logs

4. **Gestión**
   - Automatización con Terraform/ARM
   - Control de cambios
   - Backups de configuración

## Lista de Verificación de Implementación

1. **Diseño Inicial**
   - [ ] Definir rangos IP para VNETs
   - [ ] Planificar subnets
   - [ ] Identificar requisitos de conectividad

2. **Seguridad**
   - [ ] Configurar NSGs
   - [ ] Implementar Private Link
   - [ ] Habilitar Service Endpoints

3. **DNS**
   - [ ] Configurar DNS privado
   - [ ] Establecer resolución híbrida
   - [ ] Verificar resolución de nombres

4. **Conectividad**
   - [ ] Configurar peering
   - [ ] Establecer rutas
   - [ ] Validar conectividad

## Herramientas de Gestión

1. **Azure Portal**
   - Visualización de topología
   - Gestión de recursos
   - Monitorización

2. **Azure PowerShell**
   ```powershell
   # Obtener información de VNET
   Get-AzVirtualNetwork -ResourceGroupName "prod-rg" -Name "prod-vnet"

   # Verificar conectividad
   Test-AzNetworkWatcherIPFlow -NetworkWatcher $nw `
     -TargetVirtualNetworkId $vnetId `
     -TargetIP "10.0.0.4" `
     -Direction "Inbound"
   ```

3. **Azure CLI**
   ```bash
   # Listar subnets
   az network vnet subnet list --resource-group prod-rg --vnet-name prod-vnet

   # Verificar peering
   az network vnet peering list --resource-group prod-rg --vnet-name prod-vnet
   ```

## Solución de Problemas

1. **Problemas Comunes**
   - Conflictos de direcciones IP
   - Problemas de resolución DNS
   - Fallos de conectividad

2. **Herramientas de Diagnóstico**
   - Network Watcher
   - Connection Monitor
   - IP Flow Verify

## Conclusiones

Un buen diseño de direccionamiento IP requiere:

1. Planificación detallada
2. Implementación segura
3. Monitorización continua
4. Gestión eficiente

## Referencias

- [Azure Networking Documentation](https://docs.microsoft.com/azure/networking/)
- [IP Addressing Best Practices](https://docs.microsoft.com/azure/virtual-network/virtual-networks-faq)
- [Azure Private Link Overview](https://docs.microsoft.com/azure/private-link/private-link-overview)