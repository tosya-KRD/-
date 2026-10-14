import React from 'react';
import { ScreenType } from '../types';

interface SidebarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  unreadChatsCount?: number;
  newAdsCount?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onSelectScreen,
  unreadChatsCount = 1,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const navItems: Array<{ id: ScreenType; label: string; icon: string; badge?: number }> = [
    { id: 'dom', label: 'Дом', icon: 'home' },
    { id: 'obyavleniya', label: 'Объявления', icon: 'campaign' },
    { id: 'dvor', label: 'Двор', icon: 'park' },
    { id: 'sovet-doma', label: 'Совет дома', icon: 'groups' },
    { id: 'mastera', label: 'Мастера', icon: 'handyman' },
    { id: 'znakomstva', label: 'Знакомства', icon: 'favorite' },
    { id: 'chaty', label: 'Чаты', icon: 'chat', badge: unreadChatsCount },
    { id: 'karta', label: 'Карта', icon: 'map' },
    { id: 'profil', label: 'Профиль', icon: 'person' },
  ];

  const handleNavClick = (screen: ScreenType) => {
    onSelectScreen(screen);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-full w-[240px] bg-surface-container-low/90 backdrop-blur-2xl z-50 flex flex-col justify-between py-6 px-4 border-r border-outline-variant/10 transition-transform duration-300
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex items-center justify-between px-2">
            <button 
              onClick={() => handleNavClick('dom')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center text-primary shadow-[0_0_15px_rgba(139,26,58,0.5)] border border-primary/30 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[18px]">apartment</span>
              </div>
              <span className="font-semibold text-lg text-on-surface tracking-tight group-hover:text-primary transition-colors">
                СоседиДел
              </span>
            </button>

            {onCloseMobile && (
              <button 
                onClick={onCloseMobile}
                className="lg:hidden p-1 text-on-surface-variant hover:text-on-surface rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-body-sm transition-all text-left
                    ${isActive 
                      ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(139,26,58,0.4)] font-semibold' 
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Mini Profile in Sidebar */}
        <button 
          onClick={() => handleNavClick('profil')}
          className="pt-4 border-t border-outline-variant/20 flex items-center gap-3 px-2 text-left hover:bg-surface-container/50 rounded-xl p-1.5 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-body-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors">
              Алексей С.
            </span>
            <span className="text-[11px] text-on-surface-variant truncate">
              Центральный район
            </span>
          </div>
        </button>
      </aside>
    </>
  );
};
