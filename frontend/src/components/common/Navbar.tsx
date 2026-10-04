import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ArrowUpRight, Menu, X } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { PillNav } from './PillNav';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', href: ROUTES.PUBLIC.HOME },
    { label: 'Services', href: ROUTES.PUBLIC.SERVICES },
    { label: 'About', href: ROUTES.PUBLIC.ABOUT },
    { label: 'Gallery', href: ROUTES.PUBLIC.GALLERY },
    { label: 'FAQ', href: ROUTES.PUBLIC.FAQ },
    { label: 'Contact', href: ROUTES.PUBLIC.CONTACT },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent transition-colors pt-3.5 sm:pt-4 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative pointer-events-auto">
        {/* Left: Brand Mark Pill Capsule */}
        <Link
          to={ROUTES.PUBLIC.HOME}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.09)] transition-all group z-10 shrink-0"
          aria-label="AAA Management Services Home"
        >
          <img
            src="/images/logo.png"
            alt="AAA Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full transition-transform group-hover:scale-105 shrink-0"
          />
          <div className="flex flex-col pr-1">
            <span className="font-bold text-sm tracking-tight text-[#141518] leading-tight">
              AAA
            </span>
            <span className="text-[10px] tracking-wider text-[#686873] uppercase leading-none font-semibold">
              services
            </span>
          </div>
        </Link>

        {/* Center: Pill Navigation without Borders (Dead Centered) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center pointer-events-auto">
          <PillNav
            items={navItems}
            activeHref={location.pathname}
            baseColor="#ffffff"
            pillColor="#141518"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#4B4B53"
          />
        </div>

        {/* Right: Action Button Pill */}
        <div className="hidden lg:flex items-center gap-3 z-10 shrink-0">
          <Link
            to={ROUTES.PUBLIC.REQUEST_QUOTE}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#141518] text-white hover:bg-[#26272B] font-medium text-xs whitespace-nowrap transition-all shadow-[0_4px_16px_rgba(20,21,24,0.12)] hover:shadow-[0_6px_20px_rgba(20,21,24,0.18)] group shrink-0"
          >
            <span>Request Quote</span>
            <ArrowUpRight className="w-5.5 h-5.5 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.06)] text-[#141518] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-auto max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 pointer-events-auto border-0">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#141518] text-white font-semibold'
                      : 'text-[#4B4B53] hover:bg-[#FAF9F5] hover:text-[#141518]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E6E3DA]/60 flex flex-col gap-2.5">
            <a
              href="tel:9045393714"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-mono text-[#141518] bg-[#F5F3EC]"
            >
              <Phone className="w-3.5 h-3.5 text-[#C44D2B]" />
              <span>Call Dispatch: 9045393714</span>
            </a>
            <Link
              to={ROUTES.PUBLIC.REQUEST_QUOTE}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl text-sm font-medium bg-[#141518] text-white shadow-md"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
