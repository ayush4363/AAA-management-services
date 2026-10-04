import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, MessageSquare, Calculator, Layers, ArrowUpRight } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { quoteService } from '../../services/quoteService';
import { serviceService } from '../../services/serviceService';
import { pricingService } from '../../services/pricingService';
import { ROUTES } from '../../constants/routes';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    enquiries: 0,
    quoteRequests: 0,
    services: 0,
    pricingConfigs: 0,
  });

  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      enquiryService.getEnquiries().catch(() => ({ data: [] })),
      quoteService.getQuoteRequests().catch(() => ({ data: [] })),
      serviceService.getServices().catch(() => ({ data: [] })),
      pricingService.getPricingConfigs().catch(() => ({ data: [] })),
    ])
      .then(([enqRes, quoteRes, srvRes, priceRes]) => {
        const enqCount = enqRes.data?.length || 0;
        const quoteCount = quoteRes.data?.length || 0;
        const srvCount = srvRes.data?.length || 0;
        const priceCount = priceRes.data?.length || 0;

        setStats({
          enquiries: enqCount,
          quoteRequests: quoteCount,
          services: srvCount,
          pricingConfigs: priceCount,
        });

        if (quoteRes.data && Array.isArray(quoteRes.data)) {
          setRecentRequests(quoteRes.data.slice(0, 5));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4A343] block mb-1">
            EXECUTIVE OVERVIEW
          </span>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">
            Security Operations & Tender Management
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={ROUTES.ADMIN.QUOTE_REQUESTS}
            className="px-4 py-2 bg-[#D4A343] hover:bg-[#E2B559] text-[#0B0E14] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Process Quotes</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to={ROUTES.ADMIN.QUOTE_REQUESTS}
          className="p-6 bg-[#111622] border border-white/10 hover:border-[#D4A343]/50 rounded-xl transition-all shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#9BA3AF] font-medium">Quote Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-[#D4A343]/10 text-[#D4A343] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-[#F3F5F7]">
            {loading ? '-' : stats.quoteRequests}
          </div>
          <span className="text-[10px] text-[#60697B] block mt-1">Pending tender evaluations</span>
        </Link>

        <Link
          to={ROUTES.ADMIN.ENQUIRIES}
          className="p-6 bg-[#111622] border border-white/10 hover:border-[#D4A343]/50 rounded-xl transition-all shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#9BA3AF] font-medium">Contact Messages</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-[#F3F5F7]">
            {loading ? '-' : stats.enquiries}
          </div>
          <span className="text-[10px] text-[#60697B] block mt-1">Direct website communications</span>
        </Link>

        <Link
          to={ROUTES.ADMIN.SERVICES}
          className="p-6 bg-[#111622] border border-white/10 hover:border-[#D4A343]/50 rounded-xl transition-all shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#9BA3AF] font-medium">Active Services</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-[#F3F5F7]">
            {loading ? '-' : stats.services}
          </div>
          <span className="text-[10px] text-[#60697B] block mt-1">Public security offerings</span>
        </Link>

        <Link
          to={ROUTES.ADMIN.PRICING}
          className="p-6 bg-[#111622] border border-white/10 hover:border-[#D4A343]/50 rounded-xl transition-all shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[#9BA3AF] font-medium">Pricing Configurations</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-[#F3F5F7]">
            {loading ? '-' : stats.pricingConfigs}
          </div>
          <span className="text-[10px] text-[#60697B] block mt-1">Statutory manpower rates</span>
        </Link>
      </div>

      {/* Recent Inbound Tender Pipelines */}
      <div className="bg-[#111622] border border-white/10 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-[#F3F5F7]">Latest Quotation Requests</h3>
            <p className="text-xs text-[#9BA3AF]">Review and generate formal proposals for clients</p>
          </div>
          <Link
            to={ROUTES.ADMIN.QUOTE_REQUESTS}
            className="text-xs text-[#D4A343] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#60697B]">
            No pending quotation requests logged. New client requests submitted via the public portal will appear here immediately.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[#60697B] uppercase font-mono text-[10px]">
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Organization</th>
                  <th className="py-3 px-4">Facility Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#F3F5F7]">{req.clientName}</td>
                    <td className="py-3.5 px-4 text-[#9BA3AF]">{req.organizationName}</td>
                    <td className="py-3.5 px-4 text-[#9BA3AF]">{req.facilityLocation}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={ROUTES.ADMIN.QUOTE_REQUESTS}
                        className="text-[#D4A343] hover:underline font-semibold"
                      >
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to={ROUTES.ADMIN.BUSINESS}
          className="p-6 bg-[#111622] border border-white/10 rounded-xl hover:border-white/20 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#F3F5F7] mb-1">
            <Shield className="w-4 h-4 text-[#D4A343]" />
            <span>Update Business Profile</span>
          </div>
          <p className="text-xs text-[#9BA3AF]">
            Modify phone numbers, verified Agra location, and tax registration credentials.
          </p>
        </Link>

        <Link
          to={ROUTES.ADMIN.PRICING}
          className="p-6 bg-[#111622] border border-white/10 rounded-xl hover:border-white/20 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#F3F5F7] mb-1">
            <Calculator className="w-4 h-4 text-[#D4A343]" />
            <span>Manpower Pricing Engine</span>
          </div>
          <p className="text-xs text-[#9BA3AF]">
            Adjust basic wages, statutory PF & ESI contributions, and agency management markups.
          </p>
        </Link>

        <Link
          to={ROUTES.ADMIN.QUOTATIONS}
          className="p-6 bg-[#111622] border border-white/10 rounded-xl hover:border-white/20 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#F3F5F7] mb-1">
            <FileText className="w-4 h-4 text-[#D4A343]" />
            <span>Generate Official Quotations</span>
          </div>
          <p className="text-xs text-[#9BA3AF]">
            Issue standardized, printable quotation letters for institutional tenders.
          </p>
        </Link>
      </div>
    </div>
  );
};
