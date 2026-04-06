variable "project_id" {
  description = "ID of the GCP project"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "location" {
  description = "Bucket location"
  type        = string
  default     = "US"
}

variable "bucket_name" {
  description = "Name of the storage bucket"
  type        = string
}

variable "cloudflare_api_token" {
  description = "API token for Cloudflare"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Zone ID in Cloudflare"
  type        = string
}

variable "domain" {
  description = "Subdomain or domain for the site"
  type        = string
}

variable "security_policy_name" {
  description = "Name for Cloud Armor policy"
  type        = string
  default     = "web-policy"
}

variable "billing_account" {
  description = "GCP billing account ID"
  type        = string
}

variable "budget_amount" {
  description = "Monthly budget in USD"
  type        = number
  default     = 10
}

variable "budget_email" {
  description = "Email to notify when budget is exceeded"
  type        = string
}
