import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { serviceService } from '../../services/serviceService';
import { ServiceItem } from '../../types';

export const AdminServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    iconName: 'Shield',
    order: 0,
    isFeatured: false,
    keyFeaturesText: '',
    deploymentTypesText: '',
  });
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const loadServices = () => {
    setLoading(true);
    serviceService
      .getAllServicesAdmin()
      .then((res) => {
        if (res.success && res.data) {
          setServices(res.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      iconName: 'Shield',
      order: services.length + 1,
      isFeatured: false,
      keyFeaturesText: '',
      deploymentTypesText: '',
    });
    setErrorMsg('');
    setModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingId(srv._id || null);
    setFormData({
      title: srv.title,
      shortDescription: srv.shortDescription,
      fullDescription: srv.fullDescription,
      iconName: srv.iconName || 'Shield',
      order: srv.order || 0,
      isFeatured: Boolean(srv.isFeatured),
      keyFeaturesText: srv.keyFeatures?.join('\n') || '',
      deploymentTypesText: srv.deploymentTypes?.join(', ') || '',
    });
    setErrorMsg('');
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this security service?')) return;
    try {
      await serviceService.deleteService(id);
      loadServices();
    } catch (err: any) {
      alert(err.message || 'Error deleting service');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      const payload: Partial<ServiceItem> = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        iconName: formData.iconName,
        order: Number(formData.order) || 0,
        isFeatured: formData.isFeatured,
        keyFeatures: formData.keyFeaturesText.split('\n').map((s) => s.trim()).filter(Boolean),
        deploymentTypes: formData.deploymentTypesText.split(',').map((s) => s.trim()).filter(Boolean),
      };

      if (editingId) {
        await serviceService.updateService(editingId, payload);
      } else {
        await serviceService.createService(payload);
      }

      setModalOpen(false);
      loadServices();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error saving service');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4A343] block mb-1">
            CATALOG CMS
          </span>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">
            Security Services & Division Offerings
          </h1>
        </div>
        <Button onClick={handleOpenAdd} size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add New Service</span>
        </Button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs text-[#9BA3AF]">Loading services...</div>
      ) : (
        <div className="bg-[#111622] border border-white/10 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#182030]/50 text-[#60697B] uppercase font-mono text-[10px]">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Service Title</th>
                <th className="py-3 px-4">Short Description</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((srv) => (
                <tr key={srv._id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[#D4A343]">{srv.order}</td>
                  <td className="py-3.5 px-4 font-bold text-[#F3F5F7]">{srv.title}</td>
                  <td className="py-3.5 px-4 text-[#9BA3AF] max-w-md truncate">
                    {srv.shortDescription}
                  </td>
                  <td className="py-3.5 px-4">
                    {srv.isFeatured ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Featured
                      </span>
                    ) : (
                      <span className="text-[#60697B] text-[10px]">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(srv)}
                      className="p-1.5 rounded hover:bg-white/10 text-[#9BA3AF] hover:text-[#F3F5F7]"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv._id!)}
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
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Security Service' : 'Add New Security Service'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <Input
            label="Service Title *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Short Summary Description (for card & meta) *"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            required
          />

          <Textarea
            label="Comprehensive Operational Description *"
            rows={4}
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            required
          />

          <Textarea
            label="Key Features / Duties (One per line)"
            rows={3}
            placeholder="Police verified personnel&#10;8-hour shift compliance&#10;Visitor register logging"
            value={formData.keyFeaturesText}
            onChange={(e) => setFormData({ ...formData, keyFeaturesText: e.target.value })}
          />

          <Input
            label="Deployment Environments (comma-separated)"
            placeholder="Corporate Offices, Warehouses, Gated Townships"
            value={formData.deploymentTypesText}
            onChange={(e) => setFormData({ ...formData, deploymentTypesText: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Display Order (Number)"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
            />
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 accent-[#D4A343]"
              />
              <label htmlFor="isFeatured" className="text-xs text-[#F3F5F7]">
                Feature on Homepage
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={saving}>
              Save Service
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
