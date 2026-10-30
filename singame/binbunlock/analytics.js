/* Analitica de la web de Binbunlock (GA4, misma propiedad que la app:
   G-3EGMS4M3KZ). Sin decision del usuario no se guardan cookies: consent
   mode en "denied" hasta que acepta en el aviso de abajo.
   Uso en cualquier pagina: <script src="analytics.js" defer></script>
   Eventos de clic: cualquier elemento con data-ga="nombre" envia ese evento. */
(function () {
  var ID = "G-3EGMS4M3KZ";
  var CLAVE = "BinbunlockAnalytics";
  var eleccion = null;
  try { eleccion = localStorage.getItem(CLAVE); } catch (e) { }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: eleccion === "1" ? "granted" : "denied"
  });
  gtag("js", new Date());
  gtag("config", ID, { anonymize_ip: true });

  window.binbunlockConsentimiento = function (aceptado) {
    try { localStorage.setItem(CLAVE, aceptado ? "1" : "0"); } catch (e) { }
    gtag("consent", "update", { analytics_storage: aceptado ? "granted" : "denied" });
    var caja = document.getElementById("analytics-banner");
    if (caja) caja.remove();
  };

  function crearAviso() {
    if (eleccion !== null || document.getElementById("analytics-banner")) return;
    var caja = document.createElement("div");
    caja.id = "analytics-banner";
    caja.setAttribute("role", "dialog");
    caja.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:9999;display:flex;" +
      "gap:14px;align-items:center;justify-content:center;flex-wrap:wrap;padding:12px 16px;" +
      "background:rgba(15,16,20,.96);border-top:1px solid #3b4049;color:#d9dce2;" +
      "font:14px/1.4 'Poppins',system-ui,sans-serif;";
    var texto = document.createElement("span");
    texto.textContent = "Usamos cookies de analítica para saber cuánta gente juega. ¿Nos ayudas?";
    var si = document.createElement("button");
    si.type = "button";
    si.textContent = "Aceptar";
    si.style.cssText = "font:700 14px 'Poppins',sans-serif;border:0;border-radius:8px;" +
      "padding:8px 16px;cursor:pointer;background:#f5a623;color:#16171b;";
    si.onclick = function () { window.binbunlockConsentimiento(true); };
    var no = document.createElement("button");
    no.type = "button";
    no.textContent = "Rechazar";
    no.style.cssText = "font:700 14px 'Poppins',sans-serif;border-radius:8px;padding:8px 16px;" +
      "cursor:pointer;background:#2b2e34;color:#d9dce2;border:1px solid #484e59;";
    no.onclick = function () { window.binbunlockConsentimiento(false); };
    caja.appendChild(texto);
    caja.appendChild(si);
    caja.appendChild(no);
    document.body.appendChild(caja);
  }

  document.addEventListener("DOMContentLoaded", function () {
    crearAviso();
    // Clics medidos: data-ga="jugar" / data-ga="testers"...
    document.querySelectorAll("[data-ga]").forEach(function (el) {
      el.addEventListener("click", function () {
        gtag("event", el.getAttribute("data-ga"), { origen: "web" });
      });
    });
  });
})();
