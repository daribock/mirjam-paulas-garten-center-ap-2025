/* ANIMATIONEN STYLING */

/*BODY ANIMATION */
window.addEventListener("load", function () {
  document.body.style.opacity = "1";
});

/* ANIMATION KACHELN STARTSEITE + WEITERLEITUNG */
document.addEventListener("DOMContentLoaded", function () {
  const kacheln = document.querySelectorAll(".kachel");

  kacheln.forEach(function (kachel) {
    const link = kachel.dataset.link; // z. B. <div class="kachel" data-link="lovestory.html">

    const handleClick = (e) => {
      e.preventDefault(); // wichtig für touch

      kachel.classList.add("rotate");

      setTimeout(() => {
        kachel.classList.remove("rotate");

        if (link) {
          window.location.href = link;
        }
      }, 600); // Dauer der Animation + Rückdrehung
    };

    kachel.addEventListener("click", handleClick);
    kachel.addEventListener("touchstart", handleClick, { passive: false });
  });
});

/*ANIMATION NAVIGATION */
document.querySelectorAll("a[href]").forEach(function (link) {
  const href = link.getAttribute("href");

  // Nur interne Links
  if (href && !href.startsWith("#") && !href.startsWith("http")) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.remove("loaded"); // Fade-Out
      setTimeout(() => {
        window.location.href = href;
      }, 150); // entspricht CSS-Transition-Zeit
    });
  }
});
