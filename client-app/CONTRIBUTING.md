# Contributing to MADAS Client App

Thank you for your interest in contributing to the MADAS Client App! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project
- Git

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/madas-client-app.git
   cd madas-client-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   # Fill in your Firebase credentials
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all components
- Follow React best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Add loading states for async operations
- Write meaningful commit messages

### File Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
│   ├── layout/            # Layout components
│   ├── dashboard/         # Dashboard components
│   ├── auth/              # Authentication components
│   └── products/          # Product management components
├── lib/                   # Utilities and configurations
│   ├── firebase/          # Firebase configuration
│   ├── providers/         # React context providers
│   ├── services/          # Business logic services
│   └── utils/             # Utility functions
├── types/                 # TypeScript type definitions
└── styles/                # Global styles
```

### Component Guidelines

1. **Use TypeScript interfaces** for all props
2. **Implement proper error boundaries**
3. **Add loading and error states**
4. **Use React Hook Form** for forms
5. **Implement proper validation** with Zod
6. **Add accessibility attributes**
7. **Write responsive components**

### Firebase Integration

- Use the `ProductService` class for database operations
- Implement proper error handling
- Use real-time listeners for live updates
- Follow Firebase security rules
- Handle offline scenarios

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Guidelines

- Write unit tests for utility functions
- Write integration tests for Firebase operations
- Write component tests with React Testing Library
- Aim for 80%+ test coverage

## 📦 Pull Request Process

### Before Submitting

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run type-check
   npm run lint
   npm run build
   npm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] Screenshots/videos attached (if UI changes)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment information**
   - OS and version
   - Browser and version
   - Node.js version

2. **Steps to reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior

3. **Additional context**
   - Screenshots if applicable
   - Console errors
   - Network requests

## 💡 Feature Requests

When suggesting features:

1. **Describe the problem** you're trying to solve
2. **Propose a solution** with implementation details
3. **Consider alternatives** you've thought of
4. **Provide mockups** or examples if applicable

## 📚 Documentation

### Code Documentation

- Use JSDoc comments for functions
- Document complex business logic
- Include examples for utility functions
- Update README for new features

### API Documentation

- Document all Firebase service methods
- Include parameter types and return values
- Provide usage examples
- Document error cases

## 🔒 Security

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Follow Firebase security rules
- Implement proper input validation
- Use HTTPS in production

## 🎯 Roadmap

### Current Focus
- Product Management System
- Point of Sale Interface
- Order Management
- Customer CRM

### Future Features
- Advanced Analytics
- Multi-location Support
- API Integration
- Mobile App

## 📞 Support

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Email**: support@madas.com
- **Documentation**: [docs.madas.com](https://docs.madas.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for contributing to MADAS! 🚀
