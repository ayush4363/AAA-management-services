import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { contentService } from '../../services/contentService';
import { ProcessStepItem } from '../../types';
import { GitCommit, Plus, Trash2, Save, RefreshCw } from 'lucide-react';

export const AdminProcessPage: React.FC = () => {
  const [steps, setSteps] = useState<ProcessStepItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchSteps = async () => {
    setLoading(true);
    try {
      const res = await contentService.getProcessSteps();
      if (res.data) setSteps(res.data);
    } catch (err) {
      console.error('Failed to load process steps', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleAddStep = () => {
    const newStep: ProcessStepItem = {
      stepNumber: steps.length + 1,
      title: 'New Deployment Phase',
      description: 'Detail mobilization protocol, verification, or audit frequency.',
      iconName: 'Compass',
      order: steps.length + 1,
      isActive: true,
    };
    setSteps([...steps, newStep]);
  };

  const handleUpdateStep = (index: number, field: keyof ProcessStepItem, value: any) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const handleDeleteStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await contentService.updateProcessSteps(steps);
      setMessage('Deployment workflow steps saved successfully.');
    } catch (err) {
      console.error('Failed to save process steps', err);
      setMessage('Failed to save steps. Please review server status.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-[#9BA3AF]">Loading deployment process...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4A343] font-semibold mb-1">
            <GitCommit className="w-3.5 h-3.5" />
            <span>Workflow Engineering</span>
          </div>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">Deployment Process Steps</h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Configure the 4-stage client engagement and security guard deployment methodology.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={fetchSteps}>
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="secondary" size="sm" onClick={handleAddStep}>
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Phase
          </Button>
          <Button variant="primary" size="sm" onClick={handleSaveAll} disabled={saving}>
            <Save className="w-3.5 h-3.5 mr-1.5" />
            {saving ? 'Saving...' : 'Save Workflow'}
          </Button>
        </div>
      </div>

      {message && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
          {message}
        </div>
      )}

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={index} className="p-5 space-y-3 relative">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-mono text-[#D4A343] font-bold">
                Phase {String(step.stepNumber).padStart(2, '0')}
              </span>
              <button
                onClick={() => handleDeleteStep(index)}
                className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors"
                title="Remove phase"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-[11px] text-[#9BA3AF] mb-1">Step Number</label>
                <Input
                  type="number"
                  value={step.stepNumber}
                  onChange={(e) => handleUpdateStep(index, 'stepNumber', Number(e.target.value))}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-[#9BA3AF] mb-1">Phase Title</label>
                <Input
                  value={step.title}
                  onChange={(e) => handleUpdateStep(index, 'title', e.target.value)}
                />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-[11px] text-[#9BA3AF] mb-1">Icon Reference</label>
                <Input
                  value={step.iconName}
                  onChange={(e) => handleUpdateStep(index, 'iconName', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#9BA3AF] mb-1">Detailed Workflow Description</label>
              <textarea
                rows={2}
                className="w-full bg-[#182030] border border-white/10 rounded-lg p-2.5 text-xs text-[#F3F5F7] focus:outline-none focus:border-[#D4A343]"
                value={step.description}
                onChange={(e) => handleUpdateStep(index, 'description', e.target.value)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
