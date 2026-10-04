import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { quoteService } from '../../services/quoteService';
import { ROUTES } from '../../constants/routes';

export const AdminQuoteRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const loadRequests = () => {
    setLoading(true);
    quoteService
      .getQuoteRequests()
      .then((res) => {
        if (res.success && res.data) {
          setRequests(res.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await quoteService.updateStatus(id, newStatus);
      loadRequests();
    } catch (err: any) {
      alert(err.message || 'Error updating status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this quotation request record?')) return;
    try {
      await quoteService.deleteQuoteRequest(id);
      loadRequests();
    } catch (err: any) {
      alert(err.message || 'Error deleting record');
    }
  };

  const handleCreateQuotation = (req: any) => {
    navigate(ROUTES.ADMIN.QUOTATIONS, {
      state: {
        fromQuoteRequest: req,
      },
    });
  };

  const filteredRequests =
    statusFilter === 'all'
      ? requests
      : requests.filter((r) => r.status === statusFilter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4A343] block mb-1">
            INBOUND PIPELINE
          </span>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">
            Security Quotation Requests
          </h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Client tender submissions from the public website ready for technical assessment.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['all', 'pending', 'reviewing', 'generated', 'sent'].map((st) => (
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
        <div className="py-12 text-center text-xs text-[#9BA3AF]">Loading quotation requests...</div>
      ) : filteredRequests.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#60697B] bg-[#111622] rounded-xl border border-white/5">
          No quotation requests match the current status filter.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredRequests.map((req) => (
            <div
              key={req._id}
              className="bg-[#111622] border border-white/10 rounded-2xl p-6 transition-all hover:border-white/20 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#F3F5F7]">{req.clientName}</h3>
                    <span className="text-xs text-[#9BA3AF]">({req.organizationName})</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#60697B]">
                    Received: {new Date(req.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={req.status}
                    onChange={(e) => handleUpdateStatus(req._id, e.target.value)}
                    className="px-2.5 py-1.5 bg-[#182030] border border-white/10 rounded-lg text-xs font-mono text-[#F3F5F7] uppercase"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="generated">Quotation Generated</option>
                    <option value="sent">Dispatched / Sent</option>
                    <option value="declined">Declined</option>
                  </select>

                  <Button
                    size="sm"
                    onClick={() => handleCreateQuotation(req)}
                    className="text-xs"
                  >
                    <span>Generate Formal Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#9BA3AF]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4A343]" />
                  <a href={`tel:${req.phone}`} className="font-mono text-[#F3F5F7] hover:underline">
                    {req.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4A343]" />
                  <span>{req.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A343]" />
                  <span className="truncate">{req.facilityLocation}</span>
                </div>
              </div>

              {/* Personnel Specification Strip */}
              <div className="p-4 bg-[#0B0E14] rounded-xl border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#60697B] block mb-2">
                  Requested Security Manpower Roster:
                </span>
                <div className="flex flex-wrap gap-2">
                  {req.personnelRequired?.map((p: any, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#182030] rounded-lg text-xs font-mono text-[#F3F5F7] border border-white/10"
                    >
                      {p.count}x {p.personnelType} ({p.shiftHours}h duty)
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-[#111622] rounded-lg text-xs font-mono text-[#9BA3AF] border border-white/5">
                    Term: {req.serviceDurationMonths || 12} Months
                  </span>
                </div>
                {req.specialRequirements && (
                  <p className="mt-3 text-xs text-[#9BA3AF] pt-2 border-t border-white/5">
                    <strong className="text-[#F3F5F7]">Special Instructions:</strong> {req.specialRequirements}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleDelete(req._id)}
                  className="text-xs text-red-400 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Record</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
