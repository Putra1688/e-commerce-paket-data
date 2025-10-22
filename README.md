# **E-Commerce Paket Data Prototype**

Prototype ini dikembangkan untuk memberikan refreshment dalam hal tampilan dan peningkatan user experience  pada website e-commerce pembelian paket data internet. Proyek ini berfokus pada struktur komponen yang rapi, penggunaan React Hooks yang benar, dan simulasi operasi CRUD untuk fitur utama, menggunakan kreativitas dalam pembuatan desain untuk memudahkan pengguna.

## **💻 Fitur Utama & UX Flow**

Prototype ini mengadopsi alur UX modern:
1. Dapat Diakses Publik: Halaman utama (Daftar Paket Data) dapat diakses tanpa login.
2. Aksi Terproteksi: Fitur sensitif (Pembelian, Saldo, Riwayat Transaksi, Profil) hanya dapat diakses setelah login.
3. Simulasi Transaksi: Simulasi pemotongan saldo dan pencatatan riwayat transaksi.

## **🛠️ Stack Teknologi**
<table>
  <thead>
    <tr>
      <th>Komponen</th>
      <th>Teknologi/Library</th>
      <th>Tujuan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Frontend</td>
      <td>React (Vite)</td>
      <td>Struktur komponen, penggunaan React Hooks yang benar.</td>
    </tr>
    <tr>
      <td>Styling</td>
      <td>Material UI (MUI)</td>
      <td>Implementasi library UI profesional untuk refreshment tampilan.</td>
    </tr>
    <tr>
      <td>Backend Mock</td>
      <td>JSON Server</td>
      <td>Penyediaan endpoint dummy untuk simulasi CRUD.</td>
    </tr>
  </tbody>
</table>

## **🌐 Status Deployment (Live Prototype)**

Untuk menunjukkan kemampuan deployment dan interaksi frontend/backend secara live, prototype ini di-host pada dua layanan berbeda:

<table>
  <thead>
    <tr>
      <th>Komponen</th>
      <th>Status</th>
      <th>URL Akses</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Frontend</td>
      <td>Live di Netlify</td>
      <td><a href="https://e-commerce-paket-data.netlify.app/">e-commerce-paket-data</a></td>
    </tr>
    <tr>
      <td>Backend Mock</td>
      <td>Live di My JSON Server</td>
      <td><a href="https://my-json-server.typicode.com/Putra1688/e-commerce-paket-data">json-paket-data</a></td>
    </tr>
  </tbody>
</table>

*(Catatan: Karena dalam Mode simulasi - password tidak divalidasi dan Anda dapat menggunakan username yang sudah didaftarkan pada db.json yaitu 'budi')*

## **💻 Cara Menjalankan Secara Lokal**
Untuk memverifikasi kode dan struktur secara lokal, ikuti langkah-langkah ini:

1. Clone Repositori:
   
   ```
   git clone https://github.com/Putra1688/e-commerce-paket-data
   cd e-commerce-paket-data
   ```
  
2. Installasi Dependencies
   
   ```
   npm install
   ``` 
3. Jalankan Front-End

   ```
   npm run dev
   ```
*(Buka URL yang ditampilkan, biasanya http://localhost:5173)*

*(Catatan: Karena API sudah menunjuk ke URL live My JSON Server, Anda tidak perlu menjalankan json-server --watch db.json secara lokal)*

## **⏰ Waktu Pengerjaan & Fokus**
Data ini disediakan untuk memenuhi kriteria evaluasi fokus pengerjaan.
<table>
  <thead>
    <tr>
      <th>Metrik</th>
      <th>Detail</th>
      <th>Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="8">Waktu Mulai</td>
      <td>Selasa, 21 Oktober 2025</td>
      <td>Persiapan Awal & Setup Proyek</td>
    </tr>
    <tr>
      <td>09.00 - 09.45</td>
      <td>Membuat struktur dasar dan</td>
    </tr>
    <tr>
      <td>09.45 - 10.00</td>
      <td>Setup Mock API (JSON-Server)</td>
    </tr>
    <tr>
      <td>10.00 - 11.00</td>
      <td>Membuat tampilan dasar dengan bantuan Gemini AI</td>
    </tr>
    <tr>
      <td>19.40 - 23.00</td>
      <td>Menyempurnakan tampilan antarmuka</td>
    </tr>
    <tr>
      <td>Rabu, 22 Oktober 2025</td>
      <td>Deploy</td>
    </tr>
    <tr>
      <td>05.00</td>
      <td>Merubah library UI dari lucide-react menjadi MUI</td>
    </tr>
    <tr>
      <td>07.00</td>
      <td>Pembuatan laporan</td>
    </tr>
    <tr>
      <td>Waktu Selesai</td>
      <td>Rabu, 22 Oktober 2025</td>
      <td>website e-commerce paket data dapat digunakan</td>
    </tr>
  </tbody>
</table>

*(Catatan: dikarenakan adanya uts dan kondisi saya sedang sakit, pengerjaan proyek baru bisa dikerjakan pada Selasa, 21 Oktober 2025)*
