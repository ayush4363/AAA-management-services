import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { contentService } from '../../services/contentService';
import { WhyChooseUsItem } from '../../types';
import { CheckCircle2, Plus, Trash2, Save, RefreshCw } from 'lucide-react';

export const AdminWhyAaaPage: React.FC = () => {
  const [items, setItems] = useState<WhyChooseUsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await contentService.getWhyAaa();
      if (res.data) setItems(res.data);
    } catch (err) {
      console.error('Failed to load Why AAA items', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = () => {
    const newItem: WhyChooseUsItem = {
      title: 'New Operational Standard',
      description: 'Detail the operational compliance or supervisory capability.',
      iconName: 'ShieldCheck',
      order: items.length + 1,
      isActive: true,
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (index: number, field: keyof WhyChooseUsItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await contentService.updateWhyAaa(items);
      setMessage('Why Choose AAA standards saved successfully.');
    } catch (err) {
      console.error('Failed to save Why AAA items', err);
      setMessage('Failed to save. Please review server status.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-[#9BA3AF]">Loading operational standards...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4A343] font-semibold mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Operational Standards</span>
          </div>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">Why Choose AAA Points</h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Configure the core operational differentiators that set AAA apart from informal guard agencies.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={fetchItems}>
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="secondary" size="sm" onClick={handleAddItem}>
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Point
          </Button>
          <Button variant="primary" size="sm" onClick={handleSaveAll} disabled={saving}>
            <Save className="w-3.5 h-3.5 mr-1.5" />
            {saving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      {message && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
          {message}
        </div>
      )}

      {/* Items List */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={index} className="p-5 space-y-3 relative">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-mono text-[#D4A343] font-bold">Standard #{index + 1}</span>
              <button
                onClick={() => handleDeleteItem(index)}
                className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors"
                title="Remove standard"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-[#9BA3AF] mb-1">Title / Headline</label>
                <Input
                  value={item.title}
                  onChange={(e) => handleUpdateItem(index, 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#9BA3AF] mb-1">Icon Reference</label>
                <Input
                  value={item.iconName}
                  onChange={(e) => handleUpdateItem(index, 'iconName', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#9BA3AF] mb-1">Detailed Description</label>
              <textarea
                rows={2}
                className="w-full bg-[#182030] border border-white/10 rounded-lg p-2.5 text-xs text-[#F3F5F7] focus:outline-none focus:border-[#D4A343]"
                value={item.description}
                onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
