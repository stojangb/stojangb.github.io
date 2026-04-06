# Terraform setup for static site

This configuration creates:

- A Google Cloud Storage bucket configured for static website hosting
- Public read access for the bucket
- A Cloudflare DNS record pointing to the bucket URL

## Usage

1. Install [Terraform](https://www.terraform.io/) and authenticate with both Google Cloud and Cloudflare.
2. Update `terraform.tfvars` with your project and domain information:

```hcl
project_id            = "my-gcp-project"
region                = "us-central1"
bucket_name           = "www.example.com"
cloudflare_api_token  = "cf-token"
cloudflare_zone_id    = "cf-zone-id"
domain                = "www.example.com"
```

3. Initialize and apply the configuration:

```bash
terraform init
terraform apply
```

This will create the storage bucket and Cloudflare record for your site.

### Extra features

- **Cloud Armor policy**: A basic security policy with rate limiting is created to mitigate DDoS attacks.
- **Budget alert**: A monthly budget configured via `google_billing_budget` sends an email when 90% of the amount is reached.

The variables `billing_account`, `budget_amount`, and `budget_email` must be provided in `terraform.tfvars`.
