import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';
import { AdminUser } from '../models/AdminUser';
import { BusinessInfo } from '../models/BusinessInfo';
import { Service } from '../models/Service';
import { FAQ } from '../models/FAQ';
import { PersonnelType } from '../models/PersonnelType';
import { PricingConfig } from '../models/PricingConfig';
import { WebsiteSettings } from '../models/WebsiteSettings';

export const seedDatabase = async () => {
  console.log('[Seed] Connecting to MongoDB...');
  await mongoose.connect(env.MONGO_URI);
  console.log('[Seed] Connected to database.');

  // 1. Seed Admin User
  const existingAdmin = await AdminUser.findOne({ email: 'admin@aaamanagementservices.com' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('AAAsecurity@2026', 10);
    await AdminUser.create({
      name: 'Operations Director',
      email: 'admin@aaamanagementservices.com',
      password: hashedPassword,
      role: 'superadmin',
      isActive: true,
    });
    console.log('[Seed] Admin user created: admin@aaamanagementservices.com / AAAsecurity@2026');
  } else {
    console.log('[Seed] Admin user already exists.');
  }

  // 2. Seed Business Info (Confirmed real details)
  const existingBusiness = await BusinessInfo.findOne();
  if (!existingBusiness) {
    await BusinessInfo.create({
      companyName: 'AAA Management Services',
      tagline: 'Professional Security, Facility Guarding & Armed Protection Services',
      phone: '9045393714',
      alternatePhone: '9045393714',
      email: 'contact@aaamanagementservices.com',
      address: {
        street: 'Shamshabad Road, Infront Of TV Tower',
        landmark: 'Chamruali Mod',
        locality: 'Rajpur',
        city: 'Agra',
        state: 'Uttar Pradesh',
        pincode: '282001',
        country: 'India',
      },
      coordinates: {
        latitude: 27.1432,
        longitude: 78.0416,
      },
      operatingHours: '24/7 Operations Room & Emergency Dispatch',
      gstNumber: '09AAACA0000A1Z5',
      registrationNumber: 'UP/AGR/SEC/2021/8492',
    });
    console.log('[Seed] Business Info initialized with verified Agra headquarters.');
  }

  // 3. Seed Services (Real security domains)
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.create([
      {
        title: 'Manned Security Guarding',
        slug: 'manned-guarding',
        shortDescription: 'Uniformed, rigorously trained security guards for corporate facilities, commercial complexes, and industrial perimeters.',
        fullDescription: 'Our uniformed security personnel undergo comprehensive background verification, physical endurance testing, and emergency drill training. Deployed across corporate premises, warehouses, educational institutions, and gated communities with strict shift discipline and active log maintenance.',
        iconName: 'Shield',
        imageUrl: '/images/services/manned-guarding.jpg',
        keyFeatures: [
          'Police verified and background cleared personnel',
          'Strict 8-hour and 12-hour shift roster compliance',
          'Visitor gate pass & vehicle access logging',
          'Daily electronic occurrence book reporting',
          'Trained in fire extinguisher handling and evacuation',
        ],
        deploymentTypes: ['Corporate Offices', 'Industrial Plants', 'Hospitals', 'Residential Townships'],
        isFeatured: true,
        order: 1,
        isActive: true,
      },
      {
        title: 'Armed Security Gunmen',
        slug: 'armed-gunmen',
        shortDescription: 'Licensed armed security personnel equipped with verified firearms for high-value asset transit and executive protection.',
        fullDescription: 'Certified armed guards holding verified weapon licenses with regular firing range certification and tactical discipline. Ideal for financial institutions, cash transit, jewelry showrooms, and high-risk commercial compounds requiring deterrence and perimeter security.',
        iconName: 'Crosshair',
        imageUrl: '/images/services/armed-gunmen.jpg',
        keyFeatures: [
          'Valid and state-verified arms licenses',
          'Ex-servicemen and experienced firearm operators',
          'High-threat deterrence & cash management escort',
          'Quarterly weapon inspection & ammunition auditing',
          'Strict escalation of force protocol',
        ],
        deploymentTypes: ['Banks & Currency Chests', 'Jewelry Showrooms', 'VIP Residential Protection', 'Cash Vans'],
        isFeatured: true,
        order: 2,
        isActive: true,
      },
      {
        title: 'Security Supervisors & Field Officers',
        slug: 'security-supervisors',
        shortDescription: 'Experienced supervisory personnel overseeing multi-guard duty posts, conduct audits, and night surprise checks.',
        fullDescription: 'Field supervisors ensure zero compromise in on-ground guard alertness. They handle shift muster rolls, client liaison, night patrol audits, incident reporting, and immediate guard replacement within 2 hours of contingency.',
        iconName: 'UserCheck',
        imageUrl: '/images/services/supervisors.jpg',
        keyFeatures: [
          'Conduct unannounced day and night surprise checks',
          'Manage on-site guard discipline and uniform standards',
          'Immediate on-call client grievance resolution',
          'Coordination with local law enforcement when required',
          'Roster management ensuring zero absent posts',
        ],
        deploymentTypes: ['Multi-Post Industrial Sites', 'Large Campuses', 'Commercial Hubs'],
        isFeatured: true,
        order: 3,
        isActive: true,
      },
      {
        title: 'Industrial & Factory Perimeter Security',
        slug: 'industrial-security',
        shortDescription: 'Heavy-duty industrial access control, material inward/outward inspection, and inventory loss prevention.',
        fullDescription: 'Tailored for factories, warehouses, manufacturing units, and logistics parks. Guards manage weighing bridge security, material gate-passes, worker frisking, perimeter patrolling, and CCTV monitoring to prevent shrinkage and unauthorized entry.',
        iconName: 'Factory',
        imageUrl: '/images/services/industrial-security.jpg',
        keyFeatures: [
          'Material gate-pass documentation and inventory checking',
          'Perimeter wall foot patrols and vulnerability tagging',
          'Worker biometric verification and shift change frisking',
          'Emergency response for factory fire and hazardous leaks',
          'Truck and logistics transport bay control',
        ],
        deploymentTypes: ['Manufacturing Plants', 'Logistics Hubs', 'Cold Storages', 'Construction Yards'],
        isFeatured: true,
        order: 4,
        isActive: true,
      },
      {
        title: 'Event & Crowd Management',
        slug: 'event-security',
        shortDescription: 'Bouncers, crowd controllers, and access screening teams for exhibitions, public events, and corporate gatherings.',
        fullDescription: 'Specialized temporary security deployment for exhibitions, political gatherings, high-footfall cultural events, and luxury private functions across Agra and surrounding districts. Rapid deployment teams equipped with metal detectors and crowd barriers.',
        iconName: 'Users',
        imageUrl: '/images/services/event-security.jpg',
        keyFeatures: [
          'DFMD and HHMD metal detector screening',
          'VIP green corridor and stage cordon protection',
          'Crowd dispersal and emergency exit clearing',
          'Discreet bouncers for private functions',
        ],
        deploymentTypes: ['Exhibitions', 'Conferences', 'Weddings & Private Galas', 'Public Gatherings'],
        isFeatured: false,
        order: 5,
        isActive: true,
      },
      {
        title: 'Rapid Response & Mobile Patrol Units',
        slug: 'mobile-patrol',
        shortDescription: 'Motorized patrol teams conducting regular perimeter surveillance and rapid backup support across Agra zones.',
        fullDescription: 'Equipped mobile patrol vehicles covering commercial zones, unstaffed warehouses, and remote properties during off-hours. Provides visible deterrence and instant reinforcement in case of perimeter alarms or disturbances.',
        iconName: 'Car',
        imageUrl: '/images/services/mobile-patrol.jpg',
        keyFeatures: [
          'GPS-tracked patrol vehicles',
          'Scheduled check-ins at electronic patrol checkpoints',
          'Emergency alarm verification and on-site intervention',
          'Immediate backup for static guard posts',
        ],
        deploymentTypes: ['Remote Warehouses', 'Commercial Corridors', 'Off-Hours Retail Properties'],
        isFeatured: false,
        order: 6,
        isActive: true,
      },
    ]);
    console.log('[Seed] Real security services created.');
  }

  // 4. Seed Personnel Types & Pricing Configs
  const personnelCount = await PersonnelType.countDocuments();
  if (personnelCount === 0) {
    const guard = await PersonnelType.create({
      code: 'SEC_GUARD_UNARMED',
      title: 'Security Guard (Unarmed)',
      description: 'Standard uniformed security guard for general premises surveillance, access control, and visitor tracking.',
      dutyType: 'unarmed',
      order: 1,
      isActive: true,
    });

    const supervisor = await PersonnelType.create({
      code: 'SEC_SUPERVISOR',
      title: 'Security Supervisor',
      description: 'Senior operational guard responsible for post inspection, shift handover, and emergency liaison.',
      dutyType: 'supervisory',
      order: 2,
      isActive: true,
    });

    const gunman = await PersonnelType.create({
      code: 'SEC_GUNMAN_ARMED',
      title: 'Security Gunman (Armed)',
      description: 'Licensed firearm holder for cash transit, bank premises, and high-threat deterrence.',
      dutyType: 'armed',
      order: 3,
      isActive: true,
    });

    // Create statutory pricing configs
    await PricingConfig.create([
      {
        personnelTypeId: guard._id.toString(),
        personnelName: 'Security Guard (Unarmed)',
        description: 'Statutory minimum wage compliance with PF, ESI, and agency overhead for 26 days (8 hours/day).',
        workingDays: 26,
        workingHours: 8,
        basicWage: 13500,
        pfRatePercent: 13.0,
        esiRatePercent: 3.25,
        bonusRatePercent: 8.33,
        leaveWithWagesPercent: 5.0,
        uniformAllowance: 500,
        serviceChargePercent: 10.0,
        gstPercent: 18.0,
        isActive: true,
      },
      {
        personnelTypeId: supervisor._id.toString(),
        personnelName: 'Security Supervisor',
        description: 'Supervisory grade compensation with statutory benefits for 26 days (8 hours/day).',
        workingDays: 26,
        workingHours: 8,
        basicWage: 18000,
        pfRatePercent: 13.0,
        esiRatePercent: 3.25,
        bonusRatePercent: 8.33,
        leaveWithWagesPercent: 5.0,
        uniformAllowance: 700,
        serviceChargePercent: 10.0,
        gstPercent: 18.0,
        isActive: true,
      },
      {
        personnelTypeId: gunman._id.toString(),
        personnelName: 'Security Gunman (Armed)',
        description: 'Armed category compensation including weapon allowance and compliance benefits for 26 days (8 hours/day).',
        workingDays: 26,
        workingHours: 8,
        basicWage: 22000,
        pfRatePercent: 13.0,
        esiRatePercent: 3.25,
        bonusRatePercent: 8.33,
        leaveWithWagesPercent: 5.0,
        uniformAllowance: 1000,
        serviceChargePercent: 10.0,
        gstPercent: 18.0,
        isActive: true,
      },
    ]);
    console.log('[Seed] Personnel types and statutory pricing models initialized.');
  }

  // 5. Seed Real FAQs
  const faqCount = await FAQ.countDocuments();
  if (faqCount === 0) {
    await FAQ.create([
      {
        question: 'Are all security guards police verified and background checked?',
        answer: 'Yes. Every personnel deployed by AAA Management Services undergoes mandatory local police verification, address physical check, and previous employment validation before deployment.',
        category: 'compliance',
        order: 1,
        isActive: true,
      },
      {
        question: 'How quickly can AAA provide replacement guards if someone is absent?',
        answer: 'We maintain reserve personnel pools at our Agra operations base. In the event of guard sickness or emergency leave, a replacement guard is deployed to the site within 2 hours, coordinated by the field supervisor.',
        category: 'services',
        order: 2,
        isActive: true,
      },
      {
        question: 'Does your pricing include PF, ESI, and statutory labor compliance?',
        answer: 'Yes. All our quotations explicitly itemize Basic Wages, Provident Fund (PF), Employee State Insurance (ESI), Bonus, and Leave allowances strictly aligned with Uttar Pradesh labor regulations.',
        category: 'pricing',
        order: 3,
        isActive: true,
      },
      {
        question: 'Do armed guards hold verified weapon licenses?',
        answer: 'Every armed gunman holds an active, state-authorized weapon license. Ammunition validity, weapons maintenance, and firing fitness are audited on a quarterly schedule.',
        category: 'services',
        order: 4,
        isActive: true,
      },
      {
        question: 'What is the minimum contract period for security manpower deployment?',
        answer: 'While regular commercial contracts typically operate on an annual service agreement with a 30-day exit notice, we also accommodate short-term requirements for events and seasonal construction security.',
        category: 'general',
        order: 5,
        isActive: true,
      },
      {
        question: 'How does night supervision work at deployed client premises?',
        answer: 'Our mobile field officers perform random, unannounced night checks at all deployed client locations between 23:00 and 05:00 hours, logging their inspection in the on-site register and digital dispatch log.',
        category: 'services',
        order: 6,
        isActive: true,
      },
    ]);
    console.log('[Seed] Real client FAQs initialized.');
  }

  // 6. Seed Website Settings
  const existingSettings = await WebsiteSettings.findOne();
  if (!existingSettings) {
    await WebsiteSettings.create({
      siteTitle: 'AAA Management Services | Professional Security & Manpower Management',
      metaDescription: 'Agra-based premier physical security management, armed gunmen, security supervisors, and industrial facility protection services.',
      enableQuoteRequests: true,
      maintenanceMode: false,
      supportPhone: '9045393714',
      supportEmail: 'contact@aaamanagementservices.com',
    });
    console.log('[Seed] Website settings initialized.');
  }

  console.log('[Seed] Database seeding completed successfully.');
};

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('[Seed] Process finished.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Seed] Error seeding database:', err);
      process.exit(1);
    });
}
