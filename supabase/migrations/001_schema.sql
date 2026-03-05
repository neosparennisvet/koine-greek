-- ═══════════════════════════════════════════════
-- Κοινή Greek — Схема базы данных
-- Запустите в: Supabase → SQL Editor → New query
-- ═══════════════════════════════════════════════

-- Расширения
create extension if not exists "uuid-ossp";

-- ── Профили пользователей ─────────────────────
create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text not null,
  full_name   text,
  avatar_url  text,
  role        text not null default 'student' check (role in ('student','admin')),
  has_access  boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Заказы / Платежи ──────────────────────────
create table public.orders (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references public.profiles(id) on delete cascade not null,
  yookassa_id     text unique,
  amount          integer not null,
  currency        text not null default 'RUB',
  status          text not null default 'pending'
                    check (status in ('pending','succeeded','canceled','refunded')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── Прогресс по урокам ────────────────────────
create table public.lesson_progress (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.profiles(id) on delete cascade not null,
  lesson_id   text not null,
  completed   boolean not null default false,
  score       integer,
  time_spent  integer default 0,
  completed_at timestamptz,
  updated_at  timestamptz not null default now(),
  unique(user_id, lesson_id)
);

-- ── Индексы ───────────────────────────────────
create index on public.lesson_progress(user_id);
create index on public.orders(user_id);
create index on public.orders(yookassa_id);

-- ── Row Level Security ────────────────────────
alter table public.profiles        enable row level security;
alter table public.orders          enable row level security;
alter table public.lesson_progress enable row level security;

-- profiles: читать/писать только свой профиль
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- orders: только свои заказы
create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);

-- lesson_progress: только свой прогресс
create policy "Users can view own progress"
  on public.lesson_progress for select using (auth.uid() = user_id);
create policy "Users can upsert own progress"
  on public.lesson_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress"
  on public.lesson_progress for update using (auth.uid() = user_id);

-- ── Автосоздание профиля при регистрации ──────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Обновление updated_at ─────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_orders_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();
