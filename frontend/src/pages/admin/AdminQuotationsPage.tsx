import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Printer, Trash2, AlertCircle, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { quotationService, CreateQuotationPayload } from '../../services/quotationService';
import { pricingService } from '../../services/pricingService';
import { PricingConfigItem } from '../../types';

export const AdminQuotationsPage: React.FC = () => {
  const location = useLocation();
  const fromRequest = (location.state as any)?.fromQuoteRequest;

  const [quotations, setQuotations] = useState<any[]>([]);
  const [pricingConfigs, setPricingConfigs] = useState<PricingConfigItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewQuotation, setViewQuotation] = useState<any | null>(null);

  const [formData, setFormData] = useState<CreateQuotationPayload>({
    clientName: fromRequest?.clientName || '',
    organizationName: fromRequest?.organizationName || '',
    email: fromRequest?.email || '',
    phone: fromRequest?.phone || '',
    facilityLocation: fromRequest?.facilityLocation || '',
    quoteRequestId: fromRequest?._id,
    rawItems: [],
    validDays: 30,
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const loadData = () => {
    setLoading(true);
    Promise.all([
      quotationService.getQuotations().catch(() => ({ data: [] })),
      pricingService.getPricingConfigs().catch(() => ({ data: [] })),
    ])
      .then(([qRes, pRes]) => {
        if (qRes.data) setQuotations(qRes.data);
        if (pRes.data) {
          const configs = pRes.data;
          setPricingConfigs(configs);
          // If fromRequest, prefill items
          if (fromRequest && fromRequest.personnelRequired && configs.length > 0) {
            const mappedItems = fromRequest.personnelRequired.map((pr: any) => {
              const matched = configs.find(
                (c: any) => c.personnelName.toLowerCase() === pr.personnelType.toLowerCase()
              );
              return {
                personnelConfigId: matched ? matched._id : configs[0]._id,
                count: pr.count || 1,
                workingHours: pr.shiftHours || 8,
              };
            });
            setFormData((prev) => ({ ...prev, rawItems: mappedItems }));
            setModalOpen(true);
          }
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddItem = () => {
    if (pricingConfigs.length === 0) return;
    setFormData({
      ...formData,
      rawItems: [
        ...formData.rawItems,
        { personnelConfigId: pricingConfigs[0]._id!, count: 1, workingHours: 8 },
      ],
    });
  };

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      rawItems: formData.rawItems.filter((_, i) => i !== index),
    });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...formData.rawItems];
    (updated[index] as any)[field] = value;
    setFormData({ ...formData, rawItems: updated });
  };

  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rawItems.length === 0) {
      setErrorMsg('Please add at least one security manpower line item.');
      return;
    }

    setSaving(true);
    setErrorMsg('');

    try {
      const res = await quotationService.createQuotation(formData);
      if (res.success && res.data) {
        setModalOpen(false);
        setViewQuotation(res.data);
        loadData();
      } else {
        setErrorMsg(res.message || 'Error generating quotation.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error generating quotation.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this formal quotation?')) return;
    try {
      await quotationService.deleteQuotation(id);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Error deleting quotation');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4A343] block mb-1">
            FORMAL PROPOSALS & TENDERS
          </span>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">
            Security Manpower Quotations
          </h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Generated proposals with statutory itemized breakdowns and printable official letters.
          </p>
        </div>

        <Button
          onClick={() => {
            setFormData({
              clientName: '',
              organizationName: '',
              email: '',
              phone: '',
              facilityLocation: '',
              rawItems: pricingConfigs.length > 0 ? [{ personnelConfigId: pricingConfigs[0]._id!, count: 2, workingHours: 8 }] : [],
              validDays: 30,
            });
            setErrorMsg('');
            setModalOpen(true);
          }}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Create New Quotation</span>
        </Button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs text-[#9BA3AF]">Loading formal quotations...</div>
      ) : quotations.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#60697B] bg-[#111622] rounded-xl border border-white/5">
          No formal quotations generated yet. Click "Create New Quotation" or convert an inbound quote request.
        </div>
      ) : (
        <div className="bg-[#111622] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-[#60697B] uppercase text-[10px] bg-[#182030]/60">
                  <th className="py-3 px-4">Quotation #</th>
                  <th className="py-3 px-4 font-sans">Client / Organization</th>
                  <th className="py-3 px-4 font-sans">Location</th>
                  <th className="py-3 px-4">Subtotal</th>
                  <th className="py-3 px-4">GST (18%)</th>
                  <th className="py-3 px-4 text-[#D4A343]">Grand Total / Mo</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {quotations.map((q) => (
                  <tr key={q._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#F3F5F7]">{q.quotationNumber}</td>
                    <td className="py-4 px-4 font-sans">
                      <strong className="text-[#F3F5F7] block">{q.clientName}</strong>
                      <span className="text-[11px] text-[#9BA3AF]">{q.organizationName}</span>
                    </td>
                    <td className="py-4 px-4 font-sans text-[#9BA3AF]">{q.facilityLocation}</td>
                    <td className="py-4 px-4 text-[#9BA3AF]">₹{q.subtotal?.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-4 text-[#9BA3AF]">₹{q.serviceTaxGst?.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-4 font-bold text-[#D4A343]">
                      ₹{q.grandTotalMonthly?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => setViewQuotation(q)}
                        className="px-2.5 py-1 rounded bg-[#182030] text-[#D4A343] hover:bg-[#222C42] border border-white/10 text-xs font-sans font-semibold"
                      >
                        View Official Letter
                      </button>
                      <button
                        onClick={() => handleDelete(q._id)}
                        className="p-1.5 rounded hover:bg-red-500/10 text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Printable Formal Quotation View Modal */}
      {viewQuotation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative max-w-3xl w-full bg-[#111622] border border-white/20 rounded-2xl overflow-hidden shadow-2xl my-8">
            <div className="p-4 bg-[#182030] flex items-center justify-between border-b border-white/10">
              <span className="text-xs font-mono text-[#D4A343] font-bold">
                PROPOSAL DOCUMENT: {viewQuotation.quotationNumber}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4A343] text-[#0B0E14] text-xs font-bold rounded-lg"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setViewQuotation(null)}
                  className="text-[#9BA3AF] hover:text-[#F3F5F7] p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Formal Quotation Sheet Content */}
            <div className="p-8 sm:p-12 bg-[#0B0E14] text-[#F3F5F7] space-y-8 font-sans">
              {/* Header with AAA Management Services details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/15 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-white/20 bg-white shadow-sm flex items-center justify-center">
                    <img
                      src="/images/logo.png"
                      alt="AAA Logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-[#F3F5F7]">
                      AAA MANAGEMENT SERVICES
                    </h2>
                    <p className="text-[10px] text-[#9BA3AF] font-mono">
                      Physical Security, Manned Guarding & Armed Protection Services
                    </p>
                    <p className="text-[10px] text-[#60697B]">
                      Shamshabad Road, Infront Of TV Tower, Chamruali Mod, Rajpur, Agra - 282001
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono text-xs text-[#9BA3AF]">
                  <div>Ref: <strong className="text-[#D4A343]">{viewQuotation.quotationNumber}</strong></div>
                  <div>Date: {new Date(viewQuotation.createdAt || Date.now()).toLocaleDateString()}</div>
                  <div>Valid Until: {new Date(viewQuotation.validUntil).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Addressed To Client */}
              <div className="bg-[#111622] p-4 rounded-xl border border-white/10 text-xs">
                <span className="text-[10px] uppercase font-mono text-[#D4A343] block mb-1">
                  PREPARED EXCLUSIVELY FOR:
                </span>
                <div className="text-sm font-bold text-[#F3F5F7]">{viewQuotation.clientName}</div>
                <div className="text-[#9BA3AF]">{viewQuotation.organizationName}</div>
                <div className="text-[#9BA3AF]">Facility: {viewQuotation.facilityLocation}</div>
                <div className="text-[#60697B] font-mono mt-1">Phone: {viewQuotation.phone} · Email: {viewQuotation.email}</div>
              </div>

              {/* Itemized Table */}
              <div>
                <h4 className="text-xs uppercase font-mono text-[#D4A343] mb-3">
                  Statutory Manpower Cost Schedule (Monthly Basis)
                </h4>
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="bg-[#182030] text-[#60697B] text-[10px] uppercase border-b border-white/10">
                        <th className="py-2.5 px-3">Role</th>
                        <th className="py-2.5 px-3 text-center">Duty</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3 text-right">Per Person / Mo</th>
                        <th className="py-2.5 px-3 text-right">Total / Mo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                      {viewQuotation.items?.map((item: any, i: number) => (
                        <tr key={i}>
                          <td className="py-3 px-3 font-semibold text-[#F3F5F7]">{item.personnelName}</td>
                          <td className="py-3 px-3 text-center font-mono text-[#9BA3AF]">{item.workingHours}h</td>
                          <td className="py-3 px-3 text-center font-mono text-[#F3F5F7]">{item.count}</td>
                          <td className="py-3 px-3 text-right font-mono text-[#9BA3AF]">
                            ₹{item.monthlyUnitCost?.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-[#F3F5F7]">
                            ₹{item.totalMonthlyCost?.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Financial Totals */}
              <div className="flex justify-end font-mono text-xs">
                <div className="w-72 space-y-2 p-4 bg-[#111622] rounded-xl border border-white/10">
                  <div className="flex justify-between text-[#9BA3AF]">
                    <span>Monthly Subtotal:</span>
                    <span>₹{viewQuotation.subtotal?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#9BA3AF]">
                    <span>Service GST (18%):</span>
                    <span>₹{viewQuotation.serviceTaxGst?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#D4A343] pt-2 border-t border-white/10">
                    <span>Grand Total:</span>
                    <span>₹{viewQuotation.grandTotalMonthly?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div>
                <h4 className="text-xs uppercase font-mono text-[#D4A343] mb-2">
                  Statutory Terms & Operational Agreements:
                </h4>
                <ul className="list-disc list-inside text-[11px] text-[#9BA3AF] space-y-1 leading-relaxed">
                  {viewQuotation.termsAndConditions?.map((term: string, i: number) => (
                    <li key={i}>{term}</li>
                  ))}
                </ul>
              </div>

              {/* Signatures */}
              <div className="pt-8 border-t border-white/10 flex justify-between text-xs text-[#9BA3AF]">
                <div>
                  <div className="font-bold text-[#F3F5F7]">For Client Acceptance</div>
                  <div className="text-[10px] text-[#60697B] mt-8">Authorized Signatory & Seal</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#D4A343]">For AAA Management Services</div>
                  <div className="text-[10px] text-[#60697B] mt-8">Operations Director · Agra Command</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Creation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Generate Formal Security Quotation"
      >
        <form onSubmit={handleCreateQuotation} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Client Name *"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              required
            />
            <Input
              label="Organization Name *"
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Email *"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Phone *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <Input
            label="Facility Deployment Location *"
            value={formData.facilityLocation}
            onChange={(e) => setFormData({ ...formData, facilityLocation: e.target.value })}
            required
          />

          {/* Line Items */}
          <div className="pt-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <span className="text-xs font-mono text-[#D4A343] font-bold">MANPOWER ITEMS</span>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs text-[#D4A343] hover:underline font-semibold"
              >
                + Add Item
              </button>
            </div>

            <div className="space-y-3">
              {formData.rawItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#0B0E14] border border-white/10 rounded-xl grid grid-cols-12 gap-2 items-center"
                >
                  <div className="col-span-6">
                    <select
                      value={item.personnelConfigId}
                      onChange={(e) => handleItemChange(idx, 'personnelConfigId', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-[#182030] border border-white/10 rounded-lg text-xs text-[#F3F5F7]"
                    >
                      {pricingConfigs.map((cfg) => (
                        <option key={cfg._id} value={cfg._id}>
                          {cfg.personnelName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={item.count}
                      onChange={(e) => handleItemChange(idx, 'count', Number(e.target.value) || 1)}
                      className="w-full px-2.5 py-1.5 bg-[#182030] border border-white/10 rounded-lg text-xs text-[#F3F5F7] font-mono"
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      value={item.workingHours}
                      onChange={(e) => handleItemChange(idx, 'workingHours', Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-[#182030] border border-white/10 rounded-lg text-xs text-[#F3F5F7]"
                    >
                      <option value={8}>8h</option>
                      <option value={12}>12h</option>
                    </select>
                  </div>
                  <div className="col-span-1 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-red-400 p-1 hover:bg-red-500/10 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={saving}>
              Calculate & Generate Proposal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
