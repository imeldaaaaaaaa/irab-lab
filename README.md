# Bedah I‘rab — prototipe v0.3

Website latihan Nahwu interaktif dengan jalur belajar berurutan, 10 soal pada setiap submateri, syarat nilai minimal 80% untuk membuka materi berikutnya, dan tanpa contoh ayat Al-Qur’an pada bank latihan.

## Jalankan lokal

Persyaratan: Node.js LTS.

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Untuk tes produksi: `npm run build`.

## Perubahan v0.3

- Jalur belajar memuat 22 submateri × 10 soal = 220 slot soal.
- Soal dikerjakan berurutan. Setiap soal harus diperiksa sebelum lanjut; nilai tiap materi dihitung dari 10 soal.
- Minimal 8/10 soal harus benar untuk membuka submateri berikutnya.
- Contoh ayat Al-Qur’an dihapus dari bank latihan.
- Formulir publik tidak menyediakan pilihan role. Jika Supabase dikonfigurasi, pendaftaran memakai Supabase Auth dan akun baru otomatis menjadi siswa.
- Ditambahkan route server untuk membuat undangan (khusus admin) dan menukarkan kode undangan untuk role guru/admin.
- Ditambahkan rancangan skema Supabase untuk profil, kurikulum, soal, kelas, percobaan, progres, dan undangan role.

**Catatan kualitas bank soal:** 220 slot soal dibangun dari bank kalimat dan analisis yang tersedia sebagai kerangka prototipe. Sebagian submateri lanjutan masih memakai contoh dasar yang dipetakan sebagai latihan awal; sebelum digunakan sebagai penilaian formal, setiap soal harus ditulis/ditinjau khusus untuk indikator submaterinya oleh pengajar Nahwu. Jangan menganggap semua 220 slot sudah merupakan bank soal final yang telah diverifikasi.

## Penyimpanan saat ini

Jika variabel Supabase belum diisi, login berjalan dalam **mode demo lokal**. Jika `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` diisi, halaman login menggunakan Supabase Auth. Namun, progres latihan pada versi ini masih disimpan di `localStorage`, belum ditulis ke tabel `attempts`/`lesson_progress`. Progres belum tersinkron antarperangkat. Jangan gunakan untuk penilaian siswa sungguhan sebelum penyimpanan progres dan validasi nilai server-side diintegrasikan.

## Rancangan Supabase untuk produksi

File `supabase/schema.sql` menyediakan rancangan PostgreSQL dan Row Level Security (RLS). Sebelum dipakai, jalankan pada proyek Supabase pengembangan, tinjau seluruh policy, lalu uji dengan akun berbeda untuk tiap role.

1. Buat proyek di Supabase.
2. Jalankan `supabase/schema.sql` melalui SQL Editor setelah direview.
3. Konfigurasikan Supabase Auth (verifikasi email, reset password, dan batasan redirect URL).
4. Salin `.env.example` menjadi `.env.local`, lalu isi URL dan anon key dari proyek Supabase. `SUPABASE_SERVICE_ROLE_KEY` hanya untuk route server tepercaya, tidak boleh memakai awalan `NEXT_PUBLIC_`, masuk ke Git, atau dikirim ke browser.
5. Buat akun pemilik/admin pertama secara manual: daftar dengan email pribadimu melalui Supabase Auth, lalu di SQL Editor jalankan `update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'EMAIL_ADMIN_KAMU');`. Jalankan hanya untuk email admin awal yang kamu kendalikan. Akun publik lain tetap otomatis menjadi `student`.
6. Uji alur signup/sign-in Supabase Auth. Trigger profil di SQL otomatis membuat akun baru dengan role `student`.
7. Endpoint `POST /api/admin/invitations` menerima sesi admin dan membuat kode undangan sekali pakai. Kirimkan kode secara aman kepada email yang diundang; pengiriman email otomatis belum ditambahkan.
8. Pengguna masuk dengan email yang diundang, lalu menukarkan kode melalui formulir login. Endpoint `POST /api/invitations/redeem` memverifikasi sesi, email, kedaluwarsa, dan penggunaan kode sebelum menetapkan role.
9. Implementasikan penyimpanan percobaan/progres melalui route server/RPC yang memvalidasi kunci jawaban dan menghitung nilai di server. Jangan menerima skor dari browser sebagai sumber kebenaran.
10. Uji RLS: siswa hanya melihat progres sendiri; guru hanya melihat siswa pada kelas yang ditugaskan; admin mengelola konten dan akun. Jangan membuka akses tabel hanya karena UI menyembunyikan tombol.

**Penting:** Supabase Auth dan endpoint undangan baru aktif setelah variabel environment diisi dan skema SQL diterapkan. Progres latihan tetap lokal pada versi ini; jangan publikasikan sebagai platform produksi sampai penulisan progres, validasi nilai server-side, email verifikasi, dan uji RLS selesai.

## Deploy

1. Push folder proyek ke repository GitHub.
2. Import repository pada Vercel.
3. Pastikan framework Next.js dan build command `npm run build`.
4. Setelah integrasi Supabase dibuat, tambahkan environment variables di pengaturan Vercel.
5. Periksa log build dan uji akses siswa/guru/admin sebelum berbagi website.
