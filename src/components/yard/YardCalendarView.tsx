import React, { useState, useMemo } from 'react';
import { YardEvent } from '../../types';

interface YardCalendarViewProps {
  events: YardEvent[];
  filterType: 'all' | 'ecology' | 'leisure';
  onFilterChange: (type: 'all' | 'ecology' | 'leisure') => void;
  onToggleParticipate: (eventId: string) => void;
  onOpenCreateEventModal: () => void;
}

export type CalendarDisplayMode = 'grid' | 'list' | 'cards';

const MONTH_NAMES_RU = [
  { key: 'июн', name: 'Июнь 2026', monthIndex: 5, daysInMonth: 30, startDayOfWeek: 0 }, // 1 June 2026 is Monday (index 0)
  { key: 'июл', name: 'Июль 2026', monthIndex: 6, daysInMonth: 31, startDayOfWeek: 2 }, // 1 July 2026 is Wednesday (index 2)
  { key: 'авг', name: 'Август 2026', monthIndex: 7, daysInMonth: 31, startDayOfWeek: 5 }, // 1 August 2026 is Saturday (index 5)
];

const WEEKDAY_NAMES_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const YardCalendarView: React.FC<YardCalendarViewProps> = ({
  events,
  filterType,
  onFilterChange,
  onToggleParticipate,
  onOpenCreateEventModal
}) => {
  const [displayMode, setDisplayMode] = useState<CalendarDisplayMode>('grid');
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(0); // 0 = June 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(15);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const activeMonth = MONTH_NAMES_RU[currentMonthIdx];

  // Filter events by category
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (filterType === 'all') return true;
      return e.categoryType === filterType;
    });
  }, [events, filterType]);

  // Helper to normalize month string from event
  const isEventInMonth = (ev: YardEvent, monthKey: string) => {
    const evMonth = ev.month.toLowerCase().trim();
    if (monthKey === 'июн' && (evMonth.includes('июн') || evMonth === '06' || evMonth === '6')) return true;
    if (monthKey === 'июл' && (evMonth.includes('июл') || evMonth === '07' || evMonth === '7')) return true;
    if (monthKey === 'авг' && (evMonth.includes('авг') || evMonth === '08' || evMonth === '8')) return true;
    return evMonth.includes(monthKey);
  };

  // Events belonging to current active month
  const monthEvents = useMemo(() => {
    return filteredEvents.filter(ev => isEventInMonth(ev, activeMonth.key));
  }, [filteredEvents, activeMonth.key]);

  // Map events by day number (1..31)
  const eventsByDay = useMemo(() => {
    const map: { [day: number]: YardEvent[] } = {};
    monthEvents.forEach(ev => {
      const dayNum = parseInt(ev.day, 10);
      if (!isNaN(dayNum)) {
        if (!map[dayNum]) map[dayNum] = [];
        map[dayNum].push(ev);
      }
    });
    return map;
  }, [monthEvents]);

  // Events for selected day
  const selectedDayEvents = useMemo(() => {
    if (selectedDay === null) return [];
    return eventsByDay[selectedDay] || [];
  }, [eventsByDay, selectedDay]);

  // Chronologically sorted events for list view
  const chronologicalList = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      const getMonthWeight = (m: string) => {
        const lower = m.toLowerCase();
        if (lower.includes('июн')) return 600;
        if (lower.includes('июл')) return 700;
        if (lower.includes('авг')) return 800;
        return 900;
      };
      const weightA = getMonthWeight(a.month) + parseInt(a.day, 10);
      const weightB = getMonthWeight(b.month) + parseInt(b.day, 10);
      return weightA - weightB;
    });
  }, [filteredEvents]);

  const handlePrevMonth = () => {
    if (currentMonthIdx > 0) {
      setCurrentMonthIdx(prev => prev - 1);
      setSelectedDay(null);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIdx < MONTH_NAMES_RU.length - 1) {
      setCurrentMonthIdx(prev => prev + 1);
      setSelectedDay(null);
    }
  };

  const myEventsCount = events.filter(e => e.isParticipating).length;

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="bg-primary-container text-on-primary-container px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between text-xs font-medium animate-in fade-in slide-in-from-top-2 border border-primary/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">event_available</span>
            <span>{notificationMsg}</span>
          </div>
          <button onClick={() => setNotificationMsg(null)} className="p-1 hover:opacity-80">
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </div>
      )}

      {/* Control Bar: Mode Switcher & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container/70 backdrop-blur-xl border border-outline-variant/15 shadow-md">
        {/* Left: View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container-high/80 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setDisplayMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              displayMode === 'grid'
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">calendar_view_month</span>
            <span>Сетка месяца</span>
          </button>

          <button
            type="button"
            onClick={() => setDisplayMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              displayMode === 'list'
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
            <span>Список по датам</span>
          </button>

          <button
            type="button"
            onClick={() => setDisplayMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              displayMode === 'cards'
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span>Карточки ({filteredEvents.length})</span>
          </button>
        </div>

        {/* Right: Category Filter Chips & Quick Add */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer shrink-0 ${
              filterType === 'all'
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Все ({events.length})
          </button>
          <button
            onClick={() => onFilterChange('ecology')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
              filterType === 'ecology'
                ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Экология</span>
          </button>
          <button
            onClick={() => onFilterChange('leisure')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
              filterType === 'leisure'
                ? 'bg-primary-container text-on-primary-container ring-1 ring-primary/40'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Досуг и спорт</span>
          </button>

          {myEventsCount > 0 && (
            <span className="px-2.5 py-1 rounded-xl bg-primary/10 text-primary text-[11px] font-bold shrink-0">
              Я иду: {myEventsCount}
            </span>
          )}
        </div>
      </div>

      {/* MODE 1: CALENDAR GRID (СЕТКА МЕСЯЦА) */}
      {displayMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left: The Month Grid (2 cols on desktop) */}
          <div className="lg:col-span-2 bg-surface-container/60 backdrop-blur-2xl p-6 rounded-2xl border border-outline-variant/15 shadow-xl flex flex-col gap-5">
            {/* Month Header Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/40 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface">
                    {activeMonth.name}
                  </h3>
                  <span className="text-xs text-on-surface-variant">
                    {monthEvents.length} {monthEvents.length === 1 ? 'событие' : monthEvents.length < 5 ? 'события' : 'событий'} в этом месяце
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={currentMonthIdx === 0}
                  className="w-9 h-9 rounded-xl bg-surface-container-high hover:bg-surface-container-highest disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-on-surface transition-all cursor-pointer"
                  title="Предыдущий месяц"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentMonthIdx(0)}
                  className="px-2.5 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-[11px] font-medium text-on-surface-variant hover:text-on-surface transition-all cursor-pointer"
                >
                  Июнь
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  disabled={currentMonthIdx === MONTH_NAMES_RU.length - 1}
                  className="w-9 h-9 rounded-xl bg-surface-container-high hover:bg-surface-container-highest disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-on-surface transition-all cursor-pointer"
                  title="Следующий месяц"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Weekdays Row */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/10 pb-2">
              {WEEKDAY_NAMES_RU.map((wd, i) => (
                <div key={wd} className={i >= 5 ? 'text-primary' : ''}>
                  {wd}
                </div>
              ))}
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-2">
              {/* Blank offset cells before 1st of month */}
              {Array.from({ length: activeMonth.startDayOfWeek }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="h-20 sm:h-24 rounded-xl bg-surface-container-low/20 border border-transparent opacity-25 p-1"
                />
              ))}

              {/* Day cells for active month */}
              {Array.from({ length: activeMonth.daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dayEvents = eventsByDay[dayNum] || [];
                const hasEvents = dayEvents.length > 0;
                const isSelected = selectedDay === dayNum;
                const isToday = currentMonthIdx === 0 && dayNum === 14; // Demo today is June 14

                return (
                  <div
                    key={`day-${dayNum}`}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`h-20 sm:h-24 rounded-xl p-1.5 flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden border ${
                      isSelected
                        ? 'bg-primary-container/30 border-primary ring-2 ring-primary/40 shadow-lg'
                        : hasEvents
                          ? 'bg-surface-container-high/70 border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-high'
                          : 'bg-surface-container-low/40 border-outline-variant/10 hover:bg-surface-container-high/40'
                    }`}
                  >
                    {/* Top Day Number Row */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold rounded-md w-6 h-6 flex items-center justify-center ${
                          isToday
                            ? 'bg-primary text-white font-black'
                            : isSelected
                              ? 'text-primary'
                              : 'text-on-surface'
                        }`}
                      >
                        {dayNum}
                      </span>

                      {/* Event Count Pill */}
                      {hasEvents && (
                        <span className="px-1.5 py-0.2 rounded-full bg-primary/20 text-primary text-[9px] font-extrabold">
                          {dayEvents.length}
                        </span>
                      )}
                    </div>

                    {/* Event indicators / titles inside cell */}
                    {hasEvents ? (
                      <div className="flex flex-col gap-1 overflow-hidden mt-1">
                        {dayEvents.slice(0, 2).map(ev => (
                          <div
                            key={ev.id}
                            className={`text-[9px] sm:text-[10px] truncate px-1 py-0.5 rounded font-medium flex items-center gap-1 ${
                              ev.categoryType === 'ecology'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-primary-container/50 text-on-primary-container'
                            }`}
                            title={ev.title}
                          >
                            <span 
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                ev.categoryType === 'ecology' ? 'bg-emerald-400' : 'bg-primary'
                              }`} 
                            />
                            <span className="truncate">{ev.title}</span>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-[8px] text-on-surface-variant font-medium">
                            +{dayEvents.length - 2} еще
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="text-[10px] text-transparent select-none">.</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-outline-variant/15 text-[11px] text-on-surface-variant">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Экология и субботники</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span>Досуг, праздники, спорт</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenCreateEventModal}
                className="text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                <span>Добавить событие в график</span>
              </button>
            </div>
          </div>

          {/* Right: Selected Day Events Sidebar */}
          <div className="bg-surface-container/60 backdrop-blur-2xl p-6 rounded-2xl border border-outline-variant/15 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/15">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                  Программа на выбранную дату
                </span>
                <h4 className="text-lg font-bold text-on-surface">
                  {selectedDay ? `${selectedDay} ${activeMonth.name.split(' ')[0]}` : 'Выберите день на сетке'}
                </h4>
              </div>
              {selectedDayEvents.length > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold">
                  {selectedDayEvents.length} {selectedDayEvents.length === 1 ? 'событие' : 'события'}
                </span>
              )}
            </div>

            {selectedDayEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center gap-3 bg-surface-container-low/40 rounded-xl border border-dashed border-outline-variant/20">
                <span className="material-symbols-outlined text-primary/60 text-[36px]">event_busy</span>
                <p className="text-xs text-on-surface-variant">
                  На этот день пока нет запланированных мероприятий.
                </p>
                <button
                  type="button"
                  onClick={onOpenCreateEventModal}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:brightness-110 transition-all cursor-pointer shadow-sm"
                >
                  Предложить событие на эту дату
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-[550px] overflow-y-auto pr-1">
                {selectedDayEvents.map(ev => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/15 flex flex-col gap-3 hover:border-primary/30 transition-all"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ev.categoryType === 'ecology'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-primary/20 text-primary'
                      }`}>
                        {ev.category}
                      </span>
                      <span className="text-xs font-bold text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {ev.time}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-on-surface leading-snug">
                      {ev.title}
                    </h5>

                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {ev.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10 text-xs">
                      <span className="flex items-center gap-1 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">group</span>
                        <span>{ev.participants} участников</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          onToggleParticipate(ev.id);
                          showNotification(
                            ev.isParticipating 
                              ? `Вы отменили участие в «${ev.title}»` 
                              : `Вы записались на «${ev.title}»!`
                          );
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          ev.isParticipating
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-highest border border-outline-variant/20'
                        }`}
                      >
                        {ev.isParticipating ? 'Иду ✓' : 'Участвовать'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: CHRONOLOGICAL LIST (СПИСОК ПО ДАТАМ) */}
      {displayMode === 'list' && (
        <div className="flex flex-col gap-4 bg-surface-container/60 backdrop-blur-2xl p-6 rounded-2xl border border-outline-variant/15 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/15">
            <div>
              <h3 className="text-xl font-bold text-on-surface">
                График мероприятий двора
              </h3>
              <p className="text-xs text-on-surface-variant">
                Хронологический список всех встреч, субботников, турниров и детских праздников
              </p>
            </div>
            <button
              onClick={onOpenCreateEventModal}
              className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Предложить событие</span>
            </button>
          </div>

          <div className="flex flex-col divide-y divide-outline-variant/10">
            {chronologicalList.map((ev, index) => (
              <div 
                key={ev.id} 
                className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-container-high/30 px-3 rounded-xl transition-all"
              >
                {/* Left Date Block & Title */}
                <div className="flex items-start gap-4">
                  {/* Date badge */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-container to-secondary-container flex flex-col items-center justify-center text-on-primary-container shadow-md shrink-0 border border-primary/20">
                    <span className="text-xl font-bold leading-none">{ev.day}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider mt-1">{ev.month}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ev.categoryType === 'ecology'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-primary/20 text-primary'
                      }`}>
                        {ev.category}
                      </span>
                      <span className="text-xs text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {ev.time}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-on-surface">
                      {ev.title}
                    </h4>

                    <p className="text-xs text-on-surface-variant max-w-xl leading-relaxed">
                      {ev.description}
                    </p>
                  </div>
                </div>

                {/* Right Actions & Participants */}
                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-[18px]">group</span>
                    <span>{ev.participants} участников</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onToggleParticipate(ev.id);
                      showNotification(
                        ev.isParticipating 
                          ? `Вы отменили участие в «${ev.title}»` 
                          : `Вы записались на «${ev.title}»!`
                      );
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      ev.isParticipating
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/15'
                    }`}
                  >
                    {ev.isParticipating ? 'Иду на событие ✓' : 'Участвовать'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 3: CARDS GRID (КАРТОЧКИ МЕРОПРИЯТИЙ) */}
      {displayMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chronologicalList.map((ev) => (
            <div
              key={ev.id}
              className="relative bg-surface-container/60 backdrop-blur-[36px] p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:bg-surface-container/80 transition-all border border-outline-variant/10"
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-container to-secondary-container flex flex-col items-center justify-center text-on-primary-container shadow-md shrink-0 border border-primary/20">
                    <span className="text-xl font-bold leading-none">{ev.day}</span>
                    <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">{ev.month}</span>
                  </div>
                  <div>
                    <span className="text-xs text-primary font-medium block">
                      {ev.time} · {ev.category}
                    </span>
                    <h3 className="text-base font-semibold text-on-surface mt-0.5 leading-snug">
                      {ev.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                  {ev.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-[16px]">group</span>
                  <span>{ev.participants} участников</span>
                </div>

                <button
                  onClick={() => {
                    onToggleParticipate(ev.id);
                    showNotification(
                      ev.isParticipating 
                        ? `Вы отменили участие в «${ev.title}»` 
                        : `Вы записались на «${ev.title}»!`
                    );
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    ev.isParticipating
                      ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(255,178,189,0.3)]'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  {ev.isParticipating ? 'Иду на событие ✓' : 'Участвовать'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
