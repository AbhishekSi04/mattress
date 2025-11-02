# Mattress E-commerce Platform

A Next.js application with product catalog and admin panel, using MongoDB for data storage and NextAuth for authentication.

## Features

- Product catalog with image display
- Admin panel for product management
- Image storage using MongoDB GridFS
- Authentication with NextAuth (Credentials provider)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables. Create a `.env.local` file in the root directory:
   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/mattress?retryWrites=true&w=majority
   NEXTAUTH_SECRET=<long-random-string>
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=ComplexPass123!
   ```

3. Set up MongoDB:
   - Create a MongoDB Atlas cluster or use a local MongoDB instance
   - Update `MONGODB_URI` with your connection string

4. Generate NextAuth secret:
   ```bash
   openssl rand -base64 32
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

- Visit `/products` to view the product catalog
- Visit `/admin` to access the admin panel (requires authentication)
- Sign in at `/admin/signin` with the admin credentials

## Creating Admin User (DB-backed)

If you prefer DB-backed admin instead of env variables:

1. Connect to your MongoDB database
2. Insert a document into the `admins` collection:
   ```javascript
   {
     email: "admin@example.com",
     password: "$2a$10$...", // hashed password using bcrypt
     role: "admin"
   }
   ```
3. Hash the password using bcrypt:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('yourpassword', 10));"
   ```

## Image Storage

Images are stored in MongoDB using GridFS with the bucket name `productImages`. Images are streamed directly from the database via `/api/images/[id]` endpoints.

## API Routes

- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product (admin only)
- `GET /api/images/[id]` - Stream image by ID
- `POST /api/auth/[...nextauth]` - NextAuth authentication