# ✨ **Anonymous Chat-App**

![Chat-App Demo](https://via.placeholder.com/800x400?text=Chat-App+Demo)  
*Contoh tampilan dari Chat-App (Gantilah placeholder dengan gambar asli aplikasi Anda)*

---

## 💬 **Deskripsi Proyek**

Anonymous Chat-App adalah aplikasi chat real-time berbasis web yang memungkinkan pengguna untuk mengobrol tanpa memerlukan login. Pengguna dapat bergabung dengan nama pengguna pilihan dan mulai berinteraksi secara anonim. Aplikasi ini dibuat menggunakan **React** dan **Socket.IO** untuk komunikasi real-time.

---

## 🚀 **Fitur-Fitur**

1. **Chat Real-Time**: Kirim dan terima pesan secara instan.
2. **Anonymous Chat**: Tidak memerlukan registrasi atau login.
3. **Pesan Historis**: Menampilkan pesan-pesan sebelumnya saat bergabung.
4. **Desain Modern**: Menggunakan **Tailwind CSS** untuk tampilan yang responsif dan menarik.

---

## 🛠️ **Teknologi yang Digunakan**

- **Frontend**:  
  - React  
  - Tailwind CSS  
  - date-fns (untuk format waktu)

- **Backend**:  
  - Node.js  
  - Express  
  - Socket.IO

---

## ⚙️ **Instalasi dan Menjalankan Proyek**

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan proyek ini di lokal Anda.

### **1. Clone Repositori**

```bash
git clone https://github.com/username/Chat-App.git
cd Chat-App
```

### **2. Install Dependencies**

Untuk **Frontend**:

```bash
cd client
npm install
```

Untuk **Backend**:

```bash
cd server
npm install
```

### **3. Jalankan Server**

```bash
cd server
node server.js
```

### **4. Jalankan Frontend**

```bash
cd client
npm run dev
```

Akses aplikasi di `http://localhost:3000`.

---
## 🖼 **Screenshots**

1. **Tampilan Chat Utama**  

   ![Chat Interface](https://github.com/user-attachments/assets/76c99636-9d74-4b60-85a4-2d0f59c51575)

---

## 💡 **Cara Menggunakan**

1. Masukkan nama pengguna Anda.
2. Kirim pesan di kolom input.
3. Lihat pesan dari pengguna lain secara real-time.
4. Perhatikan notifikasi ketika pengguna baru bergabung.

---

## 🛠️ **Konfigurasi IP Server**

Pastikan Anda mengganti alamat IP di `Chat.jsx` dengan alamat IP server lokal atau domain Anda:

```javascript
socket = io('http://192.168.x.x:3001'); // Ganti dengan IP server Anda atau domain anda
```

## 📚 **Lisensi**

Proyek ini dilisensikan di bawah lisensi MIT. Lihat file [LICENSE](LICENSE) untuk detailnya.

---

## ✨ **Penulis**

**Nama**: Founz  
**GitHub**: [github.com/NefounzAI](https://github.com/NefounzAINefounzAI)  
**Lokasi**: Indonesia

---

_Semoga panduan ini membantu Anda dalam mengembangkan dan menjalankan Chat-App! 😊_
