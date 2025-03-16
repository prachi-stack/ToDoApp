# ToDo App Frontend

This is the frontend for a ToDo application built with Next.js, React, and Tailwind CSS.

## Technologies Used

- **Next.js 15** - React framework with server-side rendering
- **React 19** - JavaScript library for building user interfaces
- **Tailwind CSS 4** - Utility-first CSS framework
- **Material UI** - React component library
- **Axios** - HTTP client for API requests
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Features

- Create, read, update ToDo items
- Responsive design for mobile and desktop
- Modern UI with Material UI components and lucide react

## Project Structure

- `app/` - Next.js app directory containing pages and components
- `public/` - Static assets
- `app/components/` - Reusable React components

# ToDo App Backend

This is the backend API for a ToDo application built with Node.js, Express, and MongoDB.

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Cors** - Cross-Origin Resource Sharing middleware
- **Dotenv** - Environment variable management

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

### Development

Run the development server with hot-reload:

```bash
npm run dev
# or
yarn dev
```

The server will start on port 5000 by default.

## API Endpoints

### Documents (ToDo Items)

- `GET /api/documents` - Get all documents
- `POST /api/documents` - Create a new document
- `GET /api/documents/:id` - Get a specific document
- `PUT /api/documents/:id` - Update a document
 
## Project Structure

- `config/` - Database configuration
- `controllers/` - Request handlers
- `models/` - Database models
- `routes/` - API routes
- `server.js` - Entry point 
