import React, { useState } from 'react';
import { Master, Studio } from '../../types';

interface MastersScreenProps {
  masters: Master[];
  studios: Studio[];
  onOpenDirectChat: (name: string) => void;
  globalSearchQuery?: string;
}

export const MastersScreen: React.FC<MastersScreenProps> = ({
  masters,
  studios,
  onOpenDirectChat,
  globalSearchQuery = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMasterForBooking, setSelectedMasterForBooking] = useState<Master | null>(null);
  const [selectedStudioForBooking, setSelectedStudioForBooking] = useState<Studio | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('2026-10-15');
  const [bookingTime, setBookingTime] = useState<string>('14:00');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Все мастера' },
    { id: 'repair', label: 'Ремонт' },
    { id: 'beauty', label: 'Красота' },
    { id: 'education', label: 'Обучение' },
    { id: 'household', label: 'Быт' },
  ];

  const effectiveSearch = globalSearchQuery.toLowerCase().trim();

  const filteredMasters = masters.filter(m => {
    const matchCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchSearch = !effectiveSearch ||
      m.name.toLowerCase().includes(effectiveSearch) ||
      m.role.toLowerCase().includes(effectiveSearch) ||
      m.description.toLowerCase().includes(effectiveSearch);
    return matchCategory && matchSearch;
  });

  const handleConfirmBooking = () => {
    const targetName = selectedMasterForBooking?.name || selectedStudioForBooking?.name || 'Мастер';
    setBookingSuccess(`Запись к «${targetName}» на ${bookingDate} в ${bookingTime} успешно оформлена! Мастер свяжется с вами.`);
    setSelectedMasterForBooking(null);
    setSelectedStudioForBooking(null);
    setTimeout(() => setBookingSuccess(null), 5000);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Booking confirmation toast */}
      {bookingSuccess && (
        <div className="mb-6 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl shadow-lg flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-400">check_circle</span>
            <span className="text-sm font-medium">{bookingSuccess}</span>
          </div>
          <button onClick={() => setBookingSuccess(null)} className="p-1 hover:opacity-80">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Banner / Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] uppercase tracking-widest text-primary font-bold">
              Услуги соседей
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs text-on-surface-variant">ЖК Центральный</span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">
            Мастера <span className="text-primary font-normal">·</span> Проверенные специалисты ЖК
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-[0_0_20px_rgba(139,26,58,0.4)]'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Masters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredMasters.map((master) => (
          <div
            key={master.id}
            className="group relative bg-surface-container-low/70 backdrop-blur-2xl rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(139,26,58,0.25)] transition-all duration-300 flex flex-col justify-between border border-outline-variant/10"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-surface-container-high shadow-inner shrink-0">
                  <img
                    src={master.image}
                    alt={master.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary-container/10 mix-blend-overlay" />
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/20 text-on-primary-container text-[11px] font-semibold border border-primary-container/30">
                  <span className="material-symbols-outlined text-[14px] material-symbols-fill text-primary">
                    verified
                  </span>
                  Проверенный
                </span>
              </div>

              <div className="mb-2">
                <span className="text-[11px] text-primary uppercase font-bold tracking-wider">
                  {master.role}
                </span>
                <h3 className="text-lg font-bold text-on-surface mt-0.5">
                  {master.name}
                </h3>
              </div>

              <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                {master.description}
              </p>
            </div>

            <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between">
              <div className="flex items-center gap-1 text-on-surface font-semibold text-xs">
                <span className="material-symbols-outlined text-primary text-[18px] material-symbols-fill">star</span>
                <span>{master.rating}</span>
                <span className="text-on-surface-variant font-normal text-[11px]">({master.reviewsCount})</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-on-surface-variant block leading-tight">от</span>
                  <span className="text-base font-bold text-primary">{master.priceFrom} ₽</span>
                </div>

                <button
                  onClick={() => setSelectedMasterForBooking(master)}
                  className="px-3 py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  Записаться
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section: Manicure Studios */}
      <div className="mt-4 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs text-primary uppercase tracking-wider font-semibold">Локальные студии</span>
            <h2 className="text-xl font-bold text-on-surface mt-1">Студии маникюра в нашем ЖК</h2>
          </div>
          <button 
            onClick={() => alert('Показаны все 5 сертифицированных студий в корпусах нашего ЖК.')}
            className="text-xs font-semibold text-primary hover:text-on-primary-container transition-colors flex items-center gap-1"
          >
            Все студии (5) <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {studios.map((studio) => (
            <div
              key={studio.id}
              className="group relative bg-surface-container-low/70 backdrop-blur-xl rounded-2xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:bg-surface-container/90 transition-all border border-outline-variant/10 flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              
              <div>
                <div className="w-full h-32 rounded-xl bg-surface-container-high mb-3 overflow-hidden relative shadow-inner">
                  <img
                    src={studio.image}
                    alt={studio.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-surface/80 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-primary text-[14px] material-symbols-fill">star</span>
                    {studio.rating}
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-on-surface truncate">
                  {studio.name}
                </h3>
                <p className="text-[11px] text-on-surface-variant mb-3">{studio.location}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
                <span className="text-[11px] text-on-surface-variant font-medium">от {studio.priceFrom} ₽</span>
                <button
                  onClick={() => setSelectedStudioForBooking(studio)}
                  className="text-xs text-primary font-semibold hover:underline cursor-pointer"
                >
                  Записаться
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {(selectedMasterForBooking || selectedStudioForBooking) && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => {
            setSelectedMasterForBooking(null);
            setSelectedStudioForBooking(null);
          }}
        >
          <div 
            className="w-full max-w-md p-6 rounded-2xl bg-surface-container border border-white/10 shadow-2xl relative flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-on-surface">
                Запись на услугу
              </h3>
              <button 
                onClick={() => {
                  setSelectedMasterForBooking(null);
                  setSelectedStudioForBooking(null);
                }}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/15">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container-high shrink-0">
                <img
                  src={selectedMasterForBooking?.image || selectedStudioForBooking?.image}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs text-primary font-semibold block">
                  {selectedMasterForBooking?.role || 'Студия'}
                </span>
                <h4 className="text-sm font-bold text-on-surface">
                  {selectedMasterForBooking?.name || selectedStudioForBooking?.name}
                </h4>
                <span className="text-[11px] text-on-surface-variant">
                  Цена от {selectedMasterForBooking?.priceFrom || selectedStudioForBooking?.priceFrom} ₽
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-on-surface-variant font-medium block mb-1">Выберите дату:</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs text-on-surface-variant font-medium block mb-1">Выберите время:</label>
                <div className="grid grid-cols-4 gap-2">
                  {['10:00', '12:00', '14:00', '16:00', '18:00', '19:30', '20:00', '21:00'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setBookingTime(time)}
                      className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        bookingTime === time
                          ? 'bg-primary-container text-on-primary-container ring-1 ring-primary'
                          : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => {
                  const name = selectedMasterForBooking?.name || selectedStudioForBooking?.name || '';
                  setSelectedMasterForBooking(null);
                  setSelectedStudioForBooking(null);
                  onOpenDirectChat(name);
                }}
                className="py-3 px-4 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Написать</span>
              </button>
              
              <button
                onClick={handleConfirmBooking}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-white text-xs font-bold shadow-[0_0_15px_rgba(139,26,58,0.4)] hover:brightness-110 transition-all"
              >
                Подтвердить запись
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
