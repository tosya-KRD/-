import React, { useState } from 'react';

interface ProfileScreenProps {
  adsCount: number;
  savedCount: number;
  dialogsCount: number;
  dealsCount: number;
  onLogout?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  adsCount,
  savedCount,
  dialogsCount,
  dealsCount,
  onLogout
}) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [simpleMode, setSimpleMode] = useState(false);
  const [accountType, setAccountType] = useState('Житель дома');
  const [isVerified, setIsVerified] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [defaultRadius, setDefaultRadius] = useState('Только подъезд');
  const [showApartment, setShowApartment] = useState(true);
  const [language, setLanguage] = useState('Русский');
  
  // Modals state
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showRadiusModal, setShowRadiusModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyInvite = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://sosedidel.app/invite/sev-park-korp2?code=NEIGHBOR-782');
    }
    showToast('Ссылка-приглашение скопирована в буфер обмена!');
  };

  return (
    <div className={`flex flex-col w-full max-w-[1200px] mx-auto pb-16 ${simpleMode ? 'text-base' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-on-primary-container px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 border border-primary/20">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Profile Glass Card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container/60 backdrop-blur-[36px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10">
        {/* Ambient background glow */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center shadow-[0_0_25px_rgba(139,26,58,0.5)] text-on-primary-container text-3xl lg:text-4xl font-bold">
                Д
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-surface border-2 border-surface-container flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-[14px]">
                  {isVerified ? 'verified' : 'check'}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-on-surface">Демо-сосед</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-container/30 text-on-primary-container text-[11px] font-semibold border border-primary/25">
                  {accountType}
                </span>
              </div>
              <p className="text-xs lg:text-sm text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                ЖК Северный парк, к. 2{showApartment ? ', кв. 42' : ''}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-primary">
                  <span className="material-symbols-outlined text-[16px] material-symbols-fill">star</span>
                </div>
                <span className="text-xs font-bold text-on-surface">4.8</span>
                <span className="text-xs text-on-surface-variant">(24 отзыва)</span>
              </div>
            </div>
          </div>

          {/* 4 Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 min-w-[90px]">
              <span className="text-2xl font-bold text-on-surface">{adsCount}</span>
              <span className="text-[11px] text-on-surface-variant text-center mt-0.5">Объявлений</span>
            </div>
            <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 min-w-[90px]">
              <span className="text-2xl font-bold text-on-surface">{savedCount}</span>
              <span className="text-[11px] text-on-surface-variant text-center mt-0.5">Сохранено</span>
            </div>
            <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 min-w-[90px]">
              <span className="text-2xl font-bold text-on-surface">{dialogsCount}</span>
              <span className="text-[11px] text-on-surface-variant text-center mt-0.5">Диалогов</span>
            </div>
            <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 min-w-[90px]">
              <span className="text-2xl font-bold text-on-surface">{dealsCount}</span>
              <span className="text-[11px] text-on-surface-variant text-center mt-0.5">Сделок</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section Header */}
      <div className="mt-12 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">settings</span>
          Настройки и аккаунт
        </h2>
        <span className="text-xs text-on-surface-variant">Все изменения сохраняются автоматически</span>
      </div>

      {/* Settings 12 Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Dark Theme */}
        <div className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/15 transition-all group">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">dark_mode</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-on-surface">Тёмная тема</div>
              <div className="text-xs text-on-surface-variant">Глубокий вишневый интерфейс</div>
            </div>
          </div>
          <button
            onClick={() => setDarkTheme(!darkTheme)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              darkTheme ? 'bg-primary-container' : 'bg-surface-container-high'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-0.5 ${
              darkTheme ? 'translate-x-5' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* 2. Simple Mode */}
        <div className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/15 transition-all group">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">elderly</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-on-surface">Простой режим</div>
              <div className="text-xs text-on-surface-variant">Увеличенный шрифт и элементы</div>
            </div>
          </div>
          <button
            onClick={() => {
              setSimpleMode(!simpleMode);
              showToast(simpleMode ? 'Стандартный масштаб включен' : 'Простой режим с крупным шрифтом активирован');
            }}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              simpleMode ? 'bg-primary-container' : 'bg-surface-container-high'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-0.5 ${
              simpleMode ? 'translate-x-5' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* 3. Account Type */}
        <div className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/15 transition-all group">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-on-surface">Тип аккаунта</div>
              <div className="text-xs text-on-surface-variant">{accountType}</div>
            </div>
          </div>
          <button
            onClick={() => setShowAccountModal(true)}
            className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors cursor-pointer"
          >
            Изменить
          </button>
        </div>

        {/* 4. Gosuslugi Verification */}
        <div className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/15 transition-all group">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-on-surface">Верификация ГосУслуги</div>
              <div className="text-xs text-on-surface-variant">
                Статус: {isVerified ? 'Подтвержден (Собственник)' : 'Не подтвержден'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowVerifyModal(true)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-[0_0_15px_rgba(139,26,58,0.3)] cursor-pointer ${
              isVerified 
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' 
                : 'bg-primary-container text-on-primary-container hover:bg-primary-container/80'
            }`}
          >
            {isVerified ? 'Проверено ✓' : 'Подтвердить'}
          </button>
        </div>

        {/* 5. Notifications */}
        <div className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/15 transition-all group">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-on-surface">Уведомления</div>
              <div className="text-xs text-on-surface-variant">Звуки, пуш и рассылки</div>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              notifications ? 'bg-primary-container' : 'bg-surface-container-high'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-0.5 ${
              notifications ? 'translate-x-5' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* 6. Default Radius */}
        <div 
          onClick={() => setShowRadiusModal(true)}
          className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/15 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">radar</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-on-surface">Радиус по умолчанию</div>
              <div className="text-xs text-on-surface-variant">{defaultRadius}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant text-xs hover:text-on-surface">
            <span>{defaultRadius}</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </div>
        </div>

        {/* 7. Privacy */}
        <div className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/15 transition-all group">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">lock</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-on-surface">Приватность</div>
              <div className="text-xs text-on-surface-variant">Показывать квартиру в профиле</div>
            </div>
          </div>
          <button
            onClick={() => setShowApartment(!showApartment)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              showApartment ? 'bg-primary-container' : 'bg-surface-container-high'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-0.5 ${
              showApartment ? 'translate-x-5' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* 8. Language */}
        <div 
          onClick={() => {
            const next = language === 'Русский' ? 'English' : 'Русский';
            setLanguage(next);
            showToast(`Язык изменен на: ${next}`);
          }}
          className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/15 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">language</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-on-surface">Язык интерфейса</div>
              <div className="text-xs text-on-surface-variant">{language}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant text-xs hover:text-on-surface">
            <span>{language}</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </div>
        </div>

        {/* 9. Level & Progress */}
        <div className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex flex-col justify-between border border-white/5 hover:border-white/15 transition-all group gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">emoji_events</span>
              </div>
              <div>
                <div className="font-semibold text-sm text-on-surface">Уровень: Новичок</div>
                <div className="text-xs text-on-surface-variant">До уровня «Активный сосед» осталось 12 баллов</div>
              </div>
            </div>
            <span className="text-primary font-bold text-xs">35%</span>
          </div>

          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-primary-container to-primary h-full w-[35%] rounded-full" />
          </div>
        </div>

        {/* 10. Invite Neighbor */}
        <div className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/15 transition-all group">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">card_giftcard</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-on-surface">Пригласить соседа</div>
              <div className="text-xs text-on-surface-variant">Поделитесь ссылкой с жильцами</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary-container/30 text-on-primary-container font-bold text-xs flex items-center justify-center border border-primary/20">
              3
            </span>
            <button
              onClick={handleCopyInvite}
              className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors cursor-pointer"
            >
              Ссылка
            </button>
          </div>
        </div>

        {/* 11. Help & Support */}
        <div 
          onClick={() => setShowSupportModal(true)}
          className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/15 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">help</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-on-surface">Помощь и поддержка</div>
              <div className="text-xs text-on-surface-variant">Частые вопросы и чат с модератором</div>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
        </div>

        {/* 12. Logout */}
        <div 
          onClick={() => {
            if (window.confirm('Вы действительно хотите выйти из аккаунта?')) {
              showToast('Сеанс завершен. Для повторного входа используйте телефон.');
              if (onLogout) onLogout();
            }
          }}
          className="bg-surface-container/50 backdrop-blur-2xl rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-error/20 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-error-container/20 flex items-center justify-center text-error group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-error">Выйти из аккаунта</div>
              <div className="text-xs text-on-surface-variant">Завершить сеанс на этом устройстве</div>
            </div>
          </div>
          <button className="px-3.5 py-1.5 rounded-lg bg-error-container text-on-error-container text-xs font-semibold hover:bg-error-container/80 transition-colors">
            Выйти
          </button>
        </div>
      </div>

      {/* Account Type Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in" onClick={() => setShowAccountModal(false)}>
          <div className="w-full max-w-sm p-6 rounded-2xl bg-surface-container border border-white/10 shadow-2xl flex flex-col gap-3" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-on-surface">Выберите тип аккаунта</h3>
            {['Житель дома', 'Собственник квартиры', 'Арендатор', 'Член совета дома', 'Локальный мастер'].map(type => (
              <button
                key={type}
                onClick={() => {
                  setAccountType(type);
                  setShowAccountModal(false);
                  showToast(`Тип аккаунта обновлен: ${type}`);
                }}
                className={`p-3 rounded-xl text-xs font-semibold text-left transition-all ${
                  accountType === type 
                    ? 'bg-primary-container text-on-primary-container' 
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Verify Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in" onClick={() => setShowVerifyModal(false)}>
          <div className="w-full max-w-md p-6 rounded-2xl bg-surface-container border border-white/10 shadow-2xl flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-container/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">Верификация через ГосУслуги</h3>
                <p className="text-xs text-on-surface-variant">Подтверждение права собственности на кв. 42</p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Верифицированные жители получают право голоса в общедомовых голосованиях и бейдж доверия в чатах.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowVerifyModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  setIsVerified(true);
                  setShowVerifyModal(false);
                  showToast('Аккаунт успешно верифицирован через ЕСИА ГосУслуги!');
                }}
                className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-110"
              >
                Войти с ГосУслугами
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Radius Modal */}
      {showRadiusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in" onClick={() => setShowRadiusModal(false)}>
          <div className="w-full max-w-sm p-6 rounded-2xl bg-surface-container border border-white/10 shadow-2xl flex flex-col gap-3" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-on-surface">Радиус ленты по умолчанию</h3>
            {['Только подъезд', 'Корпус 2 (Дом)', 'Дом и двор', 'Весь ЖК (5 корпусов)', 'Район (1 км)'].map(rad => (
              <button
                key={rad}
                onClick={() => {
                  setDefaultRadius(rad);
                  setShowRadiusModal(false);
                  showToast(`Радиус установлен: ${rad}`);
                }}
                className={`p-3 rounded-xl text-xs font-semibold text-left transition-all ${
                  defaultRadius === rad 
                    ? 'bg-primary-container text-on-primary-container' 
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {rad}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in" onClick={() => setShowSupportModal(false)}>
          <div className="w-full max-w-md p-6 rounded-2xl bg-surface-container border border-white/10 shadow-2xl flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/15">
              <h3 className="text-lg font-bold text-on-surface">Помощь и контакты УК</h3>
              <button onClick={() => setShowSupportModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/15">
                <h4 className="font-semibold text-primary mb-1">Как передать показания счетчиков?</h4>
                <p className="text-on-surface-variant">Показания принимаются с 15 по 25 число каждого месяца через раздел «Дом» или по телефону диспетчерской.</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/15">
                <h4 className="font-semibold text-primary mb-1">Срочная аварийная служба</h4>
                <p className="text-on-surface-variant">Круглосуточный телефон дежурного инженера: +7 (495) 234-56-78 (доб. 1).</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/15">
                <h4 className="font-semibold text-primary mb-1">Чат с председателем совета дома</h4>
                <p className="text-on-surface-variant">Вопросы по капремонту и общему имуществу принимаются в разделе «Совет дома».</p>
              </div>
            </div>
            <button
              onClick={() => setShowSupportModal(false)}
              className="py-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
