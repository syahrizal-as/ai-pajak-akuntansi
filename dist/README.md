# AI untuk Konsultan Pajak & Akuntansi

Portal HTML/CSS/JavaScript statis di folder pajak untuk sesi pengenalan dan demo AI sekitar 1 jam, dengan materi pendamping untuk belajar mandiri. Tanpa backend, autentikasi aplikasi, framework baru, font eksternal, atau panggilan API AI. Seluruh materi substantif tersedia lokal.

## Jalankan

Buka index.html langsung pada browser. Pertahankan struktur folder assets dan data. Alternatif server lokal dari folder pajak:

```sh
npm run preview
```

Lalu buka http://127.0.0.1:4173/. Tautan sumber resmi dan layanan AI eksternal memerlukan internet. Praktik bisa dikerjakan manual dengan format yang sama.

## Build dan pemeriksaan

Node >=20 serta utilitas zip diperlukan; tidak ada instalasi dependency untuk build.

```sh
npm test
# atau hanya menghasilkan paket:
npm run build
```

npm test menjalankan build terlebih dahulu. Build menulis ulang CSV dari assets/datasets.js, membuat paket bahan, menyalin allowlist ke dist, dan membuat portal-offline.zip. Perintah zip memakai nama berkas literal, tanpa kredensial. Dist dan ZIP portal adalah hasil build, bukan sumber yang perlu diedit. CSV dan paket latihan di data diregenerasi dari sumber yang dilacak.

Browser suite memerlukan Playwright. Gunakan dependency Playwright yang sudah terpasang pada ../kelas/node_modules; alternatif set PLAYWRIGHT_MODULE ke lokasi modul Playwright yang terpasang. Browser Chromium yang sesuai harus sudah tersedia; test tidak mengunduh atau melewati browser secara diam-diam.

## Fitur

- Sembilan modul dengan tujuan, durasi, kompetensi, konsep, penerapan, kasus, prompt, hasil, kesalahan, keamanan, latihan, kuis, ringkasan, dan checklist kompetensi. Bagian langkah praktik tidak ditampilkan.
- Navigasi hash, daftar isi, breadcrumb, pencarian isi materi, glosarium, dan sumber resmi.
- 27 soal formatif dengan pembahasan dan kesempatan mencoba ulang.
- Salin prompt dengan fallback manual; tidak ada model AI yang dijalankan portal.
- Penanda selesai mandiri, checklist kompetensi, tema, dan rubrik penilaian diri.
- Enam dataset CSV, contoh jurnal, lembar kerja, invoice/kuitansi HTML dummy dan salinan ambigu, serta ZIP bahan.
- Handout semua modul dan mode cetak A4 dengan pembahasan kuis.
- Ekspor catatan progres JSON. Tidak ada fitur impor atau pengiriman tugas.

## Penyimpanan

Progres, jawaban terakhir, checklist, tema, dan penilaian diri tersimpan pada localStorage dengan kunci ai-praktika-pajak-v1. Tidak ada sinkronisasi antarperangkat atau browser. Mode privat, penghapusan data, perpindahan folder file lokal, serta perubahan origin bisa memisahkan atau menghilangkan progres. Jika penyimpanan diblokir, fitur bekerja dalam memori selama sesi dan status keterbatasan ditampilkan. Berkas bukti praktik disimpan sendiri oleh peserta.

## Konten dan akurasi

Studi kasus PT ASA MITRA KONSULTAN menggunakan seluruh pihak dan transaksi sintetis. Sumber dataset adalah assets/datasets.js. Periode September 2026, pembanding laba rugi Agustus. Kolom kosong tidak berarti nol. Pajak, penyusutan, dan umur piutang belum dimodelkan. Contoh jurnal menggunakan asumsi persediaan perpetual dan kapitalisasi T12 yang harus ditinjau.

Kontrol kasus: T07 adalah impor ulang T06; BK10 Rp50 ribu belum ada di buku mentah. Bank buku Rp54,25 juta + koreksi duplikat Rp750 ribu − biaya bank Rp50 ribu = Rp54,95 juta. Debit dan kredit jurnal masing-masing Rp100,45 juta; hasil sebelum penyusutan dan pajak Rp4,55 juta. Aset Rp94,55 juta = utang Rp10 juta + ekuitas Rp84,55 juta.

Halaman utama DJP, JDIH Kemenkeu, portal fiskal Kemenkeu (kini DJSEF), dan IAI diperiksa pada 19 Oktober 2026. Pemeriksaan bukan verifikasi seluruh peraturan. Tarif, pasal, dan tenggat tidak dibuat; instruktur memeriksa ketentuan spesifik sebelum digunakan. Materi bukan nasihat pajak individual atau klaim kepatuhan/sertifikasi.

Situs referensi https://materi-ai.netlify.app/ dipelajari melalui browser pada sesi implementasi, sesudah akses melalui alat web tidak berhasil. Pola yang digunakan: pembelajaran bertahap, satu kasus lintas modul, blok prompt, latihan, verifikasi hasil, tema, dan progres. Salinan index.html lokal juga diperiksa. Struktur internal website live tidak diasumsikan.

## Lokasi sumber

- index.html: kerangka dan navigasi.
- assets/content.js: materi 9 modul, kuis, glosarium.
- assets/datasets.js: data simulasi tunggal.
- assets/app.js: komponen tampilan, routing, interaksi, penyimpanan.
- assets/style.css: desain responsif, terang/gelap, dan cetak.
- data/: bahan lokal yang dapat dilihat dan diunduh.
- scripts/build.mjs: generator CSV, paket, dan hasil build.
- tests/: pemeriksaan konten, hitungan independen, dan browser.

Konfigurasi Netlify root tetap mengarah ke portal kelas. Folder pajak memiliki konfigurasi deploy mandiri bila kelak dipilih sebagai base. Tidak ada perubahan ke portal lama atau deployment yang dijalankan oleh build.

## Pembaruan desain — 6 November 2026

Tampilan diselaraskan dengan referensi ai-dispora.netlify.app: beranda editorial penuh, warna hijau tua dan putih hangat, tipografi serta jarak lebih lega, ilustrasi alur dokumen, dan kartu kurikulum. Navigasi sidebar tetap tersedia pada halaman materi. Nama studi kasus diselaraskan menjadi PT ASA MITRA KONSULTAN pada materi, prompt, sampel dokumen, dan paket latihan; seluruh angka tetap simulasi.

Blok statistik beranda dihapus. Panduan acara memakai alur demo sekitar 60 menit; durasi tiap modul tetap merupakan estimasi belajar mandiri.
