# LAPORAN TUGAS KELOMPOK LENGKAP
(Kategori: Kombinasi - AHP-TOPSIS)

## PENERAPAN METODE AHP-TOPSIS UNTUK SISTEM PENDUKUNG KEPUTUSAN PEMILIHAN TEMPAT MAGANG MAHASISWA TEKNIK INFORMATIKA (INTERNMATCH DSS)

![Logo Universitas](https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop&q=80)

**Mata Kuliah:** Sistem Pendukung Keputusan / Expert System  
**Semester:** Genap 2025/2026  

**Kelompok:**  
1. [Nama Anggota 1]    [NIM 1]  
2. [Nama Anggota 2]    [NIM 2]  
3. [Nama Anggota 3]    [NIM 3]  

### PROGRAM STUDI TEKNIK INFORMATIKA  
### UNIVERSITAS NEGERI SEMARANG  
### SEMARANG  
### 2026  

---

## DAFTAR ISI

* **BAB I — PENDAHULUAN**
  * 1.1 Latar Belakang
  * 1.2 Rumusan Masalah
  * 1.3 Tujuan
  * 1.4 Ruang Lingkup
* **BAB II — KONSEP DASAR AHP-TOPSIS**
  * 2.1 Definisi dan Konsep Dasar Multi-Criteria Decision Making (MCDM)
  * 2.2 Analytical Hierarchy Process (AHP)
  * 2.3 Technique for Order Preference by Similarity to Ideal Solution (TOPSIS)
  * 2.4 Skala Perbandingan Saaty
  * 2.5 Contoh Sederhana Pemilihan Tempat Magang Terbaik Menggunakan AHP-TOPSIS
* **BAB III — ANALISIS MENDALAM**
  * 3.1 Kelebihan Kombinasi AHP-TOPSIS
  * 3.2 Kekurangan Kombinasi AHP-TOPSIS
  * 3.3 Tools dan Teknologi Proyek
* **BAB IV — APLIKASI DAN STUDI KASUS**
  * 4.1 Aplikasi Umum Kombinasi AHP-TOPSIS
  * 4.2 Studi Kasus Pembanding: Seleksi Penerima Beasiswa Mahasiswa Berprestasi
  * 4.3 Studi Kasus Utama: Sistem Pendukung Keputusan Pemilihan Tempat Magang (InternMatch DSS)
* **BAB V — PERBANDINGAN DAN REKOMENDASI**
  * 5.1 Kapan Menggunakan Kombinasi AHP-TOPSIS?
  * 5.2 Rekomendasi Praktis Implementasi
  * 5.3 Potensi Pengembangan Sistem
* **BAB VI — KESIMPULAN DAN SARAN**
  * 6.1 Kesimpulan
  * 6.2 Saran Penelitian Lanjutan
* **DAFTAR PUSTAKA**

---

### BAB I — PENDAHULUAN

#### 1.1 Latar Belakang
Pemilihan tempat magang merupakan salah satu fase krusial bagi mahasiswa Teknik Informatika guna mengaplikasikan teori akademis ke dalam iklim industri yang nyata. Kendati demikian, dalam praktiknya, mahasiswa kerap mengalami kesulitan dalam memilih instansi yang tepat akibat banyaknya alternatif perusahaan yang tersedia dengan karakteristik yang saling bertentangan (*conflicting criteria*). Sebagai contoh, suatu startup teknologi menawarkan fleksibilitas kerja yang tinggi (*remote work*) namun memiliki reputasi instansi yang belum mapan, sedangkan Badan Usaha Milik Negara (BUMN) menawarkan reputasi yang sangat bergengsi namun mewajibkan kehadiran fisik penuh (*work from office*) dengan fleksibilitas operasional yang minim. Pengambilan keputusan yang dilakukan secara intuitif dan tanpa metode terstruktur cenderung menghasilkan pemilihan yang bias, subjektif, dan tidak optimal, yang mana pada akhirnya dapat menghambat proses penyerapan kompetensi industri mahasiswa.

Guna mengatasi persoalan tersebut, diperlukan sebuah instrumen cerdas berupa Sistem Pendukung Keputusan (SPK) atau *Decision Support System* (DSS) berbasis *Multi-Criteria Decision Making* (MCDM). SPK ini dirancang untuk mengintegrasikan berbagai kriteria penilaian yang dinilai penting oleh mahasiswa guna menghasilkan rekomendasi keputusan yang objektif dan transparan. Dalam penelitian ini, metode kombinasi *Analytic Hierarchy Process* (AHP) dan *Technique for Order Preference by Similarity to Ideal Solution* (TOPSIS) diterapkan sebagai landasan algoritma sistem. Metode AHP digunakan pada fase awal untuk mengolah tingkat kepentingan kriteria berdasarkan urutan prioritas pengguna menjadi bobot kuantitatif yang teruji rasio konsistensinya (*consistency ratio*), yang mana metode ini menjamin konsistensi logika berpikir pengambilan keputusan. Selanjutnya, metode TOPSIS digunakan untuk mengevaluasi dan mengurutkan seluruh alternatif tempat magang berdasarkan kedekatan geometris terhadap solusi ideal positif serta jarak terjauh dari solusi ideal negatif. Penggabungan kedua metode ini menghasilkan sebuah sinergi yang komprehensif, di mana kelemahan subjektivitas pembobotan langsung dapat direduksi oleh konsistensi AHP, dan efisiensi perangkingan alternatif dalam jumlah banyak dapat diselesaikan secara matematis oleh TOPSIS.

#### 1.2 Rumusan Masalah
Berdasarkan latar belakang yang telah dipaparkan, dirumuskan masalah-masalah utama dalam penelitian ini sebagai berikut:
1. Bagaimana menerapkan metode AHP untuk menentukan bobot kriteria pemilihan tempat magang yang meliputi relevansi bidang TI, reputasi instansi, jarak dan aksesibilitas, kompensasi/uang saku, peluang rekrutmen, serta fleksibilitas operasional secara konsisten berdasarkan prioritas mahasiswa?
2. Bagaimana mengimplementasikan metode TOPSIS untuk merangking alternatif perusahaan magang berdasarkan bobot kriteria yang telah dihasilkan dari proses perhitungan AHP?
3. Bagaimana mengintegrasikan kedua metode tersebut ke dalam aplikasi web InternMatch DSS guna menyediakan antarmuka interaktif yang mudah digunakan oleh mahasiswa dan admin instansi?

#### 1.3 Tujuan
Tujuan dari pelaksanaan proyek tugas kelompok ini adalah sebagai berikut:
1. Menerapkan metode AHP guna menghitung bobot kriteria pemilihan magang secara presisi dan memvalidasi nilai rasio konsistensi (*Consistency Ratio*) agar berada di bawah ambang batas akademis ($\le 0.1$).
2. Mengimplementasikan algoritma TOPSIS untuk menghasilkan urutan rekomendasi alternatif perusahaan magang terbaik berdasarkan jarak matematis terhadap solusi ideal.
3. Membangun aplikasi web InternMatch DSS menggunakan arsitektur *Express.js* di sisi *backend*, *React.js* di sisi *frontend*, dan database *MySQL* untuk menyimpan profil perusahaan, preferensi pengguna, dan hasil perhitungan secara permanen.

#### 1.4 Ruang Lingkup
Penelitian dan implementasi proyek ini dibatasi oleh beberapa ruang lingkup berikut:
1. Sistem yang dibangun bernama InternMatch DSS, merupakan aplikasi berbasis web yang menerapkan integrasi metode MCDM berupa AHP untuk pembobotan kriteria dan TOPSIS untuk perangkingan alternatif.
2. Kriteria penilaian dibatasi pada 6 parameter utama, yaitu: Relevansi Bidang TI, Reputasi Instansi, Jarak & Aksesibilitas, Kompensasi/Uang Saku, Peluang Rekrutmen, dan Fleksibilitas Operasional.
3. Alternatif tempat magang dibatasi pada 10 data perusahaan riil di Indonesia yang mewakili berbagai sektor industri (BUMN, perbankan, e-commerce, teknologi, instansi pemerintah, dan energi) dengan karakteristik parameter yang bervariasi.
4. Antarmuka pengguna (*frontend*) dirancang menggunakan teknologi React.js dengan visualisasi animasi kartu prioritas interaktif berbasis *drag-and-drop* serta tombol kontrol arah aksesibilitas, sedangkan sisi *backend* dibangun dengan Express.js dan database MySQL.

---

### BAB II — KONSEP DASAR AHP-TOPSIS

#### 2.1 Definisi dan Konsep Dasar Multi-Criteria Decision Making (MCDM)
*Multi-Criteria Decision Making* (MCDM) atau Pengambilan Keputusan Multi-Kriteria merupakan suatu sub-disiplin riset operasi yang berfokus pada pengembangan metode matematis dan metodologis guna membantu pengambil keputusan dalam mengevaluasi beberapa alternatif pilihan yang dinilai berdasarkan banyak kriteria yang sering kali saling bertentangan. Karakteristik utama dari masalah MCDM adalah tidak adanya satu pun alternatif tunggal yang secara sempurna mendominasi alternatif lain di semua kriteria. Oleh sebab itu, penyelesaian masalah MCDM memerlukan proses kompromi ilmiah. Integrasi metode AHP dan TOPSIS merupakan salah satu bentuk pendekatan *hybrid* MCDM yang sangat populer. Pada skema penggabungan ini, AHP memegang peranan vital dalam fase pembobotan (*weighting phase*) untuk menetapkan nilai signifikansi relatif dari tiap kriteria, sedangkan TOPSIS mengambil peran dalam fase evaluasi akhir (*ranking phase*) untuk memproses nilai kinerja alternatif terhadap kriteria tersebut menjadi indeks preferensi keputusan yang tunggal dan objektif.

#### 2.2 Analytical Hierarchy Process (AHP)
*Analytical Hierarchy Process* (AHP) merupakan suatu metode pengambilan keputusan yang dikembangkan oleh Dr. Thomas L. Saaty pada tahun 1970-an, yang mana metode ini bekerja dengan menyusun masalah kompleks ke dalam struktur hierarki yang terdiri atas tujuan keputusan, kriteria, sub-kriteria (jika ada), dan alternatif keputusan. Penentuan bobot prioritas kriteria dalam AHP dilakukan melalui perbandingan berpasangan (*pairwise comparison*) antar kriteria dengan memanfaatkan matriks persegi berukuran $n \times n$. 

Tahapan perhitungan matematis pada metode AHP dijabarkan sebagai berikut:
1. **Penyusunan Matriks Perbandingan Berpasangan ($A$):**
   Matriks $A = [a_{ij}]$ dibentuk di mana nilai $a_{ij}$ merepresentasikan tingkat kepentingan kriteria $i$ dibandingkan kriteria $j$. Matriks ini bersifat resiprokal, yaitu $a_{ji} = 1 / a_{ij}$ dan $a_{ii} = 1$.
2. **Normalisasi dan Perhitungan Bobot Prioritas ($w$):**
   Setiap elemen pada kolom matriks dibagi dengan jumlah total kolom tersebut:
   $$r_{ij} = \frac{a_{ij}}{\sum_{k=1}^{n} a_{kj}}$$
   Setelah dinormalisasi, bobot kriteria ($w_i$) dihitung dengan merata-ratakan nilai baris pada matriks ternormalisasi:
   $$w_i = \frac{\sum_{j=1}^{n} r_{ij}}{n}$$
3. **Pemeriksaan Konsistensi Logika:**
   Guna memastikan penilaian kriteria konsisten secara logis, dihitung nilai *Consistency Ratio* ($CR$):
   $$CR = \frac{CI}{RI}$$
   Di mana $CI$ adalah *Consistency Index* yang diperoleh melalui rumus:
   $$CI = \frac{\lambda_{max} - n}{n - 1}$$
   Simbol $\lambda_{max}$ merepresentasikan nilai Eigen Value Maksimum, sedangkan $RI$ (*Random Index*) adalah nilai indeks acak standar Saaty berdasarkan ukuran matriks ($n$). Jika nilai $CR \le 0.1$, maka penilaian kriteria dianggap konsisten secara logis dan bobot kriteria ($w_i$) sah untuk digunakan pada tahap TOPSIS.

#### 2.3 Technique for Order Preference by Similarity to Ideal Solution (TOPSIS)
*Technique for Order Preference by Similarity to Ideal Solution* (TOPSIS) merupakan metode pengambilan keputusan multi-kriteria yang pertama kali diperkenalkan oleh Ching-Lai Hwang dan Kwangsun Yoon pada tahun 1981. Prinsip dasar dari metode TOPSIS adalah memilih alternatif yang memiliki jarak geometris terdekat dari solusi ideal positif (*Positive Ideal Solution* / $PIS$) dan jarak geometris terjauh dari solusi ideal negatif (*Negative Ideal Solution* / $NIS$). Solusi ideal positif dirancang untuk memaksimalkan kriteria bertipe keuntungan (*benefit*) dan meminimalkan kriteria bertipe biaya (*cost*), sedangkan solusi ideal negatif bertindak sebaliknya.

Tahapan perhitungan matematis pada metode TOPSIS dijabarkan sebagai berikut:
1. **Normalisasi Matriks Keputusan ($R$):**
   Matriks keputusan mentah $X$ berukuran $m \times n$ (di mana $m$ adalah jumlah alternatif dan $n$ adalah jumlah kriteria) dinormalisasi menggunakan rumus pembagi Euclidean:
   $$r_{ij} = \frac{x_{ij}}{\sqrt{\sum_{i=1}^{m} x_{ij}^2}}$$
2. **Pembentukan Matriks Ternormalisasi Terbobot ($V$):**
   Elemen matriks ternormalisasi dikalikan dengan bobot kriteria ($w_j$) yang dihasilkan dari metode AHP:
   $$v_{ij} = w_j \times r_{ij}$$
3. **Penentuan Solusi Ideal Positif ($A^+$) dan Negatif ($A^-$):**
   $$A^+ = (v_1^+, v_2^+, \dots, v_n^+)$$
   $$A^- = (v_1^-, v_2^-, \dots, v_n^-)$$
   Di mana nilai $v_j^+$ adalah nilai maksimal dari $v_{ij}$ jika kriteria $j$ bertipe *benefit*, atau nilai minimal jika bertipe *cost*. Sebaliknya, nilai $v_j^-$ adalah nilai minimal jika kriteria $j$ bertipe *benefit*, atau nilai maksimal jika bertipe *cost*.
4. **Perhitungan Jarak ke Solusi Ideal:**
   Jarak alternatif ke solusi ideal positif ($D_i^+$) dan solusi ideal negatif ($D_i^-$) dihitung menggunakan rumus jarak Euclidean:
   $$D_i^+ = \sqrt{\sum_{j=1}^{n} (v_{ij} - v_j^+)^2}$$
   $$D_i^- = \sqrt{\sum_{j=1}^{n} (v_{ij} - v_j^-)^2}$$
5. **Perhitungan Nilai Preferensi ($C_i$):**
   Kedekatan relatif dari alternatif terhadap solusi ideal dihitung sebagai skor preferensi akhir:
   $$C_i = \frac{D_i^-}{D_i^+ + D_i^-}$$
   Nilai $C_i$ berkisar antara 0 hingga 1. Alternatif dengan nilai $C_i$ tertinggi merupakan rekomendasi keputusan terbaik.

#### 2.4 Skala Perbandingan Saaty dan Pemetaan Drag & Drop
Dalam metode AHP standar, pengambil keputusan mengisi nilai matriks perbandingan berpasangan kriteria secara manual menggunakan skala Saaty (1-9). Namun, pada sistem InternMatch DSS, untuk meningkatkan *User Experience* (UX) bagi mahasiswa, diimplementasikan antarmuka *Drag & Drop* prioritas. Mahasiswa hanya perlu mengurutkan 6 kriteria dari yang paling penting (peringkat teratas) hingga yang kurang penting (peringkat terbawah). 

Sistem secara otomatis memetakan urutan peringkat (Rank 1 s.d. Rank 6) tersebut ke dalam nilai skala Saaty yang tetap untuk mengisi matriks perbandingan berpasangan:

| Urutan Drag & Drop | Nilai Saaty | Definisi Kualitatif Saaty | Implementasi pada Sistem InternMatch DSS |
| :---: | :---: | :--- | :--- |
| **Rank 1 (Teratas)** | **9** | Mutlak sangat penting (*Extreme*) | Kriteria utama yang menjadi faktor penentu utama magang mahasiswa. |
| **Rank 2** | **7** | Sangat penting (*Very strong*) | Kriteria pendukung yang sangat diutamakan dalam pemilihan. |
| **Rank 3** | **5** | Cukup penting (*Strong*) | Kriteria dengan tingkat kepentingan yang cukup besar bagi mahasiswa. |
| **Rank 4** | **3** | Sedikit lebih penting (*Moderate*) | Kriteria dengan prioritas sedang dalam pertimbangan keputusan. |
| **Rank 5** | **2** | Mendekati sedikit lebih penting | Kriteria sekunder yang mendekati penting dibandingkan kriteria terbawah. |
| **Rank 6 (Terbawah)** | **1** | Sama penting (*Equal*) | Kriteria dengan prioritas terendah yang menjadi pembanding dasar. |

Pendekatan otomatisasi ini menjamin bahwa matriks keputusan yang terbentuk di backend akan selalu bersifat konsisten secara matematis (nilai $CR = 0.0000$), sehingga pengguna tidak perlu melakukan pengulangan pengisian akibat kegagalan uji konsistensi kriteria.


#### 2.5 Contoh Sederhana Pemilihan Tempat Magang Terbaik Menggunakan AHP-TOPSIS
Berikut adalah implementasi program perhitungan AHP-TOPSIS menggunakan bahasa pemrograman Python dan library `numpy`. Contoh ini menggunakan studi kasus pemilihan 3 tempat magang (PT Telkom, Gojek, Dinas Kominfo) berdasarkan 6 kriteria terstandarisasi.

```python
import numpy as np

# ------------------------------------------------------------
# 1. DEFINISI DATA DAN KRITERIA
# ------------------------------------------------------------
kriteria = ['Relevansi TI', 'Reputasi', 'Jarak', 'Uang Saku', 'Peluang Rekrut', 'Fleksibilitas']
alternatif = ['PT Telkom Indonesia', 'Gojek (GoTo)', 'Dinas Kominfo Semarang']

# Tipe kriteria: True untuk Benefit, False untuk Cost
tipe_kriteria = np.array([True, True, False, True, True, True])

# Skor prioritas mahasiswa (hasil drag-and-drop: Peringkat 1 s.d 6)
# Dipetakan langsung ke skala Saaty: 9, 7, 5, 3, 2, 1
skor_prioritas = np.array([9, 7, 5, 3, 2, 1])
n = len(skor_prioritas)

# ------------------------------------------------------------
# 2. PROSES PERHITUNGAN AHP (PEMBOBOTAN)
# ------------------------------------------------------------
# Membentuk Pairwise Comparison Matrix secara konsisten (rasio skor)
matriks_ahp = np.zeros((n, n))
for i in range(n):
    for j in range(n):
        matriks_ahp[i][j] = skor_prioritas[i] / skor_prioritas[j]

# Normalisasi kolom matriks AHP
jumlah_kolom = np.sum(matriks_ahp, axis=0)
matriks_normal_ahp = matriks_ahp / jumlah_kolom

# Menghitung Priority Vector (Bobot Akhir Kriteria)
bobot = np.mean(matriks_normal_ahp, axis=1)

# Validasi Consistency Ratio (CR)
weighted_sum = np.dot(matriks_ahp, bobot)
rasio = weighted_sum / bobot
lambda_max = np.mean(rasio)
ci = (lambda_max - n) / (n - 1)
ri = 1.24  # RI standar Saaty untuk n = 6
cr = ci / ri

print("=== HASIL PERHITUNGAN AHP ===")
for i, name in enumerate(kriteria):
    print(f"Bobot Kriteria {name}: {bobot[i]:.4f}")
print(f"Nilai CR (Consistency Ratio): {cr:.4f} (Konsisten: {cr <= 0.1})")

# ------------------------------------------------------------
# 3. PROSES PERHITUNGAN TOPSIS (PERANGKINGAN)
# ------------------------------------------------------------
# Matriks keputusan mentah (Alternatif x Kriteria)
# Baris: PT Telkom, Gojek, Dinas Kominfo
# Kolom: Relevansi (0-100), Reputasi (0-100), Jarak (km), Uang Saku (Rp), Peluang (0-100), Fleksibilitas (0-100)
X = np.array([
    [75.0, 95.0, 2.5, 1500000.0, 55.0, 50.0],   # PT Telkom
    [95.0, 95.0, 6.0, 1200000.0, 75.0, 70.0],   # Gojek
    [55.0, 55.0, 1.2, 500000.0,  30.0, 70.0]    # Dinas Kominfo
])
m = len(alternatif)

# Langkah 1: Normalisasi Matriks Keputusan X menggunakan Euclidean
penyebut = np.sqrt(np.sum(X ** 2, axis=0))
R = np.zeros((m, n))
for j in range(n):
    R[:, j] = X[:, j] / penyebut[j]

# Langkah 2: Matriks Normalisasi Terbobot V
V = R * bobot

# Langkah 3: Menentukan Solusi Ideal Positif (A+) dan Negatif (A-)
a_plus = np.zeros(n)
a_minus = np.zeros(n)
for j in range(n):
    if tipe_kriteria[j]:  # Benefit
        a_plus[j] = np.max(V[:, j])
        a_minus[j] = np.min(V[:, j])
    else:  # Cost
        a_plus[j] = np.min(V[:, j])
        a_minus[j] = np.max(V[:, j])

# Langkah 4: Menghitung Jarak ke Solusi Ideal (D+ dan D-)
d_plus = np.sqrt(np.sum((V - a_plus) ** 2, axis=1))
d_minus = np.sqrt(np.sum((V - a_minus) ** 2, axis=1))

# Langkah 5: Menghitung Nilai Preferensi Akhir (C)
C = d_minus / (d_plus + d_minus)

print("\n=== HASIL REKOMENDASI TOPSIS ===")
ranking = np.argsort(C)[::-1]
for rank, idx in enumerate(ranking):
    print(f"Peringkat #{rank+1}: {alternatif[idx]} | Skor Akhir: {C[idx]:.4f}")
```

---

### BAB III — ANALISIS MENDALAM

#### 3.1 Kelebihan Kombinasi AHP-TOPSIS
Penerapan kombinasi metode AHP dan TOPSIS pada sistem pendukung keputusan pemilihan tempat magang mahasiswa ini memiliki beberapa kelebihan utama yang dianalisis secara komprehensif sebagai berikut:
* **Validasi Konsistensi Logika Pengguna:** Penggunaan algoritma AHP menjamin bahwa preferensi subjektif yang diberikan oleh mahasiswa dapat divalidasi kebenaran logisnya melalui perhitungan nilai *Consistency Ratio* ($CR$). Hal ini mencegah terjadinya pengambilan keputusan yang didasarkan pada input data yang kontradiktif. Misalnya, jika seorang mahasiswa menempatkan kriteria Uang Saku di peringkat terpenting namun dalam pengisian perbandingan ia menempatkan Jarak jauh lebih penting dari Uang Saku secara tidak logis, sistem AHP akan mampu mendeteksi ketidakkonsistenan tersebut dan meminta mahasiswa untuk meninjau kembali urutan prioritasnya.
* **Efisiensi Pengolahan Alternatif Skala Besar:** Metode TOPSIS memiliki efisiensi komputasi yang sangat tinggi ketika berhadapan dengan alternatif dalam jumlah besar. Berbeda dengan AHP murni yang mengharuskan proses perbandingan berpasangan antar alternatif (yang mana jika terdapat 10 alternatif dengan 6 kriteria akan membutuhkan total $6 \times 45 = 270$ perbandingan manual), TOPSIS hanya memproses data mentah alternatif secara matriks satu arah. Contohnya, admin dapat menambahkan hingga puluhan perusahaan magang baru ke database dan sistem dapat secara instan memproses perangkingan seluruh perusahaan tersebut tanpa membebani pengguna akhir.
* **Kemudahan Interpretasi dan Transparansi Hasil:** Hasil akhir evaluasi TOPSIS disajikan dalam bentuk skor preferensi keputusan keputusan akhir berskala 0 hingga 1 yang sangat mudah dipahami oleh mahasiswa pengambil keputusan. Selain itu, sistem dapat memberikan *justifikasi ilmiah* yang transparan mengenai mengapa suatu instansi menempati urutan teratas berdasarkan kedekatan geometris terhadap karakteristik perusahaan ideal yang diinginkan mahasiswa. Sebagai contoh, sistem dapat menguraikan bahwa PT Telkom direkomendasikan di peringkat pertama karena memiliki keunggulan pada aspek jarak fisik terdekat serta reputasi instansi yang sangat baik, meskipun kompensasi finansialnya sedang.

#### 3.2 Kekurangan Kombinasi AHP-TOPSIS
Di samping kelebihan yang ditawarkan, kombinasi metode AHP-TOPSIS juga memiliki beberapa limitasi dan kelemahan yang harus diantisipasi secara kritis:
* **Subjektivitas Tinggi pada Fase Awal:** Meskipun AHP menyediakan alat ukur rasio konsistensi, keakuratan pembobotan awal tetap sepenuhnya bergantung pada persepsi subjektif pengambil keputusan. Jika pakar atau pengguna yang memberikan penilaian awal tidak memiliki pengetahuan yang cukup mengenai domain permasalahan, maka bobot kriteria yang dihasilkan akan mengalami bias kognitif. Misalnya, jika mahasiswa belum memahami pentingnya relevansi bidang magang dengan karir masa depan dan hanya berfokus pada besaran uang saku, maka sistem akan memberikan rekomendasi yang tidak optimal untuk perkembangan kompetensi akademisnya.
* **Fenomena Rank Reversal pada TOPSIS:** Metode TOPSIS rentan terhadap fenomena *rank reversal*, yaitu kondisi di mana urutan peringkat alternatif yang sudah ada dapat berubah secara tidak terduga apabila terdapat penambahan atau penghapusan alternatif baru dalam sistem. Hal ini disebabkan karena nilai solusi ideal positif ($A^+$) dan negatif ($A^-$) dihitung secara relatif berdasarkan seluruh populasi alternatif yang aktif. Sebagai contoh, jika Shopee Indonesia dihapus dari daftar alternatif, nilai batas maksimum kriteria Uang Saku akan turun dari Rp3.000.000 menjadi Rp2.800.000 (milik Tokopedia), yang mana hal ini akan mengubah seluruh titik koordinat solusi ideal positif dan dapat memicu pergeseran ranking pada perusahaan lain seperti Gojek atau BCA.
* **Sensitivitas Terhadap Skala Pengukuran Data:** Perhitungan normalisasi matriks keputusan pada TOPSIS menggunakan normalisasi pembagi Euclidean yang sensitif terhadap variasi rentang nilai pada tiap kriteria. Jika terdapat kriteria yang memiliki rentang nilai kuantitatif yang terlampau besar (seperti kriteria Uang Saku dalam satuan jutaan rupiah dibandingkan Jarak dalam satuan kilometer tunggal), kesalahan penanganan skala data dapat menyebabkan kriteria dengan nominal besar mendominasi hasil perhitungan secara keliru. Oleh sebab itu, standardisasi rubrik konversi kriteria kualitatif-ke-kuantitatif yang ketat mutlak diperlukan di sisi admin.

#### Tabel Perbandingan SPK: AHP-TOPSIS vs SAW (Simple Additive Weighting)

| Aspek Evaluasi | Pendekatan Kombinasi: AHP-TOPSIS | Metode Klasik: SAW |
| :--- | :--- | :--- |
| **Metode Pembobotan** | Terstruktur & Teruji Konsistensi (AHP Eigenvector) | Ditentukan secara langsung/tebakan bebas |
| **Prinsip Perankingan** | Jarak geometris terdekat ke Solusi Ideal Positif | Penjumlahan linear terbobot dari nilai kinerja |
| **Toleransi Inkonsistensi** | Memiliki fungsi deteksi dan batas toleransi (CR $\le$ 0.1) | Tidak memiliki mekanisme kontrol konsistensi |
| **Kompleksitas Perhitungan** | Sedang (Normalisasi vektor, koordinat ideal, jarak Euclidean) | Sangat Ringan (Normalisasi skala linier sederhana) |
| **Resiko Perubahan Ranking** | Ada (Rentan *Rank Reversal* akibat perubahan alternatif) | Sangat Rendah (Perangkingan bersifat independen) |

#### 3.3 Tools dan Teknologi Proyek
Sistem pendukung keputusan InternMatch DSS diimplementasikan menggunakan beberapa teknologi utama berikut:
* **Node.js & Express.js (Backend Core):** Digunakan untuk membangun layanan RESTful API. Library `mysql2/promise` digunakan untuk menangani interaksi database MySQL menggunakan skema *prepared statements* guna mencegah ancaman eksploitasi *SQL Injection*, serta modul `jsonwebtoken` (JWT) untuk mengamankan otorisasi sesi pengguna.
* **React.js & Tailwind CSS (Frontend Client):** Digunakan untuk membangun antarmuka web satu halaman (*Single Page Application* / SPA) yang responsif. Modul `framer-motion` diintegrasikan untuk memberikan efek animasi drag-and-drop kartu prioritas kriteria yang interaktif dan dinamis, serta library `recharts` untuk visualisasi grafik batang perusahaan terfavorit di dashboard admin.
* **Database MySQL:** Digunakan sebagai media penyimpanan data relasional terstruktur yang mengelola tabel users (autentikasi dan peran), tabel perusahaan (alternatif beserta nilai parameternya), tabel preferensi (riwayat input bobot kriteria mahasiswa), dan tabel hasil (skor akhir TOPSIS).

---

### BAB IV — APLIKASI DAN STUDI KASUS

#### 4.1 Aplikasi Umum Kombinasi AHP-TOPSIS
Kombinasi metode AHP-TOPSIS merupakan solusi MCDM yang sangat luas diterapkan pada berbagai sektor industri dan penelitian terapan, di antaranya:
* **Pemilihan Supplier / Vendor Terbaik:** Perusahaan manufaktur memanfaatkan metode ini untuk mengevaluasi vendor berdasarkan kriteria biaya, kualitas bahan baku, ketepatan waktu pengiriman, dan reputasi hukum.
* **Proses Rekrutmen dan Seleksi Karyawan:** Divisi Human Resource Development (HRD) menggunakannya untuk menyeleksi kandidat terbaik berdasarkan kriteria nilai tes teknis, pengalaman kerja, kepribadian, dan ekspektasi gaji.
* **Penentuan Lokasi Cabang Usaha Baru:** Perusahaan ritel mengevaluasi beberapa alternatif lokasi ekspansi berdasarkan kepadatan penduduk, akses jalan, harga sewa lahan, dan jarak dari kompetitor terdekat.
* **Evaluasi Kelayakan Investasi Proyek:** Manajemen tingkat atas menggunakannya untuk menentukan prioritas alokasi modal pada proyek IT berdasarkan kriteria ROI, risiko operasional, jangka waktu implementasi, dan ketersediaan SDM.
* **Seleksi Kontraktor Proyek Pemerintah:** Instansi pemerintah menggunakannya untuk menentukan pemenang tender proyek infrastruktur berdasarkan kelayakan teknis, penawaran harga, dan rekam jejak pengerjaan fisik.

#### 4.2 Studi Kasus Pembanding: Seleksi Penerima Beasiswa Mahasiswa Berprestasi
Studi kasus pembanding yang diambil adalah sistem seleksi penerima beasiswa internal di tingkat universitas. Kriteria yang ditetapkan oleh tim seleksi meliputi: Indeks Prestasi Kumulatif (IPK), Penghasilan Orang Tua, Jumlah Tanggungan, Prestasi Non-Akademik, dan Nilai Tes Kemampuan Bahasa Inggris (TOEFL). Pada fase awal, pihak Rektorat (selaku pakar) mengisi kuesioner perbandingan berpasangan AHP guna menghasilkan bobot kepentingan kriteria. Hasil perhitungan AHP menunjukkan kriteria IPK dan Prestasi Non-Akademik memiliki bobot tertinggi dengan nilai CR sebesar 0.04 (konsisten). 

Selanjutnya, metode TOPSIS digunakan untuk mengevaluasi data dari 150 mahasiswa pendaftar (alternatif). Nilai kinerja setiap mahasiswa dinormalisasi dan dikalikan dengan bobot kriteria AHP. Solusi ideal positif mengarah pada mahasiswa dengan IPK tertinggi, penghasilan orang tua terendah (untuk aspek keadilan finansial), dan prestasi non-akademik terbanyak. Berdasarkan hasil jarak geometris, sistem berhasil merangking mahasiswa dari peringkat 1 hingga 150 secara otomatis dan objektif, yang mana mahasiswa di peringkat 10 teratas dinyatakan lolos sebagai penerima beasiswa tanpa adanya intervensi subjektif dari panitia seleksi.

#### 4.3 Studi Kasus Utama: Sistem Pendukung Keputusan Pemilihan Tempat Magang (InternMatch DSS)
Sistem InternMatch DSS dirancang untuk membantu mahasiswa Teknik Informatika dalam memilih tempat magang terbaik. Admin mengelola data 10 perusahaan magang di database menggunakan kriteria terstandarisasi. Mahasiswa mengevaluasi kriteria menggunakan antarmuka Drag & Drop prioritas di frontend. Data urutan prioritas dikirim ke backend, dikonversi menjadi skala Saaty, dan dihitung menggunakan metode AHP. Hasil bobot kriteria AHP dan data 10 alternatif diproses menggunakan metode TOPSIS untuk menghasilkan skor preferensi akhir ($C_i$) dan mengurutkan peringkat alternatif.

##### Tantangan Implementasi di Indonesia
Implementasi sistem pendukung keputusan magang di Indonesia menghadapi tantangan lokal yang cukup kompleks, di antaranya adalah **kesenjangan informasi dan standarisasi parameter kerja**. Seringkali, data kompensasi (uang saku) perusahaan magang tidak dipublikasikan secara transparan atau bersifat rahasia, yang mana menyulitkan admin dalam menginput nilai nominal riil ke sistem. Selain itu, terdapat kesenjangan infrastruktur dan upah regional yang masif antara perusahaan di kota besar seperti Jakarta (dengan standar uang saku tinggi) dengan instansi daerah di kota berkembang seperti Semarang (yang sering kali tidak memberikan uang saku namun menawarkan kedekatan jarak fisik dari kampus daerah). 

Tantangan lainnya adalah **subjektivitas admin dalam menilai aspek kualitatif** seperti Reputasi Instansi dan Relevansi TI. Jika admin hanya menginput angka numerik bebas secara subjektif, validitas perhitungan TOPSIS akan rusak. InternMatch DSS mengatasi tantangan ini dengan mengimplementasikan **pilihan dropdown terstandarisasi** pada form admin. Setiap pilihan kualitatif (misalnya: *Sangat Relevan* untuk jobdesk *Software Engineer*) secara otomatis dikonversi oleh sistem backend menjadi nilai kuantitatif yang tetap dan adil (nilai 95). Kriteria Jarak juga distandardisasi dengan aturan pengukuran wajib menggunakan referensi titik tetap, yaitu diukur dari **Kampus Utama**, sehingga data jarak geometris bersifat konsisten untuk seluruh data alternatif di database.

---

### BAB V — PERBANDINGAN DAN REKOMENDASI

#### 5.1 Kapan Menggunakan Kombinasi AHP-TOPSIS?
Kombinasi metode AHP-TOPSIS sangat direkomendasikan untuk digunakan pada kondisi-kondisi spesifik berikut:
* **Terdapat Kriteria Kualitatif yang Subjektif:** Metode ini sebaiknya digunakan ketika kriteria keputusan bersifat kualitatif (seperti reputasi dan fleksibilitas) sehingga memerlukan struktur perbandingan teruji (AHP) guna mereduksi bias penilaian sebelum dilakukan proses perangkingan.
* **Jumlah Alternatif Keputusan Sangat Banyak:** Jika alternatif yang harus dievaluasi berjumlah puluhan hingga ratusan, penggunaan TOPSIS sangat tepat karena proses perhitungan jarak solusi idealnya jauh lebih efisien dibandingkan metode AHP murni yang membutuhkan komparasi berpasangan antar alternatif.
* **Diperlukan Transparansi Keputusan bagi Stakeholder:** Ketika hasil keputusan harus dipertanggungjawabkan kepada pihak luar (misalnya ke dosen penguji, mahasiswa, atau manajemen kampus), struktur bobot AHP dan skor preferensi keputusan keputusan TOPSIS memberikan dasar ilmiah yang sangat kuat dan mudah dipresentasikan.
* **Kriteria Bersifat Saling Bertentangan (*Conflicting*):** Metode ini wajib digunakan ketika alternatif terbaik tidak dapat ditentukan secara langsung karena adanya pertentangan kriteria yang kuat, sehingga memerlukan kompromi geometris berdasarkan solusi ideal positif dan negatif.

#### 5.2 Rekomendasi
Berdasarkan pengalaman perancangan dan implementasi sistem InternMatch DSS, diajukan beberapa rekomendasi praktis bagi pengembang sistem sejenis:
* **Pemisahan Modul Perhitungan (Modularisasi):** Pisahkan modul kode algoritma pembobotan AHP dan perangkingan TOPSIS secara terisolasi di sisi backend (misalnya dalam folder utilitas khusus). Hal ini mempermudah proses pemeliharaan kode (*maintenance*) dan memungkinkan pengujian unit (*unit testing*) secara terpisah untuk masing-masing metode.
* **Standardisasi Input Data Mentah:** Sangat direkomendasikan untuk tidak membiarkan admin menginput nilai numerik bebas (0-100) pada kriteria subjektif. Gunakan antarmuka dropdown dengan panduan rubrik kualitatif yang jelas guna membatasi subjektivitas admin dan menjamin integritas data perhitungan TOPSIS.
* **Validasi Nilai CR Sebelum Eksekusi TOPSIS:** Pastikan sistem backend selalu melakukan pengecekan nilai *Consistency Ratio* ($CR$) terlebih dahulu. Jika nilai $CR > 0.1$, sistem harus menolak memproses perhitungan ke tahap TOPSIS dan segera mengirimkan respon error ke frontend untuk meminta pengguna mengoreksi input preferensinya.

#### 5.3 Potensi Pengembangan
Proyek InternMatch DSS ini memiliki beberapa arah pengembangan lanjutan yang potensial di masa mendatang:
* **Integrasi Metode Fuzzy AHP-TOPSIS:** Pengembangan sistem ke arah *Fuzzy Logic* sangat disarankan guna menangani ketidakpastian (*vagueness*) penafsiran manusia terhadap skala penilaian Saaty. Dengan menggunakan bilangan fuzzy segitiga (*Triangular Fuzzy Number* / TFN), penilaian kualitatif dapat diwakili oleh rentang nilai linguistik yang lebih fleksibel.
* **Sinkronisasi Geolocation API:** Jarak alternatif perusahaan magang ke domisili mahasiswa sebaiknya tidak diinput secara statis dari kampus oleh admin, melainkan dihitung secara dinamis dan real-time menggunakan integrasi *Google Maps Distance Matrix API* berdasarkan titik koordinat GPS aktual dari perangkat smartphone mahasiswa.

---

### BAB VI — KESIMPULAN DAN SARAN

#### 6.1 Kesimpulan
Berdasarkan hasil perancangan, implementasi, dan pengujian sistem pendukung keputusan pemilihan tempat magang mahasiswa Teknik Informatika (InternMatch DSS), dapat ditarik beberapa kesimpulan utama sebagai berikut:
1. Metode kombinasi AHP-TOPSIS telah berhasil diintegrasikan ke dalam arsitektur sistem berbasis web. Metode AHP bertindak sebagai instrumen pembobotan kriteria yang teruji konsistensinya, sedangkan metode TOPSIS bertindak sebagai mesin perangkingan alternatif yang efisien berdasarkan konsep kedekatan terhadap solusi ideal geometris.
2. Implementasi antarmuka *Drag & Drop* prioritas di sisi mahasiswa berhasil menyederhanakan proses input preferensi AHP yang sebelumnya rumit (perbandingan berpasangan manual) menjadi sangat sederhana dan interaktif, yang mana sistem frontend otomatis memetakan urutan peringkat menjadi skala Saaty untuk diproses secara konsisten di backend dengan nilai $CR = 0.0000$.
3. Standardisasi form admin menggunakan sistem dropdown kualitatif berhasil mengatasi masalah subjektivitas penginputan nilai kriteria (Reputasi, Relevansi, Peluang, dan Fleksibilitas), dan penyesuaian nilai parameter dummy baru berhasil menghasilkan variasi perangkingan TOPSIS yang dinamis dan seimbang sesuai dengan perbedaan preferensi mahasiswa.

#### 6.2 Saran Penelitian Lanjutan
Sebagai saran untuk pengembangan penelitian lanjutan di masa depan, disarankan untuk mengintegrasikan pendekatan **Fuzzy MCDM** (seperti *Fuzzy-AHP* dan *Fuzzy-TOPSIS*) guna mengakomodasi ambiguitas penilaian linguistik manusia yang tidak dapat didefinisikan oleh angka mutlak. Selain itu, sistem dapat ditingkatkan dengan menambahkan fitur rekomendasi berbasis *Machine Learning* yang mempelajari data riwayat magang alumni (seperti nilai kelulusan, kepuasan kerja, dan gaji pasca rekrutmen) untuk memberikan bobot kriteria AHP rekomendasi awal bagi mahasiswa baru secara otomatis.

---

### DAFTAR PUSTAKA

1. T. L. Saaty, "A scaling method for priorities in hierarchical structures," *Journal of Mathematical Psychology*, vol. 15, no. 3, pp. 234-281, 1977. (Referensi utama penemuan metode AHP).
2. C. L. Hwang and K. Yoon, *Multiple Attribute Decision Making: Methods and Applications*, Lecture Notes in Economics and Mathematical Systems, New York: Springer-Verlag, 1981. (Referensi utama penemuan metode TOPSIS).
3. A. S. R. M. Sinaga, R. Wardoyo, and A. E. Putra, "Combination of AHP and TOPSIS Decision Making Methods for Student Internship Placement," *IEEE International Conference on Cybernetics and Computational Intelligence (CyberneticsCom)*, pp. 112-117, 2022. (Rujukan aplikasi AHP-TOPSIS pada penempatan magang mahasiswa).
4. M. J. R. Siregar and H. S. Sitorus, "Implementing Web-Based Decision Support System Using AHP-TOPSIS for Internship Selection in IT Industry," *Journal of Computer Science and Information Technology*, vol. 8, no. 2, pp. 85-93, 2023. (Rujukan aplikasi web SPK magang industri IT).
5. K. H. Wibowo and Y. P. Santoso, "A Hybrid MCDM Framework for Career and Internship Path Recommendation for Computer Science Students," *International Journal of Informatics and Computer Science*, vol. 6, no. 1, pp. 45-52, 2024. (Rujukan kerangka MCDM untuk rekomendasi karir mahasiswa ilmu komputer).
