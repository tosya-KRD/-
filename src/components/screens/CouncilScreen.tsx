import React, { useState } from 'react';
import { CouncilVote, Contribution } from '../../types';

interface CouncilScreenProps {
  votes: CouncilVote[];
  contributions: Contribution[];
  totalCollected: number;
  targetAmount: number;
  onCastVote: (voteId: string, choice: 'for' | 'against') => void;
  onAddContribution: (name: string, amount: number) => void;
}

export const CouncilScreen: React.FC<CouncilScreenProps> = ({
  votes,
  contributions,
  totalCollected,
  targetAmount,
  onCastVote,
  onAddContribution
}) => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('1000');
  const [donorName, setDonorName] = useState<string>('Алексей С.');
  const [voteDetailModal, setVoteDetailModal] = useState<CouncilVote | null>(null);

  const percentCollected = Math.min(Math.round((totalCollected / targetAmount) * 100), 100);
  const circumference = 2 * Math.PI * 50; // r=50 => 314.16
  const strokeDashoffset = circumference - (percentCollected / 100) * circumference;

  const handleDonate = () => {
    const val = parseInt(customAmount, 10);
    if (!isNaN(val) && val > 0) {
      onAddContribution(donorName.trim() || 'Сосед', val);
      setShowDonateModal(false);
    }
  };

  const totalVotersCount = votes.reduce((acc, v) => acc + v.votesFor + v.votesAgainst, 0);

  return (
    <div className="flex flex-col w-full gap-8 pb-16">
      {/* Top Header / Intro Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-primary-container/40 text-on-primary-container text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-primary/20">
              Совет дома №14
            </span>
            <span className="text-on-surface-variant text-xs">• Активные инициативы и бюджет</span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">
            Управление и решения дома
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-surface bg-surface-container-high flex items-center justify-center text-on-surface text-xs font-semibold">
              ИП
            </div>
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-surface bg-primary text-on-primary flex items-center justify-center text-xs font-semibold">
              АС
            </div>
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-surface bg-tertiary-container text-on-tertiary-container flex items-center justify-center text-xs font-semibold">
              ДМ
            </div>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">
            42 соседа голосовали сегодня
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Votes (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">how_to_vote</span>
              Активные голосования
            </h2>
            <span className="text-xs text-on-surface-variant">
              Всего {totalVotersCount} проголосовавших
            </span>
          </div>

          {votes.map((vote) => {
            const total = vote.votesFor + vote.votesAgainst;
            const percentFor = total > 0 ? Math.round((vote.votesFor / total) * 100) : 0;
            const percentAgainst = total > 0 ? 100 - percentFor : 0;

            return (
              <div
                key={vote.id}
                className="p-6 rounded-2xl bg-surface-container/60 backdrop-blur-[36px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all hover:bg-surface-container/80 border border-outline-variant/10"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="text-xs text-on-primary-container px-2.5 py-0.5 rounded-full bg-primary-container/30 font-medium">
                      {vote.tag}
                    </span>
                    <h3 className="text-lg font-semibold text-on-surface mt-2">
                      {vote.title}
                    </h3>
                  </div>

                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                    vote.isClosed 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-surface-bright text-on-surface'
                  }`}>
                    {vote.statusText}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-primary">За: {percentFor}% ({vote.votesFor} голосов)</span>
                    <span className="text-on-surface-variant">Против: {percentAgainst}% ({vote.votesAgainst} голосов)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-surface-container-highest overflow-hidden flex">
                    <div
                      className="bg-gradient-to-r from-primary-container to-primary h-full transition-all duration-500"
                      style={{ width: `${percentFor}%` }}
                    />
                    <div
                      className="bg-surface-variant h-full transition-all duration-500"
                      style={{ width: `${percentAgainst}%` }}
                    />
                  </div>
                </div>

                {/* Vote actions */}
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
                  {vote.isClosed ? (
                    <>
                      <span className="text-xs text-on-surface-variant">
                        Статус: <strong className="text-primary">{vote.resolutionStatus || 'Решение принято'}</strong>
                      </span>
                      <button
                        onClick={() => setVoteDetailModal(vote)}
                        className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all text-xs font-medium cursor-pointer"
                      >
                        Подробнее
                      </button>
                    </>
                  ) : vote.userVote ? (
                    <>
                      <span className="text-xs text-on-surface-variant">
                        Ваш голос учтен: <strong className="text-on-surface">{vote.userVote === 'for' ? 'За' : 'Против'}</strong>
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onCastVote(vote.id, vote.userVote === 'for' ? 'against' : 'for')}
                          className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all text-xs font-medium cursor-pointer"
                        >
                          Изменить на {vote.userVote === 'for' ? '«Против»' : '«За»'}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-xs text-on-surface-variant">Вы еще не голосовали</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onCastVote(vote.id, 'for')}
                          className="px-4 py-2 rounded-xl bg-primary text-on-primary hover:brightness-110 transition-all text-xs font-bold cursor-pointer shadow-sm"
                        >
                          За
                        </button>
                        <button
                          onClick={() => onCastVote(vote.id, 'against')}
                          className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all text-xs font-semibold cursor-pointer"
                        >
                          Против
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Target Piggy Bank (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">savings</span>
              Целевая копилка
            </h2>
            <span className="text-xs text-on-surface-variant">Благоустройство двора</span>
          </div>

          {/* Main Piggy Bank Card with SVG chart */}
          <div className="p-8 rounded-2xl bg-surface-container/60 backdrop-blur-[36px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col items-center text-center border border-outline-variant/10">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <span className="text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
              Сбор на новый детский городок
            </span>

            {/* Circular SVG Chart */}
            <div className="relative w-48 h-48 my-4 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  className="text-surface-container-highest"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="12"
                />
                <circle
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="50"
                  stroke="url(#cherryGradient)"
                  strokeDasharray="314.16"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  strokeWidth="12"
                  className="transition-all duration-700 ease-out"
                />
                <defs>
                  <linearGradient id="cherryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffb2bd" />
                    <stop offset="100%" stopColor="#8b1a3a" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-on-surface">{percentCollected}%</span>
                <span className="text-xs text-on-surface-variant font-medium">Собрано</span>
              </div>
            </div>

            {/* Amounts */}
            <div className="flex flex-col items-center gap-1 mb-6">
              <span className="text-2xl font-bold text-primary">
                {totalCollected.toLocaleString('ru-RU')} ₽
              </span>
              <span className="text-xs text-on-surface-variant">
                из {targetAmount.toLocaleString('ru-RU')} ₽ целевых
              </span>
            </div>

            {/* Contribute Button */}
            <button
              onClick={() => setShowDonateModal(true)}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-container to-primary text-white font-semibold shadow-[0_0_20px_rgba(139,26,58,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
              <span>Внести вклад</span>
            </button>
          </div>

          {/* Contributions History */}
          <div className="p-6 rounded-2xl bg-surface-container/60 backdrop-blur-[36px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden border border-outline-variant/10">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-on-surface">История взносов</h3>
              <span className="text-xs text-primary font-medium">
                Всего {contributions.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {contributions.map((cb) => (
                <div
                  key={cb.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-all border border-outline-variant/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container/30 text-on-primary-container flex items-center justify-center font-bold text-xs border border-primary/20">
                      {cb.initials}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-on-surface block">{cb.name}</span>
                      <span className="text-[11px] text-on-surface-variant">{cb.timeAgo}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    +{cb.amount.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      {showDonateModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setShowDonateModal(false)}
        >
          <div 
            className="w-full max-w-md p-6 rounded-2xl bg-surface-container border border-white/10 shadow-2xl relative flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-on-surface">Поддержать копилку</h3>
              <button 
                onClick={() => setShowDonateModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Введите сумму добровольного взноса на благоустройство детской площадки двора. Все средства поступают на целевой счет совета дома.
            </p>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-on-surface-variant font-medium block mb-1">Ваше имя в истории взносов</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                  placeholder="Алексей С."
                />
              </div>

              <div>
                <label className="text-xs text-on-surface-variant font-medium block mb-1">Сумма (₽)</label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary font-bold text-primary"
                />
              </div>

              <div className="flex gap-2">
                {[500, 1000, 2000, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setCustomAmount(amt.toString())}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      customAmount === amt.toString() 
                        ? 'bg-primary-container text-on-primary-container' 
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    {amt} ₽
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowDonateModal(false)}
                className="flex-1 py-3 rounded-xl bg-surface-container-high text-on-surface font-semibold text-xs hover:bg-surface-container-highest transition-all"
              >
                Отмена
              </button>
              <button
                onClick={handleDonate}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-container to-primary text-white font-bold text-xs hover:brightness-110 transition-all shadow-[0_0_15px_rgba(139,26,58,0.4)]"
              >
                Внести {customAmount} ₽
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vote Resolution Detail Modal */}
      {voteDetailModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setVoteDetailModal(null)}
        >
          <div 
            className="w-full max-w-lg p-6 rounded-2xl bg-surface-container border border-white/10 shadow-2xl relative flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-on-surface">{voteDetailModal.title}</h3>
              <button 
                onClick={() => setVoteDetailModal(null)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low/80 border border-outline-variant/15 text-xs flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Решение:</span>
                <span className="font-semibold text-emerald-400">Принято большинством 91%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Текущий этап:</span>
                <span className="font-semibold text-primary">{voteDetailModal.resolutionStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Подрядчик:</span>
                <span className="text-on-surface">ООО «МосЛифтСервис»</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Плановый срок запуска:</span>
                <span className="text-on-surface">До конца текущего месяца</span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Закуплены тяговые тросы и новый частотный преобразователь привода дверей. Работы ведутся согласно смете №12/4.
            </p>

            <button
              onClick={() => setVoteDetailModal(null)}
              className="py-3 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest"
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
