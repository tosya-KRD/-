import React from 'react';
import { PollData } from '../../types';

interface PollViewProps {
  poll: PollData;
  postId: string;
  onVote: (postId: string, optionId: string) => void;
  onRetractVote: (postId: string) => void;
}

export const PollView: React.FC<PollViewProps> = ({
  poll,
  postId,
  onVote,
  onRetractVote
}) => {
  const hasVoted = Boolean(poll.userVotedOptionId);
  const total = poll.totalVotes;

  return (
    <div className="mt-3 p-4 rounded-xl bg-surface-container/70 border border-outline-variant/20 backdrop-blur-md flex flex-col gap-3">
      {/* Poll Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">
            ballot
          </span>
          <h4 className="font-semibold text-sm text-on-surface">
            {poll.question}
          </h4>
        </div>
        <span className="text-[11px] text-on-surface-variant whitespace-nowrap font-medium">
          {total} {total === 1 ? 'голос' : total >= 2 && total <= 4 ? 'голоса' : 'голосов'}
        </span>
      </div>

      {/* Options List */}
      <div className="flex flex-col gap-2">
        {poll.options.map((option) => {
          const isSelected = poll.userVotedOptionId === option.id;
          const percentage = total > 0 ? Math.round((option.votes / total) * 100) : 0;

          if (hasVoted) {
            // Results Mode (already voted)
            return (
              <div
                key={option.id}
                className={`relative overflow-hidden p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-primary/50 bg-primary-container/20'
                    : 'border-outline-variant/15 bg-surface-container-low/60'
                }`}
              >
                {/* Progress fill bar */}
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-700 ease-out ${
                    isSelected
                      ? 'bg-gradient-to-r from-primary-container/60 to-primary/40'
                      : 'bg-surface-container-high/60'
                  }`}
                  style={{ width: `${percentage}%` }}
                />

                <div className="relative z-10 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                      </span>
                    )}
                    <span className={`font-medium truncate ${isSelected ? 'text-on-surface font-semibold' : 'text-on-surface/90'}`}>
                      {option.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-on-surface-variant text-[11px]">
                      {option.votes}
                    </span>
                    <span className={`font-bold tabular-nums ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Voting Mode (not voted yet)
          return (
            <button
              key={option.id}
              onClick={() => onVote(postId, option.id)}
              className="w-full text-left p-3 rounded-xl border border-outline-variant/20 bg-surface-container-low/70 hover:bg-primary-container/25 hover:border-primary/40 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-4 h-4 rounded-full border-2 border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center shrink-0" />
                <span className="text-xs font-medium text-on-surface group-hover:text-primary transition-colors truncate">
                  {option.text}
                </span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary transition-colors shrink-0">
                chevron_right
              </span>
            </button>
          );
        })}
      </div>

      {/* Poll Footer with Retract Vote */}
      <div className="flex items-center justify-between pt-1 text-[11px] text-on-surface-variant">
        <span>Анонимный опрос жильцов</span>
        {hasVoted && (
          <button
            onClick={() => onRetractVote(postId)}
            className="text-primary hover:underline font-medium cursor-pointer"
          >
            Изменить голос
          </button>
        )}
      </div>
    </div>
  );
};
