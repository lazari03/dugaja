import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface AdminLoginProps {
  onNavigate: (path: string) => void;
}

export function AdminLogin({ onNavigate }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        onNavigate('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Website
        </button>

        {/* Login Card */}
        <div className="bg-white p-8 md:p-10 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl mb-2">Admin Login</h1>
            <p className="text-black/60 text-sm">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold tracking-wider uppercase text-black/60 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-black/40"
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none transition-colors"
                  placeholder="admin@photofolio.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold tracking-wider uppercase text-black/60 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-black/40"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-8 pr-12 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-stone-100 text-center">
            <p className="text-xs text-black/60 mb-2">Demo Credentials:</p>
            <p className="text-sm font-mono text-black/80">
              admin@photofolio.com / admin123
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-black/40 text-sm mt-8">
          © {new Date().getFullYear()} PhotoFolio. All rights reserved.
        </p>
      </div>
    </div>
  );
}
