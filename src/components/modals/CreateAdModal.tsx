import React, { useState } from 'react';
import { ClassifiedAd } from '../../types';

interface CreateAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ad: Omit<ClassifiedAd, 'id' | 'timeAgo' | 'rating'>) => void;
}

export const CreateAdModal: React.FC<CreateAdModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'sale' | 'rent' | 'free' | 'services' | 'lost'>('sale');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('Корпус 2, кв. 42');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('📦');

  if (!isOpen) return null;

  const categories: Array<{ id: 'sale' | 'rent' | 'free' | 'services' | 'lost'; label: string }> = [
    { id: 'sale', label: 'Продажа' },
    { id: 'rent', label: 'Аренда' },
    { id: 'free', label: 'Даром' },
    { id: 'services', label: 'Услуги' },
    { id: 'lost', label: 'Потеряшки' },
  ];

  const suggestedIcons = ['🚲', '📦', '🪑', '📚', '🪴', '💻', '🎸', '🐱', '🧢', '🛠️', '🚗', '🧹', '📺'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const catObj = categories.find(c => c.id === category);

    onSubmit({
      title: title.trim(),
      category,
      categoryLabel: catObj ? catObj.label : 'Продажа',
      price: price.trim() || (category === 'free' ? 'Даром' : 'Договорная'),
      location: location.trim() || 'Корпус 2',
      description: description.trim(),
      icon
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
            <span className="material-symbols-outlined text-primary text-[22px]">add_circle</span>
            <h3 className="text-xl font-bold text-on-surface">Новое объявление</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="text-on-surface-variant font-semibold block mb-1.5">Категория:</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {categories.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setCategory(c.id);
                    if (c.id === 'free') setPrice('Даром');
                  }}
                  className={`py-2 px-2 rounded-xl font-semibold transition-all text-center ${
                    category === c.id
                      ? 'bg-primary-container text-on-primary-container ring-1 ring-primary'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-on-surface-variant font-semibold block mb-1.5">Название:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Самокат детский, Книги, Перфоратор"
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-on-surface-variant font-semibold block mb-1.5">Цена или условия:</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="2 500 ₽ или Даром"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-on-surface-variant font-semibold block mb-1.5">Локация:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Корпус 2, кв. 42"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-on-surface-variant font-semibold block mb-1.5">Иконка / Эмодзи:</label>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-xl shadow-inner border border-outline-variant/20">
                {icon}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedIcons.map(ic => (
                  <button
                    key={ic}
                    type="button"
                    onClick={() => setIcon(ic)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-base hover:scale-110 transition-transform ${
                      icon === ic ? 'bg-primary-container ring-1 ring-primary' : 'bg-surface-container-low'
                    }`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-on-surface-variant font-semibold block mb-1.5">Подробное описание:</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Укажите состояние вещи, причину продажи или детали..."
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
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
