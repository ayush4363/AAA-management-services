import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Plus,
  Trash2,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { quoteService } from '../../services/quoteService';
import { QuoteRequestInput } from '../../types';
import { ROUTES } from '../../constants/routes';

export const RequestQuotePage: React.FC = () => {
  const location = useLocation();
  const preselected = (location.state as any) || {};

  const [formData, setFormData] = useState<QuoteRequestInput>({
    clientName: '',
    organizationName: '',
    email: '',
    phone: '',
    facilityLocation: '',
    serviceDurationMonths: 12,
    personnelRequired: [
      {
        personnelType: preselected.preselectedPersonnel || 'Security Guard (Unarmed)',
        count: preselected.preselectedCount || 2,
        shiftHours: 8,
      },
    ],
    specialRequirements: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const addPersonnelRow = () => {
    setFormData({
      ...formData,
      personnelRequired: [
        ...formData.personnelRequired,
        { personnelType: 'Security Guard (Unarmed)', count: 2, shiftHours: 8 },
      ],
    });
  };

  const removePersonnelRow = (index: number) => {
    if (formData.personnelRequired.length <= 1) return;
    const updated = formData.personnelRequired.filter((_, i) => i !== index);
    setFormData({ ...formData, personnelRequired: updated });
  };

  const updatePersonnelRow = (index: number, field: string, value: any) => {
    const updated = [...formData.personnelRequired];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, personnelRequired: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.clientName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.facilityLocation.trim()
    ) {
      setErrorMsg('Please complete all mandatory contact and location fields.');
      return;
    }

    setErrorMsg('');

    const customerDetails: string[] = [
      `Name: ${formData.clientName.trim()}`,
      `Company / Organization: ${formData.organizationName?.trim() || 'Not specified'}`,
      `Phone: ${formData.phone.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Site / Location: ${formData.facilityLocation.trim()}`,
    ];

    const personnelList = formData.personnelRequired.map((p) => {
      const hoursStr = p.shiftHours ? ` (${p.shiftHours} hrs/shift)` : '';
      return `• ${p.personnelType || 'Security Staff'}: ${p.count || 1} personnel${hoursStr}`;
    });

    const totalGuardsCount = formData.personnelRequired.reduce((acc, row) => acc + (Number(row.count) || 0), 0);

    const serviceRequirements: string[] = [
      ...personnelList,
      `Total Personnel: ${totalGuardsCount}`,
      `Preferred Duration: ${formData.serviceDurationMonths || 12} Months`,
    ];

    const sections: string[] = [
      'Hello AAA Management Services,\n\nI would like to request a quotation for security manpower.',
      `CUSTOMER DETAILS\n\n${customerDetails.join('\n')}`,
      `SERVICE REQUIREMENTS\n\n${serviceRequirements.join('\n')}`,
    ];

    if (formData.specialRequirements?.trim()) {
      sections.push(`ADDITIONAL REQUIREMENTS\n\n${formData.specialRequirements.trim()}`);
    }

    sections.push('I would like to discuss our site requirements and receive a formal quotation.\n\nThank you.');

    const whatsappMessage = sections.join('\n\n');
    const targetPhone = '919045393714';
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    // Asynchronously record in backend CMS without blocking WhatsApp redirection
    try {
      quoteService.submitQuoteRequest(formData).catch(() => {});
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

  const totalGuards = formData.personnelRequired.reduce((acc, row) => acc + (Number(row.count) || 0), 0);

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* Page Header */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-24 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EB] border border-[#E6E3DA] text-xs text-[#141518]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C44D2B]" />
              <span>Get a Quote</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#141518] leading-[1.1]">
              Request a Security Quote
            </h1>
            <p className="text-lg sm:text-xl text-[#686873] leading-relaxed">
              Tell us what security manpower you need and we will discuss your requirement with you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="bg-white border border-[#E6E3DA] rounded-3xl p-8 sm:p-14 text-center space-y-5 shadow-card">
              <div className="w-16 h-16 rounded-full bg-[#FBF0EC] text-[#C44D2B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-[#141518]">
                Opening WhatsApp
              </h2>
              <p className="text-base sm:text-lg text-[#686873] max-w-lg mx-auto leading-relaxed">
                Thank you, {formData.clientName}. You have been taken to WhatsApp with your quotation request pre-filled. Please review the message and press Send to share your requirement with our team.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                  }}
                  className="px-6 py-3 rounded-full bg-[#141518] text-white hover:bg-[#26272B] text-sm font-semibold"
                >
                  Edit or Submit Another Request
                </button>
                <Link
                  to={ROUTES.PUBLIC.HOME}
                  className="px-6 py-3 rounded-full bg-[#F3F1EB] text-[#141518] hover:bg-[#EBE8E0] text-sm font-semibold border border-[#E6E3DA]"
                >
                  Return to Overview
                </Link>
                <a
                  href="tel:9045393714"
                  className="px-5 py-3 rounded-full bg-[#F3F1EB] text-[#141518] hover:bg-[#EBE8E0] text-sm font-mono border border-[#E6E3DA]"
                >
                  Call Us: 9045393714
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              {/* 1. Your Details */}
              <div className="bg-white border border-[#E6E3DA] rounded-2xl p-6 sm:p-8 space-y-5 shadow-card">
                <div className="border-b border-[#E6E3DA] pb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-[#141518]">Your Details</h2>
                  <p className="text-sm text-[#686873] mt-0.5">Share your contact details so we can reach you.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Company name (optional)"
                      className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number"
                      className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                    Site / Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Location where security is required"
                    className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                    value={formData.facilityLocation}
                    onChange={(e) => setFormData({ ...formData, facilityLocation: e.target.value })}
                  />
                </div>
              </div>

              {/* 2. Security Requirement */}
              <div className="bg-white border border-[#E6E3DA] rounded-2xl p-6 sm:p-8 space-y-5 shadow-card">
                <div className="flex items-center justify-between border-b border-[#E6E3DA] pb-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#141518]">Security Requirement</h2>
                    <p className="text-sm text-[#686873] mt-0.5">Specify the security personnel required for your site.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addPersonnelRow}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F3F1EB] hover:bg-[#EBE8E0] text-sm font-medium text-[#141518] border border-[#E6E3DA]"
                  >
                    <Plus className="w-4 h-4 text-[#C44D2B]" />
                    <span>Add Another Requirement</span>
                  </button>
                </div>

                <div className="space-y-3.5">
                  {formData.personnelRequired.map((row, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-xl bg-[#FAF9F5] border border-[#E6E3DA] grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end"
                    >
                      <div className="sm:col-span-5">
                        <label className="block text-xs font-semibold text-[#141518] mb-1.5">
                          Personnel Type
                        </label>
                        <select
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E6E3DA] text-sm text-[#141518] bg-white focus:outline-none focus:border-[#141518]"
                          value={row.personnelType}
                          onChange={(e) => updatePersonnelRow(idx, 'personnelType', e.target.value)}
                        >
                          <option value="Security Guards">Security Guards</option>
                          <option value="Security Supervisors">Security Supervisors</option>
                          <option value="Security Gunmen">Security Gunmen</option>
                          <option value="Custom Security Manpower">Custom Security Manpower</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-xs font-semibold text-[#141518] mb-1.5">
                          Personnel Required
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E6E3DA] text-sm text-[#141518] bg-white focus:outline-none focus:border-[#141518]"
                          value={row.count}
                          onChange={(e) => updatePersonnelRow(idx, 'count', Number(e.target.value))}
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-xs font-semibold text-[#141518] mb-1.5">
                          Working Hours
                        </label>
                        <select
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E6E3DA] text-sm text-[#141518] bg-white focus:outline-none focus:border-[#141518]"
                          value={row.shiftHours}
                          onChange={(e) => updatePersonnelRow(idx, 'shiftHours', Number(e.target.value))}
                        >
                          <option value={8}>8 Hours Shift</option>
                          <option value={12}>12 Hours Shift</option>
                        </select>
                      </div>

                      <div className="sm:col-span-1 flex justify-end">
                        {formData.personnelRequired.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePersonnelRow(idx)}
                            className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove role"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#F3F1EB] border border-[#E6E3DA] flex items-center justify-between text-sm">
                  <span className="text-[#686873]">Total Personnel:</span>
                  <span className="font-bold text-[#141518] font-mono text-base">{totalGuards} Required</span>
                </div>
              </div>

              {/* 3. Duration & Requirements */}
              <div className="bg-white border border-[#E6E3DA] rounded-2xl p-6 sm:p-8 space-y-5 shadow-card">
                <div className="border-b border-[#E6E3DA] pb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-[#141518]">Additional Details</h2>
                  <p className="text-sm text-[#686873] mt-0.5">Specify duration or any special site requirements.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                    Preferred Duration (Months)
                  </label>
                  <select
                    className="w-full sm:w-64 px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                    value={formData.serviceDurationMonths}
                    onChange={(e) => setFormData({ ...formData, serviceDurationMonths: Number(e.target.value) })}
                  >
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months</option>
                    <option value={24}>24 Months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#141518] mb-1.5">
                    Additional Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about preferred start date, timings, or any specific instructions..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E6E3DA] text-sm text-[#141518] bg-[#FAF9F5] focus:bg-white focus:outline-none focus:border-[#141518]"
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-full bg-[#141518] text-white hover:bg-[#26272B] text-sm font-semibold transition-all shadow-sm"
                >
                  <span>Request Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
