---
title: "Optimización de Costos en Azure: Implementando Azure Cost Management con Terraform"
date: 2025-10-10
categories:
  - blog
tags:
  - Azure
  - Terraform
  - DevOps
  - Cost Management
  - IaC
---

![Azure Cost Management Dashboard](/assets/images/posts/azure-cost/azure-cost-dashboard.png)

## Introducción

En el mundo actual de la nube, uno de los mayores desafíos que enfrentan las organizaciones es mantener los costos bajo control. Azure Cost Management es una herramienta poderosa que nos ayuda a monitorear, asignar y optimizar nuestros gastos en la nube. En este artículo, aprenderemos cómo automatizar la gestión de costos utilizando Terraform, permitiéndonos implementar buenas prácticas de FinOps desde el código.

## ¿Por qué es importante la gestión de costos?

La adopción de la nube trae consigo la flexibilidad de pago por uso, pero también puede llevar a costos inesperados si no se gestiona adecuadamente. Algunos datos importantes:
- Según Microsoft, las empresas pueden ahorrar hasta un 30% en costos de Azure mediante una gestión adecuada
- El 80% de las organizaciones exceden sus presupuestos cloud por falta de monitorización
- La automatización de políticas de costos puede reducir el gasto innecesario en un 25%

## Implementación con Terraform

### 1. Configuración del Presupuesto

```hcl
resource "azurerm_consumption_budget_subscription" "dev_budget" {
  name            = "dev-monthly-budget"
  subscription_id = data.azurerm_subscription.current.id

  amount     = 1000
  time_grain = "Monthly"

  time_period {
    start_date = "2025-10-01T00:00:00Z"
    end_date   = "2026-10-01T00:00:00Z"
  }

  notification {
    enabled   = true
    threshold = 90.0
    operator  = "GreaterThan"

    contact_emails = [
      "devops@tuempresa.com"
    ]
  }
}
```

![Presupuesto en Azure Portal](../assets/images/posts/2025-10-11/budget-config.png)

### 2. Políticas de Costos Automatizadas

```hcl
resource "azurerm_policy_definition" "cost_center_tag" {
  name         = "require-cost-center-tag"
  policy_type  = "Custom"
  mode         = "All"
  display_name = "Require cost center tag for resources"

  policy_rule = <<POLICY_RULE
    {
      "if": {
        "allOf": [
          {
            "field": "tags['CostCenter']",
            "exists": "false"
          }
        ]
      },
      "then": {
        "effect": "deny"
      }
    }
POLICY_RULE
}
```

## Mejores Prácticas

1. **Implementa Tags Consistentes:**
   - CostCenter
   - Environment
   - Project
   - Owner

2. **Configura Alertas Tempranas:**
   ```hcl
   resource "azurerm_monitor_action_group" "cost_alert" {
     name                = "cost-alert-team"
     resource_group_name = azurerm_resource_group.monitoring.name
     short_name         = "costalert"

     email_receiver {
       name          = "devops-team"
       email_address = "devops@tuempresa.com"
     }
   }
   ```

3. **Automatiza el Apagado de Recursos:**
   * Configura horarios de apagado/encendido para recursos no productivos
   * Implementa políticas de auto-scaling basadas en uso
   * Utiliza Azure Automation para gestionar recursos inactivos

## Ejemplo Práctico: Dashboard de Costos

```hcl
resource "azurerm_portal_dashboard" "cost_dashboard" {
  name                = "cost-management-dashboard"
  resource_group_name = azurerm_resource_group.monitoring.name
  location            = azurerm_resource_group.monitoring.location

  dashboard_properties = <<DASHBOARD
{
    "lenses": {
        "0": {
            "order": 0,
            "parts": {
                "0": {
                    "position": {
                        "x": 0,
                        "y": 0,
                        "rowSpan": 2,
                        "colSpan": 3
                    },
                    "metadata": {
                        "inputs": [],
                        "type": "Extension/Microsoft_Azure_CostManagement/PartType/CostAnalysisPinPart"
                    }
                }
            }
        }
    }
}
DASHBOARD
}
```

## Referencias y Recursos Adicionales

- [Documentación oficial de Azure Cost Management](https://docs.microsoft.com/en-us/azure/cost-management-billing/)
- [Terraform Azure Provider - Cost Management](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/consumption_budget_subscription)
- [Azure Well-Architected Framework - Cost Optimization](https://docs.microsoft.com/en-us/azure/architecture/framework/cost/)
- [GitHub - Ejemplos de Terraform para Cost Management](https://github.com/Azure/terraform-azurerm-examples)
