import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { authService } from '../../services/authService';
import { ROUTES } from '../../constants/routes';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@aaamanagementservices.com');
  const [password, setPassword] = useState('AAAsecurity@2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authService.login({ email, password });
      if (res.success && res.data?.token) {
        localStorage.setItem('aaa_admin_token', res.data.token);
        localStorage.setItem('aaa_admin_user', JSON.stringify(res.data.user));
        navigate(ROUTES.ADMIN.DASHBOARD);
      } else {
        setError(res.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4 bg-[#0B0E14]">
      <Card className="w-full max-w-md bg-[#111622] border-white/10 p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-white/20 bg-white shadow-md flex items-center justify-center mb-3">
            <img
              src="/images/logo.png"
              alt="AAA Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-xl font-bold text-[#F3F5F7]">AAA Management Services</h1>
          <p className="text-xs text-[#9BA3AF] mt-1">Operations Control & CMS Authentication</p>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Administrator Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />

          <Input
            label="Master Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            isLoading={loading}
            className="w-full mt-2 font-bold uppercase tracking-wider text-xs py-3"
          >
            Authenticate & Access Portal
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#60697B]">
          <Link to={ROUTES.PUBLIC.HOME} className="hover:text-[#F3F5F7]">
            ← Public Website
          </Link>
          <span className="font-mono text-[10px]">Agra Command v1.0</span>
        </div>
      </Card>
    </div>
  );
};
