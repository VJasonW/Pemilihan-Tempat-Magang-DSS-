# TEMPLATE STRUKTUR LAPORAN TUGAS KELOMPOK — DSS AHP + TOPSIS (MULTI-CRITERIA DECISION MAKING)

> **Cara pakai file ini:** File ini adalah *context template* untuk AI/LLM. Diberikan sebuah project/topik baru yang menggunakan **AHP (Analytical Hierarchy Process)** untuk pembobotan kriteria dan **TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)** untuk perankingan alternatif, gunakan struktur, gaya bahasa, dan pola penjelasan di bawah ini untuk menghasilkan laporan baru dengan format yang sama persis, tetapi isi (studi kasus, kriteria, data, kode) disesuaikan dengan project baru tersebut. Semua bagian bertanda `[ISI: ...]` wajib diganti sesuai topik baru. Bagian bertanda `[POLA: ...]` menjelaskan pola kalimat/struktur yang harus dipertahankan.

---

## METADATA DOKUMEN

- **Jenis dokumen**: Laporan Tugas Kelompok Lengkap (akademis, mata kuliah *Decision Support System* / sejenis)
- **Kategori**: `Kombinasi - AHP-TOPSIS (Multi-Criteria Decision Making)`
  *(AHP dan TOPSIS adalah dua metode yang saling melengkapi, bukan satu metode tunggal: AHP menghasilkan **bobot kriteria**, TOPSIS memakai bobot itu untuk **merangking alternatif** — jadi tetap ditulis sebagai "Kombinasi", bukan "Single Method".)*
- **Bahasa**: Bahasa Indonesia formal-akademis (istilah teknis bahasa Inggris/matematis dipertahankan apa adanya, mis. *pairwise comparison*, *consistency ratio*, *ideal solution*, *normalized matrix*)
- **Struktur institusi**: Universitas, logo, mata kuliah, semester, daftar kelompok dengan NIM
- **Panjang**: ±13 halaman, 6 BAB + Daftar Pustaka

---

## GAYA BAHASA & PENULISAN (WAJIB DIPERTAHANKAN)

1. **Formal akademis**, kalimat panjang-majemuk, banyak anak kalimat penjelas ("...yang mana...", "...sehingga...", "...guna...").
2. Setiap istilah teknis baru diperkenalkan dengan pola: **Istilah (bahasa Indonesia jika ada) adalah/merupakan definisi singkat**, lalu dijelaskan lebih lanjut.
3. Rumus/formula matematis ditulis inline apa adanya, lalu setiap variabel/simbol dijelaskan satu per satu setelahnya. Untuk AHP-TOPSIS, rumus wajib yang harus muncul minimal:
   - Normalisasi matriks keputusan TOPSIS: `r_ij = x_ij / sqrt(Σ x_ij²)`
   - Matriks ternormalisasi terbobot: `v_ij = w_j × r_ij`
   - Jarak ke solusi ideal positif/negatif: `D+_i = sqrt(Σ(v_ij - v_j+)²)`, `D-_i = sqrt(Σ(v_ij - v_j-)²)`
   - Nilai preferensi/kedekatan relatif: `C_i = D-_i / (D+_i + D-_i)`
   - Consistency Ratio AHP: `CR = CI / RI`, dengan `CI = (λmax - n) / (n - 1)`
4. Poin kelebihan/kekurangan ditulis sebagai **bullet dengan penjelasan naratif 2-4 kalimat per poin**, bukan poin singkat satu baris. Selalu diberi contoh konkret ("Misalnya...", "Contohnya...").
5. Studi kasus ditulis naratif prosa, bukan poin-poin — menjelaskan alur end-to-end (input kriteria & alternatif → pembobotan AHP → perankingan TOPSIS → output rekomendasi).
6. Ada bagian "Tantangan Implementasi di Indonesia" — localisasi konteks ke kondisi nyata Indonesia (data yang tidak lengkap/tidak terstandar, subjektivitas penilaian pakar lokal, dsb).
7. Daftar pustaka wajib memuat **2 paper primer/rujukan wajib penemuan metode utama** — satu untuk AHP (Thomas L. Saaty) dan satu untuk TOPSIS (Hwang & Yoon), ditambah 3 paper pendukung relevan (IEEE/jurnal) terkait domain aplikasi project, format IEEE citation style, bernomor 1-5.

---

## STRUKTUR DOKUMEN LENGKAP

### HALAMAN JUDUL
```
LAPORAN TUGAS KELOMPOK LENGKAP
(Kategori: Kombinasi - AHP-TOPSIS)

[ISI: JUDUL LAPORAN — format: PENERAPAN METODE AHP-TOPSIS PADA/UNTUK [TUJUAN/DOMAIN APLIKASI, mis. "SISTEM PENDUKUNG KEPUTUSAN PEMILIHAN ..."]]

[Logo Universitas]

Mata Kuliah: [ISI]
Semester: [ISI]

Kelompok:
[Nama 1]    [NIM 1]
[Nama 2]    [NIM 2]
[Nama 3]    [NIM 3]

[UNIVERSITAS]
[KOTA]
[TAHUN]
```

### DAFTAR ISI
List semua BAB dan sub-bab dengan nomor halaman.

---

### BAB I — PENDAHULUAN
- **1.1 Latar Belakang**
  [POLA: Mulai dari permasalahan nyata di domain yang dipilih (biasanya: banyak alternatif pilihan, banyak kriteria yang saling bertentangan, keputusan sering diambil subjektif/tidak konsisten) → jelaskan mengapa dibutuhkan Sistem Pendukung Keputusan (Decision Support System/DSS) berbasis Multi-Criteria Decision Making (MCDM) → perkenalkan AHP sebagai metode pembobotan kriteria berbasis perbandingan berpasangan (pairwise comparison) yang mampu mengukur konsistensi penilaian pakar → perkenalkan TOPSIS sebagai metode perankingan alternatif berdasarkan kedekatan terhadap solusi ideal positif dan jarak terhadap solusi ideal negatif → tutup dengan penjelasan bagaimana kombinasi AHP (untuk menentukan bobot tiap kriteria secara objektif-terstruktur) dan TOPSIS (untuk merangking alternatif menggunakan bobot tersebut) saling melengkapi dalam menjawab masalah di project ini.]
  [ISI: latar belakang spesifik project baru]

- **1.2 Rumusan Masalah**
  [POLA: 3 poin bernomor, masing-masing berupa pertanyaan "Bagaimana menerapkan/mengimplementasikan/mengintegrasikan...". Pola standar untuk AHP-TOPSIS:
  1. Bagaimana menerapkan metode AHP untuk menentukan bobot kriteria [ISI: sebutkan kriteria project] secara konsisten (*consistent*) berdasarkan penilaian pakar/pengguna?
  2. Bagaimana mengimplementasikan metode TOPSIS untuk merangking alternatif [ISI: sebutkan alternatif project] berdasarkan bobot kriteria yang dihasilkan AHP?
  3. Bagaimana mengintegrasikan kedua metode tersebut ke dalam [ISI: bentuk sistem/aplikasi/antarmuka] yang dapat digunakan oleh pengguna akhir?]
  [ISI: 3 rumusan masalah project baru]

- **1.3 Tujuan**
  [POLA: 3 poin bernomor, sejajar 1:1 dengan rumusan masalah, menggunakan kata kerja "Menjelaskan dan mengimplementasikan/Menerapkan/Membangun".]
  [ISI: 3 tujuan project baru]

- **1.4 Ruang Lingkup**
  [POLA: Sebutkan nama sistem yang dibangun (mis. "Decision Support System (DSS) berbasis Multi-Criteria Decision Making"), jelaskan pembagian dua fase: (1) pembobotan kriteria menggunakan AHP melalui matriks perbandingan berpasangan, (2) perankingan alternatif menggunakan TOPSIS. Sebutkan batasan jumlah kriteria dan alternatif, serta tools/bahasa pemrograman yang digunakan.]
  [ISI: ruang lingkup project baru]

---

### BAB II — KONSEP DASAR AHP-TOPSIS
- **2.1 Definisi dan Konsep Dasar Multi-Criteria Decision Making (MCDM)**
  [POLA: Definisi umum MCDM sebagai kerangka pengambilan keputusan yang melibatkan banyak kriteria yang seringkali saling bertentangan (*conflicting*) → jelaskan posisi AHP dan TOPSIS sebagai dua metode MCDM yang saling melengkapi: AHP di tahap pembobotan (*weighting*), TOPSIS di tahap perankingan (*ranking*).]

- **2.2 Analytical Hierarchy Process (AHP)**
  [POLA: Definisi AHP sebagai metode pengambilan keputusan yang menyusun masalah kompleks ke dalam struktur hierarki (tujuan → kriteria → alternatif) dan menentukan bobot prioritas melalui perbandingan berpasangan (*pairwise comparison*) menggunakan skala Saaty (1-9). Jelaskan tahapan AHP:
  1. Menyusun struktur hierarki
  2. Membentuk matriks perbandingan berpasangan antar kriteria
  3. Menghitung bobot prioritas (*eigenvector*) dari matriks tersebut
  4. Menghitung Consistency Ratio (CR) untuk memvalidasi konsistensi penilaian — `CR = CI / RI`, dengan CI = *Consistency Index* dan RI = *Random Index* (nilai tabel standar Saaty). CR ≤ 0.1 dianggap konsisten.]

- **2.3 Technique for Order Preference by Similarity to Ideal Solution (TOPSIS)**
  [POLA: Definisi TOPSIS sebagai metode perankingan alternatif berdasarkan prinsip bahwa alternatif terbaik adalah yang memiliki jarak terpendek dari solusi ideal positif (*positive ideal solution*) dan jarak terjauh dari solusi ideal negatif (*negative ideal solution*). Jelaskan tahapan TOPSIS:
  1. Normalisasi matriks keputusan
  2. Pembobotan matriks ternormalisasi menggunakan bobot AHP
  3. Menentukan solusi ideal positif dan negatif
  4. Menghitung jarak tiap alternatif ke solusi ideal positif/negatif
  5. Menghitung nilai preferensi (kedekatan relatif) dan mengurutkan alternatif]

- **2.4 Skala Perbandingan Saaty**
  [POLA: Jelaskan tabel skala 1-9 Saaty (1 = sama penting, 9 = mutlak lebih penting) yang dipakai mengisi matriks perbandingan berpasangan AHP, sertakan tabel skala.]

- **2.5 Contoh Sederhana: [ISI: judul studi mini sesuai domain project, mis. "Pemilihan ... Terbaik Menggunakan AHP-TOPSIS"]**
  Format: **Input** (poin — daftar kriteria, daftar alternatif, matriks perbandingan berpasangan), **Output** (poin — ranking alternatif beserta skor preferensi), lalu **cuplikan kode program Python** yang mengimplementasikan AHP (hitung bobot + CR) dan TOPSIS (normalisasi → perankingan) secara minimal-working-example menggunakan `numpy`. Sertakan komentar kode dalam Bahasa Indonesia. Tutup dengan eksekusi contoh + print hasil ranking.

---

### BAB III — ANALISIS MENDALAM
- **3.1 Kelebihan**
  [POLA: 3 bullet, tiap bullet 2-4 kalimat naratif dengan contoh konkret dari project. Fokus:
  (a) AHP mampu mengukur dan memvalidasi konsistensi logis penilaian subjektif pakar (via CR), sehingga bobot kriteria yang dihasilkan lebih dapat dipertanggungjawabkan dibanding pembobotan manual/tebakan;
  (b) TOPSIS memberikan perankingan yang matematis-objektif berdasarkan jarak geometris ke solusi ideal, sehingga hasil mudah diinterpretasi dan dibandingkan antar alternatif;
  (c) Kombinasi AHP-TOPSIS ramah pengguna karena dapat menjelaskan *mengapa* satu alternatif lebih unggul (kontribusi tiap kriteria berbobot) sekaligus memberikan skor akhir yang jelas.]

- **3.2 Kekurangan**
  [POLA: 3 bullet naratif. Fokus:
  (a) Jumlah kriteria yang terlalu banyak membuat matriks perbandingan berpasangan AHP sulit diisi konsisten oleh pengambil keputusan (risiko CR > 0.1 sehingga penilaian harus diulang);
  (b) TOPSIS sensitif terhadap perubahan skala/normalisasi data, sehingga kriteria dengan rentang nilai besar bisa mendominasi hasil jika normalisasi tidak tepat;
  (c) Subjektivitas tetap ada di tahap awal AHP (penentuan nilai perbandingan berpasangan bergantung persepsi pakar), sehingga hasil akhir tetap bisa bias jika input dari pakar kurang representatif.]

  **Tabel Perbandingan** — AHP-TOPSIS vs Metode MCDM Lain (mis. SAW/Simple Additive Weighting)

  | Aspek | AHP-TOPSIS | SAW (Simple Additive Weighting) |
  |---|---|---|
  | Sifat Pembobotan | Terstruktur, teruji konsistensi (CR) | Ditentukan langsung/manual |
  | Dasar Perankingan | Jarak ke solusi ideal (geometris) | Penjumlahan bobot linear |
  | Beban Komputasi | Sedang (perlu hitung eigenvector & jarak) | Ringan |
  | Validasi Konsistensi | Ada (Consistency Ratio) | Tidak ada |

  *(Jika project baru ingin dibandingkan dengan metode lain seperti WP/Weighted Product atau ELECTRE, ganti kolom kedua sesuai kebutuhan.)*

- **3.3 Tools dan Teknologi**
  [POLA: List by bahasa pemrograman/platform, tiap tools disebut nama library + fungsi singkat dalam kurung.]
  - Python Libraries: `numpy` (operasi matriks & perhitungan eigenvector), `pandas` (pengolahan data kriteria-alternatif) `[ISI: tambahkan sesuai project]`
  - `[ISI: tools lain, mis. Excel untuk perhitungan manual/cross-check, atau bahasa pemrograman lain]`
  - Lainnya (platform/UI): `[ISI]`

---

### BAB IV — APLIKASI DAN STUDI KASUS
- **4.1 Aplikasi Umum**
  [POLA: 4-5 bullet singkat, list domain nyata di mana AHP-TOPSIS umum dipakai — mis. pemilihan supplier/vendor terbaik, seleksi karyawan/beasiswa, pemilihan lokasi usaha, penentuan prioritas proyek, evaluasi kelayakan investasi — tiap bullet 1 kalimat.]

- **4.2 Studi Kasus 1: [ISI: contoh domain LAIN yang berbeda dari project utama, sbg pembanding, mis. "Seleksi Penerima Beasiswa"]**
  [POLA: 1 paragraf naratif end-to-end: kriteria apa saja yang dibobotkan pakar via AHP → bagaimana TOPSIS merangking kandidat/alternatif menggunakan bobot tersebut → hasil/manfaat akhir bagi pengambil keputusan.]

- **4.3 Studi Kasus 2: [ISI: nama project utama laporan ini]**
  [POLA: 1-2 paragraf naratif. Paragraf pertama: alur sistem end-to-end sesuai project (input kriteria & alternatif → AHP menghasilkan bobot → TOPSIS menghasilkan ranking → output rekomendasi akhir). Paragraf kedua (subjudul "Tantangan Implementasi di Indonesia"): kondisi nyata Indonesia yang membuat implementasi sulit/perlu penyesuaian (mis. data alternatif yang tidak lengkap/tidak terstandar antar sumber, subjektivitas dan ketersediaan pakar lokal untuk mengisi matriks perbandingan, perbedaan bobot antar wilayah/konteks) dan solusi (validasi ulang CR, survei ulang ke beberapa pakar, dsb).]

---

### BAB V — PERBANDINGAN DAN REKOMENDASI
- **5.1 Kapan Menggunakan Kombinasi AHP-TOPSIS?**
  [POLA: 4 bullet kondisi "Gunakan metode ini ketika..." — kapan kriteria bersifat kualitatif-subjektif dan perlu divalidasi konsistensinya (AHP), kapan jumlah alternatif banyak dan butuh perankingan objektif berbasis jarak numerik (TOPSIS), kapan dibutuhkan justifikasi/transparansi atas keputusan (bobot kriteria bisa ditunjukkan ke stakeholder), kapan kriteria dan alternatif sudah dapat didefinisikan secara terstruktur di awal.]

- **5.2 Rekomendasi**
  [POLA: 3 bullet praktis untuk implementasi — pisahkan modul perhitungan bobot AHP dari modul perankingan TOPSIS agar mudah dipelihara, selalu validasi CR sebelum bobot AHP dipakai TOPSIS agar hasil ranking tidak bias dari penilaian yang tidak konsisten, libatkan lebih dari satu pakar/responden untuk mengisi matriks perbandingan guna mengurangi subjektivitas tunggal.]

- **5.3 Potensi Pengembangan**
  [POLA: 2 bullet arah pengembangan lanjutan — biasanya (a) integrasi dengan metode Fuzzy AHP untuk menangani ketidakpastian penilaian pakar yang bersifat linguistik, (b) migrasi ke aplikasi web/mobile interaktif agar proses pengisian matriks perbandingan dan hasil ranking dapat diakses banyak pengguna secara real-time.]

---

### BAB VI — KESIMPULAN DAN SARAN
[POLA: Paragraf 1 — ringkas kembali bagaimana kombinasi AHP (pembobotan kriteria berbasis perbandingan berpasangan yang teruji konsistensinya) dan TOPSIS (perankingan alternatif berbasis jarak ke solusi ideal) menjawab rumusan masalah project. Paragraf 2 — akui keterbatasan (subjektivitas input pakar di tahap AHP, sensitivitas TOPSIS terhadap normalisasi data), tapi tegaskan kelebihan (hasil terstruktur, dapat divalidasi, dan mudah dijelaskan ke pengambil keputusan). Paragraf 3 — "Saran Penelitian Lanjutan": usulkan penambahan/penggantian komponen dengan metode lain yang lebih fleksibel (Fuzzy AHP, Fuzzy TOPSIS, atau kombinasi dengan metode MCDM lain seperti ELECTRE/PROMETHEE) untuk menangani ketidakpastian dan preferensi yang lebih bersifat gradual/linguistik.]

---

### DAFTAR PUSTAKA
[POLA: Format IEEE, bernomor 1-5. Urutan wajib:
1. Paper primer AHP — Thomas L. Saaty (penemu metode).
2. Paper primer TOPSIS — Hwang & Yoon (penemu metode).
3-5. Paper aplikasi/implementasi AHP-TOPSIS terkait domain project, prioritaskan sumber IEEE/jurnal ilmiah 2020-2024.]

```
1. T. L. Saaty, "A scaling method for priorities in hierarchical structures," Journal of Mathematical Psychology, vol. 15, no. 3, pp. 234-281, 1977. (Referensi wajib/primer untuk metode AHP).
2. C. L. Hwang and K. Yoon, "Multiple Attribute Decision Making: Methods and Applications," Lecture Notes in Economics and Mathematical Systems, Springer-Verlag, 1981. (Referensi wajib/primer untuk metode TOPSIS).
3. [ISI: paper aplikasi AHP-TOPSIS 1, sesuai domain project]
4. [ISI: paper aplikasi AHP-TOPSIS 2, sesuai domain project]
5. [ISI: paper aplikasi AHP-TOPSIS 3, sesuai domain project]
```

---

## CATATAN UNTUK AI/LLM YANG MEMAKAI TEMPLATE INI

Saat generate laporan baru dari template ini:
1. Ganti seluruh `[ISI: ...]` dengan konten sesuai project baru — jangan sisakan placeholder di output akhir.
2. Pertahankan jumlah dan urutan BAB persis seperti di atas.
3. Pertahankan rasio panjang tiap bagian (BAB I & II lebih panjang/teoretis, BAB III-V lebih ringkas/analitis, BAB VI paling singkat).
4. Kode contoh di BAB 2.5 harus benar-benar bisa dijalankan (runnable) menggunakan Python + numpy, bukan pseudocode — mencakup perhitungan bobot AHP (termasuk CR) dan perankingan TOPSIS secara lengkap.
5. Jangan gunakan framing "Expert System" / "A*" / "graf" / "pathfinding" — ganti sepenuhnya dengan framing MCDM: kriteria, alternatif, bobot, matriks keputusan, solusi ideal.
6. Selalu sesuaikan jumlah dan nama kriteria/alternatif dengan domain project baru (mis. kriteria pemilihan laptop, kriteria pemilihan lokasi, dsb) — jangan pakai contoh generik tanpa konteks.
7. Selalu localisasi minimal 1 bagian (biasanya BAB IV) ke konteks Indonesia jika relevan dengan domain project.
8. Tabel skala Saaty 1-9 di 2.4 sebaiknya ditampilkan lengkap sebagai referensi cepat pembaca laporan.
