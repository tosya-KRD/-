import React, { useState, useEffect } from 'react';

interface PostImageGalleryProps {
  images: string[];
  postAuthor?: string;
}

export const PostImageGallery: React.FC<PostImageGalleryProps> = ({ images, postAuthor }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  if (!images || images.length === 0) return null;

  const count = images.length;

  return (
    <div className="w-full my-2">
      {/* 1 Image */}
      {count === 1 && (
        <div 
          onClick={() => setLightboxIndex(0)}
          className="relative group rounded-2xl overflow-hidden cursor-pointer border border-outline-variant/15 bg-surface-container shadow-md max-h-[420px]"
        >
          <img
            src={images[0]}
            alt={postAuthor ? `Фото к посту от ${postAuthor}` : 'Фото к посту'}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[420px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">zoom_in</span>
            </span>
          </div>
        </div>
      )}

      {/* 2 Images */}
      {count === 2 && (
        <div className="grid grid-cols-2 gap-2 h-56 sm:h-64 rounded-2xl overflow-hidden border border-outline-variant/15 bg-surface-container shadow-md">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="relative group overflow-hidden cursor-pointer h-full"
            >
              <img
                src={img}
                alt={`Фото ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-2 rounded-full bg-black/60 text-white backdrop-blur-md shadow-lg">
                  <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3 Images */}
      {count === 3 && (
        <div className="grid grid-cols-3 gap-2 h-60 sm:h-72 rounded-2xl overflow-hidden border border-outline-variant/15 bg-surface-container shadow-md">
          {/* Main larger image */}
          <div
            onClick={() => setLightboxIndex(0)}
            className="col-span-2 relative group overflow-hidden cursor-pointer h-full"
          >
            <img
              src={images[0]}
              alt="Фото 1"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="p-2 rounded-full bg-black/60 text-white backdrop-blur-md">
                <span className="material-symbols-outlined text-[20px]">zoom_in</span>
              </span>
            </div>
          </div>

          {/* 2 stacked images */}
          <div className="col-span-1 grid grid-rows-2 gap-2 h-full">
            {images.slice(1, 3).map((img, idx) => (
              <div
                key={idx + 1}
                onClick={() => setLightboxIndex(idx + 1)}
                className="relative group overflow-hidden cursor-pointer h-full"
              >
                <img
                  src={img}
                  alt={`Фото ${idx + 2}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="p-1.5 rounded-full bg-black/60 text-white backdrop-blur-md">
                    <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4+ Images */}
      {count >= 4 && (
        <div className="grid grid-cols-2 gap-2 h-64 sm:h-80 rounded-2xl overflow-hidden border border-outline-variant/15 bg-surface-container shadow-md">
          {images.slice(0, 4).map((img, idx) => {
            const isLast = idx === 3;
            const extraCount = count - 4;

            return (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="relative group overflow-hidden cursor-pointer h-full"
              >
                <img
                  src={img}
                  alt={`Фото ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {isLast && extraCount > 0 ? (
                  <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex flex-col items-center justify-center text-white font-bold transition-all group-hover:bg-black/55">
                    <span className="text-2xl font-extrabold tracking-wide">+{extraCount}</span>
                    <span className="text-xs text-white/80 font-medium">ещё фото</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="p-2 rounded-full bg-black/60 text-white backdrop-blur-md">
                      <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Gallery footer hint */}
      {count > 1 && (
        <div className="flex items-center justify-between text-[11px] text-on-surface-variant mt-1.5 px-1">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">photo_library</span>
            <span>Прикреплено {count} {count === 2 || count === 3 || count === 4 ? 'изображения' : 'изображений'}</span>
          </span>
          <span className="text-xs opacity-75">Нажмите для просмотра</span>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-white">
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
                {lightboxIndex + 1} / {images.length}
              </span>
              {postAuthor && (
                <span className="text-sm font-medium text-white/80 hidden sm:inline">
                  {postAuthor}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={images[lightboxIndex]}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer flex items-center justify-center"
                title="Открыть оригинал"
              >
                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              </a>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer flex items-center justify-center"
                title="Закрыть (Esc)"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>
          </div>

          {/* Main Image Container */}
          <div 
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0))}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-primary text-white backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-110"
                title="Предыдущее фото"
              >
                <span className="material-symbols-outlined text-[24px]">chevron_left</span>
              </button>
            )}

            <img
              src={images[lightboxIndex]}
              alt={`Фото ${lightboxIndex + 1}`}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl select-none"
            />

            {/* Next Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0))}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-primary text-white backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-110"
                title="Следующее фото"
              >
                <span className="material-symbols-outlined text-[24px]">chevron_right</span>
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {images.length > 1 && (
            <div 
              className="flex items-center gap-2 p-2 rounded-2xl bg-black/40 backdrop-blur-md overflow-x-auto max-w-xl z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    i === lightboxIndex 
                      ? 'border-primary ring-2 ring-primary/40 scale-105' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Миниатюра ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
