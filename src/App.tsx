/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ScreenType, 
  FeedPost, 
  ClassifiedAd, 
  EcoMetric, 
  YardEvent, 
  CouncilVote, 
  Contribution, 
  Master, 
  Studio, 
  Neighbor, 
  InterestClub, 
  ChatThread 
} from './types';
import { 
  INITIAL_FEED_POSTS, 
  INITIAL_ADS, 
  INITIAL_ECO_METRICS, 
  INITIAL_YARD_EVENTS, 
  INITIAL_COUNCIL_VOTES, 
  INITIAL_CONTRIBUTIONS, 
  INITIAL_MASTERS, 
  INITIAL_STUDIOS, 
  INITIAL_NEIGHBORS, 
  INITIAL_CLUBS, 
  INITIAL_CHAT_THREADS 
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeScreen } from './components/screens/HomeScreen';
import { AdsScreen } from './components/screens/AdsScreen';
import { YardScreen } from './components/screens/YardScreen';
import { CouncilScreen } from './components/screens/CouncilScreen';
import { MastersScreen } from './components/screens/MastersScreen';
import { DatingScreen } from './components/screens/DatingScreen';
import { ChatScreen } from './components/screens/ChatScreen';
import { MapScreen } from './components/screens/MapScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { CreateAdModal } from './components/modals/CreateAdModal';
import { CreateEventModal } from './components/modals/CreateEventModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dom');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // App entities with LocalStorage hydration
  const [posts, setPosts] = useState<FeedPost[]>(() => {
    const saved = localStorage.getItem('sd_posts_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_FEED_POSTS;
      }
    }
    return INITIAL_FEED_POSTS;
  });

  const [ads, setAds] = useState<ClassifiedAd[]>(() => {
    const saved = localStorage.getItem('sd_ads');
    return saved ? JSON.parse(saved) : INITIAL_ADS;
  });

  const [ecoMetrics, setEcoMetrics] = useState<EcoMetric[]>(() => {
    const saved = localStorage.getItem('sd_eco');
    return saved ? JSON.parse(saved) : INITIAL_ECO_METRICS;
  });

  const [events, setEvents] = useState<YardEvent[]>(() => {
    const saved = localStorage.getItem('sd_events_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_YARD_EVENTS;
      }
    }
    return INITIAL_YARD_EVENTS;
  });

  const [votes, setVotes] = useState<CouncilVote[]>(() => {
    const saved = localStorage.getItem('sd_votes');
    return saved ? JSON.parse(saved) : INITIAL_COUNCIL_VOTES;
  });

  const [contributions, setContributions] = useState<Contribution[]>(() => {
    const saved = localStorage.getItem('sd_contributions');
    return saved ? JSON.parse(saved) : INITIAL_CONTRIBUTIONS;
  });

  const [totalCollected, setTotalCollected] = useState<number>(() => {
    const saved = localStorage.getItem('sd_total_collected');
    return saved ? JSON.parse(saved) : 150000;
  });

  const [clubs, setClubs] = useState<InterestClub[]>(() => {
    const saved = localStorage.getItem('sd_clubs');
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  const [chatThreads, setChatThreads] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('sd_chats');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_THREADS;
  });

  const [activeChatId, setActiveChatId] = useState<string>('chat-anna');
  const [userCreatedAdsCount, setUserCreatedAdsCount] = useState<number>(0);

  // Modals
  const [isCreateAdModalOpen, setIsCreateAdModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sd_posts_v2', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('sd_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('sd_eco', JSON.stringify(ecoMetrics));
  }, [ecoMetrics]);

  useEffect(() => {
    localStorage.setItem('sd_events_v2', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('sd_votes', JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem('sd_contributions', JSON.stringify(contributions));
  }, [contributions]);

  useEffect(() => {
    localStorage.setItem('sd_total_collected', JSON.stringify(totalCollected));
  }, [totalCollected]);

  useEffect(() => {
    localStorage.setItem('sd_clubs', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('sd_chats', JSON.stringify(chatThreads));
  }, [chatThreads]);

  // Handlers for Feed
  const handleAddPost = (
    content: string, 
    badge: string = 'Новость',
    pollData?: { question: string; options: string[] },
    images?: string[]
  ) => {
    let poll = undefined;
    if (pollData) {
      poll = {
        id: `poll-${Date.now()}`,
        question: pollData.question,
        options: pollData.options.map((optText, i) => ({
          id: `opt-${Date.now()}-${i}`,
          text: optText,
          votes: 0
        })),
        totalVotes: 0,
        userVotedOptionId: null
      };
    }

    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      author: 'Алексей С.',
      apartment: 'Кв. 42 • Только что',
      timeAgo: 'Только что',
      badge,
      badgeType: poll ? 'question' : (images && images.length > 0 ? 'event' : 'new'),
      content,
      likes: 1,
      isLiked: true,
      repliesCount: 0,
      replies: [],
      poll,
      images: images && images.length > 0 ? images : undefined
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const handleVotePoll = (postId: string, optionId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId && p.poll) {
        const prevVoteId = p.poll.userVotedOptionId;
        if (prevVoteId === optionId) return p;

        const updatedOptions = p.poll.options.map(opt => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          if (opt.id === prevVoteId) {
            return { ...opt, votes: Math.max(opt.votes - 1, 0) };
          }
          return opt;
        });

        const newTotal = prevVoteId ? p.poll.totalVotes : p.poll.totalVotes + 1;

        return {
          ...p,
          poll: {
            ...p.poll,
            options: updatedOptions,
            totalVotes: newTotal,
            userVotedOptionId: optionId
          }
        };
      }
      return p;
    }));
  };

  const handleRetractVotePoll = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId && p.poll && p.poll.userVotedOptionId) {
        const prevVoteId = p.poll.userVotedOptionId;
        const updatedOptions = p.poll.options.map(opt => {
          if (opt.id === prevVoteId) {
            return { ...opt, votes: Math.max(opt.votes - 1, 0) };
          }
          return opt;
        });

        return {
          ...p,
          poll: {
            ...p.poll,
            options: updatedOptions,
            totalVotes: Math.max(p.poll.totalVotes - 1, 0),
            userVotedOptionId: null
          }
        };
      }
      return p;
    }));
  };

  const handleToggleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextLiked = !p.isLiked;
        return {
          ...p,
          isLiked: nextLiked,
          likes: nextLiked ? p.likes + 1 : Math.max(p.likes - 1, 0)
        };
      }
      return p;
    }));
  };

  // Handlers for Ads
  const handleToggleLikeAd = (adId: string) => {
    setAds(prev => prev.map(a => {
      if (a.id === adId) {
        return { ...a, isLiked: !a.isLiked };
      }
      return a;
    }));
  };

  const handleCreateAd = (newAdData: Omit<ClassifiedAd, 'id' | 'timeAgo' | 'rating'>) => {
    const newAd: ClassifiedAd = {
      ...newAdData,
      id: `ad-${Date.now()}`,
      timeAgo: 'Только что',
      rating: 5.0,
      isLiked: false
    };
    setAds(prev => [newAd, ...prev]);
    setUserCreatedAdsCount(prev => prev + 1);
  };

  // Handlers for Yard
  const handleToggleParticipate = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const nextPart = !ev.isParticipating;
        return {
          ...ev,
          isParticipating: nextPart,
          participants: nextPart ? ev.participants + 1 : Math.max(ev.participants - 1, 0)
        };
      }
      return ev;
    }));
  };

  const handleCreateEvent = (newEventData: Omit<YardEvent, 'id' | 'participants' | 'isParticipating'>) => {
    const newEvent: YardEvent = {
      ...newEventData,
      id: `ev-${Date.now()}`,
      participants: 1,
      isParticipating: true
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleAddEcoDeposit = (metricId: string, amount: number) => {
    setEcoMetrics(prev => prev.map(m => {
      if (m.id === metricId) {
        const newCurrent = m.current + amount;
        const newPercent = Math.min(Math.round((newCurrent / m.goal) * 100), 100);
        return {
          ...m,
          current: newCurrent,
          percent: newPercent
        };
      }
      return m;
    }));
  };

  // Handlers for Council
  const handleCastVote = (voteId: string, choice: 'for' | 'against') => {
    setVotes(prev => prev.map(v => {
      if (v.id === voteId) {
        let newFor = v.votesFor;
        let newAgainst = v.votesAgainst;

        if (v.userVote === 'for') newFor--;
        if (v.userVote === 'against') newAgainst--;

        if (choice === 'for') newFor++;
        if (choice === 'against') newAgainst++;

        return {
          ...v,
          userVote: choice,
          votesFor: newFor,
          votesAgainst: newAgainst
        };
      }
      return v;
    }));
  };

  const handleAddContribution = (name: string, amount: number) => {
    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'СД';

    const newContrib: Contribution = {
      id: `cb-${Date.now()}`,
      initials,
      name,
      timeAgo: 'Только что',
      amount
    };

    setContributions(prev => [newContrib, ...prev]);
    setTotalCollected(prev => prev + amount);
  };

  // Handlers for Clubs
  const handleToggleJoinClub = (clubId: string) => {
    setClubs(prev => prev.map(c => {
      if (c.id === clubId) {
        const nextJoined = !c.isJoined;
        return {
          ...c,
          isJoined: nextJoined,
          membersCount: nextJoined ? c.membersCount + 1 : Math.max(c.membersCount - 1, 0)
        };
      }
      return c;
    }));
  };

  // Handlers for Chat
  const handleSendMessage = (chatId: string, text: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'me' as const,
      text,
      time: timeStr
    };

    setChatThreads(prev => prev.map(t => {
      if (t.id === chatId) {
        return {
          ...t,
          lastMessage: text,
          timeAgo: 'Только что',
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));
  };

  const handleOpenDirectChat = (contactName: string) => {
    // Check if thread exists
    let existingThread = chatThreads.find(t => t.name.toLowerCase().includes(contactName.toLowerCase()));

    if (!existingThread) {
      // Create new chat thread
      const newThread: ChatThread = {
        id: `chat-${Date.now()}`,
        name: contactName,
        avatarUrl: '',
        icon: 'person',
        iconBg: 'bg-primary-container text-on-primary-container',
        lastMessage: 'Диалог начат',
        timeAgo: 'Только что',
        isOnline: true,
        messages: [
          {
            id: `msg-init-${Date.now()}`,
            sender: 'other',
            senderName: contactName,
            text: `Здравствуйте! Пишу по поводу вашего обращения в СоседиДел. Чем могу помочь?`,
            time: 'Сейчас'
          }
        ]
      };
      setChatThreads(prev => [newThread, ...prev]);
      setActiveChatId(newThread.id);
    } else {
      setActiveChatId(existingThread.id);
    }

    setCurrentScreen('chaty');
  };

  // Calculations for profile
  const savedAdsCount = ads.filter(a => a.isLiked).length;
  const activeDialogsCount = chatThreads.length;
  const unreadChatsCount = chatThreads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        unreadChatsCount={unreadChatsCount}
        newAdsCount={ads.length}
        isOpenMobile={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Area (offset by 240px for left sidebar on desktop) */}
      <div className="lg:pl-[240px] flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onToggleMobileNav={() => setIsMobileNavOpen(true)}
          onSelectScreen={setCurrentScreen}
        />

        {/* Screen Switcher */}
        <main className="relative pt-16 bg-surface min-h-screen p-4 lg:p-8 flex-1">
          {currentScreen === 'dom' && (
            <HomeScreen
              posts={posts}
              onAddPost={handleAddPost}
              onToggleLike={handleToggleLikePost}
              onNavigateScreen={setCurrentScreen}
              onOpenDirectChat={handleOpenDirectChat}
              onVotePoll={handleVotePoll}
              onRetractVotePoll={handleRetractVotePoll}
              searchFilter={globalSearch}
            />
          )}

          {currentScreen === 'obyavleniya' && (
            <AdsScreen
              ads={ads}
              onToggleLikeAd={handleToggleLikeAd}
              onOpenDirectChat={handleOpenDirectChat}
              onOpenCreateAdModal={() => setIsCreateAdModalOpen(true)}
              globalSearchQuery={globalSearch}
            />
          )}

          {currentScreen === 'dvor' && (
            <YardScreen
              ecoMetrics={ecoMetrics}
              events={events}
              onToggleParticipate={handleToggleParticipate}
              onOpenCreateEventModal={() => setIsCreateEventModalOpen(true)}
              onAddEcoDeposit={handleAddEcoDeposit}
            />
          )}

          {currentScreen === 'sovet-doma' && (
            <CouncilScreen
              votes={votes}
              contributions={contributions}
              totalCollected={totalCollected}
              targetAmount={200000}
              onCastVote={handleCastVote}
              onAddContribution={handleAddContribution}
            />
          )}

          {currentScreen === 'mastera' && (
            <MastersScreen
              masters={INITIAL_MASTERS}
              studios={INITIAL_STUDIOS}
              onOpenDirectChat={handleOpenDirectChat}
              globalSearchQuery={globalSearch}
            />
          )}

          {currentScreen === 'znakomstva' && (
            <DatingScreen
              neighbors={INITIAL_NEIGHBORS}
              clubs={clubs}
              onOpenDirectChat={handleOpenDirectChat}
              onToggleJoinClub={handleToggleJoinClub}
              globalSearchQuery={globalSearch}
            />
          )}

          {currentScreen === 'chaty' && (
            <ChatScreen
              chatThreads={chatThreads}
              activeChatId={activeChatId}
              onSelectChat={setActiveChatId}
              onSendMessage={handleSendMessage}
            />
          )}

          {currentScreen === 'karta' && (
            <MapScreen
              onNavigateScreen={setCurrentScreen}
              onOpenDirectChat={handleOpenDirectChat}
            />
          )}

          {currentScreen === 'profil' && (
            <ProfileScreen
              adsCount={userCreatedAdsCount}
              savedCount={savedAdsCount}
              dialogsCount={activeDialogsCount}
              dealsCount={1}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <CreateAdModal
        isOpen={isCreateAdModalOpen}
        onClose={() => setIsCreateAdModalOpen(false)}
        onSubmit={handleCreateAd}
      />

      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        onClose={() => setIsCreateEventModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
}
