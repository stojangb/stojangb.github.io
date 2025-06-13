# Página web personal

Este repositorio contiene el código de mi sitio estático. Se despliega de forma
automática a un bucket de Google Cloud Storage mediante GitHub Actions.

## Seguridad y control de costos

Para proteger la infraestructura y minimizar los gastos se recomienda:

1. **Usar un CDN con protección anti‑DDoS.** Configura Cloudflare o el Cloud CDN
de Google para que el tráfico pase por este proxy y pueda filtrarse el tráfico
repetitivo.
2. **Activar Google Cloud Armor.** Define reglas de *rate limiting* que bloqueen
direcciones IP con demasiadas solicitudes.
3. **Configurar presupuestos y alertas de costos.** En la consola de Google Cloud
crea un presupuesto y habilita notificaciones por correo cuando el consumo se
dispare.
4. **Habilitar registros y monitorización.** Utiliza Google Cloud Logging y
Monitoring para detectar picos de tráfico inusuales y responder a tiempo.
5. **Obtener estadísticas de uso.** Integra Google Analytics o una solución
autoalojada (por ejemplo Matomo o Plausible). En los archivos HTML principales se
añadió el siguiente código que debes completar con tu identificador real:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Sustituye `G-XXXXXXXXXX` por tu ID de medición para comenzar a recopilar
estadísticas.

## Arquitectura y despliegue

1. Al hacer *push* a `main`, se ejecuta el workflow
   `.github/workflows/deploy.yml` que sincroniza el repositorio con el bucket
   `www.stojangasic.com`.
2. El bucket es público y se sirve a través de un balanceador de carga y Cloud
   DNS. Consulta `ARCHITECTURE.md` para más detalles.
3. Para que el workflow funcione debes añadir en la configuración del repositorio
   el secreto `GCP_SA_KEY_BASE64` con las credenciales de servicio en base64.

## Clave de OpenAI

El minijuego `singame/game2` necesita una API key de OpenAI. No la incluyas en el
frontend. Crea un backend o función serverless que use la clave y exponga un
endpoint al que llame el juego.
Para desarrollo local crea un archivo `extras/local-secrets.js` que defina `window.OPENAI_API_KEY` y que está en `.gitignore` para evitar que se suba.

Al desplegar ese backend puedes leer la clave desde un secreto (`OPENAI_API_KEY`)
en GitHub o desde Secret Manager en Google Cloud. Nunca la subas al código
público.
