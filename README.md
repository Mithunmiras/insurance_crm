# User Management System

A complete user management system built with React, Ant Design, and Express.js.

## Features

- ✅ Reusable DataTable component with CRUD operations
- ✅ User creation, editing, and deletion
- ✅ Advanced filtering with drawer
- ✅ Premium UI design matching USICA screenshots
- ✅ Backend API integration
- ✅ Avatar management with initials
- ✅ Status management with colored tags

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start both frontend and backend:
```bash
npm run dev
```

3. Access the application at http://localhost:3000

## API Endpoints

- GET /api/users - Fetch all users
- POST /api/users - Create new user
- PUT /api/users/:id - Update user
- DELETE /api/users/bulk-delete - Delete multiple users
- GET /api/departments - Fetch departments
- GET /api/managers - Fetch managers

## Components

- **ReusableDataTable**: Main table component with CRUD operations
- **UsersPage**: User management page implementation
- **UserService**: API integration service