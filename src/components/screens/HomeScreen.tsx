import React, { useState } from 'react';
import { FeedPost, ScreenType } from '../../types';
import { PollCreator } from '../polls/PollCreator';
import { PollView } from '../polls/PollView';
import { PostImageGallery } from '../feed/PostImageGallery';
import { ImageAttachmentPicker } from '../feed/ImageAttachmentPicker';

interface HomeScreenProps {
  posts: FeedPost[];
  onAddPost: (
    content: string, 
    badge?: string, 
    pollData?: { question: string; options: string[] },
    images?: string[]
  ) => void;
  onToggleLike: (postId: string) => void;
  onNavigateScreen: (screen: ScreenType) => void;
  onOpenDirectChat: (name: string) => void;
  onVotePoll: (postId: string, optionId: string) => void;
  onRetractVotePoll: (postId: string) => void;
  searchFilter?: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  posts,
  onAddPost,
  onToggleLike,
  onNavigateScreen,
  onOpenDirectChat,
  onVotePoll,
  onRetractVotePoll,
  searchFilter = ''
}) => {
  const [newPostText, setNewPostText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Новость');
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [replyInputText, setReplyInputText] = useState('');
  const [noiseLevel, setNoiseLevel] = useState<'quiet' | 'moderate' | 'loud'>('moderate');
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  // Poll state in composer
  const [isPollCreatorOpen, setIsPollCreatorOpen] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);

  // Multi-image attachments in composer
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const tags = ['Новость', 'Опрос', 'Тишина', 'ЖКХ', 'Услуги', 'Событие', 'Отдам', 'Поиск', 'Вопрос'];

  const handlePublish = () => {
    // If poll creator is open, validate poll
    let attachedPoll: { question: string; options: string[] } | undefined = undefined;
    
    if (isPollCreatorOpen) {
      if (!pollQuestion.trim()) {
        alert('Пожалуйста, укажите вопрос для опроса');
        return;
      }
      const validOptions = pollOptions.map(o => o.trim()).filter(Boolean);
      if (validOptions.length < 2) {
        alert('Для создания опроса необходимо минимум 2 заполненных варианта ответа');
        return;
      }
      attachedPoll = {
        question: pollQuestion.trim(),
        options: validOptions
      };
    }

    const hasImages = attachedImages.length > 0;
    if (!newPostText.trim() && !attachedPoll && !hasImages) return;

    const badgeToUse = attachedPoll ? 'Опрос' : (hasImages && !newPostText.trim() ? 'Фото' : selectedTag);
    const textToUse = newPostText.trim() || (attachedPoll ? attachedPoll.question : 'Фотоматериалы и визуализация к обсуждению');

    onAddPost(textToUse, badgeToUse, attachedPoll, hasImages ? [...attachedImages] : undefined);

    // Reset composer state
    setNewPostText('');
    setShowTagPicker(false);
    setIsPollCreatorOpen(false);
    setPollQuestion('');
    setPollOptions(['', '']);
    setAttachedImages([]);
    setIsImagePickerOpen(false);
  };

  const handleReportNoise = () => {
    setNoiseLevel('loud');
    setStatusNotification('Уведомление «Шумно» отправлено соседям и в чат дома!');
    setTimeout(() => setStatusNotification(null), 4000);
  };

  const handleQuietHour = () => {
    setNoiseLevel('quiet');
    setStatusNotification('Режим «Тихий час» активирован. Мастера уведомлены о паузе в шумных работах.');
    setTimeout(() => setStatusNotification(null), 4000);
  };

  const filteredPosts = posts.filter(p => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return p.content.toLowerCase().includes(q) || 
           p.author.toLowerCase().includes(q) || 
           p.badge.toLowerCase().includes(q) ||
           (p.poll && p.poll.question.toLowerCase().includes(q));
  });

  return (
    <div className="flex flex-col w-full gap-8 pb-16">
      {/* Toast Notification Banner */}
      {statusNotification && (
        <div className="bg-primary-container text-on-primary-container px-5 py-3 rounded-2xl shadow-[0_4px_24px_rgba(139,26,58,0.4)] flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            <span className="text-sm font-medium">{statusNotification}</span>
          </div>
          <button onClick={() => setStatusNotification(null)} className="p-1 hover:opacity-80 cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Glass Bar / Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-tertiary/10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px] material-symbols-fill">
              apartment
            </span>
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              ЖК Северный парк · Корпус 2
            </span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">
            Дом · Общая лента
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Добро пожаловать в центр управления вашим домом. Проводите опросы среди соседей, следите за статусом тишины и общайтесь в реальном времени.
          </p>
        </div>

        {/* House Status Widget */}
        <div className="relative z-10 flex flex-col bg-surface-container/90 backdrop-blur-xl rounded-2xl p-5 gap-4 w-full md:w-auto md:min-w-[320px] shadow-lg border border-outline-variant/15">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px] material-symbols-fill">
                volume_up
              </span>
              Статус дома
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              noiseLevel === 'quiet' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : noiseLevel === 'loud' 
                  ? 'bg-rose-500/20 text-rose-300' 
                  : 'bg-primary/20 text-primary'
            }`}>
              {noiseLevel === 'quiet' ? 'Тихо' : noiseLevel === 'loud' ? 'Шумно' : 'Умеренный'}
            </span>
          </div>

          {/* Noise level progress bar */}
          <div className="flex flex-col gap-1.5">
            <div className="w-full h-2.5 rounded-full bg-surface-container-highest overflow-hidden p-0.5">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  noiseLevel === 'quiet'
                    ? 'bg-emerald-500 w-[20%]'
                    : noiseLevel === 'loud'
                      ? 'bg-rose-500 w-[85%]'
                      : 'bg-gradient-to-r from-emerald-500 via-amber-400 to-primary w-[45%]'
                }`}
              />
            </div>
            <div className="flex justify-between text-[11px] text-on-surface-variant font-medium">
              <span className={noiseLevel === 'quiet' ? 'text-emerald-400 font-bold' : ''}>Тихо</span>
              <span className={noiseLevel === 'moderate' ? 'text-primary font-bold' : ''}>Умеренно</span>
              <span className={noiseLevel === 'loud' ? 'text-rose-400 font-bold' : ''}>Шумно</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleReportNoise}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#8B1A3A] to-[#D4375C] text-white hover:opacity-95 transition-all text-xs font-semibold shadow-[0_0_15px_rgba(139,26,58,0.4)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">emergency</span>
              <span>Шумно</span>
            </button>
            <button
              onClick={handleQuietHour}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-all text-xs font-semibold cursor-pointer border border-outline-variant/10"
            >
              <span className="material-symbols-outlined text-[18px]">do_not_disturb_on</span>
              <span>Тихий час</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Feed Section (Grid with Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left/Center Feed (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Post Creator Input Card */}
          <div className="bg-surface-container-low/70 backdrop-blur-xl rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col gap-4 border border-outline-variant/15">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B1A3A] to-[#D4375C] flex items-center justify-center text-white font-bold shadow-md shrink-0">
                АС
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handlePublish();
                    }
                  }}
                  className="w-full bg-surface-container/80 border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-all resize-none h-20"
                  placeholder={isPollCreatorOpen ? "Добавьте комментарий или описание к опросу (необязательно)..." : "Написать соседям... Поделитесь новостью или задайте вопрос (Ctrl+Enter для отправки)"}
                />

                {/* Poll Creator Component */}
                {isPollCreatorOpen && (
                  <PollCreator
                    question={pollQuestion}
                    onQuestionChange={setPollQuestion}
                    options={pollOptions}
                    onOptionsChange={setPollOptions}
                    onCancel={() => {
                      setIsPollCreatorOpen(false);
                      setPollQuestion('');
                      setPollOptions(['', '']);
                    }}
                  />
                )}

                {/* Multi-image Attachment Picker & AI Generator */}
                {(isImagePickerOpen || attachedImages.length > 0) && (
                  <ImageAttachmentPicker
                    attachedImages={attachedImages}
                    onAddImages={(newUrls) => {
                      setAttachedImages(prev => {
                        const set = new Set([...prev, ...newUrls]);
                        return Array.from(set);
                      });
                    }}
                    onRemoveImage={(idx) => {
                      setAttachedImages(prev => prev.filter((_, i) => i !== idx));
                    }}
                    onClearAll={() => setAttachedImages([])}
                    onClose={() => setIsImagePickerOpen(false)}
                  />
                )}

                {showTagPicker && (
                  <div className="flex flex-wrap gap-1.5 p-2 bg-surface-container-high/40 rounded-xl border border-outline-variant/20 animate-in fade-in">
                    {tags.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTag(t)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          selectedTag === t 
                            ? 'bg-primary-container text-on-primary-container shadow-sm' 
                            : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
              <div className="flex items-center gap-2 text-on-surface-variant">
                {/* Poll Toggle Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsPollCreatorOpen(!isPollCreatorOpen);
                    if (!isPollCreatorOpen) {
                      setSelectedTag('Опрос');
                    }
                  }}
                  className={`p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                    isPollCreatorOpen 
                      ? 'bg-primary-container text-on-primary-container shadow-sm ring-1 ring-primary/40' 
                      : 'hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                  }`}
                  title="Создать опрос"
                >
                  <span className="material-symbols-outlined text-[18px]">ballot</span>
                  <span>Опрос</span>
                </button>

                {/* Photo Attachment & AI Generation Button */}
                <button
                  type="button"
                  onClick={() => setIsImagePickerOpen(!isImagePickerOpen)}
                  className={`p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                    isImagePickerOpen || attachedImages.length > 0
                      ? 'bg-primary-container text-on-primary-container shadow-sm ring-1 ring-primary/40' 
                      : 'hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                  }`}
                  title="Прикрепить изображения или сгенерировать визуализацию"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_library</span>
                  <span>
                    {attachedImages.length > 0 ? `Фото (${attachedImages.length})` : 'Фото'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowTagPicker(!showTagPicker)}
                  className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs cursor-pointer ${
                    showTagPicker ? 'bg-primary-container/30 text-primary' : 'hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">tag</span>
                  <span>Тема: {isPollCreatorOpen ? 'Опрос' : selectedTag}</span>
                </button>
              </div>

              <button
                onClick={handlePublish}
                disabled={!newPostText.trim() && (!isPollCreatorOpen || !pollQuestion.trim()) && attachedImages.length === 0}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B1A3A] to-[#D4375C] text-white font-semibold text-xs hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(139,26,58,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>{isPollCreatorOpen ? 'Опубликовать опрос' : 'Опубликовать'}</span>
              </button>
            </div>
          </div>

          {/* Feed Container */}
          <div className="flex flex-col gap-4">
            {filteredPosts.length === 0 ? (
              <div className="p-8 text-center bg-surface-container-low/40 rounded-2xl border border-outline-variant/15 text-on-surface-variant">
                По запросу ничего не найдено. Попробуйте другой поиск или создайте опрос!
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isReplyOpen = activeReplyPostId === post.id;
                return (
                  <div
                    key={post.id}
                    className="bg-surface-container-low/60 backdrop-blur-xl rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col gap-4 transition-all hover:bg-surface-container-low/80 border border-outline-variant/10"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B1A3A] to-[#D4375C] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {post.author.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface text-sm">{post.author}</span>
                          <span className="text-[11px] text-on-surface-variant">{post.apartment}</span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        post.badge === 'Опрос' ? 'bg-primary-container text-on-primary-container font-semibold ring-1 ring-primary/30' :
                        post.badgeType === 'silence' ? 'bg-tertiary-container/40 text-on-tertiary-container' :
                        post.badgeType === 'master' ? 'bg-primary-container/40 text-on-primary-container' :
                        post.badgeType === 'utilities' ? 'bg-secondary-container/40 text-on-secondary-container' :
                        post.badgeType === 'lost' ? 'bg-error/20 text-error' :
                        post.badgeType === 'event' ? 'bg-tertiary-container/40 text-on-tertiary-container' :
                        'bg-surface-container-high text-on-surface-variant'
                      }`}>
                        {post.badge}
                      </span>
                    </div>

                    <p className="text-base text-on-surface leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Multi-image gallery if attached */}
                    {post.images && post.images.length > 0 && (
                      <PostImageGallery
                        images={post.images}
                        postAuthor={post.author}
                      />
                    )}

                    {/* Poll Rendering if attached */}
                    {post.poll && (
                      <PollView
                        poll={post.poll}
                        postId={post.id}
                        onVote={onVotePoll}
                        onRetractVote={onRetractVotePoll}
                      />
                    )}

                    <div className="flex items-center gap-6 pt-3 border-t border-outline-variant/10 text-on-surface-variant">
                      <button
                        onClick={() => onToggleLike(post.id)}
                        className={`flex items-center gap-1.5 transition-all text-xs font-medium group cursor-pointer ${
                          post.isLiked ? 'text-primary' : 'hover:text-primary'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform ${post.isLiked ? 'material-symbols-fill text-primary' : ''}`}>
                          favorite
                        </span>
                        <span>{post.likes}</span>
                      </button>

                      <button
                        onClick={() => setActiveReplyPostId(isReplyOpen ? null : post.id)}
                        className="flex items-center gap-1.5 hover:text-primary transition-all text-xs font-medium cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                        <span>
                          {post.replies && post.replies.length > 0 
                            ? `${post.replies.length} ${post.replies.length === 1 ? 'ответ' : 'ответа'}` 
                            : `${post.repliesCount} ответов`}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(post.content);
                            alert('Текст скопирован для отправки соседям!');
                          }
                        }}
                        className="ml-auto flex items-center gap-1 hover:text-on-surface transition-all text-xs cursor-pointer"
                        title="Поделиться"
                      >
                        <span className="material-symbols-outlined text-[18px]">share</span>
                      </button>
                    </div>

                    {/* Replies Drawer */}
                    {isReplyOpen && (
                      <div className="mt-2 pt-3 border-t border-outline-variant/15 flex flex-col gap-3 animate-in fade-in">
                        {post.replies && post.replies.map(r => (
                          <div key={r.id} className="bg-surface-container/60 p-3 rounded-xl border border-outline-variant/10 text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-primary">{r.author}</span>
                              <span className="text-[10px] text-on-surface-variant">{r.timeAgo}</span>
                            </div>
                            <p className="text-on-surface">{r.content}</p>
                          </div>
                        ))}

                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="text"
                            value={replyInputText}
                            onChange={(e) => setReplyInputText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && replyInputText.trim()) {
                                if (!post.replies) post.replies = [];
                                post.replies.push({
                                  id: `rep-${Date.now()}`,
                                  author: 'Алексей С.',
                                  timeAgo: 'Только что',
                                  content: replyInputText.trim()
                                });
                                post.repliesCount = (post.repliesCount || 0) + 1;
                                setReplyInputText('');
                              }
                            }}
                            placeholder="Написать ответ соседу..."
                            className="flex-1 bg-surface-container/90 border border-outline-variant/20 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
                          />
                          <button
                            onClick={() => {
                              if (!replyInputText.trim()) return;
                              if (!post.replies) post.replies = [];
                              post.replies.push({
                                id: `rep-${Date.now()}`,
                                author: 'Алексей С.',
                                timeAgo: 'Только что',
                                content: replyInputText.trim()
                              });
                              post.repliesCount = (post.repliesCount || 0) + 1;
                              setReplyInputText('');
                            }}
                            className="px-3 py-2 rounded-xl bg-primary-container text-on-primary-container text-xs font-semibold hover:bg-primary-container/80 cursor-pointer"
                          >
                            Отправить
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column Sidebar / House Info Widgets */}
        <div className="flex flex-col gap-6">
          {/* Quick Info Card */}
          <div className="bg-surface-container-low/60 backdrop-blur-xl rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col gap-4 border border-outline-variant/15">
            <h3 className="font-semibold text-lg text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">info</span>
              Информация о доме
            </h3>
            <div className="flex flex-col gap-2">
              <div 
                onClick={() => onNavigateScreen('sovet-doma')}
                className="flex justify-between items-center py-2 border-b border-outline-variant/10 cursor-pointer hover:bg-surface-container/40 px-2 rounded-lg transition-colors"
              >
                <span className="text-xs text-on-surface-variant">Совет дома</span>
                <span className="text-xs font-medium text-on-surface flex items-center gap-1">
                  Активен (5 чел.)
                  <span className="material-symbols-outlined text-[14px] text-primary">arrow_forward</span>
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-outline-variant/10 px-2">
                <span className="text-xs text-on-surface-variant">Управляющая компания</span>
                <span className="text-xs font-medium text-on-surface">«Северный Сервис»</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-outline-variant/10 px-2">
                <span className="text-xs text-on-surface-variant">Диспетчер (24/7)</span>
                <a href="tel:+74952345678" className="text-xs font-medium text-primary hover:underline">
                  +7 (495) 234-56-78
                </a>
              </div>
              <div 
                onClick={() => onNavigateScreen('dvor')}
                className="flex justify-between items-center py-2 px-2 cursor-pointer hover:bg-surface-container/40 rounded-lg transition-colors"
              >
                <span className="text-xs text-on-surface-variant">Ближайший субботник</span>
                <span className="text-xs font-medium text-primary flex items-center gap-1">
                  Сегодня, 19:00
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>

          {/* Active Neighbors Widget */}
          <div className="bg-surface-container-low/60 backdrop-blur-xl rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col gap-4 border border-outline-variant/15">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">group</span>
                Соседи онлайн
              </h3>
              <button 
                onClick={() => onNavigateScreen('znakomstva')}
                className="text-xs text-primary hover:underline cursor-pointer"
              >
                Все (15)
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <button 
                onClick={() => onOpenDirectChat('Анна Петрова')}
                className="flex flex-col items-center gap-1 group text-left p-1 rounded-xl hover:bg-surface-container/50 transition-all cursor-pointer"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1A3A] to-[#D4375C] flex items-center justify-center text-white font-bold text-xs group-hover:scale-105 transition-transform">
                    АН
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-surface" />
                </div>
                <span className="text-xs text-on-surface truncate w-full text-center group-hover:text-primary">Анна</span>
              </button>

              <button 
                onClick={() => onOpenDirectChat('Мастер Игорь')}
                className="flex flex-col items-center gap-1 group text-left p-1 rounded-xl hover:bg-surface-container/50 transition-all cursor-pointer"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1A3A] to-[#D4375C] flex items-center justify-center text-white font-bold text-xs group-hover:scale-105 transition-transform">
                    МИ
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-surface" />
                </div>
                <span className="text-xs text-on-surface truncate w-full text-center group-hover:text-primary">Игорь</span>
              </button>

              <button 
                onClick={() => onOpenDirectChat('Ольга Смирнова')}
                className="flex flex-col items-center gap-1 group text-left p-1 rounded-xl hover:bg-surface-container/50 transition-all cursor-pointer"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1A3A] to-[#D4375C] flex items-center justify-center text-white font-bold text-xs group-hover:scale-105 transition-transform">
                    ОЛ
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-surface" />
                </div>
                <span className="text-xs text-on-surface truncate w-full text-center group-hover:text-primary">Ольга</span>
              </button>

              <button 
                onClick={() => onOpenDirectChat('Сосед Сергей')}
                className="flex flex-col items-center gap-1 group text-left p-1 rounded-xl hover:bg-surface-container/50 transition-all cursor-pointer"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1A3A] to-[#D4375C] flex items-center justify-center text-white font-bold text-xs group-hover:scale-105 transition-transform">
                    СЕ
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-amber-500 border-2 border-surface" />
                </div>
                <span className="text-xs text-on-surface truncate w-full text-center group-hover:text-primary">Сергей</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
