# Contributing to MADAS SaaS Platform

Thank you for your interest in contributing to the MADAS SaaS Platform! This document provides guidelines and information for contributors.

## 📁 Project Structure

```
sys/
├── marketing-website/     # Public marketing website
├── admin-dashboard/       # Admin panel for platform management
├── client-app/           # Client business management application
├── shared/               # Shared components, types, and utilities
├── README.md            # Project overview
├── IMPLEMENTATION_ROADMAP.md
└── CONTRIBUTING.md      # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Firebase project (for client-app)
- Basic knowledge of React, TypeScript, and Next.js

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/madas-saas-platform.git
   cd madas-saas-platform
   ```

2. **Run Complete Setup**
   ```bash
   chmod +x setup-all.sh
   ./setup-all.sh
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1 - Marketing Website
   cd marketing-website && npm run dev
   
   # Terminal 2 - Admin Dashboard
   cd admin-dashboard && npm run dev
   
   # Terminal 3 - Client App
   cd client-app && npm run dev
   ```

## 🏗️ Architecture Overview

### Multi-Tenant SaaS Platform
- **Marketing Website**: Lead generation and public presence
- **Admin Dashboard**: Platform administration and management
- **Client App**: Business management for end users
- **Shared Library**: Common components and utilities

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Deployment**: Vercel
- **State Management**: React Context, React Query

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all components and utilities
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Implement proper error handling and loading states
- Write meaningful commit messages
- Add JSDoc comments for complex functions

### File Structure Standards

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
│   ├── ui/                # Basic UI components
│   ├── layout/            # Layout components
│   └── [feature]/         # Feature-specific components
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
8. **Use shared components** from the shared library

### Firebase Integration

- Use the provided service classes for database operations
- Implement proper error handling
- Use real-time listeners for live updates
- Follow Firebase security rules
- Handle offline scenarios gracefully

## 🧪 Testing

### Running Tests

```bash
# Run all tests in a project
cd [project-name] && npm test

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
- Test both happy path and error scenarios

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
   - Ensure all projects build successfully

3. **Test your changes**
   ```bash
   # Run setup script to test all projects
   ./setup-all.sh
   
   # Or test individual projects
   cd [project-name] && npm run type-check && npm run lint && npm run build
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

## Projects Affected
- [ ] Marketing Website
- [ ] Admin Dashboard
- [ ] Client App
- [ ] Shared Library

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] All projects build successfully
- [ ] Screenshots/videos attached (if UI changes)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes (or documented)
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment information**
   - OS and version
   - Browser and version
   - Node.js version
   - Which project(s) affected

2. **Steps to reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior
   - Screenshots if applicable

3. **Additional context**
   - Console errors
   - Network requests
   - Firebase errors (if applicable)

## 💡 Feature Requests

When suggesting features:

1. **Describe the problem** you're trying to solve
2. **Propose a solution** with implementation details
3. **Consider alternatives** you've thought of
4. **Provide mockups** or examples if applicable
5. **Specify which project** the feature belongs to

## 📚 Documentation

### Code Documentation

- Use JSDoc comments for functions
- Document complex business logic
- Include examples for utility functions
- Update README files for new features

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
- Review security implications of changes

## 🎯 Development Focus Areas

### Current Priority
- **Client App**: Product management, POS system, order management
- **Admin Dashboard**: Analytics, user management, subscription handling
- **Marketing Website**: SEO optimization, conversion tracking
- **Shared Library**: Component expansion, utility functions

### Future Features
- **Mobile App**: React Native implementation
- **API Integration**: Third-party service integrations
- **Advanced Analytics**: Business intelligence features
- **Multi-language Support**: Internationalization

## 🚀 Deployment

### Development Deployment
```bash
# Deploy individual projects
cd marketing-website && npm run deploy
cd admin-dashboard && npm run deploy
cd client-app && npm run deploy:firebase
```

### Production Considerations
- Test in staging environment first
- Monitor error rates and performance
- Update documentation
- Notify team of breaking changes

## 📞 Support

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Email**: support@madas.com
- **Documentation**: Check individual project READMEs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Documentation credits
- GitHub contributors page

---

## 🚀 Quick Start for New Contributors

1. **Read this guide** thoroughly
2. **Run the setup script**: `./setup-all.sh`
3. **Start with small issues** labeled "good first issue"
4. **Join discussions** to understand project direction
5. **Ask questions** - we're here to help!

Thank you for contributing to MADAS! 🚀
