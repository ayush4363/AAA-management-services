import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { galleryService } from '../../services/galleryService';
import { GalleryItem } from '../../types';
import { Image, Plus, Trash2, ExternalLink, RefreshCw, Layers } from 'lucide-react';

export const AdminGalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'guarding',
    imageUrl: '',
    altText: '',
  });
  const [saving, setSaving] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await galleryService.getAllGalleryAdmin();
      if (res.data) setImages(res.data);
    } catch (err) {
      console.error('Failed to load gallery items', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) return;
    setSaving(true);
    try {
      await galleryService.addImage(formData);
      setIsModalOpen(false);
      setFormData({ title: '', category: 'guarding', imageUrl: '', altText: '' });
      await fetchImages();
    } catch (err) {
      console.error('Failed to add gallery image', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this image from the gallery?')) return;
    try {
      await galleryService.deleteImage(id);
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      console.error('Failed to delete image', err);
    }
  };

  const filteredImages = images.filter((img) => {
    if (activeFilter === 'all') return true;
    return img.category === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4A343] font-semibold mb-1">
            <Image className="w-3.5 h-3.5" />
            <span>Media Management</span>
          </div>
          <h1 className="text-2xl font-bold text-[#F3F5F7] tracking-tight">Gallery & Visual Assets</h1>
          <p className="text-xs text-[#9BA3AF] mt-1">
            Manage authenticated operational photography and field documentation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={fetchImages}>
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Image Asset
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        {['all', 'guarding', 'supervision', 'industrial', 'events'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 rounded-md text-xs capitalize transition-colors ${
              activeFilter === cat
                ? 'bg-[#D4A343]/20 text-[#D4A343] font-medium border border-[#D4A343]/40'
                : 'text-[#9BA3AF] hover:text-[#F3F5F7] hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-[#9BA3AF]">Loading visual media catalogue...</div>
      ) : filteredImages.length === 0 ? (
        <Card className="py-16 text-center text-xs text-[#9BA3AF]">
          <Layers className="w-8 h-8 text-[#9BA3AF]/40 mx-auto mb-3" />
          <p>No gallery images found for this category.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <Card key={img._id} className="overflow-hidden flex flex-col group p-0">
              <div className="relative aspect-video bg-[#182030] overflow-hidden">
                <img
                  src={img.imageUrl}
                  alt={img.altText || img.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-[#0B0E14]/80 text-[#D4A343] border border-[#D4A343]/30 backdrop-blur-sm">
                  {img.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#F3F5F7] line-clamp-1">{img.title}</h3>
                  <p className="text-[11px] text-[#9BA3AF] mt-1 line-clamp-1">{img.altText || 'Field verified record'}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <a
                    href={img.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9BA3AF] hover:text-[#F3F5F7] flex items-center gap-1 text-[11px]"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Preview Source
                  </a>
                  {img._id && (
                    <button
                      onClick={() => handleDelete(img._id!)}
                      className="text-red-400/80 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111622] border border-white/10 rounded-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-[#F3F5F7]">Add Photographic Asset</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#9BA3AF] hover:text-[#F3F5F7] text-sm"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Asset Title / Location *</label>
                <Input
                  required
                  placeholder="e.g. Armed Escort Deployment - Agra Logistics Hub"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Operational Category</label>
                  <select
                    className="w-full bg-[#182030] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#F3F5F7] focus:outline-none focus:border-[#D4A343]"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="guarding">Manned Guarding</option>
                    <option value="supervision">Supervisory Audit</option>
                    <option value="industrial">Industrial Security</option>
                    <option value="events">Crowd & Events</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Alt Description</label>
                  <Input
                    placeholder="Short accessibility text"
                    value={formData.altText}
                    onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9BA3AF] mb-1">Public Image URL *</label>
                <Input
                  required
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <Button type="button" variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={saving}>
                  {saving ? 'Adding Asset...' : 'Save to Gallery'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
