import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Phone,
  Crosshair,
  UserCheck,
  Factory,
  Users,
  MapPin,
  Clock,
  Building2,
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export const ServicesPage: React.FC = () => {
  const serviceList = [
    {
      id: 'guarding',
      title: 'Security Guards',
      badge: 'Unarmed Guarding',
      icon: ShieldCheck,
      overview:
        'Trained and uniformed security guards for static post guarding, entrance gate monitoring, and visitor access control. Designed for commercial premises, residential townships, institutions, and offices across Agra seeking dependable daily protection.',
      duties: [
        'Main entrance and gate access monitoring',
        'Visitor identification and entry pass issuance',
        'Staff movement and parking area coordination',
        'Regular perimeter checks and vigilance',
      ],
      timing: 'Flexible 8-hour or 12-hour shifts for day, night, or 24/7 continuous coverage',
      sectors: [
        'Corporate Offices',
        'Commercial Complexes',
        'Residential Colonies',
        'Schools & Colleges',
        'Retail Outlets',
      ],
    },
    {
      id: 'supervisors',
      title: 'Security Supervisors',
      badge: 'Operational Oversight',
      icon: UserCheck,
      overview:
        'Experienced field security supervisors to coordinate on-site guard deployments, conduct turnout inspections, manage attendance rosters, and serve as the direct liaison between your management and security personnel.',
      duties: [
        'Guard briefing, shift relief, and attendance tracking',
        'Routine post inspections and uniform turnout audits',
        'Immediate operational point of contact for facility managers',
        'Supervision of visitor and vehicle entry registers',
      ],
      timing: 'Scheduled supervisory shifts synchronized with on-site guard rosters',
      sectors: [
        'Multi-Gate Facilities',
        'Commercial Centers',
        'Sites deploying multiple guards',
        'Corporate Campuses',
      ],
    },
    {
      id: 'gunmen',
      title: 'Security Gunmen',
      badge: 'Armed Security Personnel',
      icon: Crosshair,
      overview:
        'Authorized armed security personnel equipped to deliver strong deterrence and high-level vigilance for premises requiring armed protection, strictly complying with applicable statutory norms and regulations in Uttar Pradesh.',
      duties: [
        'Armed security presence and visible deterrence',
        'Monitoring of cash handling zones and sensitive assets',
        'Vigilance at high-risk entry and transfer points',
        'Adherence to safety protocols and statutory security guidelines',
      ],
      timing: 'Dedicated 8-hour or 12-hour armed duty shifts based on site risk assessment',
      sectors: [
        'High-Value Establishments',
        'Financial & Cash Handling Units',
        'Commercial Depots',
        'Designated Private Assets',
      ],
    },
    {
      id: 'industrial',
      title: 'Industrial & Warehouse Security',
      badge: 'Factory & Yard Protection',
      icon: Factory,
      overview:
        'Specialized industrial security manpower focused on the distinct operational demands of manufacturing units, factory yards, warehouses, and storage godowns situated in Agra industrial belts.',
      duties: [
        'Inward and outward material gate pass verification',
        'Commercial truck entry logging and weighbridge coordination',
        'Perimeter wall inspection and loading dock observation',
        'Turnout monitoring and after-hours compound safety',
      ],
      timing: '24/7 continuous industrial gate, yard, and perimeter security rosters',
      sectors: [
        'Manufacturing Plants',
        'Warehouses & Godowns',
        'Packaging Units',
        'Cold Storage Facilities',
        'Industrial Workshop Yards',
      ],
    },
    {
      id: 'custom',
      title: 'Customized Security Manpower',
      badge: 'Tailored Deployments',
      icon: Users,
      overview:
        'Tailored security staffing plans designed around the specific layout, size, visitor footfall, and operational schedules of your facility in Agra. We help you determine the optimal mix of guards, supervisors, and armed sentries.',
      duties: [
        'Consultation to evaluate site gates, boundaries, and vulnerable points',
        'Recommendation of required guard and supervisor ratios',
        'Transparent manpower planning and clear monthly quotation',
        'Smooth deployment with site-specific instruction handovers',
      ],
      timing: 'Tailored duty schedules matching your organizational working hours',
      sectors: [
        'Multi-Acre Industrial Plots',
        'New Facility Openings',
        'Mixed Armed & Unarmed Sites',
        'Short-Term or Annual Deployments',
      ],
    },
  ];

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* 1. Page Header */}
      <section className="pt-20 pb-14 md:pt-24 md:pb-20 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EB] border border-[#E6E3DA] text-xs text-[#141518]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C44D2B]" />
              <span>Agra Security Manpower Solutions</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#141518] leading-[1.1]">
              Security Services in Agra
            </h1>
            <p className="text-lg sm:text-xl text-[#686873] leading-relaxed">
              Reliable security guard services, licensed armed gunmen, supervisory teams, and industrial facility protection tailored for businesses and properties across Agra, Uttar Pradesh.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Agency Introduction Section (Context & Who We Serve) */}
      <section className="py-12 md:py-16 border-b border-[#E6E3DA] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase text-[#C44D2B] font-semibold tracking-wider block">
                Professional Security Agency in Agra
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#141518] tracking-tight">
                Dependable Security Guard Services Tailored to Your Site
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#686873] leading-relaxed">
                <p>
                  AAA Management Services is a dedicated security agency based on Shamshabad Road, Chamruali Mod, Rajpur, Agra. We help business owners, facility managers, and property operators maintain disciplined security coverage across commercial offices, manufacturing factories, logistics warehouses, educational institutions, and residential townships.
                </p>
                <p>
                  Whether your site requires a single disciplined guard for entrance gate monitoring, experienced security supervisors to conduct regular turnout inspections, licensed armed security gunmen for high-value protection, or a complete industrial security team, we structure reliable manpower deployments adapted to your operational hours.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold">
                <Link
                  to={ROUTES.PUBLIC.ABOUT}
                  className="inline-flex items-center gap-1.5 text-[#141518] hover:text-[#C44D2B] transition-colors underline underline-offset-4"
                >
                  <span>Learn more about our agency</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[#E6E3DA] hidden sm:inline">|</span>
                <Link
                  to={ROUTES.PUBLIC.REQUEST_QUOTE}
                  className="inline-flex items-center gap-1.5 text-[#C44D2B] hover:text-[#141518] transition-colors underline underline-offset-4"
                >
                  <span>Request an instant manpower quotation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Agency Highlights */}
            <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#E6E3DA] rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-[#141518]">Why Work With AAA Management Services</h3>
              <ul className="space-y-3 text-sm text-[#4A4B53]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C44D2B] shrink-0 mt-0.5" />
                  <span>Verified headquarters located in Rajpur, Agra for prompt coordination</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C44D2B] shrink-0 mt-0.5" />
                  <span>Uniformed, turnout-inspected security personnel on every post</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C44D2B] shrink-0 mt-0.5" />
                  <span>Clear statutory compliance with statutory wage standards</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C44D2B] shrink-0 mt-0.5" />
                  <span>Dedicated supervisors conducting unscheduled shift and muster roll audits</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-[#E6E3DA] flex items-center justify-between text-xs text-[#8C8C96]">
                <span>Operations Center: Agra, UP</span>
                <span className="font-mono text-[#141518] font-medium">+91 9045393714</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services List (Editorial Stack) */}
      <section className="py-16 md:py-24 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase text-[#C44D2B] font-semibold tracking-wider">
              Deployment Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#141518] tracking-tight">
              Our Security Manpower Services
            </h2>
            <p className="text-sm sm:text-base text-[#686873] leading-relaxed">
              Explore our core security personnel categories available for deployment across industrial, commercial, and residential facilities in Agra.
            </p>
          </div>

          {serviceList.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white border border-[#E6E3DA] rounded-3xl p-6 sm:p-10 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Column 1: Identity & Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-[#E6E3DA] flex items-center justify-center text-[#C44D2B] shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#8C8C96] uppercase">
                          Service {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F3F1EB] text-[#C44D2B] border border-[#E6E3DA]">
                          {service.badge}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#141518] mt-0.5">{service.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#686873] leading-relaxed">
                    {service.overview}
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E6E3DA] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#141518]">
                      <Clock className="w-3.5 h-3.5 text-[#C44D2B]" />
                      <span>Shift Coverage</span>
                    </div>
                    <p className="text-xs text-[#686873] leading-relaxed">{service.timing}</p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={ROUTES.PUBLIC.REQUEST_QUOTE}
                      state={{ preselectedPersonnel: service.title }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141518] text-white hover:bg-[#26272B] text-sm font-medium transition-all shadow-sm group"
                    >
                      <span>Request a Quote for this Service</span>
                      <ArrowUpRight className="w-4 h-4 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Column 2: Responsibilities & Suitability */}
                <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-[#E6E3DA] lg:pl-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#141518] mb-3">
                      Key Responsibilities & Duties
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.duties.map((duty, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A4B53] bg-[#FAF9F5] p-3.5 rounded-xl border border-[#E6E3DA]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#C44D2B] shrink-0 mt-0.5" />
                          <span className="leading-snug">{duty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4 text-[#C44D2B]" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#141518]">
                        Typical Use Cases & Locations
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.sectors.map((sec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1 rounded-full bg-[#F3F1EB] text-[#141518] text-xs font-medium border border-[#E6E3DA]"
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

      {/* 4. Local Agra Office Coordinates & Direct CTA */}
      <section className="py-16 md:py-20 bg-white border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF9F5] border border-[#E6E3DA] rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-mono uppercase text-[#C44D2B] font-semibold tracking-wider">
                Direct Headquarters Contact
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#141518] tracking-tight">
                Planning Security Manpower in Agra?
              </h3>
              <p className="text-sm sm:text-base text-[#686873] leading-relaxed max-w-xl">
                Speak directly with our operations team to discuss your site specifications, guard requirements, and receive a transparent formal quotation.
              </p>
              <div className="pt-2 flex items-start gap-2.5 text-xs sm:text-sm text-[#686873]">
                <MapPin className="w-4 h-4 text-[#C44D2B] shrink-0 mt-0.5" />
                <span>
                  Shamshabad Road, Infront Of TV Tower, Chamruali Mod, Rajpur, Agra - 282001, Uttar Pradesh
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-3">
              <Link
                to={ROUTES.PUBLIC.REQUEST_QUOTE}
                className="px-6 py-3.5 rounded-full bg-[#141518] text-white hover:bg-[#26272B] text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to={ROUTES.PUBLIC.CONTACT}
                className="px-5 py-3.5 rounded-full bg-[#F3F1EB] text-[#141518] hover:bg-[#EBE8E0] text-sm font-semibold border border-[#E6E3DA] flex items-center justify-center gap-1.5"
              >
                <span>Contact Office</span>
              </Link>
              <a
                href="tel:9045393714"
                className="px-5 py-3.5 rounded-full bg-white text-[#141518] hover:bg-[#F3F1EB] text-sm font-mono font-medium border border-[#E6E3DA] flex items-center justify-center gap-1.5"
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
