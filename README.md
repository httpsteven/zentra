# Zentra — Sitio web

Sitio de **Zentra**, estudio boutique de **terapias holísticas** (Access Bars®,
sanación energética, sonoterapia y meditación). Proyecto **Node + Vite**
(multipágina estática), en **español**, construido sobre la dirección de arte
*Organic Warm* y la identidad de marca de Zentra.

> **Importante — posicionamiento:** Zentra NO es un consultorio médico. Es un
> espacio de bienestar y relajación. La copia evita cualquier promesa médica y el
> pie de página aclara que las prácticas no son un tratamiento médico ni sustituyen
> la atención profesional de salud.

## Requisitos

- Node.js 18+ (probado con Node 22)

## Puesta en marcha

```bash
npm install       # instala Vite
npm run dev       # servidor de desarrollo (http://localhost:5173)
npm run build     # compila el sitio a /dist
npm run preview   # sirve la compilación de /dist para revisarla
```

## Estructura

```
website/
├─ index.html          # Inicio
├─ about.html          # Nosotros
├─ services.html       # Servicios
├─ faq.html            # Preguntas frecuentes
├─ contact.html        # Contacto (formulario + canales)
├─ public/
│  ├─ styles.css       # Sistema de diseño (tokens de la marca Zentra)
│  ├─ script.js        # Motion (GSAP + Lenis), menú móvil, formulario
│  └─ assets/          # Logos oficiales (combinación, wordmark, monograma)
├─ vite.config.js      # Multipágina: una entrada por HTML
└─ package.json
```

## Marca

- **Paleta:** Olive Leaf `#3F4711` (acento), Warm Off White `#E9E9E1` (fondo),
  Coffee Bean `#13070C` (texto), Wine Plum `#632B30`, Soft Cream `#F6F6D8`
  (tarjetas), Deep Plum `#300718` (pie de página).
- **Tipografía:** Fraunces (títulos) + Nunito Sans (texto).
- **Movimiento:** revelados suaves con GSAP + ScrollTrigger y scroll con inercia
  (Lenis), todo respetando `prefers-reduced-motion`.

## Pendientes antes de publicar (marcados `POR CONFIRMAR` en el código)

- Dirección, teléfono, WhatsApp, correo, Instagram y horario reales.
- Año y ciudad de apertura (página *Nosotros*).
- Perfiles reales del equipo (nombres, funciones, formación y fotos).
- Duración, tarifas y modalidades (presencial / en línea) de las sesiones en
  *Preguntas frecuentes*.
- Certificaciones de las facilitadoras (*Inicio* y *Nosotros*).
- Conectar el formulario de contacto a un backend real (Formspree, un endpoint
  propio o un enlace directo de WhatsApp). Ahora simula el envío en el cliente.
- Sustituir las fotografías de stock (Unsplash) por imágenes propias del estudio
  cuando estén disponibles. Ideal: fotos reales de sesiones de Access Bars®,
  sonoterapia (cuencos y gongs) y del espacio.
- Añadir testimonios reales y atribuibles (la sección está omitida a propósito).

## Notas técnicas

- Las imágenes de stock se cargan desde Unsplash con parámetros de tamaño/formato.
  Para uso offline o mayor control, descárgalas a `public/assets/` y actualiza las
  rutas.
- Las rutas de recursos usan `/` (raíz), pensadas para despliegue en la raíz de un
  dominio (Vercel, Netlify, etc.). Para un subdirectorio, ajusta `base` en
  `vite.config.js`.
# zentra
