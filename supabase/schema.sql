-- ============================================================
-- Esquema de Supabase para el portafolio de Angelica Ruiz
-- Ejecuta este script en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- Tabla de piezas (fotos y videos) por marca
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  brand_slug text not null check (brand_slug in ('aura-vibes', 'celeste', 'nuestro-sueno')),
  brand_name text not null,
  title text,
  media_type text not null check (media_type in ('image', 'video')),
  media_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Lectura pública (el sitio es un portafolio público, sin login)
alter table projects enable row level security;

create policy "Lectura pública de proyectos"
  on projects for select
  using (true);

-- Solo el rol autenticado (tú, desde el dashboard o una app admin)
-- puede insertar/editar/borrar. Ajusta esta política si luego
-- construyes un panel de administración con login.
create policy "Escritura solo autenticada"
  on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- Storage buckets
-- Crea estos buckets desde Supabase Dashboard > Storage > New bucket
-- (o descomenta y corre lo siguiente si tienes permisos de owner):
-- ============================================================

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('brand-logos', 'brand-logos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('profile', 'profile', true)
on conflict (id) do nothing;

-- Lectura pública de los tres buckets
create policy "Lectura pública project-media"
  on storage.objects for select
  using (bucket_id = 'project-media');

create policy "Lectura pública brand-logos"
  on storage.objects for select
  using (bucket_id = 'brand-logos');

create policy "Lectura pública profile"
  on storage.objects for select
  using (bucket_id = 'profile');

-- ============================================================
-- Ejemplo de cómo insertar una pieza después de subir el archivo
-- a Storage (reemplaza la URL por la que te da Supabase):
-- ============================================================
-- insert into projects (brand_slug, brand_name, title, media_type, media_url, sort_order)
-- values (
--   'aura-vibes',
--   'Aura Vibes',
--   'Editorial de producto',
--   'image',
--   'https://TU-PROYECTO.supabase.co/storage/v1/object/public/project-media/aura-vibes-01.jpg',
--   1
-- );
