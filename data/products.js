/* =========================================================
   CATÁLOGO DE FERROMATERIALES TOBIA SAS
   =========================================================
   Este es el ÚNICO archivo que hay que editar para agregar,
   quitar o cambiar productos. El resto de la página los lee
   de aquí automáticamente (la sección de teja destacada y el
   catálogo completo con filtros y buscador).

   CÓMO AGREGAR UN PRODUCTO NUEVO
   -------------------------------
   Copia uno de los bloques { ... } de abajo, dentro de la lista
   "productos", pégalo donde quieras y cambia los datos. Cada
   producto necesita:

     id          → un texto corto y único, sin espacios ni tildes
                   (ejemplo: 'teja-zinc'). Solo se usa internamente.
     categoria   → debe ser igual al "id" de una de las categorías
                   de la lista "categorias" (más abajo).
     nombre      → el nombre que ve el cliente.
     descripcion → una o dos frases cortas.
     destacado   → true si quieres que aparezca también en la
                   sección "Especialistas en teja" (úsalo solo
                   para productos de la categoría 'tejas').
                   Si no aplica, pon false o simplemente bórralo.
     nuevo       → true si quieres que muestre una etiqueta
                   "NUEVO". Opcional, bórralo si no aplica.

   No olvides poner una coma "," después de cada bloque, excepto
   después del último.

   CÓMO AGREGAR UNA CATEGORÍA NUEVA
   ----------------------------------
   Agrega un bloque a la lista "categorias" con id, nombre e
   icono. Los iconos disponibles ya dibujados en la página son:
   icon-teja, icon-cement, icon-panel, icon-beam, icon-paint,
   icon-plumbing, icon-tools, icon-stack, icon-credit, icon-ruler.
   Si necesitas un ícono distinto, dile a Claude que te dibuje uno
   nuevo y lo agregue al sprite de index.html.
   ========================================================= */

window.FERRO_CATALOG = {

  categorias: [
    { id: 'tejas',      nombre: 'Tejas y cubiertas',        icono: 'icon-teja' },
    { id: 'cemento',    nombre: 'Cemento y agregados',      icono: 'icon-cement' },
    { id: 'placas',     nombre: 'Placas y paneles',         icono: 'icon-panel' },
    { id: 'perfiles',   nombre: 'Perfiles y hierros',       icono: 'icon-beam' },
    { id: 'pinturas',   nombre: 'Pinturas y acabados',      icono: 'icon-paint' },
    { id: 'plomeria',   nombre: 'Plomería y calefacción',   icono: 'icon-plumbing' },
    { id: 'ferreteria', nombre: 'Ferretería en general',    icono: 'icon-tools' }
  ],

  productos: [
    {
      id: 'teja-ondulada',
      categoria: 'tejas',
      nombre: 'Teja ondulada',
      descripcion: 'La más usada para vivienda y ampliaciones. Distintos calibres según la estructura y la zona.',
      destacado: true
    },
    {
      id: 'teja-termoacustica',
      categoria: 'tejas',
      nombre: 'Teja termoacústica',
      descripcion: 'Aísla el calor y baja el ruido de la lluvia. Ideal para segundo piso, cocina o local.',
      destacado: true
    },
    {
      id: 'teja-zinc',
      categoria: 'tejas',
      nombre: 'Teja de zinc',
      descripcion: 'Liviana y de instalación rápida, para cubiertas, cerramientos y proyectos económicos.',
      destacado: true
    },
    {
      id: 'cemento-gris',
      categoria: 'cemento',
      nombre: 'Cemento gris',
      descripcion: 'Para estructura, pañete y todo tipo de obra en general.'
    },
    {
      id: 'arena-gravilla',
      categoria: 'cemento',
      nombre: 'Arena y gravilla',
      descripcion: 'Agregados para mezcla, fundida y relleno.'
    },
    {
      id: 'eterboard',
      categoria: 'placas',
      nombre: 'Placa Eterboard',
      descripcion: 'Lámina de 2.44 x 1.22 m en varios espesores, para muros y cielo raso.'
    },
    {
      id: 'gyplac',
      categoria: 'placas',
      nombre: 'Placa Gyplac (drywall)',
      descripcion: 'Lámina de 1220 x 2440 mm para drywall, muros y cielo raso.'
    },
    {
      id: 'perfiles-metalicos',
      categoria: 'perfiles',
      nombre: 'Perfiles metálicos',
      descripcion: 'Parales y canales para estructuras en drywall y cielo raso.'
    },
    {
      id: 'varilla-malla',
      categoria: 'perfiles',
      nombre: 'Varilla corrugada y malla',
      descripcion: 'Varilla y malla electrosoldada para refuerzo estructural.'
    },
    {
      id: 'pintubon',
      categoria: 'pinturas',
      nombre: 'Vinilo tipo 2 Pintubón',
      descripcion: 'Vinilo corriente por cuñete, para interior y exterior.'
    },
    {
      id: 'esmaltes-impermeabilizantes',
      categoria: 'pinturas',
      nombre: 'Esmaltes e impermeabilizantes',
      descripcion: 'Acabados para madera y metal, y protección de cubiertas contra la lluvia.',
      nuevo: true
    },
    {
      id: 'tuberia-pvc',
      categoria: 'plomeria',
      nombre: 'Tubería y accesorios PVC',
      descripcion: 'Para acueducto, aguas negras y aguas lluvias.'
    },
    {
      id: 'calefaccion',
      categoria: 'plomeria',
      nombre: 'Equipos y accesorios de calefacción',
      descripcion: 'Para instalaciones de agua caliente y calefacción.'
    },
    {
      id: 'herramienta-manual',
      categoria: 'ferreteria',
      nombre: 'Herramienta manual',
      descripcion: 'Martillos, palas, palustres y lo necesario para trabajar.'
    },
    {
      id: 'tornilleria',
      categoria: 'ferreteria',
      nombre: 'Tornillería y anclajes',
      descripcion: 'Tornillos, puntillas, chazos y anclajes de distintas medidas.'
    }
  ]
};
