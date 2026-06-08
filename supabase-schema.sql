-- ============================================================
--  THIẾT LẬP CƠ SỞ DỮ LIỆU SUPABASE cho app Quản Lý Thu Chi
--  Cách dùng: Supabase Dashboard -> SQL Editor -> New query
--             -> dán toàn bộ file này -> bấm RUN.
-- ============================================================

-- Bảng lưu toàn bộ dữ liệu của mỗi người dùng dưới dạng JSON.
create table if not exists public.user_data (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Bật Row Level Security: mỗi người chỉ thấy & sửa dữ liệu của chính mình.
alter table public.user_data enable row level security;

drop policy if exists "own_select" on public.user_data;
create policy "own_select" on public.user_data
  for select using (auth.uid() = user_id);

drop policy if exists "own_insert" on public.user_data;
create policy "own_insert" on public.user_data
  for insert with check (auth.uid() = user_id);

drop policy if exists "own_update" on public.user_data;
create policy "own_update" on public.user_data
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own_delete" on public.user_data;
create policy "own_delete" on public.user_data
  for delete using (auth.uid() = user_id);
