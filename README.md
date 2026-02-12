# PhotoFolio - Photography Portfolio Website

A sophisticated, minimalist photography portfolio website built with React, TypeScript, and Tailwind CSS. Features an elegant editorial design with smooth animations, a masonry gallery with lightbox, and a hidden admin dashboard for content management.

![PhotoFolio Preview](https://images.unsplash.com/photo-1554048612-387768052bf7?w=1200&q=80)

## Features

### Public Website
- **Hero Section** - Full-screen photography showcase with parallax effects
- **About Section** - Photographer bio with animated statistics
- **Gallery** - Masonry grid layout with category filtering and lightbox viewer
- **Services** - CMS-managed service offerings with detailed modals
- **Testimonials** - 3D carousel with client reviews
- **Contact** - Functional contact form with floating labels
- **Footer** - Social links and site navigation

### Admin Dashboard (Hidden)
- **Secret URL Access** - No visible login links on the site
- **Gallery Management** - Upload, edit, delete, and feature images
- **Services Editor** - Modify service details and pricing
- **Content Editor** - Update site text and contact information
- **Local Storage Persistence** - Changes saved locally (demo mode)

### Design & UX
- **Minimalist Editorial Aesthetic** - Clean typography, generous whitespace
- **Smooth Animations** - Scroll-triggered reveals, hover effects
- **Responsive Design** - Optimized for all screen sizes
- **Accessibility** - Keyboard navigation, reduced motion support
- **SEO Ready** - Semantic HTML, meta tags structure

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui (40+ pre-installed components)
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Animations**: CSS animations + Intersection Observer API

## Project Structure

```
src/
├── sections/           # Page sections
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Gallery.tsx
│   ├── Services.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── AdminLogin.tsx
│   └── AdminDashboard.tsx
├── components/         # Reusable UI components (shadcn)
├── hooks/              # Custom React hooks
│   ├── useScrollAnimation.ts
│   └── useAdminAuth.ts
├── types/              # TypeScript type definitions
├── data/               # Static data and content
│   └── siteData.ts
├── App.tsx             # Main app component
├── index.css           # Global styles
└── main.tsx            # Entry point
```

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. Clone or download the project:
```bash
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Admin Access

The admin dashboard is hidden with no visible links on the site:

1. Navigate to `http://localhost:5173/admin`
2. Login with demo credentials:
   - Email: `admin@photofolio.com`
   - Password: `admin123`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Netlify
1. Build the project: `npm run build`
2. Drag the `dist/` folder to Netlify drop zone

### Static Hosting
Upload the contents of the `dist/` folder to any static hosting service.

## Customization

### Updating Content

Edit `src/data/siteData.ts` to update:
- Photographer information
- Gallery images
- Services offered
- Contact details
- Social media links

### Changing Colors

The site uses a black and white color scheme defined in `src/index.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  /* ... */
}
```

### Adding Images

Replace the Unsplash URLs in `src/data/siteData.ts` with your own images:

```typescript
export const galleryImages = [
  {
    id: '1',
    src: '/path/to/your/image.jpg', // Local or external URL
    alt: 'Description',
    // ...
  },
];
```

## Instagram Integration (Future Enhancement)

To enable automatic Instagram sync:

1. Create a Facebook Developer account
2. Set up Instagram Basic Display API
3. Add your access token to environment variables
4. Implement the API integration in `src/hooks/useInstagram.ts`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lazy-loaded images
- Optimized animations (GPU-accelerated)
- Minimal JavaScript bundle
- CSS-first approach for animations

## License

MIT License - feel free to use for personal or commercial projects.

## Credits

- Design inspiration: Editorial photography portfolios
- Images: Unsplash
- Icons: Lucide
- UI Components: shadcn/ui

---

Built with passion for photography and clean design.
