# Página web personal

Este repositorio contiene el código de mi sitio estático.

## Seguridad y control de costos

Para proteger la infraestructura y minimizar los gastos se recomienda:

1. **Usar un CDN con protección anti‑DDoS.** Configura Cloudflare o el Cloud CDN de Google para que el tráfico pase por este proxy y pueda filtrarse el tráfico repetitivo.
2. **Activar Google Cloud Armor.** Define reglas de *rate limiting* que bloqueen direcciones IP con demasiadas solicitudes.
3. **Configurar presupuestos y alertas de costos.** En la consola de Google Cloud crea un presupuesto y habilita notificaciones por correo cuando el consumo se dispare.
4. **Habilitar registros y monitorización.** Utiliza Google Cloud Logging y Monitoring para detectar picos de tráfico inusuales y responder a tiempo.
5. **Obtener estadísticas de uso.** Integra Google Analytics o una solución autoalojada (por ejemplo Matomo o Plausible). En los archivos HTML principales se añadió el siguiente código que debes completar con tu identificador real:

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

Sustituye `G-XXXXXXXXXX` por tu ID de medición para comenzar a recopilar estadísticas.
