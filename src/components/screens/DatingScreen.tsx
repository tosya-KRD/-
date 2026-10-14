import React, { useState } from 'react';
import { Neighbor, InterestClub } from '../../types';

interface DatingScreenProps {
  neighbors: Neighbor[];
  clubs: InterestClub[];
  onOpenDirectChat: (name: string) => void;
  onToggleJoinClub: (clubId: string) => void;
  globalSearchQuery?: string;
}

export const DatingScreen: React.FC<DatingScreenProps> = ({
  neighbors,
  clubs,
  onOpenDirectChat,
  onToggleJoinClub,
  globalSearchQuery = ''
}) => {
  const [searchRadius, setSearchRadius] = useState<string>('Дом и двор');
  const [selectedClubModal, setSelectedClubModal] = useState<InterestClub | null>(null);
  const [showAllClubsModal, setShowAllClubsModal] = useState<boolean>(false);

  const effectiveSearch = globalSearchQuery.toLowerCase().trim();

  const filteredNeighbors = neighbors.filter(n => {
    if (!effectiveSearch) return true;
    return n.name.toLowerCase().includes(effectiveSearch) ||
           n.location.toLowerCase().includes(effectiveSearch) ||
           n.tags.some(t => t.toLowerCase().includes(effectiveSearch));
  });

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Top Section / Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
              СоседиДел · Знакомства
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
            Знакомства · 15 соседей рядом
          </h1>
        </div>

        {/* Radius Selector */}
        <div className="flex items-center gap-3 bg-surface-container-low/80 border border-outline-variant/15 px-4 py-2 rounded-xl backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-primary text-[20px]">radar</span>
          <div className="text-xs text-on-surface-variant flex items-center gap-1.5">
            <span>Радиус поиска:</span>
            <select
              value={searchRadius}
              onChange={(e) => setSearchRadius(e.target.value)}
              className="bg-transparent text-on-surface font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Дом и двор" className="bg-surface-container text-on-surface">Дом и двор</option>
              <option value="Только подъезд" className="bg-surface-container text-on-surface">Только подъезд</option>
              <option value="Весь ЖК (5 корпусов)" className="bg-surface-container text-on-surface">Весь ЖК (5 корпусов)</option>
              <option value="Район (1 км)" className="bg-surface-container text-on-surface">Район (1 км)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3x5 Grid of Neighbors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredNeighbors.map((neighbor) => (
          <div
            key={neighbor.id}
            className="bg-surface-container/60 backdrop-blur-2xl rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col justify-between relative group hover:translate-y-[-2px] transition-all duration-300 border border-outline-variant/10 hover:border-primary/20"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-container/40 flex items-center justify-center text-3xl shadow-inner border border-outline-variant/20 shrink-0">
                  {neighbor.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">
                    {neighbor.name}, {neighbor.age}
                  </h3>
                  <span className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                    {neighbor.location}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {neighbor.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      idx === 0 
                        ? 'bg-primary-container/25 text-on-primary-container border border-primary/20' 
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpenDirectChat(neighbor.name)}
                className="bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary py-2 px-3 rounded-xl text-xs font-semibold transition-all shadow-md text-center cursor-pointer"
              >
                Написать
              </button>

              <button
                onClick={() => {
                  alert(`Клубы соседа ${neighbor.name}: ${neighbor.tags.join(', ')}. Вы можете присоединиться к ним в секции ниже!`);
                }}
                className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-2 px-3 rounded-xl text-xs font-semibold transition-all backdrop-blur-md border border-outline-variant/10 text-center cursor-pointer"
              >
                В клубы
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section: Clubs by Interest */}
      <div className="bg-surface-container-low/80 backdrop-blur-2xl rounded-3xl p-6 lg:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.5)] relative overflow-hidden border border-outline-variant/10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-on-surface">Клубы по интересам</h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Присоединяйтесь к комьюнити соседей по увлечениям
            </p>
          </div>
          <button 
            onClick={() => setShowAllClubsModal(true)}
            className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-xl text-xs font-semibold transition-all border border-outline-variant/10 cursor-pointer"
          >
            Все клубы (12)
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {clubs.map((club) => (
            <div
              key={club.id}
              onClick={() => onToggleJoinClub(club.id)}
              className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all group border cursor-pointer ${
                club.isJoined 
                  ? 'bg-primary-container/30 border-primary/40 shadow-[0_0_15px_rgba(139,26,58,0.2)]' 
                  : 'bg-surface-container/60 hover:bg-surface-container-high border-outline-variant/10'
              }`}
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {club.emoji}
              </span>
              <span className="text-xs font-semibold text-on-surface">
                {club.name}
              </span>
              <span className="text-[11px] text-on-surface-variant mt-1">
                {club.membersCount} участников
              </span>
              <span className={`mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                club.isJoined 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-surface-container-high text-on-surface-variant group-hover:text-on-surface'
              }`}>
                {club.isJoined ? 'Вы в клубе ✓' : '+ Вступить'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* All Clubs Modal */}
      {showAllClubsModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setShowAllClubsModal(false)}
        >
          <div 
            className="w-full max-w-xl p-6 rounded-2xl bg-surface-container border border-white/10 shadow-2xl relative flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/15">
              <h3 className="text-xl font-bold text-on-surface">Все клубы по интересам ЖК</h3>
              <button 
                onClick={() => setShowAllClubsModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'Бег', emoji: '🏃', members: 12 },
                { name: 'Выгул собак', emoji: '🐕', members: 24 },
                { name: 'Настолки', emoji: '🎲', members: 18 },
                { name: 'Книжный', emoji: '📚', members: 9 },
                { name: 'Йога', emoji: '🧘', members: 15 },
                { name: 'Велосипед', emoji: '🚴', members: 21 },
                { name: 'Шахматы', emoji: '♟️', members: 14 },
                { name: 'Кулинария', emoji: '🍳', members: 19 },
                { name: 'Родители ЖК', emoji: '👶', members: 32 },
                { name: 'Фотографы', emoji: '📸', members: 8 },
                { name: 'Гитара & Музыка', emoji: '🎸', members: 11 },
                { name: 'Рыбалка', emoji: '🎣', members: 7 },
              ].map((c, i) => (
                <div key={i} className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/15 flex flex-col items-center text-center">
                  <span className="text-2xl mb-1">{c.emoji}</span>
                  <span className="text-xs font-semibold text-on-surface">{c.name}</span>
                  <span className="text-[10px] text-on-surface-variant">{c.members} чел.</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAllClubsModal(false)}
              className="py-3 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
