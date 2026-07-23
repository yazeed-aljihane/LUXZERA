# LuxZera | High-Performance AI Luxury E-Commerce Platform

LuxZera is an intelligent luxury e-commerce platform engineered with Spring Boot 3.3.2 and React. LuxZera combines natural language vector embeddings with decoupled microservices, live email dispatch, and enterprise security.

---

## 🏛 High-Level System Architecture (HLD)

LuxZera follows a clean 3-tier high-level system architecture connecting the Presentation Layer, Platform & Gateway Layer, and Data & Infrastructure Layer.

```mermaid
flowchart LR
    subgraph Presentation ["1. Presentation Layer"]
        UI["📱 Client Application<br/>(React 18 SPA)"]
    end

    subgraph CorePlatform ["2. Platform & Gateway Layer"]
        Gateway["🛡️ Spring Security & Gateway"]
        Services["⚡ Core Business Services"]
    end

    subgraph Infrastructure ["3. Data & Cloud Layer"]
        Data[("🗄️ Serverless PostgreSQL")]
        AI["🤖 Hugging Face Vector AI"]
        Mail["📧 Gmail SMTP Relay"]
        Cloud["☁️ Cloud Asset Storage"]
    end

    UI -->|HTTPS / REST API| Gateway
    Gateway --> Services
    
    Services --> Data
    Services --> AI
    Services --> Mail
    Services --> Cloud
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

| Layer | Technologies |
| :--- | :--- |
| **Presentation** | React 18, Vite, Tailwind CSS, Lucide Icons, Google GSI |
| **Gateway & Security** | Spring Security 6, JWT, Axios Interceptors, Health Controllers |
| **Core Platform** | Java 17, Spring Boot 3.3.2, Spring WebFlux |
| **Database** | Neon PostgreSQL, JPA / Hibernate |
| **AI Vector Search** | Hugging Face API (`BGE-M3` Vector Model) |
| **Email & Delivery** | JavaMailSender, Thymeleaf Templates, Gmail SMTP |
| **Media Storage** | Cloudflare R2 / AWS S3 SDK |

---

## ⚖️ License & Copyright

© 2026 Saketh Chokkapu. All rights reserved.

The content, architecture, and design of this project are the intellectual property of Saketh Chokkapu. Unauthorized reproduction or distribution is strictly prohibited.
