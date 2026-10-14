export type ScreenType = 
  | 'dom' 
  | 'obyavleniya' 
  | 'dvor' 
  | 'sovet-doma' 
  | 'mastera' 
  | 'znakomstva' 
  | 'chaty' 
  | 'karta' 
  | 'profil';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId?: string | null;
  isClosed?: boolean;
}

export interface FeedPost {
  id: string;
  author: string;
  apartment: string;
  timeAgo: string;
  badge: string;
  badgeType: 'silence' | 'master' | 'utilities' | 'service' | 'event' | 'free' | 'lost' | 'question' | 'new';
  content: string;
  likes: number;
  isLiked?: boolean;
  repliesCount: number;
  replies?: Array<{
    id: string;
    author: string;
    timeAgo: string;
    content: string;
  }>;
  poll?: PollData;
  images?: string[];
}

export interface ClassifiedAd {
  id: string;
  title: string;
  price: string;
  priceRaw?: number;
  category: 'sale' | 'rent' | 'free' | 'services' | 'lost';
  categoryLabel: string;
  location: string;
  timeAgo: string;
  rating: number;
  icon: string;
  isLiked?: boolean;
  description?: string;
}

export interface EcoMetric {
  id: string;
  name: string;
  icon: string;
  current: number;
  goal: number;
  unit: string;
  percent: number;
}

export interface YardEvent {
  id: string;
  day: string;
  month: string;
  time: string;
  category: string;
  categoryType: 'ecology' | 'leisure' | 'all';
  title: string;
  description: string;
  participants: number;
  isParticipating?: boolean;
}

export interface CouncilVote {
  id: string;
  title: string;
  tag: string;
  statusText: string;
  votesFor: number;
  votesAgainst: number;
  userVote?: 'for' | 'against' | null;
  isClosed?: boolean;
  resolutionStatus?: string;
}

export interface Contribution {
  id: string;
  initials: string;
  name: string;
  timeAgo: string;
  amount: number;
}

export interface Master {
  id: string;
  name: string;
  category: 'repair' | 'beauty' | 'education' | 'household';
  categoryLabel: string;
  role: string;
  icon: string;
  description: string;
  rating: number;
  reviewsCount: number;
  priceFrom: number;
  image: string;
  verified: boolean;
  phone?: string;
}

export interface Studio {
  id: string;
  name: string;
  location: string;
  priceFrom: number;
  rating: number;
  image: string;
}

export interface Neighbor {
  id: string;
  name: string;
  age: number;
  location: string;
  emoji: string;
  tags: string[];
}

export interface InterestClub {
  id: string;
  name: string;
  emoji: string;
  membersCount: number;
  isJoined?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  senderName?: string;
  text: string;
  time: string;
}

export interface ChatThread {
  id: string;
  name: string;
  avatarUrl?: string;
  icon?: string;
  iconBg?: string;
  lastMessage: string;
  timeAgo: string;
  isOnline?: boolean;
  unreadCount?: number;
  messages: ChatMessage[];
}

export interface MapPoint {
  id: string;
  title: string;
  category: 'building' | 'eco' | 'master' | 'event' | 'facility';
  categoryLabel: string;
  x: number; // percentage in SVG coordinate
  y: number;
  description: string;
  details?: string;
}
