// Ferromateriales Tobia SAS — interacciones del sitio
(function () {
  "use strict";

  // Año dinámico en el pie de página
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú móvil
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Cerrar el menú al elegir un enlace (mejor experiencia en móvil)
    var navLinks = nav.querySelectorAll("a");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    }
  }

  // Animación de aparición al hacer scroll (con respaldo si algo falla)
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll("[data-reveal]");

  function revealAll() {
    for (var i = 0; i < revealEls.length; i++) revealEls[i].classList.add("is-visible");
  }

  try {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealAll();
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
              entries[i].target.classList.add("is-visible");
              observer.unobserve(entries[i].target);
            }
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      for (var j = 0; j < revealEls.length; j++) observer.observe(revealEls[j]);
    }
  } catch (e) {
    revealAll();
  }

  // Red de seguridad: si por lo que sea algo queda oculto, mostrarlo igual
  window.addEventListener("load", function () {
    setTimeout(revealAll, 2500);
  });
})();
