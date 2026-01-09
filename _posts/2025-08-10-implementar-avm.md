---
title: "Guía práctica: implementar Terraform Azure Verified Modules para ALZ"
categories:
  - blog
tags:
  - Terraform
  - Azure
  - Microsoft
  - DevOps
---

## Introducción

Cuando trabajamos en la nube, uno de los grandes retos es **mantener la organización, seguridad y consistencia** en todos los recursos que desplegamos.  

Para resolver esto, Microsoft creó **Azure Landing Zones (ALZ)**, un conjunto de buenas prácticas, estructuras y configuraciones listas para usar que nos ayudan a construir entornos de Azure robustos y seguros desde el primer día.

Por su parte, **Terraform** es una herramienta de *Infrastructure as Code (IaC)* que nos permite definir toda nuestra infraestructura en archivos de texto y desplegarla automáticamente.

Los **Azure Verified Modules** son módulos de Terraform creados y validados por Microsoft que implementan estas buenas prácticas de ALZ, evitando que tengas que escribir toda la configuración desde cero.

En esta guía, veremos paso a paso cómo desplegar una Landing Zone básica con estos módulos.
## Requisitos previos


Antes de empezar, asegúrate de tener:

1. **Cuenta de Azure** con permisos de *Owner* o *Contributor* en la suscripción.
2. **Terraform instalado** en tu máquina o pipeline (mínimo versión 1.5+).
3. **Azure CLI instalado** y sesión iniciada:
   ```bash
   az login

## Paso 1: Configurar el proveedor de Azure

Crea un archivo main.tf con el proveedor de Azure configurado:
```bash
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.50"
    }
  }
}

provider "azurerm" {
  features {}
}

```
💡 Tip: Siempre fija una versión de proveedor para evitar cambios inesperados en el futuro.


## Paso 2: Usar el módulo verificado de Terraform para ALZ

Añade al archivo main.tf el módulo oficial de Microsoft para ALZ:

```
module "alz" {
  source  = "Azure/landing-zone/azurerm"
  version = "0.2.0" # Cambia por la última versión estable

  # Variables mínimas necesarias
  root_id        = "alz"
  root_name      = "MyALZ"
  location       = "westeurope"
  deploy_connectivity_resources = true
}
```

## Paso 3: Comandos básicos

Ejecuta los siguientes comandos en la carpeta donde tienes el .tf:

```bash
terraform init    # Descarga proveedores y módulos
terraform plan    # Muestra los cambios que se harán
terraform apply   # Aplica los cambios en Azure
```

⚠️ Advertencia:
Nunca ejecutes terraform apply directamente en producción sin revisar primero el plan.

## Paso 4: Buenas prácticas recomendadas

1. Usar un backend remoto para el estado
Almacena el state file en Azure Blob Storage para compartirlo con tu equipo:

```
terraform {
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tfstateaccount"
    container_name       = "tfstate"
    key                  = "alz.tfstate"
  }
}
```

2. Automatizar con CI/CD
Configura un pipeline en Azure DevOps o GitHub Actions para ejecutar plan y apply automáticamente.

3. Mantener el módulo actualizado
Comprueba periódicamente si hay nuevas versiones y revisa los changelogs antes de actualizar.

4. Usar variables y terraform.tfvars
Evita valores fijos en el código para reutilizar la configuración en distintos entornos.

🎯 Conclusión
Los Azure Verified Modules facilitan enormemente la implementación de Landing Zones, asegurando que desde el primer despliegue cumplas con las buenas prácticas de Microsoft.

Con Terraform, además, ganarás automatización, control de versiones y facilidad de replicar entornos en cuestión de minutos.


💡 ¡Ya tienes tu primera Landing Zone desplegada de forma profesional y segura!