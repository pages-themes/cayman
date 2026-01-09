---
title: "Gestión de Código para Landing Zones con GitHub y Terraform"
date: 2025-10-11
categories:
  - blog
tags:
  - GitHub
  - Terraform
  - Landing Zone
  - DevOps
  - IaC
---

## Introducción

La gestión eficiente del código de una Landing Zone es crucial para mantener una infraestructura escalable y segura. En este artículo, exploraremos cómo organizar y gestionar el código de una Landing Zone utilizando GitHub y Terraform.

![Landing Zone Structure](/assets/images/posts/landing-zone-github/landing-zone-structure.png)

## Estructura del Repositorio

```plaintext
landing-zone/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── terraform.tfvars
│   ├── staging/
│   └── prod/
├── modules/
│   ├── networking/
│   ├── security/
│   ├── governance/
│   └── baseline/
└── pipelines/
    ├── terraform-plan.yml
    └── terraform-apply.yml
```

## Módulo Base de Landing Zone

```hcl
# modules/baseline/main.tf
module "resource_groups" {
  source = "../resource-groups"
  
  environment = var.environment
  location    = var.location
  tags        = var.tags
}

module "networking" {
  source = "../networking"
  
  resource_group_name = module.resource_groups.network_rg_name
  address_space      = var.address_space
  environment        = var.environment
}

module "security" {
  source = "../security"
  
  resource_group_name = module.resource_groups.security_rg_name
  environment        = var.environment
}
```

## GitHub Actions Pipeline

```yaml
# .github/workflows/terraform-apply.yml
name: 'Terraform Apply'

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  terraform:
    name: 'Terraform'
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v1
      with:
        terraform_version: 1.0.0

    - name: Terraform Format
      run: terraform fmt -check

    - name: Terraform Init
      run: terraform init
      
    - name: Terraform Plan
      run: terraform plan -out=tfplan
      
    - name: Terraform Apply
      if: github.ref == 'refs/heads/main' && github.event_name == 'push'
      run: terraform apply -auto-approve tfplan
```


## Control de Versiones y Branches

```bash
# Estructura de branches
main              # Producción
├── develop       # Desarrollo
├── feature/*     # Nuevas características
└── hotfix/*      # Correcciones urgentes
```

## Gestión de Secretos

```yaml
# .github/workflows/secrets.yml
name: 'Secrets Management'

env:
  ARM_CLIENT_ID: ${{ secrets.ARM_CLIENT_ID }}
  ARM_CLIENT_SECRET: ${{ secrets.ARM_CLIENT_SECRET }}
  ARM_SUBSCRIPTION_ID: ${{ secrets.ARM_SUBSCRIPTION_ID }}
  ARM_TENANT_ID: ${{ secrets.ARM_TENANT_ID }}
```

## Módulo de Políticas

```hcl
# modules/governance/policies.tf
resource "azurerm_policy_definition" "allowed_locations" {
  name         = "allowed-locations"
  policy_type  = "Custom"
  mode         = "All"
  display_name = "Allowed Locations"

  policy_rule = <<POLICY_RULE
{
  "if": {
    "not": {
      "field": "location",
      "in": "[parameters('allowedLocations')]"
    }
  },
  "then": {
    "effect": "deny"
  }
}
POLICY_RULE
}
```

## Testing y Validación

```hcl
# tests/main.tf
module "test_baseline" {
  source = "../modules/baseline"

  environment = "test"
  location    = "westeurope"
  
  tags = {
    Environment = "Test"
    ManagedBy   = "Terraform"
  }
}
```


## Automatización de Documentación

```markdown
# Documentation Generator
terraform-docs markdown table --output-file README.md ./modules/baseline
```

## Control de Costos

```hcl
# modules/governance/cost_management.tf
resource "azurerm_consumption_budget_subscription" "main" {
  name            = "subscription-budget"
  subscription_id = data.azurerm_subscription.current.id

  amount     = 1000
  time_grain = "Monthly"

  notification {
    enabled        = true
    threshold      = 90.0
    operator       = "GreaterThan"
    contact_emails = ["team@example.com"]
  }
}
```

## Referencias

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)
- [Azure Landing Zone Architecture](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/)
