import {useEffect, useState} from 'react';
import {Maximize2, X} from 'lucide-react';
import {GALLERY_PHOTOS, type GalleryPhoto} from '../data/institute.ts';
import {ImageWithFallback} from './ImageWithFallback.tsx';

export function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <section id="gallery" className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-slate-600 mb-2">
              Training Gallery
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0A192F] [text-wrap:balance]">
              Behind the Wheel & On-Track Practice
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Representative views of cabin instruction, steering posture, parking
            cone drills, and two-wheeler balance training.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {GALLERY_PHOTOS.map((photo, index) => {
            const spanClass =
              index < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            return (
              <figure
                key={photo.id}
                className={`${spanClass} group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  aria-label={`View larger image: ${photo.caption}`}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A192F]"
                >
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.alt}
                    fallbackTitle={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#0A192F]/80 text-white opacity-90 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                  </span>
                </button>
                <figcaption className="p-4 flex flex-col gap-1">
                  <span className="text-xs font-medium text-slate-500">
                    {photo.category}
                  </span>
                  <span className="text-sm font-semibold text-[#0A192F] leading-snug">
                    {photo.caption}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.caption}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-[#0A192F]/90 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-200">
              <div>
                <p className="text-xs text-slate-500">{selectedPhoto.category}</p>
                <p className="text-sm font-semibold text-[#0A192F]">
                  {selectedPhoto.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close image preview"
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-600 hover:text-[#0A192F] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="aspect-[16/10] w-full bg-slate-100">
              <ImageWithFallback
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fallbackTitle={selectedPhoto.caption}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
