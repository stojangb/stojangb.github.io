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
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LZPREGW790"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-LZPREGW790');
</script>
```

Sustituye `G-LZPREGW790` por tu ID de medición para comenzar a recopilar
estadísticas.

## Arquitectura y despliegue

1. Al hacer *push* a `main`, se ejecuta el workflow
   `.github/workflows/deploy.yml` que sincroniza el repositorio con el bucket
   `www.stojangasic.com`.
2. El bucket es público y se sirve a través de un balanceador de carga y Cloud
   DNS. Consulta `ARCHITECTURE.md` para más detalles.
3. Para que el workflow funcione debes añadir en la configuración del repositorio
   el secreto `GCP_SA_KEY_BASE64` con las credenciales de servicio en base64.
4. Para la infraestructura, el workflow `.github/workflows/terraform.yml` planifica los cambios en los pull requests y los aplica al fusionar en `main`.

## Publicar este repositorio con GitHub Pages

Si prefieres que el sitio quede online directamente con GitHub Pages (sin GCS),
haz lo siguiente:

1. Ve a **GitHub → Settings → Pages**.
2. En **Build and deployment**, selecciona **Deploy from a branch**.
3. En **Branch**, elige `main` y carpeta `/ (root)`.
4. Guarda los cambios y espera 1–3 minutos.
5. Tu URL quedará como:
   - `https://<tu-usuario>.github.io/<nombre-del-repo>/`
   - Si el repo se llama `<tu-usuario>.github.io`, será `https://<tu-usuario>.github.io/`

Notas importantes para este repo:

- Ya existe un `index.html` en la raíz, así que Pages puede servirlo sin cambios.
- Si mantienes el workflow actual de GCS (`.github/workflows/deploy.yml`), tendrás
  dos despliegues distintos (GCS y GitHub Pages). Puedes dejar ambos o desactivar
  uno para evitar confusión.
