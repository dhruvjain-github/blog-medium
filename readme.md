# Blogging Website Clone

This project is a basic clone of a blogging website inspired by platforms like Medium. It allows users to register, log in, create blog posts, and interact with content. The stack leverages modern technologies to ensure a scalable and maintainable codebase.

---

## 🚀 Tech Stack

- **Frontend**: React
- **Backend**: Cloudflare Workers
- **Validation & Type Inference**: Zod
- **Language**: TypeScript
- **ORM**: Prisma (with connection pooling)
- **Database**: PostgreSQL
- **Authentication**: JSON Web Token (JWT)

---

## 📋 Prerequisites

1. Ensure you have **Node.js** (v16+) and **npm** installed.
2. Install **Wrangler** for deploying and managing Cloudflare Workers.
   ```bash
   npm install -g wrangler
3. PostgreSQL database set up and running.
4. Prisma CLI installed globally:
    ```bash
    npm install -g prisma

## 🛠️ Project Setup
Step 1: Clone the repository
    ```bash
    git clone <repository-url>
    cd blogging-website-clone

Step 2: Install dependencies
Navigate to each folder (frontend, backend, etc.) and install dependencies:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install


Step 3: Configure environment variables
Backend Configuration:
    1. Add the following variables in the wrangler.toml file:
    ```bash
    DATABASE_URL="<your_postgres_database_url>"
    JWT_SECRET="<your_jwt_secret>"

    2. Replace <your_postgres_database_url> with your PostgreSQL connection string.
    3. Replace <your_jwt_secret> with a secure random string for JWT authentication.

Step 4: Initialize Prisma
Run the following commands to initialize and sync the database schema:
    ```bash
    cd backend
    npx prisma generate
    npx prisma db push

Step 5: Run the backend
Use Wrangler to start the backend locally:
    ```bash
    wrangler dev

Step 6: Run the frontend
Navigate to the frontend folder and start the development server:
    ```bash
    cd frontend
    npm start

## ✨ Features
User Authentication (Signup & Login)
JWT-based session management
Blog post creation, editing, and deletion
View and interact with blog posts
Type-safe validation using Zod
