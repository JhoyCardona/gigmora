# Progreso de desarrollo — Gigmora

Proyecto "nivel 2" de portfolio, construido como siguiente paso después de un sistema de reservas más simple (Capilora Salón).

## Día 1 — Backend base
- Setup Express + TypeScript + Prisma
- Modelo de datos: User, Category, Service, Order, Message, Review
- Autenticación JWT (registro, login, ruta protegida)
- CRUD de categorías y servicios con validación de dueño

## Día 2 — Lógica de negocio
- Sistema de órdenes con máquina de estados
- Mensajería por orden
- Reseñas (solo en órdenes completadas, una por orden)

## Día 3 — IA
- Integración RAG: retrieval por palabras clave + generación con OpenRouter (modelo gratuito)
- Prompt ajustado para evitar alucinaciones (solo recomienda servicios reales, no inventa features de la plataforma)

## Día 4 — Frontend
- Auth, catálogo, detalle de servicio, mis órdenes, mis servicios
- Chatbot integrado en UI
- Diseño mobile-first: navbar con hamburguesa, hero con video, paleta de color coherente (ámbar sobre fondo oscuro)

## Decisiones técnicas destacadas
- Prisma 6 en vez de 7 (versión más estable en el momento del desarrollo)
- Express 4 en vez de 5 (misma razón — evitar breaking changes recientes)
- OpenRouter en vez de proveedores que requieren tarjeta (Anthropic, Google) — modelo 100% gratuito
- Ownership checks explícitos en cada endpoint de modificación (no solo autenticación, sino autorización a nivel de recurso)