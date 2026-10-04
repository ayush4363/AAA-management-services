import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { businessService } from '../../services/businessService';
import { BusinessInfo } from '../../types';

export const AdminBusinessPage: React.FC = () => {
  const [formData, setFormData] = useState<Partial<BusinessInfo>>({
    companyName: 'AAA Management Services',
    tagline: 'Professional Security, Facility Guarding & Armed Protection Services',
    phone: '9045393714',
    alternatePhone: '9045393714',
    email: 'contact@aaamanagementservices.com',
    operatingHours: '24/7 Operations Room & Emergency Dispatch',
    address: {
      street: 'Shamshabad Road, Infront Of TV Tower',
      landmark: 'Chamruali Mod',
      locality: 'Rajpur',
      city: 'Agra',
      state: 'Uttar Pradesh',
      pincode: '282001',
      country: 'India',
    },
    gstNumber: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    businessService
      .getBusinessInfo()
      .then((res) => {
        if (res.success && res.data) {
          setFormData(res.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await businessService.updateBusinessInfo(formData);
      if (res.success) {
        setSuccessMsg('Business information updated and synchronized across public website.');
      } else {
        setErrorMsg(res.message || 'Update failed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error saving business details.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-xs text-[#9BA3AF] py-8">Loading business profile...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4A343] block mb-1">
            CORE ORGANIZATION DATA
          </span>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">
            Corporate & Headquarters Profile
          </h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Information saved here dynamically updates the public website header, footer, contact page, and official tender proposals.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Identity */}
        <div className="bg-[#111622] border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#F3F5F7] pb-2 border-b border-white/10">
            Company Identity & Tagline
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              value={formData.companyName || ''}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
            />
            <Input
              label="Operating Tagline"
              value={formData.tagline || ''}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            />
          </div>
        </div>

        {/* Communications */}
        <div className="bg-[#111622] border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#F3F5F7] pb-2 border-b border-white/10">
            Communications & Dispatch
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Primary Contact Phone"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <Input
              label="Alternate Contact Phone"
              value={formData.alternatePhone || ''}
              onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
            />
            <Input
              label="Primary Email Address"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <Input
            label="Operating Hours Descriptor"
            value={formData.operatingHours || ''}
            onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
          />
        </div>

        {/* Physical Headquarters Address */}
        <div className="bg-[#111622] border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#F3F5F7] pb-2 border-b border-white/10">
            Headquarters Physical Address (Agra, Uttar Pradesh)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Street / Highway"
              value={formData.address?.street || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address!, street: e.target.value },
                })
              }
              required
            />
            <Input
              label="Landmark"
              value={formData.address?.landmark || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address!, landmark: e.target.value },
                })
              }
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Input
              label="Locality"
              value={formData.address?.locality || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address!, locality: e.target.value },
                })
              }
            />
            <Input
              label="City"
              value={formData.address?.city || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address!, city: e.target.value },
                })
              }
              required
            />
            <Input
              label="State"
              value={formData.address?.state || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address!, state: e.target.value },
                })
              }
              required
            />
            <Input
              label="PIN Code"
              value={formData.address?.pincode || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address!, pincode: e.target.value },
                })
              }
              required
            />
          </div>
        </div>

        {/* Legal & Taxation */}
        <div className="bg-[#111622] border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#F3F5F7] pb-2 border-b border-white/10">
            Legal & Tax Credentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="GST Registration Number"
              value={formData.gstNumber || ''}
              onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={saving} className="px-6 font-bold uppercase tracking-wider text-xs">
            <Save className="w-4 h-4 mr-2" />
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
