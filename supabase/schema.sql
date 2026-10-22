-- Skema awal (review sebelum produksi). Auth identity dikelola Supabase Auth.
create type public.app_role as enum ('student','teacher','admin');
create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, full_name text not null, role public.app_role not null default 'student', created_at timestamptz not null default now());
create table public.classes (id uuid primary key default gen_random_uuid(), name text not null, teacher_id uuid not null references public.profiles(id), created_at timestamptz not null default now());
create table public.class_members (class_id uuid references public.classes(id) on delete cascade, student_id uuid references public.profiles(id) on delete cascade, joined_at timestamptz not null default now(), primary key(class_id,student_id));
create table public.exercises (id uuid primary key default gen_random_uuid(), title text not null, source text not null check (source in ('Umum','Teks klasik','Al-Qur'an')), topic text not null, payload jsonb not null, published boolean not null default false, created_by uuid references public.profiles(id), created_at timestamptz not null default now());
create table public.attempts (id uuid primary key default gen_random_uuid(), student_id uuid not null references public.profiles(id) on delete cascade, exercise_id uuid references public.exercises(id) on delete set null, answers jsonb not null default '{}'::jsonb, correct_count integer not null default 0, total_count integer not null default 0, completed_at timestamptz not null default now());

alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
alter table public.exercises enable row level security;
alter table public.attempts enable row level security;
-- RLS policies must be added and tested before production. Do not deploy this schema as-is with broad access.
-- Recommended: a security-definer helper to read a user's role, then policies for self-profile,
-- teacher's assigned classes, published exercises, student's own attempts, and admin-only content CRUD.
