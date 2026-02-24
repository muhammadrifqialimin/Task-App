# 📋 Next.js Task Management API

![Next.js](https://img.shields.io/badge/Next.js-v16-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-v19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-v5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Validation](https://img.shields.io/badge/Class--Validator-Data%20Safety-success?style=flat-square&logo=shield&logoColor=white)

**Next.js Task Management API** is a clean and structured web application and RESTful backend service designed for efficient task handling. Built with **Next.js App Router**, it strictly follows **Clean Architecture** principles (Modules, Services, Controllers) to ensure the codebase remains scalable, testable, and maintainable.

---

## 🌟 Key Features

- **🏛️ Clean Architecture**: Utilizes separation of concerns via Controllers and Services, inspired by enterprise framework patterns (e.g., NestJS) for robust logic handling within Next.js API Routes.
- **🛡️ Strict Data Validation**: Implements `class-validator` and `class-transformer` via Data Transfer Objects (DTOs) to automatically reject invalid incoming request payloads.
- **⚡ Full RESTful CRUD**: Complete operations to Create, Read, Update, and Delete task entities seamlessly.
- **🎨 Modern Frontend UI**: Coupled with a dynamic, clean, and responsive UI built primarily with Tailwind CSS and React Server/Client Components.
- **🚀 Scalable Architecture**: Follows a modular directory structure, separating routes, core business logic, and shared utilities.

---

## 🛠 Tech Stack

| Component      | Technology      | Description                                  |
| :------------- | :-------------- | :------------------------------------------- |
| **Framework**  | Next.js v16     | Full-stack React framework with App Router   |
| **UI Library** | React v19       | Library for building user interfaces         |
| **Language**   | TypeScript v5   | Static typing for safer code execution       |
| **Styling**    | TailwindCSS     | Utility-first CSS framework for rapid design |
| **Validation** | class-validator | Decorator-based property validation          |
| **Icons**      | lucide-react    | Beautiful and consistent SVG icon set        |

---

## 📂 Project Structure

This project follows a modular architecture for better maintainability.

```bash
src/
│
├── app/                  # Next.js App Router (UI & API Routes)
│   ├── api/tasks/        # RESTful API Endpoints (/api/tasks)
│   ├── layout.tsx        # Root Application Layout
│   └── page.tsx          # Main Task Management Interface
├── common/               # Shared Utilities
│   └── pipes/            # Validation Pipes (DTO payload interception)
└── modules/              # Core Business Logic (Domain)
    └── task/             # Task Feature Module
        ├── task.controller.ts  # HTTP Request Handlers
        ├── task.service.ts     # Business Logic & Data Manipulation
        ├── task.entity.ts      # Data Interfaces
        ├── task.dto.ts         # Validation Schemas
        └── task.module.ts      # Dependency Integration
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

1. **Prerequisites**
   Make sure you have installed:
   - Node.js (v18 or higher recommended)
   - npm, yarn, pnpm, or bun

2. **Clone the Repository**

   ```bash
   git clone [YOUR_REPO_URL]
   cd Proyek1
   ```

3. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Start the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The UI web interface will start at: `http://localhost:3000`
   The API Base URL will be at: `http://localhost:3000/api/tasks`

---

## 🔌 API Documentation

You can test these endpoints using Postman, Insomnia, or cURL. Base URL is `/api/tasks`.

### 📝 Task Operations

1. **Get All Tasks**
   - URL: `GET /api/tasks`
   - Description: Retrieves an array of all available tasks.

2. **Get Task by ID**
   - URL: `GET /api/tasks/:id`
   - Description: Retrieves details of a specific task.

3. **Create a Task**
   - URL: `POST /api/tasks`
   - Body (JSON):
     ```json
     {
       "title": "Learn Next.js App Router",
       "description": "Understand routing and API handlers",
       "isCompleted": false
     }
     ```
   - Validation Rules: `title` is required (string).

4. **Update a Task**
   - URL: `PUT /api/tasks/:id` or `PATCH /api/tasks/:id`
   - Body (JSON):
     _(All fields are optional, only provide what needs updating)_
     ```json
     {
       "isCompleted": true
     }
     ```

5. **Delete a Task**
   - URL: `DELETE /api/tasks/:id`
   - Description: Removes the task from the system.

---
