import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { contentService } from '../../services/contentService';
import { HeroData } from '../../types';
import { Shield, Save, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

export const AdminHeroPage: React.FC = () => {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchHero = async () => {
    setLoading(true);
    try {
      const res = await contentService.getHero();
      if (res.data) setHero(res.data);
    } catch (err) {
      console.error('Failed to load hero content', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hero) return;
    setSaving(true);
    setMessage(null);
    try {
      await contentService.updateHero(hero);
      setMessage({ text: 'Hero banner content updated successfully.', type: 'success' });
    } catch (err) {
      console.error('Failed to update hero banner', err);
      setMessage({ text: 'Failed to update hero banner. Please check server logs.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-[#9BA3AF]">Loading hero content...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4A343] font-semibold mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Editorial Presentation</span>
          </div>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">Homepage Hero Section</h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Configure the opening visual hook, typography, and call-to-action pathways.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={fetchHero}>
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

      {hero && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#F3F5F7] border-b border-white/5 pb-2">
              Headlines & Positioning
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Eyebrow Badge</label>
                <Input
                  required
                  value={hero.eyebrow}
                  onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Main Headline *</label>
                <Input
                  required
                  value={hero.headline}
                  onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Subheadline Description *</label>
                <textarea
                  required
                  rows={3}
                  className="w-full bg-[#182030] border border-white/10 rounded-lg p-3 text-xs text-[#F3F5F7] focus:outline-none focus:border-[#D4A343]"
                  value={hero.subheadline}
                  onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#F3F5F7] border-b border-white/5 pb-2">
              Call to Action Pathways
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Primary CTA Button Label</label>
                <Input
                  value={hero.primaryCtaText}
                  onChange={(e) => setHero({ ...hero, primaryCtaText: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Primary CTA Target URL</label>
                <Input
                  value={hero.primaryCtaLink}
                  onChange={(e) => setHero({ ...hero, primaryCtaLink: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Secondary CTA Button Label</label>
                <Input
                  value={hero.secondaryCtaText}
                  onChange={(e) => setHero({ ...hero, secondaryCtaText: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Secondary CTA Target URL</label>
                <Input
                  value={hero.secondaryCtaLink}
                  onChange={(e) => setHero({ ...hero, secondaryCtaLink: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Update Hero Banner'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
