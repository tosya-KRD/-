import React, { useState } from 'react';
import { YardEvent } from '../../types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Omit<YardEvent, 'id' | 'participants' | 'isParticipating'>) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Субботник');
  const [categoryType, setCategoryType] = useState<'ecology' | 'leisure'>('ecology');
  const [day, setDay] = useState('28');
  const [month, setMonth] = useState('июн');
  const [time, setTime] = useState('11:00');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      category: category.trim(),
      categoryType,
      day: day.trim() || '30',
      month: month.trim() || 'июн',
      time: time.trim() || '12:00',
      description: description.trim() || 'Приглашаем соседей собраться во дворе!'
    });

    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg p-6 rounded-2xl bg-surface-container border border-white/10 shadow-2xl relative flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/15">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">celebration</span>
            <h3 className="text-xl font-bold text-on-surface">Предложить событие во дворе</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="text-on-surface-variant font-semibold block mb-1.5">Название события:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Посадка сирени, Соседский пикник, Турнир по пинг-понгу"
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-on-surface-variant font-semibold block mb-1.5">Тип события:</label>
              <select
                value={categoryType}
                onChange={(e) => {
                  const val = e.target.value as 'ecology' | 'leisure';
                  setCategoryType(val);
                  setCategory(val === 'ecology' ? 'Эко-акция' : 'Досуг и спорт');
                }}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="ecology" className="bg-surface-container">Экология и порядок</option>
                <option value="leisure" className="bg-surface-container">Досуг, праздник и спорт</option>
              </select>
            </div>
            <div>
              <label className="text-on-surface-variant font-semibold block mb-1.5">Категория:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Субботник, Праздник, Турнир"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-on-surface-variant font-semibold block mb-1.5">Число:</label>
              <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="28"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary text-center font-bold"
              />
            </div>
            <div>
              <label className="text-on-surface-variant font-semibold block mb-1.5">Месяц:</label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="июн"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary text-center"
              />
            </div>
            <div>
              <label className="text-on-surface-variant font-semibold block mb-1.5">Время:</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="18:00"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary text-center"
              />
            </div>
          </div>

          <div>
            <label className="text-on-surface-variant font-semibold block mb-1.5">Описание и программа:</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Расскажите соседям, что планируется, нужен ли свой инвентарь или угощения..."
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-surface-container-high text-on-surface font-semibold text-xs hover:bg-surface-container-highest transition-all"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-white font-bold text-xs shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              Опубликовать событие
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
