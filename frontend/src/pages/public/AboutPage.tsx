import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  ArrowUpRight,
  ClipboardList,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* Page Header */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-24 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EB] border border-[#E6E3DA] text-xs text-[#141518]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C44D2B]" />
              <span>Who We Are</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#141518] leading-[1.1]">
              About AAA Management Services
            </h1>
            <p className="text-lg sm:text-xl text-[#686873] leading-relaxed">
              AAA Management Services provides security manpower and management services for customers looking for dependable security support.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative & Principles */}
      <section className="py-16 md:py-24 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Organizational Story */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141518]">
                Dependable security manpower for your site.
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-[#686873] leading-relaxed">
                <p>
                  Based in Agra, Uttar Pradesh, AAA Management Services helps customers arrange security personnel according to their requirements. Our focus is on understanding each customer's needs and providing suitable security manpower for their location.
                </p>
                <p>
                  Whether you need security guards, supervisors, gunmen, or a customized manpower requirement, you can discuss your needs with our team and request a quotation.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  to={ROUTES.PUBLIC.REQUEST_QUOTE}
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#141518] text-white hover:bg-[#26272B] text-sm font-semibold transition-all shadow-sm"
                >
                  <span>Request a Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:9045393714"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-[#F3F1EB] text-[#141518] hover:bg-[#EBE8E0] text-sm font-mono border border-[#E6E3DA]"
                >
                  <Phone className="w-4 h-4 text-[#C44D2B]" />
                  <span>9045393714</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3 Simple Principles */}
            <div className="lg:col-span-6 space-y-4">
              {[
                {
                  icon: ClipboardList,
                  title: 'Understanding Your Requirement',
                  desc: 'We first understand your location, security needs, manpower requirement, and working hours.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Suitable Manpower',
                  desc: 'We help you identify the type and number of security personnel required for your site.',
                },
                {
                  icon: MessageSquare,
                  title: 'Clear Communication',
                  desc: 'We keep the process simple and provide clear information about your security requirement and quotation.',
                },
              ].map((pillar, pIdx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pIdx}
                    className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E6E3DA] space-y-2.5 shadow-card"
                  >
                    <div className="flex items-center gap-3 text-[#141518]">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#E6E3DA] flex items-center justify-center text-[#C44D2B]">
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#141518]">{pillar.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-[#686873] leading-relaxed pl-11">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Office Information Card */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F3F1EB] border border-[#E6E3DA] rounded-3xl p-8 sm:p-12">
            <div className="max-w-2xl space-y-4">
              <span className="text-sm font-mono uppercase tracking-wider text-[#C44D2B]">
                Office Location
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141518]">
                AAA Management Services
              </h2>
              <p className="text-base sm:text-lg text-[#686873] leading-relaxed">
                Contact our team to discuss your site security needs or visit our office in Agra.
              </p>

              <div className="pt-2 space-y-3 text-sm sm:text-base text-[#141518]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#C44D2B] shrink-0 mt-0.5" />
                  <a
                    href="https://maps.app.goo.gl/6feqnvZjJ9CdpCCQA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-[#C44D2B] transition-colors leading-relaxed"
                  >
                    Shamshabad Road, Infront Of TV Tower, Chamruali Mod, Rajpur, Agra - 282001, Uttar Pradesh, India
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-[#C44D2B] shrink-0" />
                  <a href="tel:9045393714" className="font-mono font-medium hover:text-[#C44D2B] transition-colors">
                    +91 9045393714
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
