import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ExternalLink, LogOut } from 'lucide-react';
import { ROUTES } from '../constants/routes';

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  const adminNav = [
    { label: 'Dashboard', path: ROUTES.ADMIN.DASHBOARD },
    { label: 'Business Profile', path: ROUTES.ADMIN.BUSINESS },
    { label: 'Hero Section', path: ROUTES.ADMIN.HERO },
    { label: 'About Details', path: ROUTES.ADMIN.ABOUT },
    { label: 'Security Services', path: ROUTES.ADMIN.SERVICES },
    { label: 'Why Choose AAA', path: ROUTES.ADMIN.WHY_AAA },
    { label: 'Process Steps', path: ROUTES.ADMIN.PROCESS },
    { label: 'Gallery Media', path: ROUTES.ADMIN.GALLERY },
    { label: 'FAQs', path: ROUTES.ADMIN.FAQS },
    { label: 'Contact Enquiries', path: ROUTES.ADMIN.ENQUIRIES },
    { label: 'Quote Requests', path: ROUTES.ADMIN.QUOTE_REQUESTS },
    { label: 'Manpower Pricing', path: ROUTES.ADMIN.PRICING },
    { label: 'Quotations', path: ROUTES.ADMIN.QUOTATIONS },
    { label: 'Settings', path: ROUTES.ADMIN.SETTINGS },
  ];

  return (
    <div className="flex min-h-[100dvh] bg-[#0B0E14] text-[#F3F5F7]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#111622] border-r border-white/10 flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/20 bg-white shadow-sm flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="AAA Logo"
              className="w-full h-full object-contain rounded-full p-0.5"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#F3F5F7]">AAA CMS</h2>
            <p className="text-[10px] text-[#9BA3AF]">Admin Control Panel</p>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto flex flex-col gap-1 text-xs">
          {adminNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#D4A343]/15 text-[#D4A343] font-medium border border-[#D4A343]/30'
                    : 'text-[#9BA3AF] hover:text-[#F3F5F7] hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 flex flex-col gap-1">
          <Link
            to={ROUTES.PUBLIC.HOME}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-xs text-[#9BA3AF] hover:text-[#F3F5F7] hover:bg-white/5 rounded-lg flex items-center gap-2"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
          <Link
            to={ROUTES.ADMIN.LOGIN}
            className="px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Session</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#111622]/60 backdrop-blur-md border-b border-white/10 px-8 flex items-center justify-between">
          <div className="text-xs text-[#9BA3AF]">
            AAA Management Services - Security Operations Management System
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[#9BA3AF]">System Online</span>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
