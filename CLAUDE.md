# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EcoPackStore is a monorepo with an e-commerce platform for eco-friendly packaging products.

### Structure
```
Eco/
├── eco-frontend/   # React 18 + Vite + Tailwind CSS v4 + DaisyUI v5
└── eco-backend/    # Node.js + Express + MongoDB (Mongoose) + JWT auth
```

## Commands

### Frontend (eco-frontend/)
```bash
cd eco-frontend && npm run dev    # Start dev server on http://localhost:5173
cd eco-frontend && npm run build  # Production build
cd eco-frontend && npm run lint   # Run ESLint
```

### Backend (eco-backend/)
```bash
cd eco-backend && npm run dev     # Start server on http://localhost:5173
cd eco-backend && npm run seed    # Seed MongoDB with sample data
```

## Architecture

### Frontend
- **API client**: `src/eco/client.js` — axios instance with baseURL="/api"
- **State management**:
  - `AuthContext.jsx` — user authentication state
  - `useCart.js` — cart state via TanStack React Query
- **Routing**: `App.jsx` — BrowserRouter with paths: `/`, `/products`, `/cart`, `/auth`, `/carbon`, `/about`, `/account`, `/account/orders`
- **Styling**: Tailwind CSS v4 with custom tokens in `src/index.css` (see eco-frontend/CLAUDE.md for color tokens)

### Backend
- **Entry point**: `src/server.js`
- **Routes**: All prefixed with `/eco/` (e.g., `/eco/auth`, `/eco/products`, `/eco/cart`, `/eco/orders`)
- **Auth flow**: JWT in `Authorization: Bearer <token>` header; `protect` middleware verifies, `authorize(...roles)` checks user role
- **Error handling**: All errors passed to `next(err)`; global handler in `server.js`

### Data Flow
1. Frontend calls API via `src/eco/*.js` modules (auth.js, products.js, cart.js, orders.js)
2. Backend validates input with express-validator, authenticates with JWT
3. MongoDB queries via Mongoose models (User, Product, Cart, Order, Review, Wishlist)
4. Errors bubble up through controller → global handler

## Key Conventions
- **Code style**: `const`/`let` only (no `var`), named exports for utilities, async/await only
- **API errors**: Always call `next(err)` in Express controllers
- **Frontend colors**: Use hex values `text-[#1a2e1a]`, never hardcoded or token names
- **Component structure**: One default export per component, props destructured at signature

## Environment Variables

### Backend (.env in eco-backend/)
```
PORT=5173
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ecopackstore
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```
