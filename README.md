# Sitio web — Ferromateriales Tobia SAS

Sitio de una sola página, listo para publicar en GitHub Pages. No necesita frameworks
ni instalación: son solo 3 archivos + una carpeta de imágenes.

## Contenido de la carpeta

```
index.html          → toda la estructura y el contenido del sitio
styles.css          → colores, tipografía y diseño
script.js           → menú, animaciones, catálogo con filtros y buscador
data/products.js    → ⭐ AQUÍ SE AGREGAN LOS PRODUCTOS NUEVOS
assets/             → tu logo en varios tamaños (encabezado, favicon, redes sociales)
```

## Cómo agregar un producto nuevo (sin tocar el diseño)

Todo el catálogo —la sección de teja destacada y el catálogo completo con filtros y
buscador— se genera automáticamente a partir de un solo archivo: **`data/products.js`**.
Ábrelo con cualquier editor de texto (incluso el editor de código de GitHub, en el
navegador, sin instalar nada) y vas a ver una lista de productos así:

```js
{
  id: 'teja-zinc',
  categoria: 'tejas',
  nombre: 'Teja de zinc',
  descripcion: 'Liviana y de instalación rápida, para cubiertas, cerramientos y proyectos económicos.',
  destacado: true
},
```

Para agregar un producto nuevo, copia un bloque de esos, pégalo dentro de la lista y
cambia el texto. Guarda el archivo y ya está — no hay que tocar `index.html` ni
`styles.css`. El archivo trae, al principio, instrucciones completas de qué escribir en
cada campo, incluyendo cómo agregar una categoría nueva si algún día vendes algo que no
encaja en las 7 categorías actuales.

Si editas el archivo directo en GitHub (botón de lápiz ✏️ en la página del archivo →
cambiar el texto → "Commit changes"), el sitio se actualiza solo en un par de minutos,
sin que tengas que instalar nada en tu computador.

## Publicarlo en GitHub Pages (gratis)

1. Entra a [github.com](https://github.com) y crea una cuenta si no tienes una.
2. Crea un repositorio nuevo. Puedes llamarlo, por ejemplo, `ferromateriales-tobia`.
   Márcalo como **público** (los repositorios privados necesitan un plan pago para Pages).
3. Sube estos archivos al repositorio, manteniendo la carpeta `assets/` tal como está.
   La forma más fácil: en la página del repositorio, usa el botón **"Add file" → "Upload files"**
   y arrastra todo el contenido de esta carpeta (incluyendo `assets`).
4. Ve a **Settings → Pages** (en el menú lateral del repositorio).
5. En "Build and deployment", elige **Source: Deploy from a branch**, rama **main**, carpeta **/ (root)**.
   Guarda.
6. Espera uno o dos minutos y GitHub te mostrará la dirección donde quedó publicado,
   algo como `https://tu-usuario.github.io/ferromateriales-tobia/`.

Cada vez que subas un cambio a los archivos, el sitio se actualiza solo en un par de minutos.

## Pasar luego a un dominio propio (por ejemplo, ferromaterialestobia.com)

1. Compra el dominio en cualquier proveedor (Namecheap, GoDaddy, etc.).
2. En el panel de ese proveedor, crea un registro **CNAME** que apunte a
   `tu-usuario.github.io`.
3. En el repositorio de GitHub, dentro de **Settings → Pages**, escribe tu dominio en el
   campo "Custom domain" y guarda. GitHub crea automáticamente un archivo `CNAME` en tu
   repositorio; no lo borres.
4. Espera a que el DNS se propague (puede tardar desde minutos hasta un par de horas) y
   activa la opción "Enforce HTTPS" cuando esté disponible.

## Datos que ya están cargados en el sitio

- **WhatsApp de cotización:** 310 414 4628 (botón fijo flotante + botones en todo el sitio)
- **Teléfono:** 314 220 6196
- **Correo:** ferromaterialestobia.contacto@gmail.com
- **Dirección:** Tobía, Nimaima, Cundinamarca
- **NIT:** 901.818.546-1

## Cosas para revisar o ajustar cuando quieras

- Los productos y categorías que vienen cargados son una base editable — ajústalos,
  bórralos o agrega los tuyos en `data/products.js` (ver sección de arriba).
- El mapa de "Cómo llegar" abre una búsqueda de Google Maps con la dirección; si tienes
  la ubicación exacta guardada en Google Maps, puedes reemplazar ese enlace por el de tu
  ficha real del negocio.
- Los textos fijos (los que no son productos, como el encabezado o "Sobre nosotros")
  están en `index.html`; los colores y tamaños, en `styles.css`.
