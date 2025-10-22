export function register() {
  if ("serviceWorker" in navigator) {
    const swUrl = `${process.env.PUBLIC_URL}/custom-service-worker.js`;
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register(swUrl)
        .then((reg) =>
          console.log("Service Worker registrado con scope:", reg.scope)
        )
        .catch((err) =>
          console.error("Error al registrar el Service Worker:", err)
        );
    });
  }
}
