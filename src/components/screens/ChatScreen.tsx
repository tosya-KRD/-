import React, { useState, useRef, useEffect } from 'react';
import { ChatThread, ChatMessage } from '../../types';

interface ChatScreenProps {
  chatThreads: ChatThread[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onSendMessage: (chatId: string, text: string) => void;
  initialMessageTarget?: string | null;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  chatThreads,
  activeChatId,
  onSelectChat,
  onSendMessage,
  initialMessageTarget
}) => {
  const [chatSearch, setChatSearch] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [callActive, setCallActive] = useState<'audio' | 'video' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = chatThreads.find(t => t.id === activeChatId) || chatThreads[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages]);

  const handleSend = () => {
    if (!messageInput.trim() || !activeThread) return;
    onSendMessage(activeThread.id, messageInput.trim());
    setMessageInput('');
  };

  const filteredThreads = chatThreads.filter(t => {
    if (!chatSearch.trim()) return true;
    return t.name.toLowerCase().includes(chatSearch.toLowerCase()) ||
           t.lastMessage.toLowerCase().includes(chatSearch.toLowerCase());
  });

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4.5rem)] -mt-2 -mx-4 lg:-mx-8 overflow-hidden">
      <div className="flex flex-1 w-full h-full overflow-hidden">
        {/* Left Panel: Chat List (Width: 380px) */}
        <div className="w-80 md:w-[380px] h-full flex flex-col bg-surface-container-low/60 backdrop-blur-xl border-r border-outline-variant/10 shrink-0">
          {/* Search & Filters */}
          <div className="p-4 flex flex-col gap-3 border-b border-outline-variant/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-on-surface">Сообщения</h2>
              <button
                onClick={() => alert('Создать новый групповой чат подъезда или написать соседу')}
                className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all cursor-pointer"
                title="Новое сообщение"
              >
                <span className="material-symbols-outlined text-[18px]">edit_square</span>
              </button>
            </div>

            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[16px]">
                search
              </span>
              <input
                type="text"
                value={chatSearch}
                onChange={(e) => setChatSearch(e.target.value)}
                placeholder="Поиск по чатам..."
                className="w-full bg-surface-container/70 rounded-xl pl-9 pr-4 py-2 text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Chat Items List */}
          <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-1 py-2">
            {filteredThreads.map((thread) => {
              const isActive = thread.id === activeThread?.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => onSelectChat(thread.id)}
                  className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all relative ${
                    isActive
                      ? 'bg-primary-container/40 hover:bg-primary-container/50'
                      : 'hover:bg-surface-container/60'
                  }`}
                >
                  {/* Left accent bar on active */}
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r" />
                  )}

                  {/* Avatar or Icon */}
                  <div className="relative shrink-0">
                    {thread.avatarUrl ? (
                      <div
                        className="w-12 h-12 rounded-full bg-cover bg-center border border-outline-variant/20 shadow-sm"
                        style={{ backgroundImage: `url('${thread.avatarUrl}')` }}
                      />
                    ) : (
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${thread.iconBg || 'bg-primary-container text-on-primary-container'}`}>
                        <span className="material-symbols-outlined">{thread.icon || 'chat'}</span>
                      </div>
                    )}
                    {thread.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-surface" />
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-sm text-on-surface truncate">
                        {thread.name}
                      </span>
                      <span className={`text-[11px] font-medium shrink-0 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {thread.timeAgo}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant truncate">
                      {thread.lastMessage}
                    </p>
                  </div>

                  {/* Unread badge */}
                  {thread.unreadCount && thread.unreadCount > 0 && !isActive ? (
                    <div className="w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center font-bold shadow-sm">
                      {thread.unreadCount}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Conversation */}
        <div className="flex-1 h-full flex flex-col bg-surface/60 backdrop-blur-2xl relative min-w-0">
          {/* Chat Header */}
          <div className="h-16 px-6 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/30 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                {activeThread?.avatarUrl ? (
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center border border-outline-variant/20"
                    style={{ backgroundImage: `url('${activeThread.avatarUrl}')` }}
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${activeThread?.iconBg || 'bg-primary-container text-on-primary-container'}`}>
                    <span className="material-symbols-outlined text-[20px]">{activeThread?.icon || 'chat'}</span>
                  </div>
                )}
                {activeThread?.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-surface" />
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm text-on-surface truncate">
                  {activeThread?.name}
                </span>
                <span className={`text-[11px] ${activeThread?.isOnline ? 'text-emerald-400 font-medium' : 'text-on-surface-variant'}`}>
                  {activeThread?.isOnline ? 'онлайн' : 'был(а) недавно'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCallActive('audio')}
                className="w-10 h-10 rounded-xl bg-surface-container/50 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer"
                title="Аудиозвонок"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
              </button>

              <button
                onClick={() => setCallActive('video')}
                className="w-10 h-10 rounded-xl bg-surface-container/50 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer"
                title="Видеозвонок"
              >
                <span className="material-symbols-outlined text-[20px]">videocam</span>
              </button>

              <button
                onClick={() => alert(`Настройки чата с «${activeThread?.name}». Можно отключить звук или закрепить чат.`)}
                className="w-10 h-10 rounded-xl bg-surface-container/50 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer"
                title="Опции"
              >
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
          </div>

          {/* Messages History Container */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col gap-4">
            {/* Date Marker */}
            <div className="flex justify-center my-2">
              <span className="px-3 py-1 rounded-full bg-surface-container/80 text-[11px] text-on-surface-variant font-medium">
                Сегодня
              </span>
            </div>

            {activeThread?.messages.map((msg) => {
              const isMe = msg.sender === 'me';
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 max-w-[80%] md:max-w-[70%] ${
                    isMe ? 'self-end justify-end' : ''
                  }`}
                >
                  {!isMe && (
                    <div className="shrink-0 mb-1">
                      {activeThread.avatarUrl ? (
                        <div
                          className="w-8 h-8 rounded-full bg-cover bg-center border border-outline-variant/15"
                          style={{ backgroundImage: `url('${activeThread.avatarUrl}')` }}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface">
                          {activeThread.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    className={`p-4 backdrop-blur-md shadow-sm ${
                      isMe
                        ? 'rounded-2xl rounded-br-sm bg-gradient-to-br from-primary-container to-secondary-container text-white shadow-[0_4px_20px_rgba(139,26,58,0.3)]'
                        : 'rounded-2xl rounded-bl-sm bg-surface-container/80 border border-outline-variant/20 text-on-surface'
                    }`}
                  >
                    {!isMe && msg.senderName && msg.senderName !== activeThread.name && (
                      <span className="text-[11px] font-bold text-primary block mb-0.5">
                        {msg.senderName}
                      </span>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`text-[10px] mt-1 block text-right font-medium ${
                        isMe ? 'text-white/70' : 'text-on-surface-variant'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Field Area */}
          <div className="p-4 bg-surface-container-low/50 backdrop-blur-xl border-t border-outline-variant/10 flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => alert('Прикрепить фото, видео или документ в чат')}
              className="w-10 h-10 rounded-xl bg-surface-container/50 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer"
              title="Прикрепить файл"
            >
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSend();
                  }
                }}
                placeholder="Написать сообщение..."
                className="w-full bg-surface-container/70 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={!messageInput.trim()}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-container to-secondary-container text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(139,26,58,0.4)] transition-all cursor-pointer"
              title="Отправить"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Call Simulation Modal */}
      {callActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-surface-container border border-white/10 shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full bg-cover bg-center border-2 border-primary/50 shadow-xl"
                style={{ backgroundImage: `url('${activeThread?.avatarUrl || ''}')` }}
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-surface flex items-center justify-center text-white text-xs">
                <span className="material-symbols-outlined text-[14px]">
                  {callActive === 'video' ? 'videocam' : 'call'}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-on-surface">{activeThread?.name}</h3>
              <p className="text-xs text-primary mt-1 animate-pulse">Идёт вызов...</p>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => setCallActive(null)}
                className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg transition-all"
                title="Завершить"
              >
                <span className="material-symbols-outlined text-[24px]">call_end</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
