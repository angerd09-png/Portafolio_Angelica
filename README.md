# Portafolio — Angelica Ruiz

Sitio de portafolio construido con React + Vite, contenido en Supabase
(tabla `projects` + Storage), desplegado en Vercel.

## 1. Instalar y correr en local

```bash
npm install
cp .env.example .env.local   # y completa tus credenciales de Supabase
npm run dev
```

El sitio funciona sin Supabase configurado (verás mensajes de "conecta
Supabase" en vez de fotos), así que puedes revisar el diseño de una vez.

## 2. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ve a **SQL Editor** y corre el contenido de `supabase/schema.sql`.
   Esto crea la tabla `projects` y los buckets `project-media`,
   `brand-logos` y `profile`, todos con lectura pública.
3. Ve a **Project Settings > API** y copia:
   - `Project URL` → va en `VITE_SUPABASE_URL`
   - `anon public key` → va en `VITE_SUPABASE_ANON_KEY`
4. Para cargar fotos y videos:
   - Ve a **Storage > project-media** y sube tus archivos.
   - Copia la URL pública de cada archivo (clic derecho o botón "Copy URL").
   - Ve a **Table Editor > projects** y agrega una fila por cada pieza:
     - `brand_slug`: `aura-vibes`, `celeste` o `nuestro-sueno`
     - `brand_name`: el nombre visible de la marca
     - `media_type`: `image` o `video`
     - `media_url`: la URL que copiaste
     - `sort_order`: un número para el orden (1, 2, 3…)

## 3. Logos de marca y foto de perfil

No necesitan pasar por Supabase — van directo en el código:

- Logo de cada marca: `public/logos/aura-vibes.png`, `public/logos/celeste.png`,
  `public/logos/nuestro-sueno.png`
- Tu foto: `public/profile.jpg`
- Video o imagen del Hero: `public/hero-reel.mp4` (o `public/hero-image.jpg`
  si prefieres imagen estática — edita `src/components/Hero.jsx` si quieres
  quitar el video por completo)

Si alguno de estos archivos no existe, el sitio usa un respaldo visual
automáticamente (no se rompe el diseño).

## 4. Editar textos

- Descripciones de cada marca: `src/lib/useProjects.js` (constante `BRANDS`)
- Bio y habilidades: `src/components/About.jsx`
- Redes sociales: `src/components/Contact.jsx` (constante `SOCIALS` — ya
  están el email y el teléfono, faltan tus usuarios de Instagram/Behance/Vimeo)

## 5. Subir a GitHub

```bash
git init
git add .
git commit -m "Portafolio inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/angelica-portfolio.git
git push -u origin main
```

## 6. Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com) → **Add New Project** → importa el
   repositorio de GitHub.
2. Framework preset: Vercel lo detecta como **Vite** automáticamente.
3. En **Environment Variables**, agrega:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy. Cada vez que hagas `git push`, Vercel vuelve a desplegar solo.

## Estructura del proyecto

```
src/
  components/
    Nav.jsx          Barra de navegación fija
    Hero.jsx          Portada con nombre, especialidad y video/imagen de fondo
    Projects.jsx       Filtro por marca + grilla de fotos/video estilo contact-sheet
    About.jsx          Foto, bio y habilidades
    Contact.jsx         Email grande + redes sociales
    Footer.jsx
    SprocketStrip.jsx   Elemento visual de firma (tira de perforaciones tipo rollo de film)
  lib/
    supabaseClient.js   Conexión a Supabase
    useProjects.js      Carga de piezas desde la tabla `projects`
  styles.css            Todos los estilos y tokens de diseño (colores, tipografía)
supabase/
  schema.sql            Script SQL para crear tabla y buckets
```
