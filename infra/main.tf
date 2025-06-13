terraform {
  required_version = ">= 1.3"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.65"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = ">= 4.4"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "google_storage_bucket" "website" {
  name                        = var.bucket_name
  location                    = var.location
  uniform_bucket_level_access = true
  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

resource "google_storage_bucket_iam_member" "public_read" {
  bucket = google_storage_bucket.website.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

resource "cloudflare_record" "site" {
  zone_id = var.cloudflare_zone_id
  name    = var.domain
  value   = google_storage_bucket.website.url
  type    = "CNAME"
  ttl     = 3600
}

output "bucket_url" {
  value = google_storage_bucket.website.url
}

# Enable required APIs
resource "google_project_service" "compute" {
  service = "compute.googleapis.com"
}

resource "google_project_service" "billingbudgets" {
  service = "billingbudgets.googleapis.com"
}

# Cloud Armor policy with basic rate limiting
resource "google_compute_security_policy" "web" {
  name        = var.security_policy_name
  description = "Rate limit abusive traffic"

  rule {
    priority = 1000
    action   = "allow"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    rate_limit_options {
      rate_limit_threshold {
        count        = 100
        interval_sec = 60
      }
      exceed_action {
        action = "deny(429)"
      }
    }
  }
}

# Budget alert
resource "google_billing_budget" "monthly" {
  billing_account = var.billing_account
  display_name    = "Monthly budget"
  amount {
    specified_amount {
      currency_code = "USD"
      units         = var.budget_amount
    }
  }
  threshold_rules {
    threshold_percent = 0.9
  }
  all_updates_rule {
    monitoring_notification_channels = []
    pubsub_topic                     = null
    schema_version                   = "1.0"
    email_alerts                     = [var.budget_email]
  }
}
