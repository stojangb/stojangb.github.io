# Architecture Overview

This repository hosts a static website deployed to Google Cloud Storage (GCS).
A GitHub Actions workflow (`.github/workflows/deploy.yml`) syncs the contents of
`main` to the bucket `www.stojangasic.com` whenever changes are pushed.

```
GitHub (private repo) --push--> GitHub Actions --deploy--> GCS bucket
```

The bucket is served publicly through Google Cloud Load Balancer and Cloud
DNS. Caching is disabled with the `setmeta` command to ensure updates are
visible immediately.

## API Key Handling

The game under `singame/game2` requires an OpenAI API key. Do **not** expose the
key in any HTML or JavaScript. Instead:

1. Create a serverless backend (Cloud Functions, Cloud Run, or another provider)
   that calls the OpenAI API using the key.
2. Store the key as a secret in that environment. On Google Cloud Functions you
   can use Secret Manager or environment variables.
3. The frontend calls this backend endpoint instead of OpenAI directly.

## GitHub Secrets

Add the following secrets in the repository settings:

- `GCP_SA_KEY_BASE64` – base64 of the Google service account JSON used by the
  GitHub workflow to deploy to GCS.
- `OPENAI_API_KEY` – **optional**, used only in backend deployments, never
  embedded in frontend code.

These secrets are automatically injected in GitHub Actions and can be passed to
your backend deployment process if needed.

## Cost Control

- Keep the static site on GCS to reduce hosting costs.
- Use serverless functions on a free tier for the OpenAI proxy.
- Configure budgets and alerts in Google Cloud to avoid unexpected charges.

