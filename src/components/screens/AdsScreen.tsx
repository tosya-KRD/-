import React, { useState } from 'react';
import { ClassifiedAd } from '../../types';

interface AdsScreenProps {
  ads: ClassifiedAd[];
  onToggleLikeAd: (adId: string) => void;
  onOpenDirectChat: (title: string) => void;
  onOpenCreateAdModal: () => void;
  globalSearchQuery?: string;
}

export const AdsScreen: React.FC<AdsScreenProps> = ({
  ads,
  onToggleLikeAd,
  onOpenDirectChat,
  onOpenCreateAdModal,
  globalSearchQuery = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [selectedAdForDetail, setSelectedAdForDetail] = useState<ClassifiedAd | null>(null);

  const categories = [
    { id: 'all', label: 'Все' },
    { id: 'sale', label: 'Продажа' },
    { id: 'rent', label: 'Аренда' },
    { id: 'free', label: 'Даром' },
    { id: 'services', label: 'Услуги' },
    { id: 'lost', label: 'Потеряшки' },
  ];

  const effectiveSearch = (globalSearchQuery || localSearch).toLowerCase().trim();

  const filteredAds = ads.filter(ad => {
    const matchCategory = selectedCategory === 'all' || ad.category === selectedCategory;
    const matchSearch = !effectiveSearch || 
      ad.title.toLowerCase().includes(effectiveSearch) ||
      ad.location.toLowerCase().includes(effectiveSearch) ||
      ad.categoryLabel.toLowerCase().includes(effectiveSearch) ||
      (ad.description && ad.description.toLowerCase().includes(effectiveSearch));
    return matchCategory && matchSearch;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Glass Header */}
      <div className="sticky top-16 z-30 -mx-4 lg:-mx-8 px-4 lg:px-8 py-4 bg-surface/80 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)] border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">Объявления</h1>
          <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-semibold">
            {ads.length} актуальных
          </span>
        </div>

        {/* Filter Bar & Action buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Поиск по объявлениям..."
              className="w-full bg-surface-container-low/80 border border-outline-variant/30 rounded-xl pl-9 pr-4 py-2 text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <button
            onClick={onOpenCreateAdModal}
            className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-all flex items-center gap-2 text-xs font-semibold shadow-[0_0_15px_rgba(139,26,58,0.3)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Разместить</span>
          </button>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
        {categories.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(139,26,58,0.3)]'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 4x5 Grid of Ads */}
      {filteredAds.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-low/50 rounded-2xl border border-outline-variant/15 text-on-surface-variant">
          Объявлений в этой категории не найдено. Нажмите «Разместить», чтобы добавить первое!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAds.map((ad) => {
            // Determine background & color accent per category
            let cardBg = 'bg-surface-container/60';
            let catTagBg = 'bg-primary-container text-on-primary-container';
            let priceColor = 'text-primary';
            
            if (ad.category === 'free') {
              cardBg = 'bg-[#16261d]/70';
              catTagBg = 'bg-emerald-900/60 text-emerald-300';
              priceColor = 'text-emerald-400';
            } else if (ad.category === 'services') {
              cardBg = 'bg-[#16212b]/70';
              catTagBg = 'bg-sky-900/60 text-sky-300';
              priceColor = 'text-sky-400';
            } else if (ad.category === 'rent') {
              cardBg = 'bg-[#262116]/70';
              catTagBg = 'bg-amber-900/60 text-amber-300';
              priceColor = 'text-amber-400';
            } else if (ad.category === 'lost') {
              cardBg = 'bg-[#261620]/70';
              catTagBg = 'bg-rose-900/60 text-rose-300';
              priceColor = 'text-rose-400';
            }

            return (
              <div
                key={ad.id}
                onClick={() => setSelectedAdForDetail(ad)}
                className={`flex flex-col justify-between p-5 rounded-2xl ${cardBg} backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group border border-outline-variant/10 cursor-pointer`}
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-2xl shadow-inner shrink-0">
                    {ad.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${catTagBg}`}>
                      {ad.categoryLabel}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLikeAd(ad.id);
                      }}
                      className={`w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center transition-colors cursor-pointer ${
                        ad.isLiked ? 'text-primary' : 'text-on-surface-variant hover:text-error'
                      }`}
                      aria-label="В избранное"
                    >
                      <span className={`material-symbols-outlined text-[16px] ${ad.isLiked ? 'material-symbols-fill text-primary' : ''}`}>
                        favorite
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-on-surface mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {ad.title}
                  </h3>
                  <p className={`text-xs font-semibold mb-3 ${priceColor}`}>
                    {ad.price}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-outline-variant/10 text-[11px] text-on-surface-variant">
                  <span className="truncate pr-1">{ad.location}</span>
                  <div className="flex items-center gap-1 text-primary shrink-0">
                    <span className="material-symbols-outlined text-[14px] material-symbols-fill">star</span>
                    <span>{ad.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ad Detail Modal */}
      {selectedAdForDetail && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setSelectedAdForDetail(null)}
        >
          <div 
            className="w-full max-w-lg p-6 rounded-2xl bg-surface-container border border-white/10 shadow-2xl relative flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-3xl shadow-inner">
                  {selectedAdForDetail.icon}
                </div>
                <div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wider block">
                    {selectedAdForDetail.categoryLabel}
                  </span>
                  <h2 className="text-xl font-bold text-on-surface">
                    {selectedAdForDetail.title}
                  </h2>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAdForDetail(null)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex items-baseline justify-between py-2 border-y border-outline-variant/15">
              <span className="text-2xl font-bold text-primary">
                {selectedAdForDetail.price}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-primary material-symbols-fill">star</span>
                <span className="font-semibold text-on-surface">{selectedAdForDetail.rating}</span>
                <span>• {selectedAdForDetail.location}</span>
              </div>
            </div>

            <div className="text-sm text-on-surface/90 leading-relaxed">
              <p className="font-medium text-xs text-on-surface-variant mb-1">Описание:</p>
              <p>{selectedAdForDetail.description || 'Подробности можно уточнить в чате с автором объявления.'}</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  onToggleLikeAd(selectedAdForDetail.id);
                  setSelectedAdForDetail(prev => prev ? { ...prev, isLiked: !prev.isLiked } : null);
                }}
                className={`py-3 px-4 rounded-xl border border-outline-variant/30 flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                  selectedAdForDetail.isLiked ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface'
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${selectedAdForDetail.isLiked ? 'material-symbols-fill' : ''}`}>
                  favorite
                </span>
                <span>{selectedAdForDetail.isLiked ? 'В избранном' : 'Сохранить'}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedAdForDetail(null);
                  onOpenDirectChat(selectedAdForDetail.title);
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-white font-semibold text-xs shadow-[0_0_20px_rgba(139,26,58,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Написать автору</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
