# Hasil verifikasi — 19 Oktober 2026

Implementasi berada di pajak/. Portal lama, kelas/, dispora/, dan netlify.toml root tidak diubah.

## Perintah final

`npm test` dari folder pajak selesai dengan exit code 0, termasuk build.

```text
Build berhasil: 9 modul, 10 bahan latihan, jurnal debit/kredit Rp100.450.000.
3 content/build tests passed, 0 failed.
Browser http: 20 rute × 3 viewport + interaksi, offline, dan cetak lulus.
Browser file: 20 rute × 3 viewport + interaksi, offline, dan cetak lulus.
PASS browser: 2052 assertions.
```

## Cakupan

- 9 modul substantif, 5 konsep per modul, 27 soal formatif dengan pembahasan.
- Konsistensi saldo awal, bank, buku kas, kandidat impor ganda, jurnal debit/kredit, laba rugi sederhana, dan persamaan aset = liabilitas + ekuitas dihitung independen dari data sumber.
- CSV, dokumen dummy, lembar kerja, contoh jurnal, ZIP bahan dan ZIP portal benar-benar ada; kedua ZIP lolos pemeriksaan integritas.
- Semua 20 rute: viewport 360, 768, 1440 piksel, melalui HTTP dan file lokal; tidak ada overflow halaman atau JavaScript error.
- Jawaban salah/benar, penggantian pilihan, percobaan ulang kuis, checklist, penanda selesai dan pembatalan, reload, tema, pencarian, glosarium, rubrik, ekspor progres, reset dan batal reset.
- localStorage diblokir dan data tersimpan rusak: portal tetap dapat digunakan, batas sesi ditampilkan jika penyimpanan tidak tersedia.
- Clipboard asli dan kegagalan clipboard dengan dialog salin manual.
- Menu seluler, Escape, navigasi modul, skip link, nama aksesibel kontrol, ID unik dalam handout.
- Handout 9 modul menghasilkan PDF A4 sebanyak 65 halaman dalam pengujian. Semua halaman memiliki teks; halaman contoh awal, praktik OCR, dan pembahasan proyek ditinjau visual. Ini pemeriksaan hasil cetak, bukan file PDF distribusi terpisah.
- Tampilan desktop dan seluler ditinjau melalui screenshot browser.
- Situs referensi https://materi-ai.netlify.app/ berhasil dibaca dan ditinjau visual menggunakan Chromium lokal. Alat web sebelumnya tidak dapat mengaksesnya.

## Batas verifikasi

Uji menggunakan Chromium yang tersedia melalui Playwright lokal. Safari dan Firefox belum diuji. Pemeriksaan aksesibilitas mencakup nama kontrol, keyboard dasar, fokus, responsivitas, dan struktur; bukan audit WCAG menyeluruh.

Empat portal rujukan resmi diperiksa, tetapi ketentuan spesifik, tarif, pasal, dan tenggat untuk kasus tidak ditetapkan. Materi mengarahkan instruktur melakukan verifikasi naskah relevan. OCR dan AI tidak berjalan otomatis di portal; latihan menggunakan alat yang disetujui atau metode manual.

Tidak ada deployment, perubahan akses situs, atau modifikasi konfigurasi deploy portal lama. netlify.toml root mencatat bahwa deploy hanya setelah persetujuan manusia.
