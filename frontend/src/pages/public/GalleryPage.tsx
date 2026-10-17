import React, { useState, useEffect } from 'react';
import { Eye, X, Shield } from 'lucide-react';
import { galleryService } from '../../services/galleryService';
import { GalleryItem } from '../../types';

const LOCAL_GALLERY_IMAGES: GalleryItem[] = [
  {
    _id: 'local-1',
    title: 'Security Operations Lineup',
    category: 'team',
    imageUrl: '/images/gallery/Groupphoto.png',
    altText: 'Complete active security personnel and guard deployment lineup by AAA Management Services in Agra.',
  },
  {
    _id: 'local-2',
    title: 'Licensed Armed Security Guard',
    category: 'gunmen',
    imageUrl: '/images/gallery/securitygunman.png',
    altText: 'Authorized armed security guard equipped for high-security facilities and transit protection.',
  },
  {
    _id: 'local-3',
    title: 'Armed Sentry Officer',
    category: 'gunmen',
    imageUrl: '/images/gallery/securitygunman2.png',
    altText: 'Trained armed security sentry on static protection duty at industrial premises.',
  },
  {
    _id: 'local-4',
    title: 'Armed Facility Protection Guard',
    category: 'gunmen',
    imageUrl: '/images/gallery/securitygunman3.png',
    altText: 'Armed sentry personnel in turnout-inspected uniform for premium security coverage.',
  },
  {
    _id: 'local-5',
    title: 'Field Security Supervisor',
    category: 'guards',
    imageUrl: '/images/gallery/securityman.png',
    altText: 'Uniformed security officer and field supervisor for commercial and residential premises.',
  },
  {
    _id: 'local-6',
    title: 'Perimeter Sentry Guard',
    category: 'guards',
    imageUrl: '/images/gallery/securityman2.png',
    altText: 'On-duty static security sentry guarding compound access points and boundary perimeter.',
  },
  {
    _id: 'local-7',
    title: 'Site Access Control Guard',
    category: 'guards',
    imageUrl: '/images/gallery/securityman3.png',
    altText: 'Security guard responsible for visitor logging, badge screening, and vehicle entry verification.',
  },
  {
    _id: 'local-8',
    title: 'Commercial Complex Guard',
    category: 'guards',
    imageUrl: '/images/gallery/securityman4.png',
    altText: 'Turnout-inspected security guard deployed for warehouse and industrial plant safety.',
  },
  {
    _id: 'local-9',
    title: 'Township & Property Guard',
    category: 'guards',
    imageUrl: '/images/gallery/securityman5.png',
    altText: 'Active uniformed security personnel maintaining order and gate barrier protocols.',
  },
];

export const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>(LOCAL_GALLERY_IMAGES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalImage, setActiveModalImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    galleryService
      .getGalleryImages()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          // Merge API images with local verified images without duplicates
          const apiImages = res.data.filter(
            (apiImg) => !LOCAL_GALLERY_IMAGES.some((loc) => loc.imageUrl === apiImg.imageUrl)
          );
          setImages([...LOCAL_GALLERY_IMAGES, ...apiImages]);
        }
      })
      .catch(() => {
        // Fallback already pre-loaded with LOCAL_GALLERY_IMAGES
      });
  }, []);

  const categories = [
    { label: 'All Photos', value: 'all' },
    { label: 'Security Guards', value: 'guards' },
    { label: 'Armed Gunmen', value: 'gunmen' },
    { label: 'Team Deployment', value: 'team' },
  ];

  const filteredImages = images.filter((img) => {
    if (selectedCategory === 'all') return true;
    return img.category === selectedCategory;
  });

  const getCategoryBadgeLabel = (category: string) => {
    switch (category) {
      case 'gunmen':
        return 'Armed Gunman';
      case 'team':
        return 'Team Lineup';
      case 'guards':
      default:
        return 'Security Guard';
    }
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* Page Header */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-24 border-b border-[#E6E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EB] border border-[#E6E3DA] text-xs text-[#141518]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C44D2B]" />
              <span>Operations Gallery</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#141518] leading-[1.1]">
              Our Security Personnel
            </h1>
            <p className="text-lg sm:text-xl text-[#686873] leading-relaxed">
              Explore authentic photos of our disciplined security guards, armed sentries, and field deployment teams in Agra.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="py-5 border-b border-[#E6E3DA] bg-white sticky top-[68px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              const count =
                cat.value === 'all'
                  ? images.length
                  : images.filter((img) => img.category === cat.value).length;

              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#141518] text-white shadow-sm'
                      : 'bg-[#F3F1EB] text-[#686873] hover:text-[#141518] hover:bg-[#EBE8E0]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#E6E3DA] text-[#686873]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredImages.map((img) => {
              const isGroup = img.category === 'team';

              return (
                <div
                  key={img._id || img.title}
                  onClick={() => setActiveModalImage(img)}
                  className={`bg-white border border-[#E6E3DA] rounded-3xl overflow-hidden group cursor-pointer shadow-card hover:shadow-lift transition-all flex flex-col ${
                    isGroup && selectedCategory === 'all' ? 'sm:col-span-2 lg:col-span-3' : ''
                  }`}
                >
                  {/* Photo Container */}
                  <div
                    className={`relative bg-[#F3F1EB] overflow-hidden ${
                      isGroup && selectedCategory === 'all'
                        ? 'aspect-[16/9] sm:aspect-[21/9]'
                        : 'aspect-[3/4]'
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.altText || img.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E6E3DA] text-xs font-semibold text-[#141518] shadow-sm">
                        <Shield className="w-3 h-3 text-[#C44D2B]" />
                        <span>{getCategoryBadgeLabel(img.category)}</span>
                      </span>
                    </div>

                    {/* Hover Inspect Icon */}
                    <div className="absolute inset-0 bg-[#141518]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="p-3 rounded-full bg-white text-[#141518] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-5 sm:p-6 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#141518] group-hover:text-[#C44D2B] transition-colors">
                        {img.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#686873] line-clamp-2 mt-1 leading-relaxed">
                        {img.altText}
                      </p>
                    </div>
                    <div className="pt-2 flex items-center justify-between text-xs font-medium text-[#8C8C96]">
                      <span>AAA Management Services</span>
                      <span className="font-mono text-[#C44D2B] group-hover:underline">View Photo ↗</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#141518] text-white rounded-3xl overflow-hidden max-w-4xl w-full border border-white/10 shadow-2xl space-y-4 p-4 sm:p-6 max-h-[92vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C44D2B] text-white text-xs font-semibold">
                  {getCategoryBadgeLabel(activeModalImage.category)}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {activeModalImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalImage(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Full-View Container (Uncropped) */}
            <div className="flex-1 min-h-0 flex items-center justify-center bg-black/40 rounded-2xl overflow-hidden p-2">
              <img
                src={activeModalImage.imageUrl}
                alt={activeModalImage.altText || activeModalImage.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Modal Description */}
            <div className="pt-1 text-xs sm:text-sm text-white/80 shrink-0 leading-relaxed">
              <p>{activeModalImage.altText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
