# Backend — EcoPackStore Express API

## Tech stack
Node.js + Express + MongoDB (Mongoose) + JWT + bcryptjs

## File structure
src/
├── config/       ← db.js (mongoose connect)
├── controllers/  ← one file per resource, all business logic lives here
├── middleware/   ← auth.js (protect + authorize), validate.js (express-validator runner)
├── models/       ← Mongoose schemas (User, Product, Cart, Order, Review, Wishlist)
├── routes/       ← thin router files, only wire middleware + controller
├── utils/        ← generateToken.js, seed.js
├── validators/   ← express-validator rule arrays
└── server.js     ← entry point

## API base URL
http://localhost:5173/eco

## All routes
POST   /eco/auth/register
POST   /eco/auth/login
GET    /eco/auth/me              (protect)
PUT    /eco/auth/change-password (protect)

GET    /eco/products             (public, supports ?category&search&sort&priceMax&certs&page&limit&featured)
GET    /eco/products/categories  (public)
GET    /eco/products/:id         (public)
POST   /eco/products             (protect, authorize admin/seller)
PUT    /eco/products/:id         (protect, authorize admin/seller)
DELETE /eco/products/:id         (protect, authorize admin)

GET    /eco/cart                 (protect)
POST   /eco/cart                 (protect) body: { productId, qty }
PUT    /eco/cart/promo           (protect) body: { code }
PUT    /eco/cart/:productId      (protect) body: { qty }
DELETE /eco/cart                 (protect)
DELETE /eco/cart/:productId      (protect)

POST   /eco/orders               (protect)
GET    /eco/orders               (protect — user gets own, admin gets all)
GET    /eco/orders/:id           (protect)
PUT    /eco/orders/:id/cancel    (protect)
PUT    /eco/orders/:id/status    (protect, authorize admin)

GET    /eco/users/profile        (protect)
PUT    /eco/users/profile        (protect)
GET    /eco/users                (protect, authorize admin)
PUT    /eco/users/:id/role       (protect, authorize admin)
DELETE /eco/users/:id            (protect, authorize admin)

GET    /eco/reviews/my           (protect)
GET    /eco/reviews/:productId   (public)
POST   /eco/reviews/:productId   (protect)
PUT    /eco/reviews/:reviewId    (protect)
DELETE /eco/reviews/:reviewId    (protect)

GET    /eco/wishlist             (protect)
POST   /eco/wishlist/:productId  (protect)
DELETE /eco/wishlist/:productId  (protect)

## Auth flow
JWT signed with JWT_SECRET, expires in JWT_EXPIRES_IN (default 7d).
Token sent in Authorization: Bearer <token> header.
protect middleware verifies token and attaches req.user.
authorize(...roles) middleware checks req.user.role.

## Error handling
All controller errors passed to next(err).
Global error handler in server.js catches all and returns { message, stack? }.
Validation errors returned as { message: "Validation failed", errors: [{ field, msg }] }.

## Models summary
User:     name, email, password(hidden), role(user/seller/admin), isBusiness, totalCO2Saved
Product:  name, desc, emoji, category, price, originalPrice, carbonSaved, moq, inStock, stock, badges, certifications, rating, numReviews, isFeatured
Cart:     user(ref), items[{ product(ref), qty, name, price, emoji, carbonSaved }], promoCode, delivery
Order:    user(ref), orderId, items[], shippingAddress, paymentMethod, delivery, subtotal, discount, total, totalCO2Saved, status
Review:   product(ref), user(ref), rating, comment, helpful — auto recalculates product.rating on save/delete
Wishlist: user(ref), products[ref]

## Environment variables (.env)
PORT=5173
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ecopackstore
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173