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
