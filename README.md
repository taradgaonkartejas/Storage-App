# Storage Web App

A storage web application built with React, Node.js, MySQL, Multer, Prisma, and Vite. This app allows users to upload, download, and manage files within a folder structure.

## Features

- Upload files to specified folders.
- List and view uploaded files.
- Download files.
- Delete files.
- Organize files within folders.

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Axios
- **Backend**: Node.js, Express, TypeScript, Multer
- **Database**: MySQL with Prisma ORM
- **Bundler**: Vite

## Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- MySQL

## Getting Started

### Backend Setup

1. Clone the repository

   ```sh
   git clone https://github.com/your-username/storage-web-app.git
   cd storage-web-app

2. Install dependencies

   cd server
   npm install   

3. Set up the database

   Create a MySQL database.
   Update the DATABASE_URL in the .env file with your database credentials.

   DATABASE_URL="mysql://user:password@localhost:3306/database_name"

4. Generate Prisma client

   npx prisma generate
   npx prisma migrate dev --name init

5. Start the backend server

   npm run dev


### Frontend Setup

1. Navigate to the client directory

   cd ../client

2. Install dependencies

   npm install

3. Set up environment variables

   Create a .env file in the client directory with the following content:
   VITE_SERVER_URL=http://localhost:3000

4. Start the frontend development server

   npm run dev



storage-web-app/
├── server/              # Backend source code
│   ├── prisma/          # Prisma schema and migrations
│   ├── src/             # Source code
│   ├── .env             # Environment variables
│   ├── package.json     # NPM configuration
│   └── ...              # Other backend-related files
├── client/              # Frontend source code
│   ├── src/             # Source code
│   ├── public/          # Public assets
│   ├── .env             # Environment variables
│   ├── package.json     # NPM configuration
│   └── ...              # Other frontend-related files
└── README.md            # Project documentation




