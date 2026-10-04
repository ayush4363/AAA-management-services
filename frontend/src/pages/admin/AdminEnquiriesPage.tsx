import React, { useState, useEffect } from 'react';
import { Phone, Mail, Trash2, User } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const loadEnquiries = () => {
    setLoading(true);
    enquiryService
      .getEnquiries()
      .then((res) => {
        if (res.success && res.data) {
          setEnquiries(res.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string, notes?: string) => {
    try {
      await enquiryService.updateStatus(id, newStatus, notes);
      loadEnquiries();
    } catch (err: any) {
      alert(err.message || 'Error updating enquiry');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this contact message?')) return;
    try {
      await enquiryService.deleteEnquiry(id);
      loadEnquiries();
    } catch (err: any) {
      alert(err.message || 'Error deleting enquiry');
    }
  };

  const filtered =
    statusFilter === 'all'
      ? enquiries
      : enquiries.filter((e) => e.status === statusFilter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4A343] block mb-1">
            CLIENT COMMUNICATIONS
          </span>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">
            Direct Contact Inquiries
          </h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Incoming messages sent from the public website contact form.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['all', 'new', 'contacted', 'quoted', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors border ${
                statusFilter === st
                  ? 'bg-[#D4A343] text-[#0B0E14] border-[#D4A343] font-bold'
                  : 'bg-[#111622] text-[#9BA3AF] border-white/10 hover:text-[#F3F5F7]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-[#9BA3AF]">Loading inquiries...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#60697B] bg-[#111622] rounded-xl border border-white/5">
          No inquiries found matching the selected filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((enq) => (
            <div
              key={enq._id}
              className="bg-[#111622] border border-white/10 rounded-2xl p-6 transition-all hover:border-white/20 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#D4A343]" />
                    <h3 className="text-base font-bold text-[#F3F5F7]">{enq.fullName}</h3>
                    {enq.organizationName && (
                      <span className="text-xs text-[#9BA3AF]">· {enq.organizationName}</span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-[#60697B]">
                    {new Date(enq.createdAt).toLocaleString()} · Service: {enq.serviceType}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={enq.status}
                    onChange={(e) => handleUpdateStatus(enq._id, e.target.value, enq.notes)}
                    className="px-2.5 py-1.5 bg-[#182030] border border-white/10 rounded-lg text-xs font-mono text-[#F3F5F7] uppercase"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    onClick={() => handleDelete(enq._id)}
                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-[#9BA3AF]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4A343]" />
                  <a href={`tel:${enq.phone}`} className="font-mono text-[#F3F5F7] hover:underline">
                    {enq.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4A343]" />
                  <span>{enq.email}</span>
                </div>
              </div>

              <div className="p-4 bg-[#0B0E14] rounded-xl text-xs text-[#F3F5F7] border border-white/5 leading-relaxed">
                {enq.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
