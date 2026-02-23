# NTT Tech FE

Mini project dashboard menggunakan React + TypeScript dengan fitur autentikasi dan CRUD produk.

## Tech Stack

- **React 19** + TypeScript
- **Vite** — build tool
- **TailwindCSS v4** — styling
- **Zustand** — state management
- **React Router v7** — routing
- **Axios** — HTTP client

## Fitur

- 🔐 Login / Logout (JWT)
- 🏠 Dashboard dengan sidebar & navbar
- 📦 Product CRUD (List, Search, Detail, Add, Edit, Delete)
- 🔒 Protected routes
- 🧩 Reusable components (Atomic Design)

## Design Pattern

Menggunakan **Atomic Design** pattern:

```
src/
├── components/
│   ├── atoms/          # Button, Input, Label, Spinner
│   ├── molecules/      # InputField, SearchBar, ProductCard
│   ├── organisms/      # Sidebar, Navbar, ProductForm
│   └── templates/      # DashboardLayout
├── pages/              # LoginPage, HomePage, Product pages
├── stores/             # Zustand stores (auth, product)
├── services/           # API layer (axios)
├── types/              # TypeScript interfaces
└── routes/             # Route definitions & guards
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm

### Install & Run

```bash
pnpm install
pnpm dev
```

Buka [http://localhost:5173](http://localhost:5173)

### Build

```bash
pnpm build
```

## Demo Account

| Username | Password   |
| -------- | ---------- |
| emilys   | emilyspass |

## API

Menggunakan [DummyJSON](https://dummyjson.com) sebagai REST API:

- Auth: `https://dummyjson.com/auth/login`
- Products: `https://dummyjson.com/products`
