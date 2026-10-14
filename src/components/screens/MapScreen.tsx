import React, { useState } from 'react';
import { MAP_POINTS } from '../../data/mockData';
import { MapPoint, ScreenType } from '../../types';

interface MapScreenProps {
  onNavigateScreen: (screen: ScreenType) => void;
  onOpenDirectChat: (name: string) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  onNavigateScreen,
  onOpenDirectChat
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(MAP_POINTS[1]); // default to Корпус 2 (Наш дом)
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const categories = [
    { id: 'all', label: 'Все объекты' },
    { id: 'building', label: 'Корпуса' },
    { id: 'facility', label: 'Инфраструктура' },
    { id: 'eco', label: 'Эко-пункты' },
    { id: 'master', label: 'Мастера и студии' },
    { id: 'event', label: 'События' },
  ];

  const filteredPoints = MAP_POINTS.filter(pt => {
    if (selectedCategory === 'all') return true;
    return pt.category === selectedCategory;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Map Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-wider text-primary font-bold">
              Навигация и инфраструктура
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs text-on-surface-variant">Интерактивный генплан</span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">
            Карта · ЖК «Северный парк»
          </h1>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(c => {
            const isActive = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(139,26,58,0.3)]'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map Interactive Canvas & Info Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-low/70 backdrop-blur-2xl rounded-2xl p-4 lg:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-outline-variant/15 relative overflow-hidden flex flex-col">
          {/* Zoom Controls */}
          <div className="absolute top-6 right-6 z-20 flex flex-col gap-1 bg-surface-container/90 backdrop-blur-md rounded-xl p-1 border border-outline-variant/20 shadow-lg">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.45))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-high"
              title="Приблизить"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-high text-[11px] font-bold"
              title="Сброс"
            >
              1x
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.85))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-high"
              title="Отдалить"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
          </div>

          {/* SVG Map Layout */}
          <div className="relative w-full aspect-[16/10] bg-[#160e10] rounded-xl overflow-hidden border border-outline-variant/10 shadow-inner flex items-center justify-center">
            <div 
              className="relative w-full h-full transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Architectural Ground Plan SVG */}
              <svg className="w-full h-full" viewBox="0 0 1000 650" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background lawn / yard zones */}
                <rect width="1000" height="650" fill="#180f11" />
                
                {/* Green inner yard contour */}
                <ellipse cx="500" cy="320" rx="360" ry="220" fill="#1a251c" stroke="#2a452f" strokeWidth="2" strokeDasharray="6 4" opacity="0.8" />
                
                {/* Walking paths / alleys */}
                <path d="M 220 180 Q 500 240 780 180" stroke="#3d2b2e" strokeWidth="16" strokeLinecap="round" />
                <path d="M 250 480 Q 500 420 750 480" stroke="#3d2b2e" strokeWidth="16" strokeLinecap="round" />
                <path d="M 500 120 L 500 580" stroke="#3d2b2e" strokeWidth="18" strokeLinecap="round" />
                <circle cx="500" cy="320" r="90" fill="#201518" stroke="#574144" strokeWidth="3" />
                
                {/* Children Playground zone */}
                <rect x="440" y="270" width="120" height="100" rx="20" fill="#8b1a3a" fillOpacity="0.2" stroke="#ffb2bd" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="500" y="325" fill="#ffb2bd" fontSize="14" fontWeight="600" textAnchor="middle">Детский городок</text>

                {/* Building 1 */}
                <rect x="140" y="100" width="160" height="100" rx="12" fill="#281d1e" stroke="#574144" strokeWidth="2" />
                <text x="220" y="145" fill="#f3dddf" fontSize="15" fontWeight="bold" textAnchor="middle">Корпус 1</text>
                <text x="220" y="165" fill="#a58a8d" fontSize="11" textAnchor="middle">Северный · 16 эт.</text>

                {/* Building 2 (Our home) */}
                <rect x="420" y="60" width="160" height="110" rx="12" fill="#3a1c24" stroke="#ffb2bd" strokeWidth="2.5" />
                <rect x="430" y="70" width="140" height="24" rx="6" fill="#8b1a3a" fillOpacity="0.6" />
                <text x="500" y="86" fill="#ffd9dd" fontSize="11" fontWeight="bold" textAnchor="middle">★ НАШ ДОМ</text>
                <text x="500" y="125" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">Корпус 2</text>
                <text x="500" y="145" fill="#ffb2bd" fontSize="11" textAnchor="middle">Центральный · 18 эт.</text>

                {/* Building 3 */}
                <rect x="700" y="100" width="160" height="100" rx="12" fill="#281d1e" stroke="#574144" strokeWidth="2" />
                <text x="780" y="145" fill="#f3dddf" fontSize="15" fontWeight="bold" textAnchor="middle">Корпус 3</text>
                <text x="780" y="165" fill="#a58a8d" fontSize="11" textAnchor="middle">Восточный · 16 эт.</text>

                {/* Building 4 */}
                <rect x="160" y="420" width="160" height="100" rx="12" fill="#281d1e" stroke="#574144" strokeWidth="2" />
                <text x="240" y="465" fill="#f3dddf" fontSize="15" fontWeight="bold" textAnchor="middle">Корпус 4</text>
                <text x="240" y="485" fill="#a58a8d" fontSize="11" textAnchor="middle">Западный · 14 эт.</text>

                {/* Building 5 */}
                <rect x="680" y="420" width="160" height="100" rx="12" fill="#281d1e" stroke="#574144" strokeWidth="2" />
                <text x="760" y="465" fill="#f3dddf" fontSize="15" fontWeight="bold" textAnchor="middle">Корпус 5</text>
                <text x="760" y="485" fill="#a58a8d" fontSize="11" textAnchor="middle">Южный · 14 эт.</text>

                {/* Barrier / Entrance road */}
                <rect x="460" y="560" width="80" height="70" rx="6" fill="#24191a" stroke="#8b1a3a" strokeWidth="1.5" />
                <line x1="450" y1="580" x2="550" y2="580" stroke="#ffb2bd" strokeWidth="4" strokeDasharray="8 6" />
                <text x="500" y="615" fill="#ddbfc2" fontSize="11" textAnchor="middle">Шлагбаум</text>
              </svg>

              {/* Interactive Point Pins */}
              {filteredPoints.map((pt) => {
                const isSelected = selectedPoint?.id === pt.id;
                let pinColor = 'bg-primary text-on-primary';
                let iconName = 'location_on';

                if (pt.category === 'eco') {
                  pinColor = 'bg-emerald-500 text-white';
                  iconName = 'eco';
                } else if (pt.category === 'master') {
                  pinColor = 'bg-purple-500 text-white';
                  iconName = 'content_cut';
                } else if (pt.category === 'event') {
                  pinColor = 'bg-amber-500 text-white';
                  iconName = 'event';
                } else if (pt.category === 'building') {
                  pinColor = pt.id === 'mp-2' ? 'bg-primary text-on-primary ring-4 ring-primary/30' : 'bg-surface-container-high text-on-surface';
                  iconName = 'apartment';
                }

                return (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPoint(pt)}
                    style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full p-2 transition-transform duration-200 cursor-pointer shadow-lg z-10 ${pinColor} ${
                      isSelected ? 'scale-125 ring-4 ring-white/50 z-30' : 'hover:scale-110'
                    }`}
                    title={pt.title}
                  >
                    <span className="material-symbols-outlined text-[18px]">{iconName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-2 text-xs text-on-surface-variant">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary" /> Корпуса
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Эко-пункты
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500" /> Мастера и студии
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500" /> События
              </span>
            </div>
            <span>Кликните на метку для подробностей</span>
          </div>
        </div>

        {/* Selected Point Detail Panel (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-low/70 backdrop-blur-2xl rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-outline-variant/15 flex flex-col gap-5">
          {selectedPoint ? (
            <>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                  {selectedPoint.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-on-surface">
                  {selectedPoint.title}
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/10 text-xs flex flex-col gap-2">
                <p className="text-on-surface leading-relaxed">
                  {selectedPoint.description}
                </p>
                {selectedPoint.details && (
                  <div className="pt-2 border-t border-outline-variant/10 text-primary font-semibold">
                    {selectedPoint.details}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                {selectedPoint.category === 'eco' && (
                  <button
                    onClick={() => onNavigateScreen('dvor')}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">recycling</span>
                    <span>Перейти в эко-раздел</span>
                  </button>
                )}

                {selectedPoint.category === 'master' && (
                  <button
                    onClick={() => onNavigateScreen('mastera')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">handyman</span>
                    <span>Записаться к мастеру</span>
                  </button>
                )}

                {selectedPoint.category === 'event' && (
                  <button
                    onClick={() => onNavigateScreen('dvor')}
                    className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">event</span>
                    <span>Участвовать в событии</span>
                  </button>
                )}

                <button
                  onClick={() => alert(`Маршрут к «${selectedPoint.title}» построен. Расстояние от корпуса 2: ~80 метров.`)}
                  className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">near_me</span>
                  <span>Показать путь от кв. 42</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-on-surface-variant text-xs">
              Выберите любой объект на плане ЖК, чтобы увидеть подробную информацию.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
