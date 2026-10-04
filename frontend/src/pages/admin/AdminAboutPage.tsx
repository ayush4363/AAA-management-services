import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { contentService } from '../../services/contentService';
import { AboutData } from '../../types';
import { Award, Save, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

export const AdminAboutPage: React.FC = () => {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchAbout = async () => {
    setLoading(true);
    try {
      const res = await contentService.getAbout();
      if (res.data) setAbout(res.data);
    } catch (err) {
      console.error('Failed to load about data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about) return;
    setSaving(true);
    setMessage(null);
    try {
      await contentService.updateAbout(about);
      setMessage({ text: 'Company profile and operational details updated.', type: 'success' });
    } catch (err) {
      console.error('Failed to update about data', err);
      setMessage({ text: 'Failed to update about data. Please check server logs.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-[#9BA3AF]">Loading about data...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4A343] font-semibold mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Corporate Profile</span>
          </div>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">About & Mission Details</h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Configure the organization background, operational metrics, and statutory ethos.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={fetchAbout}>
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 text-xs border ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {about && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#F3F5F7] border-b border-white/5 pb-2">
              Organizational Story
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Section Title *</label>
                <Input
                  required
                  value={about.title}
                  onChange={(e) => setAbout({ ...about, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Executive Summary *</label>
                <textarea
                  required
                  rows={2}
                  className="w-full bg-[#182030] border border-white/10 rounded-lg p-3 text-xs text-[#F3F5F7] focus:outline-none focus:border-[#D4A343]"
                  value={about.shortDescription}
                  onChange={(e) => setAbout({ ...about, shortDescription: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Full Detailed Background *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-[#182030] border border-white/10 rounded-lg p-3 text-xs text-[#F3F5F7] focus:outline-none focus:border-[#D4A343]"
                  value={about.fullStory}
                  onChange={(e) => setAbout({ ...about, fullStory: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#F3F5F7] border-b border-white/5 pb-2">
              Mission & Vision Statements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Mission Statement *</label>
                <textarea
                  required
                  rows={3}
                  className="w-full bg-[#182030] border border-white/10 rounded-lg p-3 text-xs text-[#F3F5F7] focus:outline-none focus:border-[#D4A343]"
                  value={about.mission}
                  onChange={(e) => setAbout({ ...about, mission: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Vision Statement *</label>
                <textarea
                  required
                  rows={3}
                  className="w-full bg-[#182030] border border-white/10 rounded-lg p-3 text-xs text-[#F3F5F7] focus:outline-none focus:border-[#D4A343]"
                  value={about.vision}
                  onChange={(e) => setAbout({ ...about, vision: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#F3F5F7] border-b border-white/5 pb-2">
              Operational Scale Counters
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Years in Operation</label>
                <Input
                  type="number"
                  value={about.yearsOfExperience}
                  onChange={(e) => setAbout({ ...about, yearsOfExperience: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Guards Deployed</label>
                <Input
                  type="number"
                  value={about.guardsDeployed}
                  onChange={(e) => setAbout({ ...about, guardsDeployed: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Active Client Sites</label>
                <Input
                  type="number"
                  value={about.clientsProtected}
                  onChange={(e) => setAbout({ ...about, clientsProtected: Number(e.target.value) })}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Profile Details'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
