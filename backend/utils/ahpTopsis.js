/**
 * ============================================================
 * MODUL PERHITUNGAN AHP (Analytic Hierarchy Process)
 * & TOPSIS (Technique for Order Preference by Similarity
 * to Ideal Solution)
 *
 * Modul ini adalah INTI dari Sistem Pendukung Keputusan
 * InternMatch DSS. Digunakan untuk:
 *   1. AHP  -> menghitung BOBOT setiap kriteria berdasarkan
 *              tingkat kepentingan (skala Saaty 1-9) yang
 *              diinput mahasiswa.
 *   2. TOPSIS -> menghitung RANKING perusahaan magang
 *              berdasarkan bobot kriteria dari AHP.
 *
 * Kriteria yang digunakan (urutan tetap dipakai di seluruh modul):
 *   0. relevansi_ti    (Benefit)
 *   1. reputasi        (Benefit)
 *   2. jarak_km         (Cost)     -> semakin kecil semakin baik
 *   3. uang_saku        (Benefit)
 *   4. peluang_rekrut   (Benefit)
 *   5. fleksibilitas    (Benefit)
 * ============================================================
 */

const KRITERIA = [
  { key: 'relevansi_ti', label: 'Relevansi Bidang TI', type: 'benefit' },
  { key: 'reputasi', label: 'Reputasi Perusahaan', type: 'benefit' },
  { key: 'jarak_km', label: 'Jarak/Lokasi', type: 'cost' },
  { key: 'uang_saku', label: 'Uang Saku', type: 'benefit' },
  { key: 'peluang_rekrut', label: 'Peluang Direkrut', type: 'benefit' },
  { key: 'fleksibilitas', label: 'Fleksibilitas Kerja', type: 'benefit' },
];

/**
 * Membuat Pairwise Comparison Matrix (matriks perbandingan berpasangan)
 * dari input tingkat kepentingan tiap kriteria (skala 1-9 / skala Saaty).
 *
 * Pendekatan: setiap kriteria memiliki "skor kepentingan" (1-9) yang
 * diinput pengguna melalui slider. Nilai perbandingan antar kriteria i
 * dan j dihitung sebagai rasio skor_i / skor_j. Ini adalah pendekatan
 * umum untuk menyederhanakan input AHP di aplikasi (dibanding meminta
 * pengguna mengisi n x n perbandingan manual satu per satu).
 *
 * @param {number[]} skor - array skor kepentingan tiap kriteria (1-9)
 * @returns {number[][]} matriks perbandingan berpasangan n x n
 */
function buatMatriksPerbandingan(skor) {
  const n = skor.length;
  const matriks = [];
  for (let i = 0; i < n; i++) {
    matriks[i] = [];
    for (let j = 0; j < n; j++) {
      // rasio kepentingan kriteria i terhadap kriteria j
      matriks[i][j] = skor[i] / skor[j];
    }
  }
  return matriks;
}

/**
 * Normalisasi matriks perbandingan berpasangan.
 * Setiap elemen kolom dibagi dengan jumlah kolom tersebut.
 */
function normalisasiMatriks(matriks) {
  const n = matriks.length;
  const jumlahKolom = new Array(n).fill(0);

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      jumlahKolom[j] += matriks[i][j];
    }
  }

  const normalisasi = [];
  for (let i = 0; i < n; i++) {
    normalisasi[i] = [];
    for (let j = 0; j < n; j++) {
      normalisasi[i][j] = matriks[i][j] / jumlahKolom[j];
    }
  }
  return { normalisasi, jumlahKolom };
}

/**
 * Menghitung Priority Vector (bobot prioritas / eigen vector approx)
 * yaitu rata-rata tiap baris pada matriks yang sudah dinormalisasi.
 */
function hitungPriorityVector(matriksNormalisasi) {
  const n = matriksNormalisasi.length;
  const priorityVector = [];
  for (let i = 0; i < n; i++) {
    const rata2 =
      matriksNormalisasi[i].reduce((a, b) => a + b, 0) / n;
    priorityVector.push(rata2);
  }
  return priorityVector;
}

/**
 * Menghitung Lambda Max (eigen value maksimum) yang digunakan untuk
 * Consistency Index (CI).
 * Lambda Max = rata-rata dari (matriks asli x priority vector) / priority vector
 */
function hitungLambdaMax(matriksAsli, priorityVector) {
  const n = matriksAsli.length;
  const weightedSum = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      weightedSum[i] += matriksAsli[i][j] * priorityVector[j];
    }
  }

  const rasio = weightedSum.map((val, i) => val / priorityVector[i]);
  const lambdaMax = rasio.reduce((a, b) => a + b, 0) / n;
  return { lambdaMax, weightedSum, rasio };
}

// Random Index (RI) standar Saaty berdasarkan ukuran matriks (n)
const RANDOM_INDEX = {
  1: 0.0, 2: 0.0, 3: 0.58, 4: 0.9, 5: 1.12,
  6: 1.24, 7: 1.32, 8: 1.41, 9: 1.45, 10: 1.49,
};

/**
 * FUNGSI UTAMA AHP
 * Menghitung seluruh tahapan AHP: matriks perbandingan, normalisasi,
 * priority vector (bobot), CI, dan CR.
 *
 * @param {number[]} skorKepentingan - skor 1-9 untuk tiap kriteria
 * @returns {object} seluruh hasil perhitungan AHP beserta tabel-tabelnya
 */
function hitungAHP(skorKepentingan) {
  const n = skorKepentingan.length;

  // 1. Pairwise Comparison Matrix
  const matriksPerbandingan = buatMatriksPerbandingan(skorKepentingan);

  // 2. Normalisasi matriks
  const { normalisasi, jumlahKolom } = normalisasiMatriks(matriksPerbandingan);

  // 3. Priority Vector (bobot kriteria)
  const priorityVector = hitungPriorityVector(normalisasi);

  // 4. Lambda Max (Eigen Value)
  const { lambdaMax, weightedSum, rasio } = hitungLambdaMax(
    matriksPerbandingan,
    priorityVector
  );

  // 5. Consistency Index (CI) = (lambdaMax - n) / (n - 1)
  const consistencyIndex = (lambdaMax - n) / (n - 1);

  // 6. Consistency Ratio (CR) = CI / RI
  const randomIndex = RANDOM_INDEX[n] || 1.49;
  const consistencyRatio =
    randomIndex === 0 ? 0 : consistencyIndex / randomIndex;

  // 7. Cek konsistensi: CR <= 0.1 dianggap konsisten
  const konsisten = consistencyRatio <= 0.1;

  return {
    kriteria: KRITERIA.map((k) => k.label),
    skorKepentingan,
    matriksPerbandingan,
    matriksNormalisasi: normalisasi,
    jumlahKolom,
    priorityVector, // <-- inilah BOBOT tiap kriteria untuk dipakai TOPSIS
    lambdaMax,
    weightedSum,
    rasioKonsistensiPerBaris: rasio,
    consistencyIndex,
    randomIndex,
    consistencyRatio,
    konsisten,
    pesan: konsisten
      ? 'Perbandingan konsisten (CR <= 0.1). Lanjut ke perhitungan TOPSIS.'
      : 'Perbandingan belum konsisten.',
  };
}

/**
 * FUNGSI UTAMA TOPSIS
 * Menghitung ranking alternatif (perusahaan) menggunakan metode TOPSIS
 * berdasarkan bobot kriteria hasil AHP.
 *
 * @param {Array<object>} perusahaanList - daftar perusahaan dengan nilai kriteria mentah
 * @param {number[]} bobot - bobot kriteria hasil AHP (priority vector), harus berjumlah 1
 * @returns {object} seluruh tahapan & hasil akhir TOPSIS
 */
function hitungTOPSIS(perusahaanList, bobot) {
  const m = perusahaanList.length; // jumlah alternatif (perusahaan)
  const n = KRITERIA.length; // jumlah kriteria

  // Matriks keputusan mentah (m x n)
  const matriksKeputusan = perusahaanList.map((p) =>
    KRITERIA.map((k) => Number(p[k.key]))
  );

  // 1. Normalisasi matriks keputusan (normalisasi vektor)
  // r_ij = x_ij / sqrt(sum(x_ij^2)) untuk setiap kolom j
  const penyebut = [];
  for (let j = 0; j < n; j++) {
    let sumSq = 0;
    for (let i = 0; i < m; i++) {
      sumSq += matriksKeputusan[i][j] ** 2;
    }
    penyebut[j] = Math.sqrt(sumSq);
  }

  const matriksNormalisasi = matriksKeputusan.map((row) =>
    row.map((val, j) => (penyebut[j] === 0 ? 0 : val / penyebut[j]))
  );

  // 2. Matriks normalisasi terbobot (dikalikan bobot dari AHP)
  const matriksTerbobot = matriksNormalisasi.map((row) =>
    row.map((val, j) => val * bobot[j])
  );

  // 3. Solusi Ideal Positif (A+) dan Ideal Negatif (A-)
  // Untuk kriteria benefit: A+ = nilai max, A- = nilai min
  // Untuk kriteria cost:    A+ = nilai min, A- = nilai max
  const solusiIdealPositif = [];
  const solusiIdealNegatif = [];

  for (let j = 0; j < n; j++) {
    const kolom = matriksTerbobot.map((row) => row[j]);
    if (KRITERIA[j].type === 'benefit') {
      solusiIdealPositif[j] = Math.max(...kolom);
      solusiIdealNegatif[j] = Math.min(...kolom);
    } else {
      // cost
      solusiIdealPositif[j] = Math.min(...kolom);
      solusiIdealNegatif[j] = Math.max(...kolom);
    }
  }

  // 4. Jarak ke solusi ideal positif (D+) dan negatif (D-)
  const jarakPositif = matriksTerbobot.map((row) => {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += (row[j] - solusiIdealPositif[j]) ** 2;
    }
    return Math.sqrt(sum);
  });

  const jarakNegatif = matriksTerbobot.map((row) => {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += (row[j] - solusiIdealNegatif[j]) ** 2;
    }
    return Math.sqrt(sum);
  });

  // 5. Nilai Preferensi (Vi) = D- / (D+ + D-)
  const nilaiPreferensi = jarakPositif.map((dPlus, i) => {
    const dMinus = jarakNegatif[i];
    const total = dPlus + dMinus;
    return total === 0 ? 0 : dMinus / total;
  });

  // 6. Ranking berdasarkan nilai preferensi tertinggi -> terendah
  const hasilRanking = perusahaanList
    .map((p, i) => ({
      perusahaan_id: p.id,
      nama: p.nama,
      nilai_preferensi: nilaiPreferensi[i],
      jarak_positif: jarakPositif[i],
      jarak_negatif: jarakNegatif[i],
    }))
    .sort((a, b) => b.nilai_preferensi - a.nilai_preferensi)
    .map((item, index) => ({ ...item, ranking: index + 1 }));

  return {
    kriteria: KRITERIA.map((k) => k.label),
    // nama perusahaan dalam urutan ASLI (sama urutannya dengan matriksKeputusan,
    // matriksNormalisasi, dan matriksTerbobot di bawah ini)
    namaUrutanAsli: perusahaanList.map((p) => p.nama),
    bobot,
    matriksKeputusan,
    penyebutNormalisasi: penyebut,
    matriksNormalisasi,
    matriksTerbobot,
    solusiIdealPositif,
    solusiIdealNegatif,
    jarakPositif,
    jarakNegatif,
    nilaiPreferensi,
    hasilRanking,
  };
}

/**
 * Menghasilkan penjelasan otomatis (natural language) untuk rekomendasi
 * teratas, agar mahasiswa memahami alasan di balik ranking.
 */
function buatPenjelasan(perusahaan) {
  const poin = [];
  if (perusahaan.relevansi_ti >= 80)
    poin.push('memiliki relevansi bidang yang tinggi dengan Teknik Informatika');
  if (perusahaan.reputasi >= 80) poin.push('reputasi perusahaan yang sangat baik');
  if (perusahaan.peluang_rekrut >= 75) poin.push('peluang direkrut yang besar');
  if (perusahaan.uang_saku >= 2000000) poin.push('uang saku yang kompetitif');
  if (perusahaan.fleksibilitas >= 70) poin.push('fleksibilitas kerja yang baik');
  if (perusahaan.jarak_km <= 5) poin.push('lokasi yang dekat dan strategis');

  if (poin.length === 0) {
    return `${perusahaan.nama} dipilih berdasarkan kombinasi nilai kriteria yang paling mendekati solusi ideal menurut preferensi Anda.`;
  }

  const gabungan =
    poin.length === 1
      ? poin[0]
      : poin.slice(0, -1).join(', ') + ', serta ' + poin[poin.length - 1];

  return `${perusahaan.nama} direkomendasikan karena ${gabungan}.`;
}

module.exports = {
  KRITERIA,
  hitungAHP,
  hitungTOPSIS,
  buatPenjelasan,
};
