# MADAS Marketing Website

The public-facing marketing website for the MADAS SaaS platform. This Next.js application showcases the platform's features, pricing, and converts visitors into customers.

## 🚀 Features

- **Modern Design**: Built with Tailwind CSS and Framer Motion for smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Comprehensive meta tags, structured data, and performance optimization
- **Fast Loading**: Optimized images, code splitting, and modern web standards
- **Analytics Ready**: Google Analytics and Hotjar integration
- **Accessibility**: WCAG 2.1 AA compliant components
- **Type Safe**: Full TypeScript support with strict type checking

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Components**: Shared component library (@madas/shared)
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)
- **Analytics**: Google Analytics, Hotjar
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── features/          # Features pages
│   ├── pricing/           # Pricing pages
│   ├── about/             # About pages
│   └── contact/           # Contact pages
├── components/            # React components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── sections/         # Page sections (Hero, Features, Pricing)
│   ├── ui/               # Reusable UI components
│   └── forms/            # Form components
├── styles/               # Global styles and CSS
├── utils/                # Utility functions
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
└── lib/                  # Third-party library configurations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/madas/marketing-website.git
   cd marketing-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your actual values:
   ```env
   NEXT_PUBLIC_APP_URL=https://app.madas.com
   NEXT_PUBLIC_ADMIN_URL=https://admin.madas.com
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_HOTJAR_ID=1234567
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run export` - Export static site

## 🎨 Design System

The marketing website uses a comprehensive design system built on Tailwind CSS:

### Colors
- **Primary**: Blue (#3B82F6) to Purple (#8B5CF6) gradient
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Green for success, Red for errors, Yellow for warnings

### Typography
- **Headings**: Inter font, various weights (400, 500, 600, 700)
- **Body**: Inter font, optimized for readability
- **Display**: Cal Sans for special headings (optional)

### Spacing
- **Container**: Max-width 1280px with responsive padding
- **Sections**: Consistent vertical spacing (py-16, lg:py-24)
- **Components**: 8px grid system

### Animations
- **Fade In**: Subtle opacity transitions
- **Slide Up**: Content slides up from bottom
- **Scale In**: Elements scale in on appear
- **Float**: Subtle floating animations for decorative elements

## 📱 Responsive Design

The website is built mobile-first with breakpoints:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: 1280px+

## 🔍 SEO Optimization

### Meta Tags
- Comprehensive Open Graph tags
- Twitter Card support
- Structured data (JSON-LD)
- Canonical URLs
- Robots.txt optimization

### Performance
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Font optimization
- Bundle size optimization
- Core Web Vitals optimization

### Analytics
- Google Analytics 4 integration
- Hotjar for user behavior tracking
- Performance monitoring
- Conversion tracking

## 🧪 Testing

### Running Tests
```bash
npm run test        # Run all tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Test Types
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: Page-level testing
- **E2E Tests**: Full user journey testing with Playwright

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Export static files (if needed)**
   ```bash
   npm run export
   ```

3. **Deploy to your hosting provider**

### Environment Variables for Production

```env
NEXT_PUBLIC_APP_URL=https://app.madas.com
NEXT_PUBLIC_ADMIN_URL=https://admin.madas.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=1234567
NODE_ENV=production
```

## 📊 Analytics & Monitoring

### Google Analytics
- Page views and user sessions
- Conversion tracking for signups
- Goal tracking for key actions
- Custom events for user interactions

### Hotjar
- Heatmaps for user behavior analysis
- Session recordings for UX insights
- Feedback collection
- Conversion funnel analysis

### Performance Monitoring
- Core Web Vitals tracking
- Page load times
- Bundle size monitoring
- Error tracking

## 🔧 Customization

### Adding New Sections

1. **Create section component**
   ```tsx
   // src/components/sections/NewSection.tsx
   export const NewSection: React.FC = () => {
     return (
       <section className="section-padding">
         {/* Section content */}
       </section>
     );
   };
   ```

2. **Add to homepage**
   ```tsx
   // src/app/page.tsx
   import { NewSection } from '@/components/sections/NewSection';
   
   export default function HomePage() {
     return (
       <main>
         {/* Existing sections */}
         <NewSection />
       </main>
     );
   }
   ```

### Customizing Colors

Edit `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'your-primary-color',
          foreground: 'your-primary-foreground',
        },
      },
    },
  },
};
```

### Adding New Pages

1. **Create page directory**
   ```bash
   mkdir src/app/new-page
   ```

2. **Add page.tsx**
   ```tsx
   // src/app/new-page/page.tsx
   export default function NewPage() {
     return <div>New Page Content</div>;
   }
   ```

3. **Add to navigation**
   Update `src/components/layout/Navbar.tsx` with new link.

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Check TypeScript errors: `npm run type-check`
- Verify all imports are correct
- Ensure environment variables are set

**Styling Issues**
- Check Tailwind CSS classes are correct
- Verify responsive breakpoints
- Check for conflicting CSS

**Performance Issues**
- Optimize images with Next.js Image component
- Check bundle size with `npm run analyze`
- Enable compression and caching

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Tailwind CSS documentation](https://tailwindcss.com/docs)
- Open an issue on GitHub
- Contact the development team

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Documentation**: [docs.madas.com](https://docs.madas.com)
- **Issues**: [GitHub Issues](https://github.com/madas/marketing-website/issues)
- **Email**: support@madas.com
- **Discord**: [Join our community](https://discord.gg/madas)

---

Built with ❤️ by the MADAS team