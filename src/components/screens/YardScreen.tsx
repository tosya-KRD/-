import React, { useState, useRef } from 'react';
import { EcoMetric, YardEvent } from '../../types';
import { YardCalendarView } from '../yard/YardCalendarView';

interface YardScreenProps {
  ecoMetrics: EcoMetric[];
  events: YardEvent[];
  onToggleParticipate: (eventId: string) => void;
  onOpenCreateEventModal: () => void;
  onAddEcoDeposit: (metricId: string, amount: number) => void;
}

export const YardScreen: React.FC<YardScreenProps> = ({
  ecoMetrics,
  events,
  onToggleParticipate,
  onOpenCreateEventModal,
  onAddEcoDeposit
}) => {
  const [filterType, setFilterType] = useState<'all' | 'ecology' | 'leisure'>('all');
  const [activeDepositMetric, setActiveDepositMetric] = useState<EcoMetric | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>('5');
  const calendarSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToCalendar = () => {
    calendarSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDepositSubmit = () => {
    if (!activeDepositMetric) return;
    const val = parseFloat(depositAmount);
    if (!isNaN(val) && val > 0) {
      onAddEcoDeposit(activeDepositMetric.id, val);
    }
    setActiveDepositMetric(null);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Header / Intro Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-wider text-primary font-semibold">
              Сообщество и природа
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs text-on-surface-variant">Корпус 2, Двор А</span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">
            Двор · События и экология
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleScrollToCalendar}
            className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-all flex items-center gap-2 border border-outline-variant/15 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Календарь двора</span>
          </button>

          <button
            onClick={onOpenCreateEventModal}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,178,189,0.2)] flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Предложить событие</span>
          </button>
        </div>
      </div>

      {/* Eco Metrics Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">eco</span>
            Эко-метрики дома
          </h2>
          <span className="text-xs text-on-surface-variant">Обновлено сегодня, 09:42</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecoMetrics.map((metric) => (
            <div
              key={metric.id}
              className="relative bg-surface-container/60 backdrop-blur-[36px] p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden group border border-outline-variant/10 hover:border-primary/20 transition-all"
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-container/40 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">{metric.icon}</span>
                </div>
                <span className="text-[11px] text-primary font-medium px-2 py-0.5 rounded-full bg-primary/10">
                  Цель: {metric.goal} {metric.unit}
                </span>
              </div>

              <div className="flex flex-col gap-1 mb-3">
                <span className="text-xs text-on-surface-variant">{metric.name}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-on-surface">
                    {metric.current} {metric.unit}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">
                    {metric.percent}%
                  </span>
                </div>
              </div>

              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-gradient-to-r from-primary-container to-primary h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(metric.percent, 100)}%` }}
                />
              </div>

              <button
                onClick={() => setActiveDepositMetric(metric)}
                className="w-full py-1.5 rounded-lg bg-surface-container-high/60 hover:bg-primary-container/30 text-on-surface hover:text-primary text-[11px] font-medium transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                <span>Внести вклад (+{metric.unit})</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Events & Calendar Section */}
      <div ref={calendarSectionRef} className="flex flex-col gap-6 scroll-mt-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">calendar_month</span>
            <h2 className="text-xl font-bold text-on-surface">
              Календарь и график мероприятий двора
            </h2>
          </div>
          <button
            onClick={onOpenCreateEventModal}
            className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Предложить событие</span>
          </button>
        </div>

        {/* The Full Interactive Calendar & Schedule Component */}
        <YardCalendarView
          events={events}
          filterType={filterType}
          onFilterChange={setFilterType}
          onToggleParticipate={onToggleParticipate}
          onOpenCreateEventModal={onOpenCreateEventModal}
        />
      </div>

      {/* Deposit Modal */}
      {activeDepositMetric && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setActiveDepositMetric(null)}
        >
          <div 
            className="w-full max-w-sm p-6 rounded-2xl bg-surface-container border border-white/10 shadow-2xl relative flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-on-surface">
                Сдать: {activeDepositMetric.name}
              </h3>
              <button 
                onClick={() => setActiveDepositMetric(null)}
                className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Укажите объем вторсырья, сданного в эко-пункт у корпуса 2:
            </p>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="flex-1 bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              />
              <span className="text-sm font-semibold text-primary">{activeDepositMetric.unit}</span>
            </div>

            <div className="flex gap-2">
              {[2, 5, 10, 20].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDepositAmount(num.toString())}
                  className="flex-1 py-1 rounded-lg bg-surface-container-high text-xs font-medium text-on-surface hover:bg-surface-container-highest cursor-pointer"
                >
                  +{num}
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveDepositMetric(null)}
                className="flex-1 py-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-medium hover:bg-surface-container-highest cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleDepositSubmit}
                className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:brightness-110 cursor-pointer shadow-md"
              >
                Зачесть в эко-копилку
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
