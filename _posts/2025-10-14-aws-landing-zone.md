---
title: "Implementando AWS Landing Zone: Una Guía Práctica para Empresas Multi-cuenta"
date: 2025-10-10
categories:
  - blog
tags:
  - AWS
  - Landing Zone
  - Cloud
  - IaC
  - Terraform
---

## Introducción

La gestión de múltiples cuentas en AWS es un desafío común para las organizaciones en crecimiento. AWS Landing Zone proporciona una base segura y bien arquitectada para gestionar múltiples cuentas y workloads. En este artículo, exploraremos cómo implementar una Landing Zone en AWS usando las mejores prácticas y herramientas de Infrastructure as Code.

## ¿Qué es AWS Landing Zone?

AWS Landing Zone es una solución que ayuda a las empresas a configurar un entorno AWS multi-cuenta seguro y conforme con las normativas. Proporciona una base para:

- Gestión centralizada de cuentas
- Gobierno y cumplimiento
- Seguridad y monitorización
- Networking y conectividad

## Implementación con Terraform

```hcl
# Configuración de AWS Organizations
resource "aws_organizations_organization" "main" {
  feature_set = "ALL"
  
  aws_service_access_principals = [
    "cloudtrail.amazonaws.com",
    "config.amazonaws.com",
  ]
}

# Cuenta de Seguridad
resource "aws_organizations_account" "security" {
  name      = "security-account"
  email     = "security@tuempresa.com"
  role_name = "OrganizationAccountAccessRole"
}

# Cuenta de Log Archive
resource "aws_organizations_account" "log_archive" {
  name      = "log-archive"
  email     = "logs@tuempresa.com"
  role_name = "OrganizationAccountAccessRole"
}
```

## Estructura de Organizational Units (OUs)

```hcl
resource "aws_organizations_organizational_unit" "workloads" {
  name      = "workloads"
  parent_id = aws_organizations_organization.main.roots[0].id
}

resource "aws_organizations_organizational_unit" "infrastructure" {
  name      = "infrastructure"
  parent_id = aws_organizations_organization.main.roots[0].id
}
```

## Control Tower y Account Factory

Control Tower extiende las capacidades de Landing Zone proporcionando:

1. **Account Factory**: Automatización de la creación de cuentas
2. **Guardrails**: Políticas de gobernanza preventivas y detectivas
3. **Dashboard**: Visibilidad centralizada del cumplimiento

## Mejores Prácticas de Seguridad

1. **IAM Baseline**:
```hcl
resource "aws_iam_account_password_policy" "strict" {
  minimum_password_length        = 14
  require_lowercase_characters   = true
  require_numbers               = true
  require_uppercase_characters   = true
  require_symbols               = true
  allow_users_to_change_password = true
}
```

2. **CloudTrail Multi-región**:
```hcl
resource "aws_cloudtrail" "main" {
  name                          = "organization-trail"
  s3_bucket_name               = aws_s3_bucket.cloudtrail.id
  include_global_service_events = true
  is_multi_region_trail        = true
  enable_logging               = true
  
  depends_on = [
    aws_s3_bucket_policy.cloudtrail
  ]
}
```

## Networking y Conectividad

1. **Transit Gateway**:
```hcl
resource "aws_ec2_transit_gateway" "main" {
  description = "Main Transit Gateway"
  
  tags = {
    Name = "main-tgw"
  }
}
```

2. **VPC Baseline**:
```hcl
module "vpc_baseline" {
  source = "./modules/vpc"
  
  for_each = local.accounts
  
  account_id = each.key
  cidr_block = each.value.cidr
  region     = var.region
}
```

## Monitorización y Logging

Centraliza la monitorización usando:

1. AWS SecurityHub
2. AWS Config
3. CloudWatch Logs
4. AWS Systems Manager

## Conclusiones

Una Landing Zone bien diseñada es fundamental para el éxito a largo plazo en AWS. Proporciona:

- Base sólida para el crecimiento
- Controles de seguridad robustos
- Cumplimiento normativo
- Escalabilidad empresarial

## Referencias

- [AWS Control Tower Documentation](https://docs.aws.amazon.com/controltower)
- [AWS Organizations Best Practices](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_best-practices.html)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
