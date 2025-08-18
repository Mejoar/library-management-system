# 📚 Chris Library Management System - Setup Guide

Welcome to your personalized library management system! This guide will help you get Chris Library up and running.

## 🎯 What is Chris Library?

Chris Library Management System is a modern, full-stack web application designed specifically for managing Chris's personal library collection. It features:

- **Modern UI/UX**: Built with React and Tailwind CSS
- **Real-time Updates**: Socket.IO for live notifications
- **Role-based Access**: Admin and user roles
- **Book Management**: Complete CRUD operations for books
- **Transaction Tracking**: Book requests, approvals, and returns
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

Make sure you have installed:
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **PNPM** (recommended) or npm

### 1. Install Dependencies

```bash
# Install all dependencies for both frontend and backend
pnpm run install:all
```

### 2. Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update the `MONGO_URI` in your `.env` file

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/chris_library

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_chris_library_jwt_key
JWT_EXPIRE=7d

# Client Configuration
CLIENT_URL=http://localhost:5173
```

### 4. Start the Application

```bash
# Start both frontend and backend concurrently
pnpm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 👤 Demo Accounts

The system comes with pre-configured demo accounts:

### Admin Account
- **Email**: chris@chrislibrary.com
- **Password**: chris123
- **Capabilities**: Full system administration, book management, user management

### User Account  
- **Email**: reader@chrislibrary.com
- **Password**: reader123
- **Capabilities**: Browse books, request books, view transaction history

## 🛠️ Development Commands

```bash
# Install dependencies for all projects
pnpm run install:all

# Start development servers (frontend + backend)
pnpm run dev

# Start only backend
pnpm run dev:backend

# Start only frontend
pnpm run dev:frontend

# Build for production
pnpm run build

# Start production server
pnpm start
```

## 📱 Features Overview

### For Users
- **Browse Books**: Search and filter through the library catalog
- **Request Books**: Submit book requests for approval
- **Track Requests**: Monitor request status and history
- **Profile Management**: Update personal information
- **Real-time Notifications**: Get notified of approvals/rejections

### For Admins (Chris)
- **Dashboard**: Overview of library statistics
- **Book Management**: Add, edit, delete books from catalog
- **User Management**: View and manage library users
- **Transaction Management**: Approve/reject requests, manage returns
- **Real-time Monitoring**: Live updates on system activity

## 🎨 Customization

The system is fully customized for Chris Library with:
- Custom branding and colors
- Chris Library logo and favicon
- Personalized welcome messages
- Chris-specific email domains (@chrislibrary.com)
- Custom database naming (chris_library)

## 🔧 Configuration Files

- **Frontend Config**: `frontend/vite.config.js`
- **Tailwind Config**: `frontend/tailwind.config.js` 
- **Backend Config**: `backend/server.js`
- **Database Models**: `backend/models/`
- **API Routes**: `backend/routes/`

## 📚 Technology Stack

### Backend
- **Node.js & Express.js**: Server framework
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication
- **Socket.IO**: Real-time communication
- **bcryptjs**: Password hashing

### Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling framework
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Lucide React**: Icons

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify database permissions

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill processes using ports 5000 or 5173

3. **Dependencies Issues**
   - Clear node_modules: `rm -rf node_modules package-lock.json`
   - Reinstall: `pnpm install`

### Getting Help

1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all required services are running
4. Check network connectivity for external services

## 🎉 Congratulations!

Your Chris Library Management System is now ready! You can:

1. **Log in as admin** to set up your book collection
2. **Add books** to build your library catalog
3. **Create user accounts** for family/friends who want to borrow books
4. **Start managing** your library digitally

Enjoy your personalized library management experience! 📖✨

---

**Chris Library Management System** © 2025 - Built with ❤️ using the MERN stack
