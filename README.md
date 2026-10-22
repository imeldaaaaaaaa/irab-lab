# Bedah I‘rab — prototipe v0.2

Website latihan Nahwu interaktif: 20 kalimat contoh, pilihan sumber (umum, teks klasik, Al-Qur’an), materi berkelompok, analisis kata, dan alur peran siswa/guru/admin dalam **mode demo lokal**.

## Jalankan lokal

Persyaratan: Node.js LTS.

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Untuk tes produksi: `npm run build`.

## Fitur saat ini

- Bank latihan awal mencakup mubtada’-khabar, fā‘il-maf‘ūl bih, na‘t-man‘ūt, iḍāfah, jar-majrūr, inna, kāna, fi‘il muḍāri‘ manṣūb/majzūm, ḥāl, ẓarf, ‘aṭaf, badal, dan beberapa potongan ayat.
- Pengunjung dapat berlatih tanpa login; progres tidak ditampilkan sebagai riwayat akun.
- Mode siswa demo menyimpan progres pada `localStorage` browser tersebut.
- Mode guru/admin demo menampilkan alur dashboard dasar.

## PENTING: autentikasi masih demo

Login saat ini hanya simulasi frontend. Pilihan role tidak diverifikasi oleh server, data guru dibaca dari browser yang sama, dan `localStorage` tidak menyinkronkan data antarperangkat. Jangan gunakan untuk siswa sungguhan atau menyimpan data pribadi. Role demo **bukan kontrol akses keamanan**.

Untuk produksi, pasang autentikasi dan database (misalnya Supabase Auth + PostgreSQL), lalu lakukan role-check dan Row Level Security di server/database. Jangan percaya role yang berasal dari browser. Guru harus hanya dapat melihat siswa dalam kelas yang ditugaskan; admin perlu izin eksplisit. `supabase/schema.sql` berisi skema awal yang perlu direview sebelum dipakai.

## Menambah latihan

Edit `data/exercises.ts`. Setiap latihan menyimpan sumber, judul, kalimat, topik, terjemahan, konteks, daftar kata, kunci analisis, penjelasan, dan rumusan i‘rab. Periksa kaidah dan semua alternatif analisis dengan guru/rujukan Nahwu sebelum publikasi, khususnya materi Al-Qur’an.

## Deploy ke GitHub dan Vercel

1. Buat repository GitHub dan push seluruh isi folder ini.
2. Import repository pada https://vercel.com/new.
3. Framework preset Next.js; build command `npm run build`.
4. Deploy dan periksa log build.

Untuk memperbarui: `git add .`, `git commit -m "Update Bedah I'rab"`, lalu `git push`.

## Langkah berikutnya untuk produksi

1. Konfigurasi Supabase Auth dan halaman login/daftar sungguhan.
2. Tambahkan tabel profil, kelas, keanggotaan, percobaan, dan progres.
3. Aktifkan RLS dan uji tiap role dengan akun berbeda.
4. Buat CRUD bank soal untuk admin dan manajemen kelas untuk guru.
5. Tambahkan validasi materi dan tes otomatis untuk jawaban i‘rab.
