import { useState, useEffect } from 'react';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Gallery } from '@/sections/Gallery';
import { Services } from '@/sections/Services';
import { Testimonials } from '@/sections/Testimonials';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { AdminLogin } from '@/sections/AdminLogin';
import { AdminDashboard } from '@/sections/AdminDashboard';
import { AdminAuthProvider, useAdminAuth } from '@/hooks/useAdminAuth';

// Router component that handles navigation
function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate function
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Route matching
  if (currentPath === '/admin') {
    return <AdminLogin onNavigate={navigate} />;
  }

  if (currentPath === '/admin/dashboard') {
    if (!isAuthenticated) {
      // Redirect to login
      window.history.replaceState({}, '', '/admin');
      return <AdminLogin onNavigate={navigate} />;
    }
    return <AdminDashboard onNavigate={navigate} />;
  }

  // Default: Main website
  return <MainWebsite />;
}

// Main Website Layout
function MainWebsite() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// App Component
function App() {
  return (
    <AdminAuthProvider>
      <Router />
    </AdminAuthProvider>
  );
}

export default App;
