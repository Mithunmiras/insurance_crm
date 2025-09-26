# DentexA - AI-Powered Multi-Branch Dental CRM

A comprehensive, enterprise-grade dental clinic management system built with modern technologies and professional architecture patterns.

## 🏗️ Architecture Overview

### Multi-Tenant SaaS Platform
- **Super Admin (Digitner Tech)**: Manages clinic onboarding and platform oversight
- **Clinic Admin**: Full operational control within their clinic
- **Branch Head**: Branch-specific management capabilities  
- **Doctor**: Multi-branch scheduling and patient management
- **Patient**: Self-service portal for appointments and records

### Technology Stack

#### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with optimized indexes and aggregation pipelines
- **Authentication**: JWT with role-based access control (RBAC)
- **Security**: Helmet, rate limiting, input validation
- **Architecture**: Feature-based modular structure

#### Frontend
- **Framework**: React 18 with Vite
- **UI Library**: Material-UI (MUI) with custom theme
- **Animations**: Framer Motion for fluid interactions
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS + MUI integration

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB 4.4+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd dental-crm
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

4. **Database Setup**
```bash
# Start MongoDB service
# Create initial super admin (optional)
cd backend
npm run seed:admin
```

## 📊 Key Features

### Dashboard & Analytics
- Real-time KPI monitoring with MongoDB aggregation
- AI-powered business intelligence insights
- Multi-branch performance comparison
- Revenue analytics with interactive charts

### Multi-Tenant Architecture
- Complete data isolation between clinics
- Scalable role-based permissions
- Branch-specific access controls
- Doctor multi-branch assignments

### Patient Management
- Comprehensive patient profiles
- Medical history tracking
- Insurance management
- Risk assessment algorithms

### Appointment System
- Multi-branch scheduling
- Doctor availability management
- Automated reminders
- Treatment planning integration

### Billing & Payments
- Invoice generation and tracking
- Multiple payment method support
- Outstanding balance monitoring
- Financial reporting

### AI Assistant
- Clinical knowledge base
- Smart search capabilities
- Data-driven recommendations
- Best practices guidance

### Inventory Management
- Stock level monitoring
- Automated reorder alerts
- Supplier management
- Expiry date tracking

## 🔧 Development

### Project Structure

```
dental-crm/
├── backend/
│   ├── api/
│   │   ├── models/          # MongoDB schemas
│   │   └── controller/      # Business logic
│   ├── middleware/          # Auth, validation, RBAC
│   ├── routes/             # API endpoints
│   └── config/             # Database, JWT config
├── frontend/
│   ├── src/
│   │   ├── features/       # Feature-based modules
│   │   ├── shared/         # Reusable components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # Zustand stores
│   │   └── lib/            # Utilities, API client
└── README.md
```

### Database Optimization

#### Indexes
All collections include optimized indexes for:
- Multi-tenant queries (`clinicId`)
- Role-based filtering (`role`, `isActive`)
- Search operations (text indexes)
- Date-based queries (`createdAt`, `appointmentDate`)

#### Aggregation Pipelines
- Dashboard KPIs calculated server-side
- Revenue analytics with time-based grouping
- Patient growth metrics
- Treatment distribution analysis

### API Design

#### Authentication Flow
1. Login with email/password + user type
2. JWT token with embedded role and clinic info
3. Middleware enforces multi-tenant data isolation
4. Role-based route protection

#### Multi-Tenant Security
- All queries automatically scoped by `clinicId`
- Branch-level filtering for branch heads
- Doctor multi-branch access via junction table
- Super admin global access override

## 🔐 Security Features

- **JWT Authentication** with secure token management
- **Role-Based Access Control** with granular permissions
- **Multi-Tenant Data Isolation** preventing cross-clinic access
- **Input Validation** using Zod schemas
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for secure cross-origin requests
- **Password Hashing** with bcrypt (12 rounds)

## 📱 UI/UX Features

### Animations
- **Page Transitions**: Smooth fade-in effects
- **Component Loading**: Staggered list animations
- **Interactive Elements**: Hover effects with scale/shadow
- **Modal Animations**: Scale and fade transitions
- **Loading States**: Professional spinner components

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface elements
- Adaptive layouts for all screen sizes

## 🧪 Testing & Quality

### Code Quality
- ESLint configuration for consistent code style
- Prettier for automated formatting
- TypeScript-ready architecture
- Component reusability patterns

### Performance
- TanStack Query for efficient data caching
- MongoDB aggregation for server-side processing
- Optimized bundle sizes with Vite
- Lazy loading for route components

## 🚀 Deployment

### Production Checklist
- [ ] Update JWT secret in production
- [ ] Configure MongoDB connection string
- [ ] Set up SSL certificates
- [ ] Configure CORS for production domains
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies
- [ ] Set up CI/CD pipelines

### Environment Variables

#### Backend (.env)
```
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-super-secure-secret
CORS_ORIGIN=https://your-domain.com
```

#### Frontend (.env)
```
VITE_API_URL=https://api.your-domain.com/api/v1
VITE_APP_NAME=DentexA CRM
```

## 📈 Scalability Considerations

- **Database Sharding**: Ready for horizontal scaling
- **Microservices**: Modular architecture supports service extraction
- **Caching**: Redis integration ready for session management
- **CDN**: Static asset optimization prepared
- **Load Balancing**: Stateless design supports multiple instances

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**Built with ❤️ for modern dental practices**