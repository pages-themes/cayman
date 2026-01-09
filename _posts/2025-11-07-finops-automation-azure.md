---
title: "Automatización de FinOps: Implementación de Presupuestos y Alertas con Terraform en Azure para 2026"
date: 2025-11-07
categories:
  - blog
tags:
  - FinOps
  - Azure
  - Terraform
  - Costes
  - Automatización
  - Presupuestos
  - Monitorización
seo:
  type: TechArticle
  description: "Guía completa de automatización de FinOps en Azure usando Terraform. Aprende a implementar presupuestos, alertas y dashboards para control de costes en 2026."
---

## La Evolución del FinOps en Azure: Más Allá del Control Manual

El control de costes en la nube ha evolucionado de ser una tarea reactiva a convertirse en una disciplina proactiva y automatizada. En este artículo, exploraremos cómo implementar una estrategia FinOps completa en Azure utilizando Terraform.

## Requisitos Previos

- Terraform instalado (versión ≥ 1.0.0)
- Azure CLI configurado
- Permisos de Contributor en la suscripción de Azure
- Conocimientos básicos de FinOps

## Arquitectura de la Solución

```hcl
# Estructura del proyecto
finops-automation/
├── main.tf
├── variables.tf
├── outputs.tf
├── modules/
│   ├── budget/
│   ├── alerts/
│   └── dashboard/
└── environments/
    ├── dev/
    └── prod/
```

## 1. Configuración de Presupuestos con Terraform

```hcl
# modules/budget/main.tf
resource "azurerm_consumption_budget_subscription" "monthly" {
  name            = "monthly-budget-${var.environment}"
  subscription_id = data.azurerm_subscription.current.id

  amount     = var.monthly_budget_amount
  time_grain = "Monthly"

  time_period {
    start_date = formatdate("YYYY-MM-01", timestamp())
    end_date   = timeadd(formatdate("YYYY-MM-01", timestamp()), "8760h") # 1 año
  }

  notification {
    enabled        = true
    threshold      = 80.0
    operator       = "GreaterThan"
    threshold_type = "Actual"

    contact_emails = var.alert_contacts
  }

  notification {
    enabled        = true
    threshold      = 100.0
    operator       = "GreaterThan"
    threshold_type = "Forecasted"

    contact_emails = var.alert_contacts
    contact_roles  = ["Owner"]
  }
}
```

## 2. Implementación de Alertas Inteligentes

```hcl
# modules/alerts/main.tf
resource "azurerm_monitor_action_group" "cost_alerts" {
  name                = "cost-alerts-${var.environment}"
  resource_group_name = azurerm_resource_group.monitoring.name
  short_name         = "costalerts"

  email_receiver {
    name                    = "finance-team"
    email_address          = var.finance_email
    use_common_alert_schema = true
  }

  logic_app_receiver {
    name                    = "teams-notification"
    resource_id            = azurerm_logic_app_workflow.teams_notification.id
    callback_url           = azurerm_logic_app_trigger_http_request.cost_alert.callback_url
    use_common_alert_schema = true
  }
}

resource "azurerm_monitor_metric_alert" "cost_spike" {
  name                = "cost-spike-alert"
  resource_group_name = azurerm_resource_group.monitoring.name
  scopes              = [data.azurerm_subscription.current.id]
  description         = "Alerta cuando se detecta un incremento anormal en el coste"

  criteria {
    metric_namespace = "Microsoft.CostManagement/budgets"
    metric_name      = "ActualCost"
    aggregation      = "Total"
    operator         = "GreaterThan"
    threshold        = var.cost_spike_threshold

    dimension {
      name     = "ResourceGroup"
      operator = "Include"
      values   = ["*"]
    }
  }

  action {
    action_group_id = azurerm_monitor_action_group.cost_alerts.id
  }
}
```

## 3. Dashboard de Costes Automatizado

```hcl
# modules/dashboard/main.tf
resource "azurerm_dashboard" "cost_management" {
  name                = "cost-dashboard-${var.environment}"
  resource_group_name = azurerm_resource_group.monitoring.name
  location            = var.location

  dashboard_properties = templatefile("${path.module}/dashboard.tpl", {
    subscription_id = data.azurerm_subscription.current.id
    timeframe      = var.dashboard_timeframe
  })

  tags = {
    environment = var.environment
    managed_by  = "terraform"
  }
}
```

## 4. Integración con Azure Policy

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
        "field": "type",
        "equals": "Microsoft.Resources/subscriptions/resourceGroups"
      },
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

## 5. Pipeline de CI/CD para FinOps

```yaml
# .github/workflows/finops.yml
name: FinOps Pipeline

on:
  schedule:
    - cron: '0 0 1 * *'  # Ejecutar el primer día de cada mes
  workflow_dispatch:

jobs:
  cost-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Run Cost Analysis
        run: |
          az cost-management export create \
            --name "monthly-export" \
            --type "ActualCost" \
            --scope "subscriptions/${{ secrets.SUBSCRIPTION_ID }}" \
            --storage-account-id "${{ secrets.STORAGE_ACCOUNT_ID }}" \
            --storage-container "cost-exports" \
            --timeframe "MonthToDate" \
            --schedule-status "Active"
```

## Mejores Prácticas y Recomendaciones

1. **Estratificación de Presupuestos**
   - Presupuestos por suscripción
   - Presupuestos por grupo de recursos
   - Presupuestos por etiquetas

2. **Automatización de Respuesta**
   ```hcl
   resource "azurerm_automation_runbook" "cost_optimization" {
     name                    = "cost-optimization"
     location                = var.location
     resource_group_name     = azurerm_resource_group.automation.name
     automation_account_name = azurerm_automation_account.main.name
     log_verbose            = true
     log_progress           = true
     description            = "Runbook para optimización automática de costes"
     runbook_type          = "PowerShell"

     publish_content_link {
       uri = "https://raw.githubusercontent.com/your-org/scripts/main/cost-optimization.ps1"
     }
   }
   ```

3. **Gestión de Excepciones**
   - Proceso de aprobación para excesos de presupuesto
   - Documentación de justificaciones
   - Auditoría automática

## Monitorización y Reporting

```powershell
# Ejemplo de query para Log Analytics
let timeRange = 30d;
CostManagement
| where TimeGenerated > ago(timeRange)
| summarize TotalCost = sum(Cost) by bin(TimeGenerated, 1d), ResourceGroup
| render timechart
```

## Conclusiones y Próximos Pasos

La automatización de FinOps con Terraform proporciona:
1. Control proactivo de costes
2. Respuesta automática a desviaciones
3. Visibilidad mejorada
4. Cumplimiento continuo

### Pasos Siguientes Recomendados

1. Implementar la estructura base de Terraform
2. Configurar las alertas iniciales
3. Establecer los primeros presupuestos
4. Integrar con el sistema de tickets
5. Configurar dashboards personalizados

El código completo está disponible en nuestro [repositorio de GitHub](https://github.com/yourusername/azure-finops-automation).

## Referencias y Recursos Adicionales

- [Documentación oficial de Azure Cost Management](https://docs.microsoft.com/azure/cost-management-billing/)
- [Mejores prácticas de FinOps](https://www.finops.org/framework/principles/)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)