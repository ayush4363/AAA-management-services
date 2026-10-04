import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { settingsService, WebsiteSettingsData } from '../../services/settingsService';
import { Settings, Save, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await settingsService.getSettings();
      if (res.data) setSettings(res.data);
    } catch (err) {
      console.error('Failed to load settings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setMessage(null);
    try {
      await settingsService.updateSettings(settings);
      setMessage({ text: 'Global website configurations updated successfully.', type: 'success' });
    } catch (err) {
      console.error('Failed to update settings', err);
      setMessage({ text: 'Failed to update settings. Please check server logs.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-[#9BA3AF]">Loading global settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4A343] font-semibold mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>System Configuration</span>
          </div>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">Global Website Settings</h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Manage public website metadata, quote request gating, and official communications.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={fetchSettings}>
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

      {settings && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SEO & Brand Identity */}
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#F3F5F7] border-b border-white/5 pb-2">
              Search Engine & Metadata Identity
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Default Site Title</label>
                <Input
                  required
                  value={settings.siteTitle}
                  onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                />
                <span className="text-[10px] text-[#9BA3AF] mt-1 block">
                  Displayed on search engine snippets and browser tabs.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  className="w-full bg-[#182030] border border-white/10 rounded-lg p-3 text-xs text-[#F3F5F7] focus:outline-none focus:border-[#D4A343]"
                  value={settings.metaDescription}
                  onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                />
              </div>
            </div>
          </Card>

          {/* Operational Support Coordinates */}
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#F3F5F7] border-b border-white/5 pb-2">
              Dispatch & Support Coordinates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Primary Support Hotline</label>
                <Input
                  required
                  value={settings.supportPhone}
                  onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Dispatch Inbox</label>
                <Input
                  required
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                />
              </div>
            </div>
          </Card>

          {/* Feature Toggles */}
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#F3F5F7] border-b border-white/5 pb-2">
              Service Intake & Operational Toggles
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-[#182030] border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableQuoteRequests}
                  onChange={(e) => setSettings({ ...settings, enableQuoteRequests: e.target.checked })}
                  className="rounded bg-[#0B0E14] border-white/20 text-[#D4A343] focus:ring-0"
                />
                <div>
                  <div className="text-xs font-medium text-[#F3F5F7]">Enable Public Quotation Intake</div>
                  <div className="text-[11px] text-[#9BA3AF]">
                    Allows commercial clients to build personnel rosters and submit tenders through the portal.
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg bg-[#182030] border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="rounded bg-[#0B0E14] border-white/20 text-[#D4A343] focus:ring-0"
                />
                <div>
                  <div className="text-xs font-medium text-[#F3F5F7]">Maintenance Mode</div>
                  <div className="text-[11px] text-[#9BA3AF]">
                    Display maintenance notice to non-admin visitors during infrastructure upgrades.
                  </div>
                </div>
              </label>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving Changes...' : 'Save System Settings'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
