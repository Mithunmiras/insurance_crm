# DentexA - Dental CRM Frontend

A modern, responsive frontend for the DentexA Dental CRM system built with React, Vite, and Material-UI.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

3. **Build for production**
```bash
npm run build
```

## 🏗️ Architecture

### Technology Stack
- **React 18** with Vite
- **Material-UI (MUI)** for components
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Zustand** for state management (ready for backend integration)

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components
│   └── layout/         # Layout components
├── pages/              # Main page components
├── features/           # Feature-specific components
├── store/              # State management
├── lib/                # Utilities and API client
└── assets/             # Static assets
```

## 🎨 Features

### Implemented Pages
- **Dashboard** - AI Business Intelligence, KPIs, Branch summaries
- **Branch Management** - Multi-branch cards with performance metrics
- **User Management** - Staff table with roles and performance
- **Patient Records** - Patient management with status tracking
- **Appointments** - Appointment scheduling and management
- **Billing & Payments** - Payment dashboard (structure ready)
- **Customer Service** - Support dashboard (structure ready)
- **AI Assistant** - Chat interface (structure ready)
- **Inventory** - Stock management (structure ready)
- **Reports & Analytics** - Analytics dashboard (structure ready)
- **Settings** - Configuration panel (structure ready)

### Design System
- **Brand Colors**: Blue gradient theme (#667eea to #764ba2)
- **Animations**: Aurora, shimmer, fade-in, slide-in effects
- **Typography**: Inter font family
- **Responsive**: Mobile-first design approach

### Key Components
- **Layout System**: Header with search, notifications, profile dropdown
- **Sidebar Navigation**: Revenue widget, menu items with badges
- **Data Tables**: Sortable, filterable tables for all data views
- **KPI Cards**: Animated metric cards with trend indicators
- **Action Buttons**: Gradient buttons with shimmer animations

## 🔧 Backend Integration

The frontend is ready for backend integration. Key integration points:

### API Client
- `src/lib/api.js` - Configured API client ready for backend URLs
- `src/store/authStore.js` - Authentication state management

### Mock Data
Currently using mock data in components. Replace with API calls:
- Branch data in `BranchManagement.jsx`
- Staff data in `UserManagement.jsx`
- Patient data in `PatientRecords.jsx`
- Appointment data in `Appointments.jsx`

### Authentication
- Login flow ready in `SimpleLogin.jsx`
- Protected routes configured in `App.jsx`
- Role-based access control structure in place

## 🎯 Next Steps for Backend Integration

1. **Update API endpoints** in `src/lib/api.js`
2. **Replace mock data** with actual API calls
3. **Configure authentication** in `authStore.js`
4. **Add error handling** for API responses
5. **Implement loading states** for data fetching

## 📱 Responsive Design

- **Mobile**: Optimized for touch interactions
- **Tablet**: Adaptive layouts for medium screens
- **Desktop**: Full feature set with multi-column layouts

## 🚀 Deployment Ready

The frontend is production-ready and can be deployed independently:

```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

## 🤝 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Structure
- **Feature-based organization** for scalability
- **Reusable components** for consistency
- **Professional animations** for user experience
- **Type-safe patterns** ready for TypeScript migration

---

**Ready for backend integration by your development team!**