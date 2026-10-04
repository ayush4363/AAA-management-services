import React, { useState, useEffect } from 'react';
import { galleryService } from '../../services/galleryService';
import { GalleryItem } from '../../types';
import { Eye, X } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [activeModalImage, setActiveModalImage] = useState<GalleryItem | null>(null);



  useEffect(() => {
    setLoading(true);
    galleryService
      .getGalleryImages()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setImages(res.data);
        } else {
          setImages([]);
        }
      })
      .catch(() => {
        setImages([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = [
    { label: 'All Photos', value: 'all' },
    { label: 'Guards', value: 'guarding' },
    { label: 'Supervisors', value: 'supervision' },
    { label: 'Sites', value: 'industrial' },
  ];

  const filteredImages = images.filter((img) => {
    if (selectedCategory === 'all') return true;
    return img.category === selectedCategory;
  });

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* Page Header */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-24 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EB] border border-[#E6E3DA] text-xs text-[#141518]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C44D2B]" />
              <span>Gallery</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#141518] leading-[1.1]">
              Our Gallery
            </h1>
            <p className="text-lg sm:text-xl text-[#686873] leading-relaxed">
              A look at AAA Management Services and our security services.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Pills (shown if images exist) */}
      {images.length > 0 && (
        <section className="py-6 border-b border-[#E6E3DA] bg-white sticky top-[68px] z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-[#141518] text-white shadow-sm'
                        : 'bg-[#F3F1EB] text-[#686873] hover:text-[#141518] hover:bg-[#EBE8E0]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid or Empty State */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-24 text-center text-sm text-[#686873]">Loading gallery...</div>
          ) : images.length === 0 ? (
            <div className="py-24 max-w-md mx-auto text-center space-y-3 p-8 rounded-3xl bg-white border border-[#E6E3DA] shadow-card">
              <h3 className="text-2xl font-bold text-[#141518]">Gallery Coming Soon</h3>
              <p className="text-base text-[#686873] leading-relaxed">
                Photos from AAA Management Services will be added here.
              </p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="py-24 text-center text-sm text-[#686873]">
              No photos in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((img) => (
                <div
                  key={img._id || img.title}
                  onClick={() => setActiveModalImage(img)}
                  className="bg-white border border-[#E6E3DA] rounded-2xl overflow-hidden group cursor-pointer shadow-card hover:shadow-lift transition-all"
                >
                  <div className="relative aspect-video bg-[#F3F1EB] overflow-hidden">
                    <img
                      src={img.imageUrl}
                      alt={img.altText || img.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-[#141518]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2.5 rounded-full bg-white/90 text-[#141518] shadow-sm">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    <span className="text-xs font-mono uppercase text-[#C44D2B] block">
                      {img.category}
                    </span>
                    <h3 className="text-base font-bold text-[#141518] line-clamp-1">{img.title}</h3>
                    <p className="text-sm text-[#686873] line-clamp-1">{img.altText}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full border border-[#E6E3DA] shadow-2xl space-y-4 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E6E3DA]">
              <div>
                <span className="text-xs font-mono uppercase text-[#C44D2B]">
                  {activeModalImage.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#141518]">{activeModalImage.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalImage(null)}
                className="p-1.5 rounded-full hover:bg-[#F3F1EB] text-[#686873] hover:text-[#141518]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-[#F3F1EB] rounded-xl overflow-hidden">
              <img
                src={activeModalImage.imageUrl}
                alt={activeModalImage.altText || activeModalImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm sm:text-base text-[#686873]">{activeModalImage.altText}</p>
          </div>
        </div>
      )}
    </div>
  );
};
