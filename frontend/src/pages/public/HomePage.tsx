import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Phone,
  CheckCircle2,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { DriftWall, DriftWallItem } from '../../components/common/DriftWall';
import { AnimatedList } from '../../components/common/AnimatedList';
import { ManpowerEstimator } from '../../components/pricing/ManpowerEstimator';
import { ROUTES } from '../../constants/routes';

const MANPOWER_STREAM_ITEMS: DriftWallItem[] = [
  {
    id: '01',
    title: 'Manned Guard Sentry',
    subtitle: 'Static perimeter & gate logging',
    badge: 'UNARMED GUARD',
    bgColor: '#141518',
    textColor: '#FFFFFF',
  },
  {
    id: '02',
    title: 'Licensed Armed Escort',
    subtitle: 'Firearm deterrence & transit',
    badge: 'ARMED ESCORT',
    bgColor: '#FFFFFF',
    textColor: '#141518',
  },
  {
    id: '03',
    title: 'Night Patrol Officer',
    subtitle: 'Surprise check 23:00 to 05:00',
    badge: 'ROVING PATROL',
    bgColor: '#EDE8DD',
    textColor: '#141518',
  },
  {
    id: '04',
    title: 'Field Supervisor Post',
    subtitle: 'Muster roll & turnout audit',
    badge: 'SUPERVISOR',
    bgColor: '#1E2024',
    textColor: '#FFFFFF',
  },
  {
    id: '05',
    title: 'Industrial Plant Sentry',
    subtitle: 'Weighbridge & yard watch',
    badge: 'INDUSTRIAL',
    bgColor: '#FFFFFF',
    textColor: '#141518',
  },
  {
    id: '06',
    title: 'Visitor Access Sentry',
    subtitle: 'Pass verification & badge check',
    badge: 'ACCESS GATE',
    bgColor: '#E5DFD3',
    textColor: '#141518',
  },
  {
    id: '07',
    title: 'Warehouse Compound Sentry',
    subtitle: 'Loading dock inspection',
    badge: 'LOGISTICS',
    bgColor: '#141518',
    textColor: '#FFFFFF',
  },
  {
    id: '08',
    title: 'Quick Response Reserve',
    subtitle: 'Standby emergency deployment',
    badge: 'QRT RELIEF',
    bgColor: '#FFFFFF',
    textColor: '#141518',
  },
  {
    id: '09',
    title: 'Corporate Lobby Officer',
    subtitle: 'Front desk access management',
    badge: 'CORPORATE',
    bgColor: '#EDE8DD',
    textColor: '#141518',
  },
  {
    id: '10',
    title: 'Healthcare Facility Sentry',
    subtitle: 'Emergency triage & campus watch',
    badge: 'HEALTHCARE',
    bgColor: '#1E2024',
    textColor: '#FFFFFF',
  },
  {
    id: '11',
    title: 'Residential Township Guard',
    subtitle: 'Gate barrier & vehicle entry',
    badge: 'RESIDENTIAL',
    bgColor: '#FFFFFF',
    textColor: '#141518',
  },
  {
    id: '12',
    title: 'Fire Safety Marshall',
    subtitle: 'Hydrant & evacuation audit',
    badge: 'SAFETY AUDIT',
    bgColor: '#E5DFD3',
    textColor: '#141518',
  },
  {
    id: '13',
    title: 'High Value Cash Escort',
    subtitle: 'Armored cash transfer team',
    badge: 'ARMED GUARD',
    bgColor: '#141518',
    textColor: '#FFFFFF',
  },
  {
    id: '14',
    title: 'Perimeter Boundary Patrol',
    subtitle: 'Continuous boundary surveillance',
    badge: 'PERIMETER',
    bgColor: '#FFFFFF',
    textColor: '#141518',
  },
  {
    id: '15',
    title: 'Agra Command Dispatch',
    subtitle: 'Central dispatch & roster unit',
    badge: 'DISPATCH',
    bgColor: '#EDE8DD',
    textColor: '#141518',
  },
];

export const HomePage: React.FC = () => {
  const reduce = useReducedMotion();
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const services = [
    {
      id: 'guards',
      number: '01',
      title: 'Security Guards',
      subtitle: 'Security personnel for regular site and property security.',
      badge: 'SECURITY SERVICE',
      description:
        'Security personnel for offices, buildings, properties, and other locations that require regular security.',
      helpHeading: 'How they can help',
      items: [
        'Site security',
        'Entry and exit monitoring',
        'Visitor management',
        'Basic access control',
      ],
    },
    {
      id: 'supervisors',
      number: '02',
      title: 'Security Supervisors',
      subtitle: 'Supervisors to manage and coordinate security staff.',
      badge: 'SECURITY SERVICE',
      description:
        'Supervisors who help manage and coordinate security personnel at your site.',
      helpHeading: 'How they can help',
      items: [
        'Staff coordination',
        'Site supervision',
        'Attendance and deployment coordination',
        'Reporting to management',
      ],
    },
    {
      id: 'gunmen',
      number: '03',
      title: 'Security Gunmen',
      subtitle: 'Armed security personnel for eligible security requirements.',
      badge: 'SECURITY SERVICE',
      description:
        'Armed security personnel for requirements where armed security is needed, subject to applicable rules and requirements.',
      helpHeading: 'How they can help',
      items: [
        'Armed security presence',
        'High-security area monitoring',
        'Authorized personnel protection',
        'Site vigilance under applicable norms',
      ],
    },
    {
      id: 'custom',
      number: '04',
      title: 'Custom Security Manpower',
      subtitle: 'Security manpower based on your specific requirements.',
      badge: 'SECURITY SERVICE',
      description:
        'Tell us about your location, required number of personnel, and security needs. We can help you plan the appropriate manpower.',
      helpHeading: 'Information you can share',
      items: [
        'Number of guards required',
        'Supervisors required',
        'Gunmen required',
        'Location and working requirements',
      ],
    },
  ];

  const activeService = services[activeServiceIndex];

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* 1. HERO SECTION (Asymmetric Split, Editorial Discipline) */}
      <section
        style={{
          backgroundImage: 'url(/images/hometopbackground.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
        className="relative pt-24 pb-16 md:pt-28 md:pb-20 border-b border-[#E6E3DA] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6 z-10 relative"
            >
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EB] border border-[#E6E3DA] text-xs text-[#141518]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#de5a35]" />
                <span className="font-medium">AAA Management Services · Agra</span>
                <span className="text-[#8C8C96] text-[11px]">Shamshabad Road</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#141518] leading-[1.08]">
                Professional Security Services,{' '}
                <span className="font-serif italic font-normal text-[#141518]">
                  Built Around Your Needs.
                </span>
              </h1>

              {/* Subtext (strictly <= 20 words) */}
              <p className="text-base sm:text-lg text-[#686873] leading-relaxed max-w-xl">
               Reliable security manpower and supervision for businesses, properties, and organizations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={ROUTES.PUBLIC.REQUEST_QUOTE}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141518] text-white hover:bg-[#26272B] text-xs sm:text-sm font-medium transition-all shadow-sm group"
                >
                  <span>Request a Security Quote</span>
                  <ArrowUpRight className="w-4 h-4 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to={ROUTES.PUBLIC.SERVICES}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F3F1EB] text-[#141518] hover:bg-[#EBE8E0] text-xs sm:text-sm font-medium transition-all border border-[#E6E3DA]"
                >
                  <span>Explore Services</span>
                  <ChevronRight className="w-4 h-4 text-[#686873]" />
                </Link>
              </div>

              {/* Quick Contact Bar */}
              <div className="pt-4 flex flex-wrap items-center gap-7 text-sm sm:text-base text-[#686873] border-t border-[#E6E3DA]/60">
                <a
                  href="https://maps.app.goo.gl/6feqnvZjJ9CdpCCQA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-[#141518] transition-colors group cursor-pointer"
                  title="Open exact location in Google Maps"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#de5a35] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="font-medium group-hover:underline underline-offset-4">Rajpur, Chamruali Mod, Agra</span>
                </a>
                <div className="inline-flex items-center gap-2.5">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#de5a35] shrink-0" />
                  <a href="tel:9045393714" className="hover:text-[#141518] font-mono font-medium hover:underline underline-offset-4 transition-colors">
                    9045393714
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Flowing Manpower DriftWall in Orange Area */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative w-full flex items-center justify-center lg:justify-end -mt-20 lg:-mt-36"
            >
              <div
                style={{ height: 600 }}
                className="relative w-full max-w-[650px] overflow-visible bg-transparent border-0 -translate-y-16 lg:-translate-y-24"
              >
                <DriftWall
                  items={MANPOWER_STREAM_ITEMS}
                  columns={3}
                  tileWidth={205}
                  tileHeight={140}
                  gap={16}
                  tilt={14}
                  turn={-12}
                  roll={0}
                  perspective={1200}
                  depth={100}
                  speed={32}
                  direction="up"
                  variance={0.45}
                  parallax={0.5}
                  lift={40}
                  fade={0}
                  dim={1}
                  overlayColor="transparent"
                  radius={16}
                  pauseOnHover={false}
                  grayscale={false}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE OPERATIONAL STANDARD (Why Choose AAA) */}
      <section className="py-20 md:py-28 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Editorial Philosophy */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141518] leading-tight">
                Security Services That Fit {' '}
                <span className="font-serif italic font-normal text-[#141518]">
                  Your Needs.
                </span>
              </h2>
              <p className="text-sm text-[#686873] leading-relaxed">
                From individual security guards to complete security manpower requirements, AAA Management Services helps businesses and organizations find the right security personnel for their needs.
              </p>

              <div className="p-5 rounded-2xl bg-[#F3F1EB] border border-[#E6E3DA] space-y-2">
                <span className="text-xs font-semibold text-[#141518] block">
                  Statutory Labor Parity Commitment
                </span>
                <p className="text-xs text-[#686873] leading-relaxed">
                  Every guard is enrolled under Employee Provident Fund (EPF) and Employee State Insurance (ESIC). Clean monthly compliance challans are submitted with your invoice.
                </p>
              </div>

              <div>
                <Link
                  to={ROUTES.PUBLIC.ABOUT}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#141518] hover:text-[#C44D2B] transition-colors"
                >
                  <span>Learn about our operational governance</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Stacked Editorial Numbered Points with AnimatedList */}
            <div className="lg:col-span-7">
              <AnimatedList
                items={[
                  {
                    section: '§ 01',
                    title: 'Security Services That Fit Your Needs',
                    desc: 'AAA Management Services provides security manpower based on your site, workforce, and security requirements.',
                  },
                  {
                    section: '§ 02',
                    title: 'Security Guards',
                    desc: 'Security guards for offices, buildings, properties, and other locations that need regular security personnel.',
                  },
                  {
                    section: '§ 03',
                    title: 'Security Supervisors',
                    desc: 'Supervisors to manage and coordinate security personnel at your site.',
                  },
                  {
                    section: '§ 04',
                    title: 'Security Gunmen',
                    desc: 'Security gunmen for requirements where armed security personnel are needed, subject to applicable rules and requirements.',
                  },
                ]}
                showGradients={true}
                enableArrowNavigation={true}
                displayScrollbar={false}
                initialSelectedIndex={-1}
                staggerDelay={0.08}
                inViewAmount={0.2}
                renderItem={(item, _idx, isSelected) => (
                  <div
                    className={`p-5 sm:p-6 rounded-2xl bg-white border transition-all duration-300 shadow-card flex flex-col sm:flex-row items-start gap-4 ${
                      isSelected
                        ? 'border-[#141518] shadow-lift scale-[1.01] ring-1 ring-[#141518]/10'
                        : 'border-[#E6E3DA] hover:border-[#CDC9BF]'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#C44D2B] text-white shadow-sm'
                          : 'text-[#C44D2B] bg-[#FBF0EC]'
                      }`}
                    >
                      {item.section}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-[#141518]">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-[#686873] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SECURITY SERVICES (Interactive Explorer) */}
      <section className="py-20 md:py-28 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141518]">
                Our Security Services
              </h2>
              <p className="text-sm text-[#686873] mt-2 max-w-xl">
                Choose a service to learn more about the security personnel and support we can provide.
              </p>
            </div>
            <Link
              to={ROUTES.PUBLIC.SERVICES}
              className="text-xs font-semibold text-[#141518] hover:text-[#C44D2B] inline-flex items-center gap-1"
            >
              <span>View full service catalog</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Service Selection List (Left Column) */}
            <div className="lg:col-span-5 space-y-2.5">
              {services.map((service, index) => {
                const isSelected = index === activeServiceIndex;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveServiceIndex(index)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all border ${
                      isSelected
                        ? 'bg-white border-[#141518] shadow-card'
                        : 'bg-[#F3F1EB] border-transparent hover:bg-[#EBE8E0] text-[#686873]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono font-semibold ${isSelected ? 'text-[#C44D2B]' : 'text-[#8C8C96]'}`}>
                          {service.number}
                        </span>
                        <span className={`text-sm font-bold ${isSelected ? 'text-[#141518]' : 'text-[#686873]'}`}>
                          {service.title}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[#C44D2B]' : 'text-[#8C8C96]'}`} />
                    </div>
                    <p className="text-xs text-[#8C8C96] mt-1.5 ml-7 line-clamp-2 leading-relaxed">
                      {service.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Service Showcase (Right Column) */}
            <div className="lg:col-span-7 bg-white border border-[#E6E3DA] rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C44D2B] bg-[#FBF0EC] px-2.5 py-1 rounded-full border border-[#F5D5CB]">
                  {activeService.badge}
                </span>
                <h3 className="text-2xl font-bold text-[#141518] mt-3">{activeService.title}</h3>
                <p className="text-xs sm:text-sm text-[#686873] leading-relaxed mt-2">
                  {activeService.description}
                </p>
              </div>

              {/* How they can help Checklist */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#141518] block">
                  {activeService.helpHeading}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.items.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#686873] bg-[#FAF9F5] p-3 rounded-xl border border-[#E6E3DA]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C44D2B] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footnote */}
              <div className="pt-4 border-t border-[#E6E3DA] flex items-center justify-end">
                <Link
                  to={ROUTES.PUBLIC.REQUEST_QUOTE}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141518] text-white hover:bg-[#26272B] text-xs font-medium transition-all shadow-sm group"
                >
                  <span>Request a Quote &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW WE GET STARTED (Process Section - Marquee) */}
      <section className="py-20 md:py-28 border-b border-[#E6E3DA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141518]">
              How We Get Started
            </h2>
            <p className="text-base text-[#686873] mt-2 leading-relaxed">
              From understanding your requirement to arranging the right security manpower, we keep the process simple.
            </p>
          </div>
        </div>

        {/* Marquee Track Container with Edge Gradients & Pause on Hover */}
        <div className="relative w-full marquee-container overflow-hidden py-6">
          {/* Edge Fade Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF9F5] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF9F5] to-transparent z-10" />

          {/* Marquee Track with Repeated Card Sets for Infinite Right-to-Left Loop */}
          <div className="flex w-max">
            {[0, 1, 2].map((copyIndex) => (
              <div
                key={copyIndex}
                className="animate-marquee-left flex shrink-0 gap-6 pr-6 py-4"
                aria-hidden={copyIndex > 0 ? 'true' : undefined}
              >
                {[
                  {
                    step: '01',
                    title: 'Understand Your Requirement',
                    desc: 'Tell us about your location, security needs, number of personnel, and working requirements.',
                  },
                  {
                    step: '02',
                    title: 'Plan Your Security Setup',
                    desc: 'We discuss your requirements and help determine the appropriate security manpower for your site.',
                  },
                  {
                    step: '03',
                    title: 'Deploy Security Personnel',
                    desc: 'Once everything is finalized, the required security personnel can be arranged for your site.',
                  },
                  {
                    step: '04',
                    title: 'Ongoing Support',
                    desc: 'Stay in contact with our team for changes, additional requirements, or ongoing security support.',
                  },
                ].map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="w-[280px] sm:w-[340px] shrink-0 bg-white border border-[#E6E3DA] p-6 sm:p-7 rounded-2xl space-y-3 shadow-card transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:border-[#C44D2B] hover:ring-2 hover:ring-[#C44D2B]/20 hover:shadow-lift relative z-0 hover:z-20 group"
                  >
                    <span className="text-2xl sm:text-3xl font-serif italic text-[#C44D2B] font-normal block group-hover:scale-105 transition-transform origin-left">
                      {st.step}.
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#141518] leading-snug group-hover:text-[#141518]">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#686873] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE STATUTORY ESTIMATOR */}
      <section className="py-20 md:py-28 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141518]">
              Statutory wage estimator.
            </h2>
            <p className="text-sm text-[#686873] mt-2">
              Model your security manpower requirements. All figures include statutory PF, ESI, uniform allowances, and GST.
            </p>
          </div>

          <ManpowerEstimator />
        </div>
      </section>

      {/* 6. ESSENTIAL QUESTIONS (FAQ) */}
      <section className="py-20 md:py-28 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141518]">
              Client & compliance questions.
            </h2>
            <p className="text-sm text-[#686873] mt-2">
              Clear answers regarding statutory proof, guard replacements, and service agreements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'What statutory compliance documents do you provide monthly?',
                a: 'Every monthly bill is accompanied by proof of EPF contribution, ESIC deposit challan, wages muster roll, and GST tax invoice.',
              },
              {
                q: 'How do you handle guard absenteeism or sickness?',
                a: 'We maintain reserve personnel at our Agra headquarters on Shamshabad Road. A relief guard is dispatched promptly so posts remain manned.',
              },
              {
                q: 'Are your guards police verified?',
                a: 'Yes. Every personnel record includes local police verification clearance, Aadhaar identity check, and permanent address verification.',
              },
              {
                q: 'What is the deployment turnaround time in Agra?',
                a: 'Standard guard detachments can be mobilized within 48 to 72 hours of contract execution following our on-site perimeter survey.',
              },
            ].map((faq, fIdx) => (
              <div
                key={fIdx}
                className="bg-white border border-[#E6E3DA] p-6 rounded-2xl space-y-2 shadow-card"
              >
                <h3 className="text-sm font-bold text-[#141518]">{faq.q}</h3>
                <p className="text-xs text-[#686873] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to={ROUTES.PUBLIC.FAQ}
              className="text-xs font-semibold text-[#141518] hover:text-[#C44D2B] inline-flex items-center gap-1"
            >
              <span>Explore all compliance & operational FAQs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CONVERSION CALLOUT & HEADQUARTERS */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141518] text-white rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6E3DA]/80">
                Agra Headquarters
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Secure your facility with disciplined manpower.
              </h2>
              <p className="text-xs sm:text-sm text-[#A0A0AA] leading-relaxed">
                Contact our dispatch office on Shamshabad Road, Agra to schedule a site perimeter inspection and formal tender proposal.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#A0A0AA] pt-2">
                <MapPin className="w-3.5 h-3.5 text-[#C44D2B]" />
                <span>Infront Of TV Tower, Chamruali Mod, Rajpur, Agra - 282001</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <Link
                to={ROUTES.PUBLIC.REQUEST_QUOTE}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#141518] hover:bg-[#FAF9F5] text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:9045393714"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-mono transition-all border border-white/15"
              >
                <Phone className="w-4 h-4 text-[#C44D2B]" />
                <span>Call 9045393714</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
