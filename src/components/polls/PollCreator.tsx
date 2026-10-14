import React from 'react';

interface PollCreatorProps {
  question: string;
  onQuestionChange: (q: string) => void;
  options: string[];
  onOptionsChange: (opts: string[]) => void;
  onCancel: () => void;
}

export const PollCreator: React.FC<PollCreatorProps> = ({
  question,
  onQuestionChange,
  options,
  onOptionsChange,
  onCancel
}) => {
  const handleOptionChange = (index: number, val: string) => {
    const updated = [...options];
    updated[index] = val;
    onOptionsChange(updated);
  };

  const handleAddOption = () => {
    if (options.length < 6) {
      onOptionsChange([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const updated = options.filter((_, i) => i !== index);
      onOptionsChange(updated);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-surface-container/90 border border-primary/30 backdrop-blur-md flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">
            ballot
          </span>
          <span className="text-xs font-bold text-on-surface uppercase tracking-wide">
            Создание опроса для соседей
          </span>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg transition-colors cursor-pointer"
          title="Отменить опрос"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      {/* Question Input */}
      <div>
        <label className="text-[11px] text-on-surface-variant font-medium block mb-1">
          Вопрос опроса:
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          placeholder="Например: Удобно ли перенести вывоз крупного мусора на четверг?"
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-all"
        />
      </div>

      {/* Options Inputs */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] text-on-surface-variant font-medium block">
          Варианты ответов (от 2 до 6):
        </label>
        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-5 text-center text-[11px] text-on-surface-variant font-medium">
              {idx + 1}.
            </span>
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Вариант ${idx + 1}`}
              className="flex-1 bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-1.5 text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-all"
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => handleRemoveOption(idx)}
                className="w-7 h-7 rounded-lg bg-surface-container-high hover:bg-error-container/30 text-on-surface-variant hover:text-error flex items-center justify-center transition-colors cursor-pointer"
                title="Удалить вариант"
              >
                <span className="material-symbols-outlined text-[14px]">delete</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add option button & summary */}
      <div className="flex items-center justify-between pt-1">
        {options.length < 6 ? (
          <button
            type="button"
            onClick={handleAddOption}
            className="text-xs text-primary hover:text-on-primary-container font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Добавить вариант ответа ({options.length}/6)</span>
          </button>
        ) : (
          <span className="text-[11px] text-on-surface-variant">Достигнут максимум 6 вариантов</span>
        )}

        <button
          type="button"
          onClick={onCancel}
          className="text-[11px] text-on-surface-variant hover:text-on-surface transition-colors"
        >
          Удалить опрос
        </button>
      </div>
    </div>
  );
};
