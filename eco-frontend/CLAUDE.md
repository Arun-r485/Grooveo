# Frontend — EcoPackStore React App

## Tech stack
- React 18, Vite, Tailwind CSS v4, DaisyUI v5, React Router v6
- @tanstack/react-query for server state
- axios for API calls
- Inter font

## File structure
src/
├── eco/           ← axios API modules (auth.js, products.js, cart.js, orders.js, client.js)
├── components/    ← UI components grouped by feature (home/, products/, cart/, carbon/, about/, auth/, layout/, account/)
├── context/       ← AuthContext.jsx
├── data/          ← static UI config only (TRUST_BADGES, FOOTER_COLS, WHY_FEATURES etc)
├── hooks/         ← custom hooks (useCart.js etc)
├── pages/         ← one file per route, thin orchestration layer
│   └── account/   ← account sub-pages
└── index.css      ← Tailwind v4 config + @theme color tokens

## Routing (React Router v6)
All routes defined in App.jsx using BrowserRouter.
Real URL paths: / /products /cart /auth /carbon /about /account /account/orders etc.
Never use hash routing.

## Color tokens (defined in src/index.css @theme)
--color-forest-night: #1a2e1a  (header/footer bg)
--color-canopy:       #2d4a1e
--color-leaf-green:   #5a9a3a  (primary CTA)
--color-leaf-dark:    #4a8a2a
--color-spring-lime:  #8fcc60  (accents)
--color-mint-mist:    #c8e6b0  (borders)
--color-sage:         #f0f7ea  (card backgrounds)
--color-harvest-gold: #e8a020  (cart badge)
--color-urgent-coral: #d94f2e  (discounts)
--color-trust-blue:   #2c7bb5

## API
All calls go through src/api/client.js (axios instance, baseURL="/api").
Token stored in localStorage under key "token".
useAuth() hook from src/context/AuthContext.jsx manages user state.
useCart() hook from src/hooks/useCart.js manages cart state via React Query.

## Styling rules
- Use hex values directly in className: text-[#1a2e1a] NOT text-forest-night
- Rounded corners: rounded-2xl for cards, rounded-xl for buttons/inputs
- Shadows: shadow-sm default, shadow-md on hover
- Transitions: transition-colors or transition-all duration-200
- Never use Tailwind gradients — write inline style={{ background: "..." }} instead
- No emojis inside SVG
- All custom animations defined in src/index.css

## Component rules
- Every component file exports one default component
- Props must be destructured in the function signature
- No prop drilling beyond 2 levels — use context or pass callbacks
- navigate() calls use useNavigate() from react-router-dom — never a prop