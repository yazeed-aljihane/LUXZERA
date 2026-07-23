# LuxZera | Modern AI Luxury E-Commerce Platform

LuxZera is a high-performance, intelligent luxury e-commerce ecosystem built with Spring Boot 3.3.2 and React. LuxZera combines natural language vector embeddings with decoupled microservices, automated email dispatch, and enterprise security.

---

## 🏛 High-Level System Architecture

A clean, decoupled architecture connecting client presentation, API security, core microservices, and external cloud infrastructure.

```mermaid
flowchart LR
    subgraph Client ["Client Presentation"]
        A["📱 React 18 SPA<br/>(Vite + Tailwind CSS)"]
    end

    subgraph Gateway ["API & Security Gateway"]
        B["🛡️ Spring Security 6<br/>(JWT + CORS Gateway)"]
    end

    subgraph Core ["Business Microservices"]
        C["⚡ Spring Boot Services<br/>(Auth, Products & AI Engine)"]
    end

    subgraph Data ["Data & External Services"]
        D[("🗄️ Neon PostgreSQL<br/>Serverless Database")]
        E["🤖 Hugging Face AI<br/>(BGE-M3 Vector Model)"]
        F["📧 Gmail SMTP<br/>Live Email Relay"]
        G["☁️ Cloud Storage<br/>(Cloudflare R2 / S3)"]
    end

    A -->|REST API / HTTPS| B
    B -->|Authenticated Requests| C
    
    C -->|Relational Data & Vectors| D
    C -->|Natural Language Inference| E
    C -->|OTP & Notification Mail| F
    C -->|Media & Asset Uploads| G
```

---

## 🔄 End-to-End AI Search Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Frontend as React SPA (Vite)
    participant Gateway as Spring Security Gateway
    participant AI as Hugging Face AI Engine
    participant DB as Neon PostgreSQL DB

    User->>Frontend: Enters query ("sleek dark evening blazer")
    Frontend->>Gateway: GET /api/search/ai?query=...
    Gateway->>AI: POST /inference (BGE-M3 Embedding)
    AI-->>Gateway: Returns 1024-dim Vector
    Gateway->>DB: Executes Vector Nearest-Neighbor Search
    DB-->>Gateway: Returns Matched Products
    Gateway-->>Frontend: JSON Response Payload
    Frontend-->>User: Renders Product Cards Grid
```

---

## 📂 Project Structure

```text
LUXZERA/
├── frontend/                     # React + Vite Frontend Application
│   ├── src/
│   │   ├── app/                  # Root Mounting & Router Config
│   │   ├── infrastructure/       # API Gateway & Axios Interceptors
│   │   ├── modules/
│   │   │   ├── auth/             # Auth Modal, OTP & OAuth Views
│   │   │   ├── products/         # Product Catalog & AI Search UI
│   │   │   └── profile/          # User Dashboard & Account Views
│   │   └── shared/               # UI Components, Token & Error Utils
│   └── public/                   # Public Static Assets & Logos
│
└── server/                       # Spring Boot 3.3.2 Backend Service
    └── src/main/java/com/luxzera/server/
        ├── admin/                # Super-Admin Onboarding Service
        ├── auth/                 # JWT Auth, SecurityConfig & OTP Engine
        ├── common/               # Health Probes & Shared Controllers
        ├── email/                # EmailServiceImpl & Thymeleaf Mail Engine
        ├── products/             # Product Management & AI Vector Search
        └── user/                 # User Profile & Data Access Layer
```

---

## 🛠 Technical Stack

| Tier | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, Google GSI |
| **Gateway & Security** | Spring Security 6, JWT, Axios Interceptors, Health Controllers |
| **Backend Core** | Java 17, Spring Boot 3.3.2, Spring WebFlux |
| **Database** | Neon PostgreSQL, JPA / Hibernate |
| **AI Search** | Hugging Face API (`BGE-M3` Vector Model) |
| **Email & Delivery** | JavaMailSender, Thymeleaf Templates, Gmail SMTP |
| **Asset Storage** | Cloudflare R2 / AWS S3 SDK |

---

## ⚖️ License & Copyright

© 2026 Saketh Chokkapu. All rights reserved.

The content, architecture, and design of this project are the intellectual property of Saketh Chokkapu. Unauthorized reproduction or distribution is strictly prohibited.
