---
title: "Configuración del Entorno para Terraform: Guía Completa"
date: 2025-10-11
categories:
  - blog
tags:
  - Terraform
  - IaC
  - DevOps
  - Automatización
  - Cloud
---

## Introducción

Para comenzar a desarrollar Infraestructura como Código (IaC) con Terraform, necesitas configurar adecuadamente tu entorno de desarrollo. En esta guía, te explicaré paso a paso todo lo necesario para empezar.

## Requisitos Básicos

### 1. Instalar Terraform CLI

El binario de Terraform es esencial para ejecutar comandos y gestionar tu infraestructura.

**Windows (con Chocolatey):**
```powershell
choco install terraform
```

**Linux (con apt):**
```bash
sudo apt-get update && sudo apt-get install -y terraform
```

**Verificar la instalación:**
```bash
terraform version
```

### 2. Editor de Código

VS Code es la opción recomendada por sus extensiones y soporte para Terraform:

1. Instalar [Visual Studio Code](https://code.visualstudio.com/)
2. Instalar la extensión [HashiCorp Terraform](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform)

Beneficios de la extensión:
- Syntax highlighting
- IntelliSense
- Validación de código
- Formato automático
- Referencias y definiciones

### 3. Git

Git es esencial para el control de versiones de tu código:

```powershell
# Windows (Chocolatey)
choco install git

# Linux
sudo apt-get install git
```

### 4. Credenciales del Proveedor Cloud

#### Azure
```bash
# Instalar Azure CLI
# Windows
winget install -e --id Microsoft.AzureCLI

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Iniciar sesión
az login
```

#### AWS
```bash
# Instalar AWS CLI
# Windows
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configurar credenciales
aws configure
```

## Estructura de Proyecto Recomendada

```plaintext
proyecto-terraform/
├── main.tf           # Configuración principal
├── variables.tf      # Definición de variables
├── outputs.tf        # Outputs definidos
├── providers.tf      # Configuración de proveedores
├── backend.tf        # Configuración del backend
└── environments/
    ├── dev/
    │   └── terraform.tfvars
    ├── staging/
    │   └── terraform.tfvars
    └── prod/
        └── terraform.tfvars
```

## Configuración del Backend

El backend es donde Terraform almacena su estado. Ejemplo con Azure Storage:

```hcl
# backend.tf
terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfstate12345"
    container_name      = "tfstate"
    key                 = "prod.terraform.tfstate"
  }
}
```

## Extensiones VS Code Recomendadas

1. HashiCorp Terraform
2. Azure Terraform
3. Terraform doc snippets
4. YAML
5. GitLens

## Buenas Prácticas

1. **Control de Versiones**
   - Usar .gitignore para archivos sensibles
   - Commit con mensajes descriptivos
   - Una rama por feature/cambio

2. **Seguridad**
   - No versionar credenciales
   - Usar variables de entorno
   - Implementar least privilege

3. **Organización**
   - Módulos reutilizables
   - Variables bien documentadas
   - Outputs relevantes

4. **Testing**
   - Terraform plan antes de apply
   - Validación de sintaxis
   - Test automatizados

## Configuración de Pre-commit Hooks

Instala pre-commit para validación automática:

```bash
# Instalar pre-commit
pip install pre-commit

# Crear .pre-commit-config.yaml
cat << EOF > .pre-commit-config.yaml
repos:
- repo: https://github.com/antonbabenko/pre-commit-terraform
  rev: v1.76.0
  hooks:
    - id: terraform_fmt
    - id: terraform_docs
    - id: terraform_validate
EOF

# Inicializar pre-commit
pre-commit install
```

## Próximos Pasos

1. Crear tu primer proyecto Terraform
2. Configurar un backend remoto
3. Implementar control de versiones
4. Desarrollar módulos reutilizables
5. Integrar con CI/CD

Este entorno te permitirá desarrollar IaC de manera eficiente y siguiendo las mejores prácticas de la industria. En próximos artículos, profundizaremos en cada uno de estos aspectos.
