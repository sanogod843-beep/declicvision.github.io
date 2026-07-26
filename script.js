// js/script.js
document.addEventListener("DOMContentLoaded", function () {
    console.log("Le script est chargé et le DOM est prêt !");

    // Message de bienvenue non bloquant, affiché brièvement
    afficherNotification("Bienvenue sur mon site !");
});

function afficherNotification(message, duree = 3000) {
    const notif = document.createElement("div");
    notif.textContent = message;
    notif.style.position = "fixed";
    notif.style.top = "20px";
    notif.style.right = "20px";
    notif.style.background = "#333";
    notif.style.color = "#fff";
    notif.style.padding = "12px 20px";
    notif.style.borderRadius = "8px";
    notif.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
    notif.style.zIndex = "9999";
    notif.style.opacity = "0";
    notif.style.transition = "opacity 0.4s ease";

    document.body.appendChild(notif);

    // Apparition
    requestAnimationFrame(() => {
        notif.style.opacity = "1";
    });

    // Disparition automatique
    setTimeout(() => {
        notif.style.opacity = "0";
        setTimeout(() => notif.remove(), 400);
    }, duree);
}
