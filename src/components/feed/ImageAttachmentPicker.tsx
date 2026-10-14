import React, { useState, useRef } from 'react';

export interface VisualPreset {
  id: string;
  title: string;
  category: string;
  url: string;
  description: string;
}

export const DEMO_VISUAL_ASSETS: VisualPreset[] = [
  {
    id: 'vis-flowerbed',
    title: 'Озеленение и цветники',
    category: 'Двор и сад',
    url: '/src/assets/images/yard_flowerbed_1791989171861.jpg',
    description: 'Ландшафтный дизайн центрального цветника и каменных дорожек'
  },
  {
    id: 'vis-playground',
    title: 'Детская эко-площадка',
    category: 'Инфраструктура',
    url: '/src/assets/images/playground_plan_1791989169990.jpg',
    description: 'Деревянные игровые комплексы, качели и горка'
  },
  {
    id: 'vis-lobby',
    title: 'Ремонт входного холла',
    category: 'Подъезд',
    url: '/src/assets/images/lobby_renovation_1791989169744.jpg',
    description: 'Дизайн-проект парадного вестибюля с деревянными панелями и почтовыми ячейками'
  },
  {
    id: 'vis-cat',
    title: 'Рыжий кот в саду',
    category: 'Питомцы',
    url: '/src/assets/images/cat_in_courtyard_1791989170295.jpg',
    description: 'Пушистый кот на скамейке в уютном дворе'
  },
  {
    id: 'vis-bike',
    title: 'Крытая велопарковка',
    category: 'Удобства',
    url: '/src/assets/images/bike_storage_area_1791989170331.jpg',
    description: 'Двухуровневый навес для безопасного хранения велосипедов жителей'
  }
];

interface ImageAttachmentPickerProps {
  attachedImages: string[];
  onAddImages: (urls: string[]) => void;
  onRemoveImage: (index: number) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export const ImageAttachmentPicker: React.FC<ImageAttachmentPickerProps> = ({
  attachedImages,
  onAddImages,
  onRemoveImage,
  onClearAll,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'ai_generate' | 'upload'>('presets');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle local file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newUrls: string[] = [];
    const readers: Promise<string>[] = [];

    Array.from(files).forEach((file) => {
      readers.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              resolve(event.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        })
      );
    });

    Promise.all(readers).then((results) => {
      onAddImages(results);
      if (fileInputRef.current) fileInputRef.current.value = '';
    });
  };

  // Simulate AI image visualizer using prompt keywords
  const handleGenerateAi = (presetPrompt?: string) => {
    const promptText = presetPrompt || aiPrompt;
    if (!promptText.trim()) return;

    setIsGenerating(true);
    setGenerationSuccess(null);

    setTimeout(() => {
      setIsGenerating(false);
      // Select the most relevant generated asset or cycle through
      const lower = promptText.toLowerCase();
      let chosen = DEMO_VISUAL_ASSETS[0].url;

      if (lower.includes('дет') || lower.includes('площад') || lower.includes('качел')) {
        chosen = DEMO_VISUAL_ASSETS[1].url;
      } else if (lower.includes('холл') || lower.includes('подъезд') || lower.includes('ремонт') || lower.includes('почт')) {
        chosen = DEMO_VISUAL_ASSETS[2].url;
      } else if (lower.includes('кот') || lower.includes('кошк') || lower.includes('собак') || lower.includes('питом')) {
        chosen = DEMO_VISUAL_ASSETS[3].url;
      } else if (lower.includes('вело') || lower.includes('парковк') || lower.includes('транспорт')) {
        chosen = DEMO_VISUAL_ASSETS[4].url;
      } else {
        // Random pick or flowerbed
        const randomItem = DEMO_VISUAL_ASSETS[Math.floor(Math.random() * DEMO_VISUAL_ASSETS.length)];
        chosen = randomItem.url;
      }

      onAddImages([chosen]);
      setGenerationSuccess(`Визуализация «${promptText}» готова и прикреплена к посту!`);
      setTimeout(() => setGenerationSuccess(null), 3500);
    }, 1200);
  };

  const isAttached = (url: string) => attachedImages.includes(url);

  return (
    <div className="flex flex-col gap-4 p-4 bg-surface-container/90 rounded-2xl border border-primary/20 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
      {/* Top Header */}
      <div className="flex justify-between items-center pb-2 border-b border-outline-variant/15">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">add_photo_alternate</span>
          <span className="font-semibold text-sm text-on-surface">
            Прикрепить фото к посту
          </span>
          {attachedImages.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold">
              {attachedImages.length} {attachedImages.length === 1 ? 'фото' : 'фотографии'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {attachedImages.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              Очистить все
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            title="Закрыть панель"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      {/* Currently Attached Previews */}
      {attachedImages.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="text-[11px] font-medium text-on-surface-variant">
            Прикрепленные изображения (отобразятся в ленте галереей):
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1">
            {attachedImages.map((url, idx) => (
              <div 
                key={idx}
                className="relative group w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-outline-variant/30 bg-black/40 shadow-sm"
              >
                <img
                  src={url}
                  alt={`Прикрепленное фото ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(idx)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Удалить фото"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-bold text-white">
                  #{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-surface-container-high/60 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('presets')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'presets'
              ? 'bg-primary-container text-on-primary-container shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">gallery_thumbnail</span>
          <span>Галерея ЖК</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ai_generate')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'ai_generate'
              ? 'bg-primary-container text-on-primary-container shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
          <span>ИИ-визуализация</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-primary-container text-on-primary-container shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">upload_file</span>
          <span>Загрузить фото</span>
        </button>
      </div>

      {/* Tab 1: Presets Catalog */}
      {activeTab === 'presets' && (
        <div className="flex flex-col gap-2">
          <div className="text-[11px] text-on-surface-variant">
            Выберите готовые визуализации благоустройства и двора:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {DEMO_VISUAL_ASSETS.map((asset) => {
              const selected = isAttached(asset.url);
              return (
                <div
                  key={asset.id}
                  onClick={() => {
                    if (selected) {
                      const idx = attachedImages.indexOf(asset.url);
                      if (idx >= 0) onRemoveImage(idx);
                    } else {
                      onAddImages([asset.url]);
                    }
                  }}
                  className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all ${
                    selected 
                      ? 'border-primary ring-2 ring-primary/40 scale-[0.98]' 
                      : 'border-outline-variant/20 hover:border-outline-variant/50'
                  }`}
                >
                  <div className="aspect-[4/3] w-full bg-black/40 relative">
                    <img
                      src={asset.url}
                      alt={asset.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all ${
                      selected ? 'bg-primary text-white' : 'bg-black/50 text-white/70 group-hover:bg-primary/80 group-hover:text-white'
                    }">
                      <span className="material-symbols-outlined text-[16px]">
                        {selected ? 'check' : 'add'}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-surface-container-high/80 flex flex-col">
                    <span className="text-xs font-semibold text-on-surface truncate">
                      {asset.title}
                    </span>
                    <span className="text-[10px] text-on-surface-variant truncate">
                      {asset.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: AI Visualization Generator */}
      {activeTab === 'ai_generate' && (
        <div className="flex flex-col gap-3">
          <div className="text-[11px] text-on-surface-variant leading-relaxed">
            Сгенерируйте фотореалистичную визуализацию для поста о дворе, ремонте, детских площадках или найденных питомцах:
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleGenerateAi();
              }}
              placeholder="Например: проект цветника во дворе корпуса 2..."
              className="flex-1 bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              disabled={isGenerating || !aiPrompt.trim()}
              onClick={() => handleGenerateAi()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-[#D4375C] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
            >
              <span className={`material-symbols-outlined text-[16px] ${isGenerating ? 'animate-spin' : ''}`}>
                {isGenerating ? 'refresh' : 'magic_button'}
              </span>
              <span>{isGenerating ? 'Создание...' : 'Сгенерировать'}</span>
            </button>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">
              Быстрые темы для генерации:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: '🌺 Клумба и сад', prompt: 'Ландшафтный дизайн клумбы и зеленый газон во дворе' },
                { label: '🛝 Детская площадка', prompt: 'Деревянная детская эко-площадка с качелями' },
                { label: '🏛️ Парадный холл', prompt: 'Стильный холл и входная группа подъезда' },
                { label: '🐾 Найден кот', prompt: 'Пушистый рыжий кот на лавочке во дворе' },
                { label: '🚲 Велопарковка', prompt: 'Современная крытая велопарковка для жителей' }
              ].map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setAiPrompt(p.prompt);
                    handleGenerateAi(p.prompt);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface text-[11px] font-medium transition-all cursor-pointer border border-outline-variant/15 flex items-center gap-1"
                >
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {generationSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{generationSuccess}</span>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Upload files */}
      {activeTab === 'upload' && (
        <div className="flex flex-col gap-3">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-outline-variant/40 hover:border-primary/60 bg-surface-container/40 hover:bg-surface-container/70 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[26px]">cloud_upload</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-on-surface">
                Нажмите для выбора нескольких изображений
              </span>
              <span className="text-[11px] text-on-surface-variant mt-0.5">
                Поддерживаются JPG, PNG, WEBP (можно выбрать несколько сразу)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Done button */}
      <div className="flex justify-end pt-2 border-t border-outline-variant/10">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold transition-all cursor-pointer"
        >
          Готово
        </button>
      </div>
    </div>
  );
};
