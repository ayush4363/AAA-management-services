import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Phone,
  Crosshair,
  UserCheck,
  Users,
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export const ServicesPage: React.FC = () => {
  const serviceList = [
    {
      id: 'guarding',
      title: 'Security Guards',
      icon: ShieldCheck,
      overview:
        'Trained security guards for offices, buildings, sites, and other locations that require reliable security manpower.',
      duties: [
        'Gate and entry monitoring',
        'Visitor assistance',
        'Basic security checks',
        'Maintaining security at the assigned location',
      ],
      timing: 'Flexible day or night shift timings based on your requirement',
      sectors: ['Offices & Buildings', 'Commercial Properties','Schools', 'Warehouses & Factories'],
    },
    {
      id: 'supervisors',
      title: 'Security Supervisors',
      icon: UserCheck,
      overview:
        'Security supervisors to help manage deployed guards and coordinate security requirements at your site.',
      duties: [
        'Guard coordination',
        'Shift and attendance coordination',
        'Site communication',
        'Support for day-to-day security requirements',
      ],
      timing: 'Coordinated supervision aligned with your security roster',
      sectors: ['Commercial Facilities', 'Work Sites', 'Properties requiring multiple guards'],
    },
    {
      id: 'gunmen',
      title: 'Security Gunmen',
      icon: Crosshair,
      overview:
        'Security gunmen for requirements where armed security personnel are needed, subject to applicable rules and requirements.',
      duties: [
        'Armed security presence',
        'High-security area monitoring',
        'Authorized personnel protection',
        'Site vigilance under applicable norms',
      ],
      timing: 'Duty schedules arranged according to site requirements',
      sectors: ['High-value premises', 'Commercial locations', 'Requirements requiring armed security'],
    },
    {
      id: 'custom',
      title: 'Customized Security Manpower',
      icon: Users,
      overview:
        'Security manpower can be planned according to the size, location, timing, and requirements of your site.',
      duties: [
        'Discuss your security requirement',
        'Understand the site requirement',
        'Plan required manpower',
        'Provide a suitable quotation',
      ],
      timing: 'Planned specifically for your operational schedule',
      sectors: ['Single or multi-location sites', 'Custom team requirements'],
    },
  ];

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* Page Header */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-24 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EB] border border-[#E6E3DA] text-xs text-[#141518]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C44D2B]" />
              <span>Our Offerings</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#141518] leading-[1.1]">
              Security Services
            </h1>
            <p className="text-lg sm:text-xl text-[#686873] leading-relaxed">
              Security manpower and support based on your site's requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Services List (Editorial Stack) */}
      <section className="py-16 md:py-24 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {serviceList.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white border border-[#E6E3DA] rounded-2xl p-6 sm:p-10 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Column 1: Identity & Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-[#E6E3DA] flex items-center justify-center text-[#C44D2B]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#8C8C96] uppercase block">
                        Service {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-2xl font-bold text-[#141518]">{service.title}</h2>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#686873] leading-relaxed">
                    {service.overview}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={ROUTES.PUBLIC.REQUEST_QUOTE}
                      state={{ preselectedPersonnel: service.title }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#141518] text-white hover:bg-[#26272B] text-sm font-medium transition-all shadow-sm"
                    >
                      <span>Request a Quote for this Service</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Column 2: Responsibilities & Suitability */}
                <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-[#E6E3DA] lg:pl-8">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#141518] mb-3">
                      How they can help
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.duties.map((duty, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2.5 text-sm text-[#4A4B53] bg-[#FAF9F5] p-3.5 rounded-xl border border-[#E6E3DA]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#C44D2B] shrink-0 mt-0.5" />
                          <span className="leading-snug">{duty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#141518] mb-3">
                      Suitable Locations
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {service.sectors.map((sec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3.5 py-1.5 rounded-full bg-[#F3F1EB] text-[#141518] text-sm border border-[#E6E3DA]"
                        >
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Inquiry Callout */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F3F1EB] border border-[#E6E3DA] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#141518]">Have a specific security requirement?</h3>
              <p className="text-sm sm:text-base text-[#686873] leading-relaxed">
                Contact our team to discuss your site, required number of guards, and get a suitable quotation.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={ROUTES.PUBLIC.REQUEST_QUOTE}
                className="px-6 py-3 rounded-full bg-[#141518] text-white hover:bg-[#26272B] text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:9045393714"
                className="px-5 py-3 rounded-full bg-white text-[#141518] hover:bg-[#FAF9F5] text-sm font-mono border border-[#E6E3DA] flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-[#C44D2B]" />
                <span>9045393714</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
