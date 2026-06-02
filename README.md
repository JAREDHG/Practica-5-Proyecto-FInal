# Práctica 04: Carrito de Compras con Pinia y Backend Laravel

Proyecto desarrollado como parte del curso de Desarrollo Full-Stack, enfocado en la implementación de un **Carrito de Compras** con gestión de estado global, persistencia de datos y transacciones seguras.

## Descripción del Proyecto
Este sistema amplía la funcionalidad de la SPA, integrando **Pinia** para la gestión reactiva del estado del carrito y sincronización automática con `localStorage`. Incluye un flujo completo de compra conectado a una API REST segura.

## Tecnologías Utilizadas

### Frontend
- **Vue 3 (Vite):** Interfaz reactiva y moderna.
- **Pinia:** Gestión de estado global (Carrito, cantidades y totales).
- **Axios:** Consumo de servicios RESTful.
- **Bootstrap 5:** Diseño responsivo y componentes de UI.

### Backend
- **Laravel 10:** API RESTful.
- **Laravel Sanctum:** Protección de endpoints de pedidos.
- **MariaDB:** Base de datos relacional (Relación muchos a muchos: `pedidos` y `productos`).

## Características Principales
- **Estado Global:** Gestión de items, cálculos de totales y getters mediante Pinia.
- **Persistencia:** Sincronización transparente con `localStorage` para persistir el carrito tras recargas.
- **Flujo de Compra:** Finalización de pedidos mediante peticiones protegidas (Auth: Sanctum).
- **Interfaz Reactiva:** Botones dinámicos en catálogo y badge de carrito en tiempo real.

## ⚙️ Instrucciones de Instalación
1. **Backend:** `cd backend`, `composer install`, `php artisan migrate`, `php artisan serve`.
2. **Frontend:** `cd frontend`, `npm install`, `npm run dev`.

**Desarrollado por:** Jared Hernández González - Universidad Politécnica de Texcoco (UPTex)