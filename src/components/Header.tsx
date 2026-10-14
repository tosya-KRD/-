import React, { useState } from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggleMobileNav: () => void;
  onSelectScreen: (screen: ScreenType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onToggleMobileNav,
  onSelectScreen
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Тихий час подтвержден',
      desc: 'Мастера в корпусе 2 приостановили шумные работы до 15:00.',
      time: '10 мин назад',
      unread: true,
      screen: 'dom' as ScreenType
    },
    {
      id: 'notif-2',
      title: 'Новый голос в совете дома',
      desc: '82% жильцов проголосовали за видеонаблюдение.',
      time: '1 час назад',
      unread: true,
      screen: 'sovet-doma' as ScreenType
    },
    {
      id: 'notif-3',
      title: 'Субботник во дворе',
      desc: 'Напоминание: встречаемся сегодня в 19:00 у 2 подъезда 🌱',
      time: '3 часа назад',
      unread: false,
      screen: 'dvor' as ScreenType
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="fixed top-0 left-0 lg:left-[240px] right-0 h-16 bg-surface/80 backdrop-blur-xl z-40 flex items-center justify-between px-4 lg:px-8 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/10">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleMobileNav}
          className="lg:hidden w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all"
          aria-label="Открыть меню"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        {/* Global Search */}
        <div className="relative flex items-center w-64 sm:w-80 md:w-96">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-surface-container-low/70 border border-outline-variant/30 rounded-xl pl-9 pr-8 py-2 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Поиск по дому и району..."
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 text-on-surface-variant hover:text-on-surface p-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Address tag on desktop */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low/60 border border-outline-variant/20 text-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-primary text-[16px]">location_on</span>
          <span>ЖК Северный парк · Корпус 2</span>
        </div>

        {/* Notifications Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all relative"
            aria-label="Уведомления"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface animate-pulse" />
            )}
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowNotifications(false)} 
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-surface-container/95 backdrop-blur-2xl border border-outline-variant/20 shadow-[0_16px_48px_rgba(0,0,0,0.6)] z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/15 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-on-surface text-sm">Уведомления</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-semibold">
                        +{unreadCount}
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllRead}
                      className="text-xs text-primary hover:underline"
                    >
                      Прочитать все
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        onSelectScreen(n.screen);
                        setShowNotifications(false);
                      }}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${
                        n.unread 
                          ? 'bg-primary-container/20 border border-primary-container/30 hover:bg-primary-container/30' 
                          : 'bg-surface-container-low/50 hover:bg-surface-container-high/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-on-surface">{n.title}</span>
                        <span className="text-[10px] text-on-surface-variant whitespace-nowrap">{n.time}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
