# Gigmora

Marketplace de servicios freelance con asistente de recomendación impulsado por IA (RAG).

## Demo

[Link al deploy] · [Video/capturas]

## Stack

**Backend:** Node.js, Express 4, TypeScript, Prisma 6, PostgreSQL, JWT, bcrypt
**Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router, Axios
**IA:** OpenRouter (modelo gratuito, arquitectura RAG con retrieval por palabras clave)
**Deploy:** Neon (DB) · Render (backend) · Vercel (frontend)

## Funcionalidades

- Autenticación con roles duales (cliente / proveedor)
- CRUD de servicios con control de dueño (ownership check)
- Sistema de órdenes con flujo de estados (pendiente → aceptada → en progreso → entregada → completada)
- Mensajería por orden entre cliente y proveedor
- Reseñas con calificación (solo en órdenes completadas)
- Chatbot con IA que recomienda servicios reales de la base de datos (RAG)
- Diseño mobile-first, responsive

## Correr localmente

### Backend
```bash
cd backend
npm install
cp .env.example .env   # completar con tus valores
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # completar con la URL del backend
npm run dev
```

## Estructura

gigmora/
backend/    → API REST (Express + Prisma)
frontend/   → SPA (React + Vite)

## Autor

Jhoyners Cardona — [LinkedIn] · [GitHub]