// Ferromateriales Tobia SAS — interacciones del sitio
// Cada bloque va en su propio try/catch: si algo falla, el resto del
// sitio (y sobre todo el contenido, que debe verse siempre) sigue vivo.
(function () {
  "use strict";

  function mediaMatches(query) {
    try {
      return typeof window.matchMedia === "function" && window.matchMedia(query).matches;
    } catch (e) {
      return false;
    }
  }

  var reduceMotion = mediaMatches("(prefers-reduced-motion: reduce)");
  var CATALOG = window.FERRO_CATALOG || { categorias: [], productos: [] };

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function iconSvg(iconId, size) {
    return '<svg width="' + size + '" height="' + size + '"><use href="#' + iconId +
      '" xlink:href="#' + iconId + '"/></svg>';
  }

  function waLink(text) {
    return "https://wa.me/573104144628?text=" + encodeURIComponent(text);
  }

  // ---------------------------------------------------------
  // RED DE SEGURIDAD DE VISIBILIDAD — se registra de primero.
  // Todo el contenido con [data-reveal] queda visible sí o sí,
  // pase lo que pase con el resto de los bloques de abajo.
  // ---------------------------------------------------------
  var revealEls = document.querySelectorAll("[data-reveal]");
  function revealAll() {
    for (var i = 0; i < revealEls.length; i++) revealEls[i].classList.add("is-visible");
  }
  try {
    window.addEventListener("load", function () { setTimeout(revealAll, 2000); });
  } catch (e) { /* si esto falla, el navegador es tan viejo que igual mostrará todo */ }

  // ---------------------------------------------------------
  // Año dinámico en el pie de página
  // ---------------------------------------------------------
  try {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  } catch (e) {}

  // ---------------------------------------------------------
  // Menú móvil
  // ---------------------------------------------------------
  var header = document.getElementById("siteHeader");
  var nav = document.getElementById("mainNav");
  try {
    var toggle = document.getElementById("navToggle");
    if (toggle && header && nav) {
      toggle.addEventListener("click", function () {
        var isOpen = header.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
      var navLinks = nav.querySelectorAll("a");
      for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function () {
          header.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      }
    }
  } catch (e) {}

  // ---------------------------------------------------------
  // CATÁLOGO — se construye a partir de data/products.js
  // ---------------------------------------------------------
  var PAGE_SIZE = 9;
  var activeCategory = "todas";
  var searchTerm = "";
  var visibleCount = PAGE_SIZE;

  function renderFeaturedTejas() {
    var grid = document.getElementById("tejaFeaturedGrid");
    if (!grid) return;
    var items = CATALOG.productos.filter(function (p) { return p.destacado; });
    grid.innerHTML = items.map(function (p) {
      return (
        '<article class="teja-card" data-reveal>' +
          '<div class="teja-icon">' + iconSvg("icon-teja", 34) + "</div>" +
          "<h3>" + escapeHtml(p.nombre) + "</h3>" +
          "<p>" + escapeHtml(p.descripcion) + "</p>" +
        "</article>"
      );
    }).join("");
  }

  function renderFilters() {
    var wrap = document.getElementById("catalogFilters");
    if (!wrap) return;
    var pills = [{ id: "todas", nombre: "Todas", icono: null }].concat(CATALOG.categorias);

    wrap.innerHTML = pills.map(function (c) {
      var active = c.id === activeCategory ? " is-active" : "";
      var icon = c.icono ? iconSvg(c.icono, 14) : "";
      return (
        '<button type="button" class="filter-pill' + active + '" data-cat="' + c.id + '">' +
          icon + escapeHtml(c.nombre) +
        "</button>"
      );
    }).join("");

    var pillButtons = wrap.querySelectorAll(".filter-pill");
    for (var i = 0; i < pillButtons.length; i++) {
      pillButtons[i].addEventListener("click", function () {
        activeCategory = this.getAttribute("data-cat");
        visibleCount = PAGE_SIZE;
        renderFilters();
        renderCatalog();
      });
    }
  }

  function matchesSearch(p, term) {
    if (!term) return true;
    var hay = (p.nombre + " " + p.descripcion).toLowerCase();
    return hay.indexOf(term) !== -1;
  }

  function renderCatalog() {
    var grid = document.getElementById("catalogGrid");
    var empty = document.getElementById("catalogEmpty");
    var moreBtn = document.getElementById("catalogLoadMore");
    if (!grid) return;

    var term = searchTerm.trim().toLowerCase();
    var items = CATALOG.productos.filter(function (p) {
      return (activeCategory === "todas" || p.categoria === activeCategory) && matchesSearch(p, term);
    });
    items = items.slice().sort(function (a, b) { return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0); });

    if (items.length === 0) {
      grid.innerHTML = "";
      if (empty) empty.hidden = false;
      if (moreBtn) moreBtn.classList.add("is-hidden");
      return;
    }
    if (empty) empty.hidden = true;

    var catMap = {};
    CATALOG.categorias.forEach(function (c) { catMap[c.id] = c; });

    var toShow = items.slice(0, visibleCount);
    grid.innerHTML = toShow.map(function (p) {
      var cat = catMap[p.categoria] || { nombre: "", icono: "icon-tools" };
      var newBadge = p.nuevo ? '<span class="cat-new">NUEVO</span>' : "";
      return (
        '<article class="cat-card js-card-enter" data-reveal>' +
          newBadge +
          iconSvg(cat.icono, 30) +
          '<span class="cat-tag">' + escapeHtml(cat.nombre) + "</span>" +
          "<h3>" + escapeHtml(p.nombre) + "</h3>" +
          "<p>" + escapeHtml(p.descripcion) + "</p>" +
          '<a class="cat-ask" href="' + waLink("Hola, quiero preguntar por: " + p.nombre) + '" target="_blank" rel="noopener">' +
            iconSvg("icon-whatsapp", 14) + " Preguntar" +
          "</a>" +
        "</article>"
      );
    }).join("");

    if (moreBtn) moreBtn.classList.toggle("is-hidden", visibleCount >= items.length);

    requestAnimationFrame(function () {
      var cards = grid.querySelectorAll(".js-card-enter");
      for (var i = 0; i < cards.length; i++) {
        (function (card, i) {
          if (reduceMotion) { card.classList.add("js-card-in"); return; }
          setTimeout(function () { card.classList.add("js-card-in"); }, i * 45);
        })(cards[i], i);
      }
    });
  }

  try {
    renderFeaturedTejas();
    renderFilters();
    renderCatalog();

    var searchInput = document.getElementById("catalogSearch");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        searchTerm = this.value;
        visibleCount = PAGE_SIZE;
        renderCatalog();
      });
    }
    var loadMoreBtn = document.getElementById("catalogLoadMore");
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", function () {
        visibleCount += PAGE_SIZE;
        renderCatalog();
      });
    }
  } catch (catalogError) {
    console.error("Ferromateriales: no se pudo cargar el catálogo dinámico.", catalogError);
  }

  // ---------------------------------------------------------
  // Retraso escalonado (--i) para que grupos de elementos
  // aparezcan en cascada en vez de todos a la vez
  // ---------------------------------------------------------
  try {
    var groups = [];
    var groupParents = [];
    var allReveal = document.querySelectorAll("[data-reveal]");
    for (var gi = 0; gi < allReveal.length; gi++) {
      var parent = allReveal[gi].parentElement;
      var idx = groupParents.indexOf(parent);
      if (idx === -1) { groupParents.push(parent); groups.push([allReveal[gi]]); }
      else { groups[idx].push(allReveal[gi]); }
    }
    for (var gj = 0; gj < groups.length; gj++) {
      for (var k = 0; k < groups[gj].length; k++) {
        groups[gj][k].style.setProperty("--i", k);
      }
    }
  } catch (e) {}

  // ---------------------------------------------------------
  // Animación de aparición al hacer scroll
  // ---------------------------------------------------------
  try {
    revealEls = document.querySelectorAll("[data-reveal]"); // por si el catálogo agregó más
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

  // ---------------------------------------------------------
  // Barra de progreso de scroll + encabezado compacto
  // ---------------------------------------------------------
  try {
    var progressBar = document.getElementById("scrollProgress");
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = pct + "%";
        if (header) header.classList.toggle("is-scrolled", scrollTop > 30);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  } catch (e) {}

  // ---------------------------------------------------------
  // Navegación activa según la sección visible (scrollspy)
  // ---------------------------------------------------------
  try {
    if (nav && "IntersectionObserver" in window) {
      var spySections = ["tejas", "productos", "nosotros", "contacto"]
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);
      var spyLinks = nav.querySelectorAll("a");

      var setActiveLink = function (id) {
        for (var i = 0; i < spyLinks.length; i++) {
          spyLinks[i].classList.toggle("is-active", spyLinks[i].getAttribute("href") === "#" + id);
        }
      };

      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) setActiveLink(entry.target.id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      spySections.forEach(function (s) { spy.observe(s); });
    }
  } catch (e) {}

  // ---------------------------------------------------------
  // Spotlight que sigue el mouse en el hero (solo escritorio)
  // ---------------------------------------------------------
  try {
    var heroEl = document.querySelector(".hero");
    if (heroEl && !reduceMotion && mediaMatches("(pointer: fine)")) {
      heroEl.addEventListener("mousemove", function (e) {
        var rect = heroEl.getBoundingClientRect();
        var mx = ((e.clientX - rect.left) / rect.width) * 100;
        var my = ((e.clientY - rect.top) / rect.height) * 100;
        heroEl.style.setProperty("--mx", mx + "%");
        heroEl.style.setProperty("--my", my + "%");
      });
    }
  } catch (e) {}
})();
