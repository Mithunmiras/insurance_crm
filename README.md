# 🏥 Insurance CRM Pro - Life Insurance Specialist System# User Management System



[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Digitner/dentex-frontend)A complete user management system built with React, Ant Design, and Express.js.

[![React](https://img.shields.io/badge/React-19.1.0-61dafb.svg)](https://reactjs.org/)

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)## Features



A comprehensive Insurance CRM system with **PRIMARY FOCUS on Life Insurance**, featuring complete policy management, document organization, and client relationship tools.- ✅ Reusable DataTable component with CRUD operations

- ✅ User creation, editing, and deletion

## ✨ Key Features- ✅ Advanced filtering with drawer

- ✅ Premium UI design matching USICA screenshots

### 🏥 Life Insurance Focus- ✅ Backend API integration

- **Comprehensive Policy Management**- ✅ Avatar management with initials

  - Term Life Insurance- ✅ Status management with colored tags

  - Whole Life Insurance

  - Universal Life Insurance## Setup

  - Variable Life Insurance

- **Dedicated Life Insurance Dashboard**1. Install dependencies:

- **Life Insurance Specialists Section**```bash

- **Complete Policy Details** (cash value, riders, beneficiaries, etc.)npm install

```

### 📁 Document Management System

- **Direct Folder Access** with blue folder icons2. Start both frontend and backend:

- **50+ Life Insurance Document Categories**```bash

  - Application & Underwriting documentsnpm run dev

  - Policy contracts and schedules```

  - Beneficiary & nomination forms

  - Riders & additional benefits3. Access the application at http://localhost:3000

  - Claims documentation

  - Compliance & legal documents## API Endpoints

- **Instant document access** from any entity row

- **Organized categorization** for easy retrieval- GET /api/users - Fetch all users

- POST /api/users - Create new user

### 📊 Comprehensive Features- PUT /api/users/:id - Update user

- **Client Management** - Complete client profiles with financial data- DELETE /api/users/bulk-delete - Delete multiple users

- **Agent Management** - Track agent performance and certifications- GET /api/departments - Fetch departments

- **Policy Tracking** - Monitor all policy types and statuses- GET /api/managers - Fetch managers

- **Claims Processing** - Streamlined claims workflow

- **Payment Processing** - Premium tracking and commission management## Components

- **Reporting & Analytics** - Real-time insights and dashboards

- **ReusableDataTable**: Main table component with CRUD operations

### 🔐 Multi-Role System- **UsersPage**: User management page implementation

- **Super Admin** - Full system access and configuration- **UserService**: API integration service
- **Branch Head** - Branch management and oversight
- **Doctor** - Medical records and appointments (if applicable)
- **Staff** - Operational tasks and support
- **Customer** - Personal policy access and document viewing

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/Digitner/dentex-frontend.git

# Navigate to the frontend directory
cd dentex-frontend/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Access the Application
- Application runs on: `http://localhost:5173`
- Login page is the default route

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/                    # API integration
│   ├── Component/              # Reusable components
│   ├── components/             # Common components
│   ├── config/                 # Configuration files
│   ├── Hooks/                  # Custom React hooks
│   ├── layouts/                # Layout components
│   │   ├── components/         # Header, Sidebar
│   │   ├── DashboardLayout.jsx
│   │   └── Index.jsx
│   ├── Pages/                  # Page components
│   │   ├── Dashboard/          # Dashboard views
│   │   ├── Public/             # Public pages (Login)
│   │   ├── PrivateRouting/     # Protected routes
│   │   └── UserManagement/     # User management
│   ├── Redux/                  # State management
│   ├── services/               # API services
│   ├── store/                  # Zustand stores
│   ├── themes/                 # Theme configuration
│   ├── utils/                  # Utility functions
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
└── vite.config.js              # Vite configuration
```

## 🔧 Technical Stack

### Frontend
- **React 19.1.0** - UI framework
- **Vite 6.3.5** - Build tool and dev server
- **React Router 7.6.2** - Routing
- **Ant Design 5.26.1** - UI components
- **Tailwind CSS 3.4.3** - Styling
- **Framer Motion 12.23.22** - Animations

### State Management
- **Redux Toolkit 2.8.2** - Global state
- **Zustand 5.0.8** - Lightweight state
- **React Query 5.90.2** - Server state

### Additional Libraries
- **Day.js** - Date manipulation
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **XLSX** - Excel export
- **Socket.io** - Real-time updates
- **Firebase** - Authentication & storage

## 📊 System Features

### Dashboard
- Real-time analytics and metrics
- Policy distribution charts
- Revenue tracking
- Agent performance overview
- Recent activities feed
- Quick action buttons

### Client Management
- Complete client profiles
- Financial information tracking
- Policy history
- Document storage
- Communication logs
- Appointment scheduling

### Policy Management
- Multi-type policy support
- Premium tracking
- Renewal management
- Policy endorsements
- Cash value tracking
- Rider management

### User Management
- ✅ Reusable DataTable component with CRUD operations
- ✅ User creation, editing, and deletion
- ✅ Advanced filtering with drawer
- ✅ Role-based access control
- ✅ Avatar management
- ✅ Status management with colored tags

## 🗂️ Life Insurance Document Categories (50+)

### Application & Underwriting
- Life Insurance Application Form
- Health Questionnaire
- Medical History Form
- Family Medical History
- Attending Physician Statement (APS)
- Medical Examination Report
- Blood Test Results, Urine Test Results
- ECG/EKG Report, Stress Test Results
- X-Ray Reports, MRI/CT Scan Reports

### Policy Documents
- Policy Contract/Agreement
- Policy Schedule
- Policy Illustrations
- Premium Payment Schedule
- Premium Receipt
- Policy Endorsement
- Policy Amendment

### Beneficiary & Nomination
- Beneficiary Designation Form
- Primary Beneficiary Information
- Contingent Beneficiary Information
- Beneficiary Change Request
- Nomination Form

### Riders & Additional Benefits
- Accidental Death Benefit Rider
- Waiver of Premium Rider
- Critical Illness Rider
- Disability Income Rider
- Long-Term Care Rider

### Claims Documents
- Death Certificate
- Claim Form (Death Benefit)
- Legal Heir Certificate
- Succession Certificate
- Medical Records

### Compliance & Legal
- HIPAA Authorization
- Privacy Notice Acknowledgment
- Anti-Money Laundering (AML) Documents
- Know Your Customer (KYC) Form
- Tax Information (W-9/W-8)

## 🔒 Security Features

- **Authentication** - Secure login with JWT tokens
- **Authorization** - Role-based access control (RBAC)
- **Protected Routes** - Route-level security
- **Session Management** - Secure session handling
- **Data Validation** - Input sanitization
- **Password Security** - Encrypted storage

## 📱 Responsive Design

- ✅ Desktop optimized (1920px+)
- ✅ Tablet compatible (768px - 1919px)
- ✅ Mobile friendly (320px - 767px)
- ✅ Touch-friendly interface
- ✅ Adaptive layouts

## 🚀 Deployment

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview

# Upload to backend server (if configured)
npm run upload
```

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=your_api_url
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 🎨 UI/UX Highlights

- **Modern Design** - Clean, professional interface with gradients
- **Animated Components** - Smooth Framer Motion animations
- **Intuitive Navigation** - Easy-to-use sidebar with icons
- **Visual Feedback** - Loading states and notifications
- **Royal Premium Theme** - Elegant color scheme
- **Glassmorphism Effects** - Modern UI trends

## 📈 Performance

- **Fast Load Times** - Optimized bundle size
- **Code Splitting** - Lazy loading for routes
- **Efficient Rendering** - React 19 optimizations
- **Optimistic Updates** - Instant UI feedback

## 👥 Roles & Permissions

- **superAdmin** - Full system control
- **branchHead** - Branch management
- **doctor** - Medical records access
- **staff** - Operational tasks
- **customer** - Personal portal access

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎉 What Makes This Special

1. **Insurance Focus** - Built specifically for insurance operations
2. **Life Insurance Specialist** - Comprehensive life insurance features
3. **Modern Technology** - Latest React 19 and tools
4. **Role-Based Access** - Flexible permission system
5. **Beautiful UI** - Premium animated design
6. **Document Management** - 50+ insurance document categories
7. **Production Ready** - Fully functional system
8. **Scalable** - Easy to extend and customize

---

**Insurance CRM Pro - Life Insurance Specialist System** 🎊

Made with ❤️ by Digitner Team
