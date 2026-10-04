import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F3F1EB] border-t border-[#E6E3DA] text-[#686873] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand & Purpose Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/logo.png"
                alt="AAA Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 object-cover rounded-full shrink-0 shadow-sm"
              />
              <span className="font-bold text-base tracking-tight text-[#141518]">
                AAA Management Services
              </span>
            </div>
            <p className="text-sm text-[#686873] leading-relaxed max-w-sm">
              Professional security manpower, supervisory guard management, and facility protection services based in Agra, Uttar Pradesh.
            </p>
            <div className="pt-2">
              <Link
                to={ROUTES.PUBLIC.REQUEST_QUOTE}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141518] hover:text-[#C44D2B] transition-colors"
              >
                <span>Request formal security proposal</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#141518]">
              Directory
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to={ROUTES.PUBLIC.HOME} className="hover:text-[#141518] transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PUBLIC.SERVICES} className="hover:text-[#141518] transition-colors">
                  Security Services
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PUBLIC.ABOUT} className="hover:text-[#141518] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PUBLIC.GALLERY} className="hover:text-[#141518] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PUBLIC.FAQ} className="hover:text-[#141518] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PUBLIC.CONTACT} className="hover:text-[#141518] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Headquarters & Coordinates */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#141518]">
              Headquarters
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C44D2B] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Shamshabad Road, Infront Of TV Tower, Chamruali Mod, Rajpur, Agra - 282001, Uttar Pradesh, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C44D2B] shrink-0" />
                <a href="tel:9045393714" className="hover:text-[#141518] font-mono">
                  +91 9045393714
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C44D2B] shrink-0" />
                <span>contact@aaamanagementservices.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E6E3DA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#686873]">
          <p>© {new Date().getFullYear()} AAA Management Services. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Operating from Agra, Uttar Pradesh</span>
            <Link to={ROUTES.ADMIN.LOGIN} className="hover:text-[#141518] text-[11px] text-[#8C8C96]">
              Internal Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
