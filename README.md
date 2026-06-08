# 💰 Quản Lý Thu Chi Cá Nhân

Ứng dụng web (PWA) theo dõi thu chi cá nhân: ngân sách, biểu đồ xu hướng, giao dịch định kỳ, gợi ý thông minh, giao diện sáng/tối, **đồng bộ đám mây** qua Supabase và cài được như app trên điện thoại.

---

## ✨ Tính năng
- Ghi thu/chi theo danh mục (có sẵn + tự thêm), ghi chú, ngày
- Tổng quan: số dư, tổng thu, tổng chi
- 💡 Gợi ý thu chi thông minh (tỷ lệ tiết kiệm, dự báo, so sánh tháng…)
- 📊 Biểu đồ xu hướng 6 tháng + 🍩 biểu đồ tròn theo danh mục
- 📅 Ngân sách tổng & theo danh mục, cảnh báo khi vượt
- 🔁 Giao dịch định kỳ (tự động tạo mỗi tháng)
- 🌙 Sáng/tối, 📱 tối ưu điện thoại, cài như app (PWA)
- ☁️ Đồng bộ đám mây giữa các thiết bị (Supabase) + chạy offline khi mất mạng
- ⬇️⬆️ Xuất/nhập dữ liệu JSON để sao lưu

---

## 🚀 Hướng dẫn nhanh (3 phần)

### Phần 1 — Thiết lập Supabase (lưu online)

1. Tạo tài khoản miễn phí tại **https://supabase.com** → **New project**
   - Đặt tên, chọn region gần (Singapore), đặt **Database Password** (lưu lại).
2. Mở **SQL Editor** → **New query** → dán toàn bộ nội dung file
   [`supabase-schema.sql`](./supabase-schema.sql) → bấm **Run**.
3. Vào **Project Settings → API**, sao chép 2 giá trị:
   - **Project URL** (dạng `https://xxxx.supabase.co`)
   - **anon public** key (chuỗi dài bắt đầu `eyJ...`)
4. Mở file [`config.js`](./config.js) và dán vào:
   ```js
   window.SUPA_URL = "https://xxxx.supabase.co";
   window.SUPA_KEY = "eyJhbGciOi...";   // anon public key
   ```
5. (Khuyến nghị) Để đăng nhập **không cần xác nhận email**:
   **Authentication → Sign In / Providers → Email** → tắt **Confirm email** → Save.

> 🔒 anon key an toàn để công khai trên GitHub vì dữ liệu đã được bảo vệ bởi
> Row Level Security (mỗi người chỉ thấy dữ liệu của mình).

### Phần 2 — Đưa lên GitHub

```bash
# (đã được khởi tạo sẵn git + commit đầu tiên)
# Tạo 1 repo TRỐNG trên https://github.com/new  (đừng thêm README)
git remote add origin https://github.com/nguyencongtuyenlp/thu-chi.git
git branch -M main
git push -u origin main
```
Lần đầu push, Windows sẽ mở trình duyệt để đăng nhập GitHub — bấm cho phép là xong.

### Phần 3 — Deploy lên Vercel (không cần cài gì)

1. Đăng nhập **https://vercel.com** bằng tài khoản GitHub.
2. **Add New… → Project → Import** repo `thu-chi-app`.
3. **Framework Preset: Other**, các mục Build/Output để trống → **Deploy**.
4. Sau ~30 giây có link dạng `https://thu-chi-app.vercel.app` → mở trên điện thoại.

📱 **Cài như app:** mở link trên điện thoại → menu trình duyệt → **Thêm vào màn hình chính**.

---

## 🖥️ Chạy thử trên máy
Mở thẳng `index.html` bằng trình duyệt là dùng được ngay.
- Nếu chưa điền `config.js`: app chạy **offline**, lưu trên trình duyệt.
- Đã điền `config.js`: bấm **Đăng ký** tạo tài khoản, rồi dùng đồng bộ.

> Tính năng PWA (cài app, offline cache) chỉ hoạt động khi mở qua **https** (tức là sau khi deploy Vercel), không hoạt động khi mở bằng `file://`.

---

## 🔁 Cập nhật sau này
Sửa code rồi:
```bash
git add -A
git commit -m "Cập nhật"
git push
```
Vercel tự động deploy lại sau mỗi lần push.

## 🗂️ Cấu trúc
```
index.html             App (giao diện + logic)
config.js              Khoá Supabase (bạn điền)
manifest.webmanifest   Cấu hình PWA
sw.js                  Service worker (offline)
icon.svg               Biểu tượng app
supabase-schema.sql    SQL tạo bảng + bảo mật
vercel.json            Cấu hình Vercel
```
