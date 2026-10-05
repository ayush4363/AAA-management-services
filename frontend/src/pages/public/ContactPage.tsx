import React, { useState } from 'react';
import { MapPin, Phone, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { ContactEnquiryInput } from '../../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactEnquiryInput & {
    location?: string;
    guardCount?: string;
    supervisorCount?: string;
    gunmanCount?: string;
  }>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: 'Security Guards',
    organizationName: '',
    location: '',
    guardCount: '',
    supervisorCount: '',
    gunmanCount: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }

    setErrorMsg('');

    const customerDetails: string[] = [
      `Name: ${formData.fullName.trim()}`,
      `Company / Organization: ${formData.organizationName?.trim() || 'Not specified'}`,
      `Phone: ${formData.phone.trim()}`,
      `Email: ${formData.email?.trim() || 'Not specified'}`,
      `Location: ${formData.location?.trim() || 'Not specified'}`,
    ];

    const serviceRequirements: string[] = [
      `Service Required: ${formData.serviceType || 'Security Guards'}`,
      `Number of Guards: ${formData.guardCount?.trim() || 'Not specified'}`,
      `Number of Supervisors: ${formData.supervisorCount?.trim() || 'Not specified'}`,
      `Number of Gunmen: ${formData.gunmanCount?.trim() || 'Not specified'}`,
    ];

    const sections: string[] = [
      'Hello AAA Management Services,\n\nI would like to enquire about your security services.',
     
      `CUSTOMER DETAILS\n\n${customerDetails.join('\n')}`,
      `SERVICE REQUIREMENTS\n\n${serviceRequirements.join('\n')}`,
    ];

    if (formData.message?.trim()) {
      sections.push(`ADDITIONAL REQUIREMENTS\n\n${formData.message.trim()}`);
    }

    sections.push('I would like to discuss the requirements and receive a quotation.\n\nThank you.');

    const whatsappMessage = sections.join('\n\n');
    const targetPhone = '919045393714';
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    // Asynchronously record in backend CMS without blocking WhatsApp redirection
    try {
      enquiryService.submitEnquiry({
        fullName: formData.fullName.trim(),
        email: formData.email?.trim() || 'not-provided@client.local',
        phone: formData.phone.trim(),
        serviceType: formData.serviceType,
        organizationName: formData.organizationName?.trim(),
        message: [
          formData.location ? `Location: ${formData.location}` : '',
          formData.guardCount ? `Guards: ${formData.guardCount}` : '',
          formData.supervisorCount ? `Supervisors: ${formData.supervisorCount}` : '',
          formData.gunmanCount ? `Gunmen: ${formData.gunmanCount}` : '',
          formData.message ? `Requirements: ${formData.message}` : '',
        ]
          .filter(Boolean)
          .join('\n') || 'Security requirement enquiry',
      }).catch(() => {});
    } catch (_err) {
      // Non-blocking
    }

    // Open WhatsApp
    const win = window.open(whatsappUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* Page Header */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-24 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EB] border border-[#E6E3DA] text-xs text-[#141518]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C44D2B]" />
              <span>Contact Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#141518] leading-[1.1]">
              Contact AAA Management Services
            </h1>
            <p className="text-lg sm:text-xl text-[#686873] leading-relaxed">
              Have a security requirement? Contact us to discuss your needs or request a quotation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Coordinates */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-[#141518]">Get in Touch</h2>
                <p className="text-base sm:text-lg text-[#686873] leading-relaxed">
                  You can call us directly or visit our office in Agra to discuss your security requirements.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-6 rounded-2xl bg-white border border-[#E6E3DA] shadow-card">
                  <MapPin className="w-5 h-5 text-[#C44D2B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#141518] block text-base">Office Address</span>
                    <a
                      href="https://maps.app.goo.gl/6feqnvZjJ9CdpCCQA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#686873] hover:text-[#141518] text-sm sm:text-base leading-relaxed block mt-1 transition-colors"
                    >
                      Shamshabad Road, Infront Of TV Tower, Chamruali Mod, Rajpur, Agra - 282001, Uttar Pradesh, India
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-6 rounded-2xl bg-white border border-[#E6E3DA] shadow-card">
                  <Phone className="w-5 h-5 text-[#C44D2B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#141518] block text-base">Phone Number</span>
                    <a href="tel:9045393714" className="text-[#141518] font-mono font-medium hover:text-[#C44D2B] block mt-1 text-base transition-colors">
                      +91 9045393714
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Submission Form */}
            <div className="lg:col-span-7 bg-white border border-[#E6E3DA] rounded-3xl p-6 sm:p-10 shadow-card">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#FBF0EC] text-[#C44D2B] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#141518]">Opening WhatsApp</h3>
                  <p className="text-base sm:text-lg text-[#686873] max-w-md mx-auto leading-relaxed">
                    You have been taken to WhatsApp with your enquiry details pre-filled. Please review the message and press Send to share your requirement with our team.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        serviceType: 'Security Guards',
                        organizationName: '',
                        location: '',
                        guardCount: '',
                        supervisorCount: '',
                        gunmanCount: '',
                        message: '',
                      });
                    }}
                    className="text-sm font-semibold text-[#141518] hover:text-[#C44D2B] underline"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#141518]">Tell Us What You Need</h3>
                    <p className="text-sm text-[#686873] mt-1.5 leading-relaxed">
                      Share your requirement and our team can contact you to discuss the details.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                        placeholder="Your Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                        placeholder="Mobile Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                        placeholder="Email (optional)"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                        placeholder="Company name (optional)"
                        value={formData.organizationName}
                        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                        Location
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                        placeholder="Site or area location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                        Security Requirement
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      >
                        <option value="Security Guards">Security Guards</option>
                        <option value="Security Supervisors">Security Supervisors</option>
                        <option value="Security Gunmen">Security Gunmen</option>
                        <option value="Customized Security Manpower">Customized Security Manpower</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                        Number of Guards
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                        placeholder="e.g. 2"
                        value={formData.guardCount}
                        onChange={(e) => setFormData({ ...formData, guardCount: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                        Number of Supervisors
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                        placeholder="e.g. 1"
                        value={formData.supervisorCount}
                        onChange={(e) => setFormData({ ...formData, supervisorCount: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                        Number of Gunmen
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                        placeholder="e.g. 0"
                        value={formData.gunmanCount}
                        onChange={(e) => setFormData({ ...formData, gunmanCount: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                      Additional Requirements
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                      placeholder="Share any specific timing, working hours, or site requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-full bg-[#141518] text-white hover:bg-[#26272B] text-sm font-semibold transition-all shadow-sm"
                    >
                      <span>Submit Enquiry</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
