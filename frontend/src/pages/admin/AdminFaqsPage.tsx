import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { faqService, FAQItem } from '../../services/faqService';
import { HelpCircle, Plus, Edit2, Trash2, RefreshCw } from 'lucide-react';

export const AdminFaqsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [formData, setFormData] = useState<Partial<FAQItem>>({
    question: '',
    answer: '',
    category: 'general',
    order: 0,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await faqService.getAllFAQsAdmin();
      if (res.data) setFaqs(res.data);
    } catch (err) {
      console.error('Failed to load FAQs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setFormData({
      question: '',
      answer: '',
      category: 'general',
      order: faqs.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: FAQItem) => {
    setEditingFaq(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;
    setSaving(true);
    try {
      if (editingFaq && editingFaq._id) {
        await faqService.updateFAQ(editingFaq._id, formData);
      } else {
        await faqService.createFAQ(formData);
      }
      setIsModalOpen(false);
      await fetchFaqs();
    } catch (err) {
      console.error('Failed to save FAQ', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ entry?')) return;
    try {
      await faqService.deleteFAQ(id);
      setFaqs((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Failed to delete FAQ', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4A343] font-semibold mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Operational Guidance</span>
          </div>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">Frequently Asked Questions</h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Manage client inquiries regarding PSARA compliance, deployment timelines, and statutory wage billing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={fetchFaqs}>
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={handleOpenCreate}>
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add New Question
          </Button>
        </div>
      </div>

      {/* FAQ List */}
      {loading ? (
        <div className="py-20 text-center text-xs text-[#9BA3AF]">Loading questions...</div>
      ) : faqs.length === 0 ? (
        <Card className="py-16 text-center text-xs text-[#9BA3AF]">
          No FAQs found. Click "Add New Question" above to initialize your FAQ base.
        </Card>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <Card key={faq._id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#182030] text-[#D4A343] border border-[#D4A343]/30">
                    {faq.category}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${faq.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {faq.isActive ? 'Active' : 'Draft'}
                  </span>
                  <span className="text-[11px] text-[#9BA3AF]">Order: {faq.order}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#F3F5F7]">{faq.question}</h3>
                <p className="text-xs text-[#9BA3AF] line-clamp-2 leading-relaxed">{faq.answer}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 border-white/5 pt-3 md:pt-0 w-full md:w-auto justify-end">
                <Button variant="secondary" size="sm" onClick={() => handleOpenEdit(faq)}>
                  <Edit2 className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
                {faq._id && (
                  <button
                    onClick={() => handleDelete(faq._id!)}
                    className="p-2 text-red-400/80 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                    title="Delete question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111622] border border-white/10 rounded-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-[#F3F5F7]">
                {editingFaq ? 'Edit FAQ Item' : 'Create FAQ Item'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#9BA3AF] hover:text-[#F3F5F7] text-sm">
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Question Title *</label>
                <Input
                  required
                  placeholder="e.g. What statutory compliance documents are provided monthly?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Category</label>
                  <select
                    className="w-full bg-[#182030] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#F3F5F7] focus:outline-none focus:border-[#D4A343]"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="compliance">Statutory & PSARA</option>
                    <option value="deployment">Deployment & Mobilization</option>
                    <option value="pricing">Wages & Invoicing</option>
                    <option value="general">General Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Display Order</label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Detailed Answer *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-[#182030] border border-white/10 rounded-lg p-3 text-xs text-[#F3F5F7] placeholder-[#9BA3AF]/50 focus:outline-none focus:border-[#D4A343]"
                  placeholder="Provide precise compliance or procedural answer..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded bg-[#182030] border-white/10 text-[#D4A343] focus:ring-0"
                />
                <label htmlFor="isActive" className="text-xs text-[#F3F5F7]">
                  Publish immediately (Active on public website)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <Button type="button" variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Question'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
