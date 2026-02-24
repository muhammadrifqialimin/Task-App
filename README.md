# Next.js Task Management App

A modern, simple, and clean Task Management Web Application built with the Next.js App Router. This project implements a fully structured API architecture—inspired by robust frameworks—utilizing Controllers, Services, and Modules to handle the core task operations seamlessly.

## Teknologi Utama (Tech Stack)

Aplikasi ini dibangun dengan menggunakan teknologi dan framework web modern:

- **Framework Web:** [Next.js v16](https://nextjs.org/) (menggunakan App Router)
- **Library UI:** [React v19](https://react.dev/) dengan Server dan Client Components
- **Bahasa Pemrograman:** [TypeScript](https://www.typescriptlang.org/) untuk _type-safety_ dan keterbacaan kode yang lebih solid
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/) untuk _utility-first_ CSS secara cepat dan responsif
- **Validasi Data:** `class-validator` & `class-transformer` untuk memastikan keamanan endpoint payload
- **Icon:** `lucide-react` untuk komponen SVG

## Struktur Project (Folder Structure)

Aplikasi ini menggunakan adaptasi **Clean Architecture** demi menjaga keterbacaan kode (maintainability) dengan memisahkan logic HTTP Route, logic bisnis, dan validasi data secara terorganisir.

```text
src/
├── app/                  # Next.js App Router (UI & Endpoint REST API)
│   ├── api/              # Folder khusus API Routes Next.js
│   │   └── tasks/        # Endpoint kumpulan fitur /api/tasks
│   │       ├── route.ts          # Method: GET All, POST (Buat Task Baru)
│   │       └── [id]/route.ts     # Method: GET by ID, PUT/PATCH, DELETE
│   ├── layout.tsx        # Base Document Model Web App (Root layout Next.js)
│   └── page.tsx          # Halaman Utama Web (Frontend Task UI)
├── common/               # Utility dan Helpers yang digunakan lintas module
│   └── pipes/
│       └── validation.pipe.ts    # Logic custom validation pipe object payload DTO
└── modules/              # Kumpulan feature modules (Business Core Logic)
    └── task/             # Ruang lingkup fitur "Task"
        ├── task.controller.ts  # Mengatur request Next.js dan merespon Data
        ├── task.service.ts     # Engine Interaksi Data & Logic bisnis spesifik (sementara In-Memory DB)
        ├── task.entity.ts      # Definisi kontrak Object Task (Interfaces)
        ├── task.dto.ts         # Class validator schema Payload (Data Transfer Object)
        └── task.module.ts      # Integrasi Inversion of Control antara service dan controller
```

## Fitur Utama

- **Clean Architecture:** Menggunakan pemisahan tanggung jawab (Controller, Service, Module) untuk menjaga kode tetap rapi dan mudah di-maintain.
- **Validasi Data:** Memanfaatkan `class-validator` untuk memastikan bahwa payload yang dikirim ke API selalu sesuai dengan format yang diharapkan menggunakan DTOs (Data Transfer Objects).
- **CRUD Operations:** Mendukung operasi Create, Read, Update, dan Delete untuk entitas Task secara penuh melalui RESTful API Route Next.js.
- **Modern UI:** Tampilan yang bersih menggunakan TailwindCSS.

## Entitas Task

Struktur data (JSON) utama untuk entitas `Task` adalah sebagai berikut:

```json
{
  "id": 1,
  "title": "Belajar Next.js",
  "description": "Mempelajari fitur App Router dan API Routes",
  "isCompleted": false
}
```

## Dokumentasi API (JSON CRUD)

Aplikasi ini menyediakan endpoint komplit di URI `/api/tasks` dengan skenario payload JSON berikut:

### 1. Get All Tasks (Read)

- **Endpoint:** `GET /api/tasks`
- **Response:** Array dari object `Task`.

```json
[
  {
    "id": 1,
    "title": "Task 1",
    "description": "Deskripsi Task",
    "isCompleted": false
  }
]
```

### 2. Get Task by ID (Read)

- **Endpoint:** `GET /api/tasks/:id`
- **Response:** Object `Task` tunggal.

```json
{
  "id": 1,
  "title": "Task 1",
  "description": "Deskripsi Task",
  "isCompleted": false
}
```

### 3. Create Task (Create)

- **Endpoint:** `POST /api/tasks`
- **Request Body (JSON):**
  - `title` (string, **required**): Judul task.
  - `description` (string, optional): Penjelasan detail task.
  - `isCompleted` (boolean, optional): Status task (default `false`).

```json
{
  "title": "Tugas Baru",
  "description": "Deskripsi tambahan opsional",
  "isCompleted": false
}
```

- **Response:** Object `Task` yang baru dibuat.

### 4. Update Task (Update)

- **Endpoint:** `PUT /api/tasks/:id` atau `PATCH /api/tasks/:id`
- **Request Body (JSON):** Semua field bersifat opsional.

```json
{
  "title": "Tugas Diperbarui",
  "isCompleted": true
}
```

- **Response:** Object `Task` yang telah diperbarui.

### 5. Delete Task (Delete)

- **Endpoint:** `DELETE /api/tasks/:id`
- **Response:** Mengembalikan object Task yang sukses dihapus.

## Cara Mengakses & Menjalankan (Getting Started)

Untuk Menjalankan web ini di _Local Environment_ (Komputer Sendiri), pastikan telah terinstall **Node.js**:

1. **Install Dependencies**, buka terminal / command prompt, masuk ke folder root proyek, dan jalankan perintah install salah satu Package Manager:

   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   # atau
   bun install
   ```

2. **Jalankan _Development Server_**, ketik perintah berikut pada terminal di folder proyek:

   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   # atau
   bun dev
   ```

3. **Akses Web UI Utama**, buka Browser favorit (Chrome, Safari, dll) lalu tulis URL berikut untuk menampilkan halaman web GUI / Frontend:
   [http://localhost:3000](http://localhost:3000)

4. **Testing Routing API (API Testing)**, Anda bisa mengecek API RESTful via HTTP Client apps seperti **Postman**, **Insomnia**, cURL, atau ekstensi **ThunderClient** di VSCode dengan Endpoint URL dasar:
   `http://localhost:3000/api/tasks`
