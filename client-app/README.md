# MADAS Client App

The main business management application for MADAS SaaS platform customers.

## 🚀 Features

### Core Business Management
- **Dashboard** - Real-time metrics and business overview
- **Product Management** - Inventory tracking and management
- **Point of Sale (POS)** - Touch-friendly sales interface
- **Order Management** - Complete order lifecycle
- **Customer Management** - CRM and customer database
- **Staff Management** - Team and permission management
- **Financial Reports** - Analytics and insights
- **Settings** - Business configuration

### Technical Features
- **Multi-tenant Architecture** - Secure business data isolation
- **Real-time Updates** - Live data synchronization
- **Offline Support** - POS works without internet
- **Mobile Responsive** - Works on all devices
- **Firebase Integration** - Secure authentication and data
- **Modern UI/UX** - Professional and intuitive interface

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Storage)
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main dashboard
│   ├── products/          # Product management
│   ├── pos/              # Point of sale
│   ├── orders/           # Order management
│   ├── customers/        # Customer management
│   ├── staff/            # Staff management
│   ├── reports/          # Reports and analytics
│   └── settings/         # Business settings
├── components/           # Reusable UI components
│   ├── layout/          # Layout components
│   ├── dashboard/       # Dashboard components
│   ├── auth/            # Authentication components
│   ├── onboarding/      # Onboarding wizard
│   └── ui/              # Base UI components
├── lib/                 # Utilities and configurations
│   ├── firebase/        # Firebase configuration
│   ├── providers/       # React context providers
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Utility functions
├── store/               # Zustand stores
├── types/               # TypeScript type definitions
└── styles/              # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project
- Git

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/madas-client-app.git
   cd madas-client-app
   ```

2. **Run automated setup**
   ```bash
   npm run setup
   ```
   
   This script will:
   - Check Node.js and npm versions
   - Install all dependencies
   - Create environment file from template
   - Set up Git hooks
   - Build the project
   - Display next steps

3. **Configure Firebase**
   
   Edit `.env.local` with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3002
   ```

6. **Add sample data**
   
   Once the app is running:
   - Go to the Products page
   - Use the "Sample Data" section to populate your system
   - Click "Seed All Sample Data" to add 10+ sample products

### Manual Setup (Alternative)

If you prefer manual setup:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your Firebase configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests

### Code Style

- Use TypeScript for all components
- Follow React best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Add loading states for async operations

## 🔐 Authentication

The app uses Firebase Authentication with:
- Email/password login
- Google OAuth (optional)
- Password reset functionality
- Protected routes
- Multi-tenant user management

### Demo Credentials
- **Email**: demo@madas.com
- **Password**: demo123

## 🏢 Multi-tenancy

Each business has isolated data:
- Business-specific collections in Firestore
- User access control per business
- Business switching capability
- Secure data isolation

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly POS interface
- Offline capability for POS
- Progressive Web App features

## 🔄 Real-time Updates

- Live dashboard metrics
- Real-time order updates
- Instant inventory changes
- Live notifications

## 📊 Analytics

- Business performance metrics
- Sales analytics
- Customer insights
- Staff performance tracking
- Financial reports

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Environment Variables for Production
Set these in your deployment platform:
- All Firebase configuration variables
- `NEXT_PUBLIC_APP_URL` - Your app URL
- `NEXT_PUBLIC_MARKETING_URL` - Marketing site URL

## 🔧 Configuration

### Business Settings
- Currency and timezone
- Tax rates and calculations
- Business information
- Subscription limits

### User Permissions
- Owner: Full access
- Manager: Most features except admin
- Staff: Limited access based on role
- Cashier: POS and basic operations

## 📚 API Integration

### Firebase Services
- **Authentication**: User management
- **Firestore**: Real-time database
- **Storage**: File uploads
- **Analytics**: Usage tracking

### External Integrations
- Stripe (payments)
- Email services
- SMS notifications
- Third-party APIs

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📖 Documentation

- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guide](./docs/contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- Email: support@madas.com
- Documentation: [docs.madas.com](https://docs.madas.com)
- Community: [community.madas.com](https://community.madas.com)

---

**Built with ❤️ by the MADAS Team**