<div align="center">

# ✈️ Smart Travel Planner

**Discover destinations. Plan meaningful trips. Travel together.**

A full-stack travel planning application being built with React, Node.js, Express, and PostgreSQL. The goal is to make it easier for travellers to explore places, manage trips, build daily itineraries, and collaborate with friends — with optional AI-assisted suggestions.

**🚧 Under active development — not yet production-ready**

[Features](#-planned-features) • [Tech stack](#-technology-stack) • [Getting started](#-getting-started) • [Roadmap](#-development-roadmap)

</div>

---

## 🌍 About the project

Planning a trip often means switching between maps, notes, spreadsheets, booking documents, and group chats. Smart Travel Planner aims to bring essential trip-planning workflows together in one place.

This is also an end-to-end software engineering project: requirements, architecture, frontend, APIs, database design, testing, CI/CD, and deployment are developed and documented incrementally.

## ✅ Current progress

| Area | Status |
| --- | --- |
| React + Vite + Tailwind CSS setup | ✅ Implemented |
| Shared application layout and client-side routing | ✅ Implemented |
| Registration page with React Hook Form + Zod validation | ✅ Frontend implemented |
| Login page with React Hook Form + Zod validation | ✅ Frontend implemented |
| Monorepo structure (`frontend/`, `backend/`) | ✅ Set up |
| Basic Express server / health endpoint | ✅ Set up locally |
| PostgreSQL + Prisma integration | 🔜 Planned |
| Real registration, login, sessions, and authorization | 🔜 Planned |
| Trip CRUD, destination discovery, and itineraries | 🔜 Planned |
| AI, collaboration, organizer, and production deployment | 🔜 Planned |

> **Important:** Login and registration currently validate form input in the browser; they do **not** create or authenticate user accounts yet. Existing application routes are not protected until backend authentication is implemented.

## ✨ Planned features

The following modules describe the **target core MVP**, not functionality already released.

- **Authentication:** registration, sign-in, sign-out, secure sessions, and protected routes.
- **Trip management:** create, view, update, and delete trips with destinations and travel dates.
- **Destination explorer:** search destinations, browse featured places, and explore attractions on a map.
- **Itinerary planning:** organize activities by day; add, edit, reorder, and remove places.
- **AI assistance:** generate itinerary suggestions based on dates, interests, and preferences, with user review before saving.
- **Group collaboration:** invite friends and grant owner, editor, or viewer permissions.
- **Trip organizer:** store notes, checklists, and authorized travel documents.

**Possible later enhancements:** weather, currency tools, expense splitting, journals, and offline support.

## 🧰 Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, JavaScript (JSX), Vite |
| UI | Tailwind CSS |
| Navigation | React Router |
| Forms | React Hook Form, Zod, `@hookform/resolvers` |
| Backend | Node.js, Express |
| Database | PostgreSQL *(planned integration)* |
| ORM | Prisma *(planned integration)* |
| Maps | Leaflet + OpenStreetMap data *(planned; provider limits apply)* |
| AI | Locally hosted open-weight model via Ollama *(under evaluation)* |
| Testing | Vitest / Playwright *(planned)* |
| CI/CD | GitHub Actions *(planned)* |

The project prioritizes **free and open-source software** and a **£0 development budget**. Hosted services may have quotas or infrastructure costs, so deployment providers will be evaluated before use.

## 🏗️ Architecture

The codebase is a **monorepo** with separately runnable frontend and backend applications. The intended backend architecture is a modular monolith.

```text
Browser (React)
    │ HTTPS / JSON
    ▼
Node.js + Express API
    │
    ├── Authentication / authorization
    ├── Trips / itineraries / collaboration
    ├── Destination and AI integrations
    └── Prisma (planned)
            │
            ▼
       PostgreSQL (planned)
```

Frontend, backend, and database can be **hosted independently**, even though their source code lives in one repository.

### Repository structure

```text
smart-travel-planner/
├── frontend/           # React application (Vite)
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/            # Express API
│   ├── src/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── docs/               # Architecture and project documentation (as added)
├── .gitignore
└── README.md
```

## 🚀 Getting started

### Prerequisites

- Git
- Node.js and npm (use a current Node.js LTS version compatible with your installed Vite release)

### 1. Clone the repository

```bash
git clone https://github.com/SivaganeshSelvam23/Smart-Travel-Planner-App.git
cd Smart-Travel-Planner-App
```

### 2. Run the frontend

In one terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

Useful routes at the current stage:

| Route | Purpose |
| --- | --- |
| `/register` | Registration UI + client-side validation |
| `/login` | Login UI + client-side validation |
| `/dashboard` | Dashboard placeholder |
| `/explore` | Destination explorer placeholder |
| `/trips` | Trips placeholder |

### 3. Run the backend

Open a **second terminal** from the repository root:

```bash
cd backend
npm install
npm run dev
```

If the initial Express health endpoint is present, check:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "Smart Travel Planner API is running"
}
```

The frontend and backend currently run independently. API integration will be added during the authentication milestone.

## 🔐 Security approach

Security implementation is ongoing. The planned baseline includes:

- Backend validation of all untrusted input.
- Password hashing; never storing plaintext passwords.
- Server-enforced authentication and trip-level authorization.
- Role-based permissions: owner, editor, and viewer.
- Keeping secrets out of the repository and browser bundles.
- Controlled file access and safe upload validation.

**Do not use this development version to store real credentials or sensitive travel documents.**

## 🗺️ Development roadmap

- [x] Requirements and initial architecture planning
- [x] Initialize React frontend, routing, and layouts
- [x] Implement registration and login UI with schema validation
- [x] Organize frontend and backend into a monorepo
- [x] Initialize a basic Express API
- [ ] Set up PostgreSQL and Prisma
- [ ] Build registration/login endpoints and secure sessions
- [ ] Connect React forms to the backend and protect routes
- [ ] Build the dashboard and trip management CRUD
- [ ] Implement destination discovery and maps
- [ ] Implement manual and AI-assisted itineraries
- [ ] Add group invitations and permissions
- [ ] Add documents, notes, and checklists
- [ ] Add automated tests and GitHub Actions workflows
- [ ] Deploy and document the complete MVP

## 🤝 Contributing

This is currently a learning and portfolio project. Issues and constructive feedback are welcome. Before proposing significant changes, open an issue to discuss the scope.

## 📄 License

**License not yet selected.** Source availability on GitHub does not by itself grant an open-source licence. An appropriate licence will be added before inviting redistribution or reuse.

---

<div align="center">

**Built to learn real-world full-stack engineering — from system design to deployment.**

</div>
