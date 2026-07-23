# LuxZera | High-Performance AI Luxury E-Commerce Platform

LuxZera is a high-performance, intelligent luxury e-commerce ecosystem built with Spring Boot 3.3.2 and React. Featuring a 4-tier architecture, LuxZera combines natural language vector embeddings with decoupled microservices, automated email dispatch, and enterprise security.

---

## 🏛 High-Level System Architecture (HLD)

The LuxZera system architecture follows a clean 4-tier design separating Presentation, Gateway Security, Business Microservices, and Data & External Infrastructure.

### High-Level Architecture Diagram

```mermaid
graph TD
    %% ── TIER 1: CLIENT TIER ──
    subgraph TIER1 ["1. Client & Presentation Tier"]
        Client["Web Client / Mobile Browser"]
        ReactApp["React 18 SPA (Vite Engine)"]
        AuthUI["Auth Modal & GSI Google Sign-In"]
        SearchUI["AI Natural Language Discovery UI"]
    end

    %% ── TIER 2: API & SECURITY GATEWAY ──
    subgraph TIER2 ["2. Security & API Gateway Tier"]
        Gateway["Axios API Gateway Interceptor"]
        SecurityGate["Spring Security 6 Gateway"]
        JWTFilter["Stateless JWT Authentication Filter"]
        HealthProbe["Cloud Health Monitor (GET / & /health)"]
    end

    %% ── TIER 3: BUSINESS & MICROSERVICES TIER ──
    subgraph TIER3 ["3. Business Microservices Tier (Spring Boot 3.3.2)"]
        AuthEngine["Authentication & OTP Engine"]
        MailEngine["Thymeleaf SMTP Email Engine"]
        ProductEngine["Product Catalog Microservice"]
        AISearchEngine["AI Semantic Vector Search Service"]
        AdminEngine["Super-Admin Onboarding Service"]
    end

    %% ── TIER 4: DATA & INFRASTRUCTURE TIER ──
    subgraph TIER4 ["4. Data & External Infrastructure Tier"]
        PostgresDB[(Neon PostgreSQL Serverless DB)]
        GoogleAuth["Google Identity Provider (OAuth 2.0)"]
        GmailSMTP["Gmail SMTP Relay (Port 587)"]
        HuggingFaceAI["Hugging Face AI (BGE-M3 Embeddings)"]
        CloudStorage["Cloudflare R2 / AWS S3 Storage"]
    end

    %% ── TIER CONNECTIONS ──
    Client --> ReactApp
    ReactApp --> AuthUI
    ReactApp --> SearchUI
    AuthUI -.->|SSO Authentication| GoogleAuth

    ReactApp --> Gateway
    Gateway -->|HTTPS / JSON REST API| SecurityGate
    SecurityGate --> JWTFilter
    JWTFilter --> HealthProbe

    JWTFilter --> AuthEngine
    JWTFilter --> ProductEngine
    JWTFilter --> AISearchEngine
    JWTFilter --> AdminEngine

    AuthEngine --> MailEngine
    MailEngine -->|Live OTP Delivery| GmailSMTP

    AuthEngine -->|JPA / Hibernate| PostgresDB
    ProductEngine -->|JPA / Hibernate| PostgresDB
    AdminEngine -->|JPA / Hibernate| PostgresDB

    AISearchEngine -->|Generate Vector Embeddings| HuggingFaceAI
    AISearchEngine -->|Vector Nearest-Neighbor Query| PostgresDB
    ProductEngine -->|Asset Management| CloudStorage
```

---

## 🔄 End-to-End AI Search Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Frontend as React SPA (Vite)
    participant Gateway as Spring Security Gateway
    participant AI as Hugging Face (BGE-M3 Model)
    participant DB as Neon PostgreSQL DB

    User->>Frontend: Enters query ("sleek dark evening blazer")
    Frontend->>Gateway: GET /api/search/ai?query=...
    Gateway->>AI: POST /inference (Vector Embedding Generation)
    AI-->>Gateway: Returns 1024-dim Dense Vector
    Gateway->>DB: Executes Vector Nearest-Neighbor Search
    DB-->>Gateway: Returns Matched Product Records
    Gateway-->>Frontend: JSON Response Payload
    Frontend-->>User: Renders High-Relevance Product Grid
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

## 🛠 Technical Stack Overview

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons | Single Page Application & Modern UI |
| **API & Gateway** | Spring Security 6, JWT, Axios Interceptors | Security Filtering & CORS Management |
| **Backend Core** | Java 17, Spring Boot 3.3.2, Spring WebFlux | Microservices Business Logic |
| **Database** | Neon PostgreSQL, JPA / Hibernate | Serverless Relational Storage |
| **AI Vector Engine** | Hugging Face Inference API (`BGE-M3`) | Natural Language Semantic Discovery |
| **Email Service** | JavaMailSender, Thymeleaf, Gmail SMTP | Live OTP & Password Reset Dispatch |
| **Media Storage** | Cloudflare R2 / AWS S3 SDK | Product Image & Asset Hosting |

---

## ⚖️ License & Copyright

© 2026 Saketh Chokkapu. All rights reserved.

The content, architecture, and design of this project are the intellectual property of Saketh Chokkapu. Unauthorized reproduction or distribution is strictly prohibited.
