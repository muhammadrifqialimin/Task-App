# 📋 task-manager-api

![Next.js](https://img.shields.io/badge/Next.js-v16-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-v19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-v5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Validation](https://img.shields.io/badge/Class--Validator-Data%20Safety-success?style=flat-square&logo=shield&logoColor=white)

**Next.js Task Management API** adalah aplikasi web dan layanan backend RESTful yang terstruktur dan bersih, dirancang untuk penanganan tugas (_task_) secara efisien. Dibangun menggunakan **Next.js App Router**, proyek ini secara ketat mengikuti prinsip **Clean Architecture** (Modules, Services, Controllers) untuk memastikan basis kode tetap mudah diukur (_scalable_), mudah diuji (_testable_), dan mudah dipelihara (_maintainable_).

---

## 🌟 Fitur Utama (Key Features)

- **🏛️ Clean Architecture**: Menggunakan pemisahan tanggung jawab (_separation of concerns_) melalui arsitektur Controller dan Service—terinspirasi dari pola framework enterprise (contoh: NestJS)—untuk menangani logika bisnis yang kuat di dalam Next.js API Routes.
- **🛡️ Validasi Data Ketat**: Mengimplementasikan `class-validator` dan `class-transformer` melalui Data Transfer Objects (DTOs) untuk menolak _payload request_ yang tidak valid secara otomatis.
- **⚡ Operasi RESTful CRUD Penuh**: Operasi lengkap untuk Membuat (_Create_), Membaca (_Read_), Memperbarui (_Update_), dan Menghapus (_Delete_) entitas tugas secara mulus.
- **🎨 UI Frontend Modern**: Dipadukan dengan tampilan antarmuka (UI) yang dinamis, bersih, dan responsif. Dibangun secara khusus dengan Tailwind CSS dan fitur Server/Client Components dari React.
- **🚀 Arsitektur Skalabel**: Mengikuti struktur direktori modular yang memisahkan antara bagian _routing_, inti logika bisnis, dan fungsi _utility_ yang digunakan bersama.

---

## 🛠 Teknologi Utama (Tech Stack)

| Komponen       | Teknologi       | Deskripsi                                    |
| :------------- | :-------------- | :------------------------------------------- |
| **Framework**  | Next.js v16     | Full-stack React framework dengan App Router |
| **UI Library** | React v19       | Library utama untuk antarmuka pengguna       |
| **Bahasa**     | TypeScript v5   | Static typing demi keamanan penulisan kode   |
| **Styling**    | TailwindCSS     | Utility-first CSS framework (Desain Cepat)   |
| **Validasi**   | class-validator | Validasi properti berbasis Decorator         |
| **Icons**      | lucide-react    | Kumpulan icon SVG yang konsisten & cantik    |

---

## 📂 Struktur Proyek (Project Structure)

Proyek ini mengikuti arsitektur modular agar lebih mudah dikelola:

```bash
src/
│
├── app/                  # Next.js App Router (UI & API Routes)
│   ├── api/tasks/        # Endpoint API RESTful (/api/tasks)
│   ├── layout.tsx        # File Master Layout Aplikasi Utama
│   └── page.tsx          # Tampilan Antarmuka Halaman Task (UI)
├── common/               # Utilitas Bersama (Shared Utilities)
│   └── pipes/            # Validation Pipes (mencegat payload DTO)
└── modules/              # Inti Logika Bisnis (Domain)
    └── task/             # Fitur Modul Task (Tugas)
        ├── task.controller.ts  # Penanganan Request HTTP
        ├── task.service.ts     # Logika Bisnis & Manipulasi Data
        ├── task.entity.ts      # Antarmuka (Interface) Data
        ├── task.dto.ts         # Skema Validasi Payload
        └── task.module.ts      # Integrasi Dependensi (IoC)
```

---

## 🚀 Memulai Aplikasi (Getting Started)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal (_Local Environment_).

1. **Persyaratan Sistem**
   Pastikan Anda sudah menginstal:
   - Node.js (direkomendasikan versi v18 atau ke atas)
   - npm, yarn, pnpm, atau bun

2. **Clone Repositori**

   ```bash
   git clone [YOUR_REPO_URL]
   cd task-manager-api
   ```

3. **Install Dependensi**

   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

4. **Jalankan Development Server**

   ```bash
   npm run dev
   # atau
   yarn dev
   ```

   Tampilan Web UI akan berjalan di: `http://localhost:3000`
   Base URL untuk REST API di: `http://localhost:3000/api/tasks`

---

## 🔌 Dokumentasi API

Anda bisa menguji endpoint ini menggunakan _Postman_, _Insomnia_, atau alat seperti cURL. **Base URL** proyek ini adalah `/api/tasks`.

### 📝 Operasi Task (CRUD)

1. **Dapatkan Semua Tugas (Get All Tasks)**
   - URL: `GET /api/tasks`
   - Deskripsi: Mengambil seluruh array tugas yang ada hari ini.

2. **Dapatkan Detail Tugas (Get Task by ID)**
   - URL: `GET /api/tasks/:id`
   - Deskripsi: Mengambil detail spesifik dari satu tugas lewat ID-nya.

3. **Buat Tugas Baru (Create a Task)**
   - URL: `POST /api/tasks`
   - Body (JSON):
     ```json
     {
       "title": "Belajar Next.js App Router",
       "description": "Memahami sistem routing dan API Handler",
       "isCompleted": false
     }
     ```
   - Aturan Validasi: Field `title` bersifat **wajib (_required_)** dan formatnya harus _string_.

4. **Perbarui Tugas (Update a Task)**
   - URL: `PUT /api/tasks/:id` atau `PATCH /api/tasks/:id`
   - Body (JSON):
     _(Semua field bersifat opsional, isi hanya yang ingin diubah saja)_
     ```json
     {
       "isCompleted": true
     }
     ```

5. **Hapus Tugas (Delete a Task)**
   - URL: `DELETE /api/tasks/:id`
   - Deskripsi: Menghapus tugas secara permanen dari dalam sistem.

---
