# LuxZera | Modern AI-Powered Luxury E-Commerce Ecosystem

LuxZera is a high-performance, intelligent luxury e-commerce platform built with Spring Boot 3.3.2 and React. Integrating natural language vector embeddings with a decoupled micro-architecture, LuxZera delivers context-aware semantic product discovery and production-grade security.

---

## 🏛 System Architecture

The LuxZera architecture decouples presentation, security filtering, domain microservices, and external integrations (Database, AI Inference, and SMTP Email dispatch).

### Component Flowchart

```mermaid
flowchart TD
    subgraph Client ["Frontend Layer (Vite + React)"]
        UI["React SPA & Custom Design System"]
        AuthModal["Auth Modal & Google OAuth 2.0"]
        SearchUI["AI Natural Language Search Bar"]
        Gateway["API Gateway Interceptor"]
    end

    subgraph Security ["Security & Gateway Layer"]
        SecurityConfig["Spring Security 6 & SecurityFilterChain"]
        JWTFilter["JwtAuthenticationFilter"]
        HealthCtrl["HealthController (GET / & /health)"]
    end

    subgraph Backend ["Backend Microservices (Spring Boot 3.3.2 / Java 17)"]
        AuthService["AuthServiceImpl & OtpService"]
        EmailService["EmailServiceImpl (Thymeleaf SMTP)"]
        ProductService["Product & AI Search Service"]
    end

    subgraph External ["Data & Third-Party Integration Layer"]
        Postgres[(Neon PostgreSQL Database)]
        GmailSMTP["Gmail SMTP Server (Port 587)"]
        GoogleOAuth["Google Identity Provider"]
        HuggingFace["Hugging Face AI (BGE-M3 Embeddings)"]
        CloudStorage["Cloudflare R2 / AWS S3 Storage"]
    end

    UI --> Gateway
    AuthModal --> GoogleOAuth
    Gateway -->|HTTP / REST API| SecurityConfig
    SecurityConfig --> JWTFilter
    JWTFilter --> HealthCtrl
    JWTFilter --> AuthService
    JWTFilter --> ProductService

    AuthService --> EmailService
    EmailService -->|SMTP Dispatch| GmailSMTP
    AuthService -->|JPA / Hibernate| Postgres
    ProductService -->|JPA / Hibernate| Postgres
    ProductService -->|Vector Inference| HuggingFace
    ProductService -->|Media Storage| CloudStorage
```

### AI Search Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Frontend as Vite + React SPA
    participant Backend as Spring Boot API Gateway
    participant DB as Neon PostgreSQL
    participant AI as Hugging Face AI Engine

    User->>Frontend: Enters natural language query
    Frontend->>Backend: GET /api/search/ai?query=...
    Backend->>AI: POST /inference (BGE-M3 Vector Embedding)
    AI-->>Backend: Returns Semantic Vector Payload
    Backend->>DB: Executes Vector Nearest-Neighbor Query
    DB-->>Backend: Returns Matching Product Records
    Backend-->>Frontend: JSON Product Data Response
    Frontend-->>User: Displays Intelligent Match Cards
```

---

## 📂 Project Structure

```text
LUXZERA/
├── frontend/                     # React + Vite Frontend Application
│   ├── src/
│   │   ├── app/                  # Application Root & Mounting
│   │   ├── infrastructure/       # API Gateway & Axios Configuration
│   │   ├── modules/
│   │   │   ├── auth/             # Auth Modal, OTP, Google OAuth & Pages
│   │   │   ├── products/         # Product Catalog & AI Search
│   │   │   └── profile/          # User Settings & Profile Views
│   │   └── shared/               # UI Components, Token & Error Utils
│   └── public/                   # Static Assets & Logos
│
└── server/                       # Spring Boot 3.3.2 Backend Service
    └── src/main/java/com/luxzera/server/
        ├── admin/                # Admin Management & Onboarding
        ├── auth/                 # JWT Auth, SecurityConfig & OTP Service
        ├── common/               # Health Checks & Shared Utilities
        ├── email/                # EmailServiceImpl & Thymeleaf Templates
        ├── products/             # Product Management & AI Search Service
        └── user/                 # User Profile & Data Access Layer
```

---

## 🛠 Technical Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS, Lucide Icons, Google GSI |
| **Backend** | Java 17, Spring Boot 3.3.2, Spring Security, Spring WebFlux |
| **Database & ORM** | Neon PostgreSQL, JPA / Hibernate |
| **AI Inference** | Hugging Face API (`BGE-M3` Vector Model) |
| **Email & Delivery**| JavaMailSender, Thymeleaf Templates, Gmail SMTP |
| **Storage & Storage**| Cloudflare R2 / AWS S3 SDK |

---

## ⚖️ License & Copyright

© 2026 Saketh Chokkapu. All rights reserved.

The content, architecture, and design of this project are the intellectual property of Saketh Chokkapu. Unauthorized reproduction or distribution is strictly prohibited.
