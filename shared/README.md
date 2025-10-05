# @madas/shared

Shared components and utilities for the MADAS SaaS platform.

## 🚀 Features

- **🎨 UI Components**: Pre-built, accessible React components
- **🔧 Utilities**: Formatters, validators, and helper functions
- **🔥 Firebase Integration**: Pre-configured Firebase services
- **📱 TypeScript**: Full type safety and IntelliSense support
- **🎯 Consistent Design**: Unified design system across all apps

## 📦 Installation

```bash
npm install @madas/shared
```

## 🎯 Quick Start

### Basic Usage

```tsx
import { Button, Input, Card, Modal } from '@madas/shared';

function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome to MADAS</Card.Title>
      </Card.Header>
      <Card.Content>
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Button variant="primary" className="mt-4">
          Get Started
        </Button>
      </Card.Content>
    </Card>
  );
}
```

### Firebase Setup

```tsx
import { initializeFirebaseServices } from '@madas/shared';

// Initialize Firebase (call once in your app)
const { auth, firestore, storage } = initializeFirebaseServices();

// Use Firebase services
const user = auth.currentUser;
```

### Form Validation

```tsx
import { isValidEmail, validatePassword, validateBusinessName } from '@madas/shared';

const emailValid = isValidEmail('user@example.com');
const passwordValidation = validatePassword('mypassword');
const businessValidation = validateBusinessName('My Business');
```

## 🧩 Components

### Button

```tsx
import { Button, IconButton, Fab } from '@madas/shared';

// Basic button
<Button variant="primary" size="lg">
  Click me
</Button>

// Icon button
<IconButton icon={<PlusIcon />} aria-label="Add item" />

// Floating action button
<Fab icon={<PlusIcon />} position="bottom-right" />
```

### Input

```tsx
import { Input, SearchInput, Textarea } from '@madas/shared';

// Basic input with validation
<Input
  label="Email"
  type="email"
  error={emailError}
  helperText="We'll never share your email"
/>

// Search input
<SearchInput
  placeholder="Search products..."
  onSearch={handleSearch}
  clearable
/>

// Textarea
<Textarea
  label="Description"
  placeholder="Enter description..."
  rows={4}
/>
```

### Modal

```tsx
import { Modal, ConfirmDialog, AlertDialog } from '@madas/shared';

// Basic modal
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Settings"
  size="lg"
>
  <p>Modal content goes here</p>
</Modal>

// Confirm dialog
<ConfirmDialog
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  message="Are you sure you want to delete this item?"
  onConfirm={handleDelete}
  confirmVariant="destructive"
/>

// Alert dialog
<AlertDialog
  isOpen={showAlert}
  onClose={() => setShowAlert(false)}
  message="Operation completed successfully!"
  type="success"
/>
```

### Card

```tsx
import { Card, StatsCard, FeatureCard } from '@madas/shared';

// Basic card
<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Card content</p>
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// Stats card
<StatsCard
  title="Total Revenue"
  value="$12,345"
  trend={{ value: 12.5, type: 'increase', label: 'vs last month' }}
  icon={<DollarIcon />}
  color="green"
/>

// Feature card
<FeatureCard
  title="Advanced Analytics"
  description="Get detailed insights into your business performance"
  icon={<ChartIcon />}
  action={<Button>Learn More</Button>}
/>
```

## 🛠️ Utilities

### Formatters

```tsx
import { 
  formatCurrency, 
  formatDate, 
  formatPercentage,
  formatPhoneNumber 
} from '@madas/shared';

formatCurrency(1234.56, 'USD'); // $1,234.56
formatDate(new Date(), 'MMM dd, yyyy'); // Jan 15, 2024
formatPercentage(85.5); // 85.5%
formatPhoneNumber('1234567890'); // (123) 456-7890
```

### Validators

```tsx
import { 
  isValidEmail, 
  validatePassword, 
  validatePrice,
  validateCreditCard 
} from '@madas/shared';

isValidEmail('user@example.com'); // true
validatePassword('mypassword'); // { isValid: false, errors: [...] }
validatePrice(99.99); // { isValid: true, value: 99.99 }
validateCreditCard('4111111111111111'); // { isValid: true, type: 'visa' }
```

### Date Utilities

```tsx
import { 
  formatDateWithTimezone,
  getCurrentWeek,
  getLastNDays,
  isBusinessDay 
} from '@madas/shared';

formatDateWithTimezone(date, 'MMM dd, yyyy', 'America/New_York');
const week = getCurrentWeek(); // { start: Date, end: Date }
const lastWeek = getLastNDays(7); // { start: Date, end: Date }
isBusinessDay(new Date()); // true/false
```

### Currency Utilities

```tsx
import { 
  formatCurrencyAmount,
  convertCurrency,
  calculatePercentageChange,
  calculateCompoundInterest 
} from '@madas/shared';

formatCurrencyAmount(1234.56, 'EUR'); // €1,234.56
convertCurrency(100, 'USD', 'EUR', 0.85); // 85
calculatePercentageChange(100, 120); // 20
calculateCompoundInterest(1000, 0.05, 10); // 1628.89
```

## 🔥 Firebase Integration

### Authentication

```tsx
import { getFirebaseAuth } from '@madas/shared';

const auth = getFirebaseAuth();
const user = auth.currentUser;
```

### Firestore

```tsx
import { getFirebaseFirestore } from '@madas/shared';
import { collection, getDocs } from 'firebase/firestore';

const db = getFirebaseFirestore();
const products = await getDocs(collection(db, 'products'));
```

### Storage

```tsx
import { getFirebaseStorage } from '@madas/shared';
import { ref, uploadBytes } from 'firebase/storage';

const storage = getFirebaseStorage();
const fileRef = ref(storage, 'images/photo.jpg');
await uploadBytes(fileRef, file);
```

## 🎨 Styling

All components use Tailwind CSS classes and support custom styling:

```tsx
<Button 
  className="bg-custom-blue hover:bg-custom-blue-dark"
  variant="outline"
>
  Custom Button
</Button>
```

## 📱 Responsive Design

Components are built with mobile-first responsive design:

```tsx
<CardGrid columns={3} gap="lg">
  <StatsCard title="Revenue" value="$1,234" />
  <StatsCard title="Orders" value="56" />
  <StatsCard title="Customers" value="234" />
</CardGrid>
```

## ♿ Accessibility

All components follow WCAG 2.1 AA guidelines:

- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels and descriptions
- Focus management
- Color contrast compliance

## 🔧 Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Development
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@madas/shared": ["./node_modules/@madas/shared/dist/index.d.ts"]
    }
  }
}
```

## 🧪 Testing

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@madas/shared';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

## 📚 API Reference

### Types

```tsx
import type { 
  User, 
  Business, 
  Subscription, 
  ApiResponse,
  PaginationParams 
} from '@madas/shared';
```

### Constants

```tsx
import { 
  SUBSCRIPTION_PLANS,
  USER_ROLES,
  ORDER_STATUSES,
  CURRENCY_CODES 
} from '@madas/shared';
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- Documentation: [docs.madas.com](https://docs.madas.com)
- Issues: [GitHub Issues](https://github.com/madas/shared/issues)
- Email: support@madas.com

---

Built with ❤️ by the MADAS team