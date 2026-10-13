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

## Estructura Singame

`singame/` es la landing del estudio y consultora Singame: `index.html`
(servicios), `projects.html` (Binbunlock + consultoría), `consulting.html`
(propuesta ejecutiva) y `binbunlock/` (juego insignia con galería y
`privacidad.html` — la URL de privacidad de Google Play, no renombrar).
Los prototipos antiguos (`game1/`, `game2/`, `register.html`) se eliminaron
el 13/10/2026 al convertir Singame en empresa/consultora.

## API Key Handling

El sitio es 100 % estático y no usa claves de API en el navegador. Basta con
desplegar el contenido sin preocuparse por credenciales.

## GitHub Secrets

Add the following secrets in the repository settings:

- `GCP_SA_KEY_BASE64` – base64 of the Google service account JSON used by the
  GitHub workflow to deploy to GCS.

These secrets are automatically injected in GitHub Actions and can be passed to
your backend deployment process if needed.

## Cost Control

- Keep the static site on GCS to reduce hosting costs.
- Configure budgets and alerts in Google Cloud to avoid unexpected charges.

