import { 
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
  ChatThread,
  MapPoint
} from '../types';

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-poll-demo',
    author: 'Совет дома (Иван П.)',
    apartment: 'Кв. 14 • 10 минут назад',
    timeAgo: '10 минут назад',
    badge: 'Опрос',
    badgeType: 'question',
    content: 'Соседи, определяемся со временем начала субботника в эту субботу. Во сколько большинству удобнее выйти во двор?',
    likes: 16,
    isLiked: false,
    repliesCount: 5,
    poll: {
      id: 'poll-1',
      question: 'Во сколько начинаем субботник во дворе?',
      options: [
        { id: 'opt-1', text: '10:00 — пока не жарко', votes: 14 },
        { id: 'opt-2', text: '11:00 — оптимально, успеем выспаться', votes: 28 },
        { id: 'opt-3', text: '12:00 — в полдень', votes: 8 },
        { id: 'opt-4', text: '18:00 — вечерний формат', votes: 6 }
      ],
      totalVotes: 56,
      userVotedOptionId: 'opt-2'
    }
  },
  {
    id: 'post-yard-gallery',
    author: 'Елена (Ландшафтный комитет)',
    apartment: 'Кв. 29 • 25 минут назад',
    timeAgo: '25 минут назад',
    badge: 'Благоустройство',
    badgeType: 'event',
    content: 'Соседи, делимся фотоотчетом о благоустройстве двора корпуса 2! Завершили высадку цветников с лавандой, протестировали детскую эко-площадку и смонтировали крытый велопаркинг. Оцените результат!',
    likes: 47,
    isLiked: true,
    repliesCount: 8,
    images: [
      '/src/assets/images/yard_flowerbed_1791989171861.jpg',
      '/src/assets/images/playground_plan_1791989169990.jpg',
      '/src/assets/images/bike_storage_area_1791989170331.jpg'
    ],
    replies: [
      { id: 'rep-yard-1', author: 'Михаил (Кв. 18)', timeAgo: '15 минут назад', content: 'Цветники получились потрясающие! Огромное спасибо инициативной группе!' },
      { id: 'rep-yard-2', author: 'Алина (Кв. 74)', timeAgo: '8 минут назад', content: 'Велопарковка очень удобная, уже поставили детские велосипеды.' }
    ]
  },
  {
    id: 'post-lobby-renovation',
    author: 'Управляющая компания «Комфорт»',
    apartment: 'Администрация • 1 час назад',
    timeAgo: '1 час назад',
    badge: 'Новость',
    badgeType: 'new',
    content: 'Завершены отделочные работы в парадном вестибюле корпуса 2! Установлены стильные почтовые ячейки, консьерж-стойка и теплое освещение.',
    likes: 38,
    isLiked: false,
    repliesCount: 4,
    images: [
      '/src/assets/images/lobby_renovation_1791989169744.jpg'
    ]
  },
  {
    id: 'post-1',
    author: 'Анна',
    apartment: 'Кв. 12 • 15 минут назад',
    timeAgo: '15 минут назад',
    badge: 'Тишина',
    badgeType: 'silence',
    content: 'Коллеги, уложу ребёнка спать с 13:00 до 15:00. Прошу паузу в шумных работах 🙏',
    likes: 12,
    isLiked: false,
    repliesCount: 4,
    replies: [
      { id: 'rep-1', author: 'Мастер Игорь', timeAgo: '12 минут назад', content: 'Принято, переходим на бесшумные отделочные работы!' },
      { id: 'rep-2', author: 'Дмитрий (Кв. 40)', timeAgo: '8 минут назад', content: 'Спасибо за предупреждение, дрель отложили.' }
    ]
  },
  {
    id: 'post-2',
    author: 'Мастер Игорь',
    apartment: 'Кв. 48 • 32 минуты назад',
    timeAgo: '32 минуты назад',
    badge: 'Мастер',
    badgeType: 'master',
    content: 'Принято! Делаем перерыв на штробление до 15:00. Уважаем соседей 🛠️',
    likes: 28,
    isLiked: false,
    repliesCount: 1,
    replies: [
      { id: 'rep-3', author: 'Анна', timeAgo: '30 минут назад', content: 'Огромное спасибо!' }
    ]
  },
  {
    id: 'post-3',
    author: 'Ольга',
    apartment: 'Кв. 5 • 1 час назад',
    timeAgo: '1 час назад',
    badge: 'ЖКХ',
    badgeType: 'utilities',
    content: 'Кто-нибудь знает, почему отключили горячую воду? В УК не дозвониться, авария или плановые работы?',
    likes: 5,
    isLiked: false,
    repliesCount: 9,
    replies: [
      { id: 'rep-4', author: 'Диспетчер ЖК', timeAgo: '45 минут назад', content: 'Плановая опрессовка стояка в корпусе 2 до 14:30. Скоро подача возобновится.' }
    ]
  },
  {
    id: 'post-4',
    author: 'Сергей',
    apartment: 'Кв. 22 • 2 часа назад',
    timeAgo: '2 часа назад',
    badge: 'Услуги',
    badgeType: 'service',
    content: 'Ищу мастера для сборки шкафа, кто может посоветовать проверенного человека из нашего дома?',
    likes: 3,
    isLiked: false,
    repliesCount: 6,
    replies: [
      { id: 'rep-5', author: 'Сергей Волков', timeAgo: '1 час назад', content: 'Здравствуйте! Я мастер по сборке мебели, живу в корпусе 3. Могу подойти вечером.' }
    ]
  },
  {
    id: 'post-5',
    author: 'Наталья',
    apartment: 'Кв. 8 • 3 часа назад',
    timeAgo: '3 часа назад',
    badge: 'Событие',
    badgeType: 'event',
    content: 'Сегодня в 19:00 субботник у второго подъезда, кто с нами? Инвентарь выдадим на месте 🌱',
    likes: 19,
    isLiked: false,
    repliesCount: 12
  },
  {
    id: 'post-6',
    author: 'Дмитрий',
    apartment: 'Кв. 33 • 4 часа назад',
    timeAgo: '4 часа назад',
    badge: 'Отдам',
    badgeType: 'free',
    content: 'Отдам детские книги 3-6 лет в отличном состоянии, самовывоз из 3-го подъезда 📚',
    likes: 8,
    isLiked: false,
    repliesCount: 3
  },
  {
    id: 'post-7',
    author: 'Мария',
    apartment: 'Кв. 17 • 5 часов назад',
    timeAgo: '5 часов назад',
    badge: 'Поиск',
    badgeType: 'lost',
    content: 'Пропала кошка, рыжая, пушистая, отзывается на Мурку. Район Северный парк, может прятаться в саду или под лавочками. Буду признательна за любую информацию!',
    likes: 34,
    isLiked: false,
    repliesCount: 15,
    images: [
      '/src/assets/images/cat_in_courtyard_1791989170295.jpg'
    ]
  },
  {
    id: 'post-8',
    author: 'Артём',
    apartment: 'Кв. 40 • 6 часов назад',
    timeAgo: '6 часов назад',
    badge: 'Вопрос',
    badgeType: 'question',
    content: 'Кто-нибудь знает хорошего репетитора по математике для 9 класса? Желательно с выездом на дом или онлайн по нашему району 📐',
    likes: 4,
    isLiked: false,
    repliesCount: 7
  }
];

export const INITIAL_ADS: ClassifiedAd[] = [
  {
    id: 'ad-1',
    title: 'Горный велосипед Stels',
    price: '15 000 ₽',
    priceRaw: 15000,
    category: 'sale',
    categoryLabel: 'Продажа',
    location: 'Подъезд 3 • 2 мин назад',
    timeAgo: '2 мин назад',
    rating: 4.9,
    icon: '🚲',
    isLiked: false,
    description: 'В отличном состоянии, катались один сезон. Дисковые тормоза, 21 скорость. Торг уместен.'
  },
  {
    id: 'ad-2',
    title: 'Энциклопедии СССР (10 шт)',
    price: 'Самовывоз',
    priceRaw: 0,
    category: 'free',
    categoryLabel: 'Даром',
    location: 'Кв. 112 • 10 мин назад',
    timeAgo: '10 мин назад',
    rating: 5.0,
    icon: '📚',
    isLiked: false,
    description: 'Большая советская энциклопедия, идеальное состояние страниц. Жалко выбрасывать.'
  },
  {
    id: 'ad-3',
    title: 'Муж на час / Мебель',
    price: 'от 1 000 ₽',
    priceRaw: 1000,
    category: 'services',
    categoryLabel: 'Услуги',
    location: 'Кв. 45 • 25 мин назад',
    timeAgo: '25 мин назад',
    rating: 4.8,
    icon: '🛠️',
    isLiked: false,
    description: 'Повешу полки, карнизы, люстры, заменю смеситель, мелкий ремонт по дому.'
  },
  {
    id: 'ad-4',
    title: 'Машиноместо №42',
    price: '7 000 ₽ / мес',
    priceRaw: 7000,
    category: 'rent',
    categoryLabel: 'Аренда',
    location: 'Паркинг -1 • 1 ч назад',
    timeAgo: '1 ч назад',
    rating: 5.0,
    icon: '🅿️',
    isLiked: false,
    description: 'Сухое теплое место прямо у лифта 2 подъезда. Видеонаблюдение, круглосуточная охрана.'
  },
  {
    id: 'ad-5',
    title: 'Найден кот рыжий',
    price: 'Во дворе у 2 под.',
    priceRaw: 0,
    category: 'lost',
    categoryLabel: 'Потеряшки',
    location: 'Двор • 2 ч назад',
    timeAgo: '2 ч назад',
    rating: 4.9,
    icon: '🐱',
    isLiked: false,
    description: 'Сидит на лавочке у входа в подъезд, с красным ошейником. Забрали на передержку в кв. 14.'
  },
  {
    id: 'ad-6',
    title: 'Офисное кресло IKEA',
    price: '4 500 ₽',
    priceRaw: 4500,
    category: 'sale',
    categoryLabel: 'Продажа',
    location: 'Кв. 88 • 3 ч назад',
    timeAgo: '3 ч назад',
    rating: 4.7,
    icon: '🪑',
    isLiked: false,
    description: 'Модель Маркус, сетка на спинке, газлифт исправен. Самовывоз.'
  },
  {
    id: 'ad-7',
    title: 'Цветок Фикус в горшке',
    price: 'Даром',
    priceRaw: 0,
    category: 'free',
    categoryLabel: 'Даром',
    location: 'Кв. 12 • 4 ч назад',
    timeAgo: '4 ч назад',
    rating: 5.0,
    icon: '🪴',
    isLiked: false,
    description: 'Высота около 1 метра, пышный и здоровый. Отдаем в связи с переездом.'
  },
  {
    id: 'ad-8',
    title: 'Маникюр на дому',
    price: '1 500 ₽',
    priceRaw: 1500,
    category: 'services',
    categoryLabel: 'Услуги',
    location: 'Кв. 154 • 5 ч назад',
    timeAgo: '5 ч назад',
    rating: 4.9,
    icon: '💅',
    isLiked: false,
    description: 'Аппаратный и комбинированный маникюр, выравнивание, стойкое покрытие гель-лаком.'
  },
  {
    id: 'ad-9',
    title: 'Электрогитара Fender',
    price: '500 ₽ / день',
    priceRaw: 500,
    category: 'rent',
    categoryLabel: 'Аренда',
    location: 'Кв. 67 • 6 ч назад',
    timeAgo: '6 ч назад',
    rating: 4.8,
    icon: '🎸',
    isLiked: false,
    description: 'Squier Stratocaster с комбиком и шнуром. Отличный вариант попробовать инструмент.'
  },
  {
    id: 'ad-10',
    title: 'Связка ключей с брелком',
    price: 'У лифта 1 под.',
    priceRaw: 0,
    category: 'lost',
    categoryLabel: 'Потеряшки',
    location: 'Подъезд 1 • 7 ч назад',
    timeAgo: '7 ч назад',
    rating: 5.0,
    icon: '🔑',
    isLiked: false,
    description: '3 ключа и магнитная таблетка с синим брелком-мишкой. Оставлены у консьержа.'
  },
  {
    id: 'ad-11',
    title: 'Телевизор LG 43"',
    price: '22 000 ₽',
    priceRaw: 22000,
    category: 'sale',
    categoryLabel: 'Продажа',
    location: 'Кв. 201 • 8 ч назад',
    timeAgo: '8 ч назад',
    rating: 4.9,
    icon: '📺',
    isLiked: false,
    description: 'Smart TV, 4K Ultra HD, пульт Magic Remote в комплекте. Работает идеально.'
  },
  {
    id: 'ad-12',
    title: 'Коробки для переезда (15 шт)',
    price: 'Даром',
    priceRaw: 0,
    category: 'free',
    categoryLabel: 'Даром',
    location: 'Кв. 34 • 9 ч назад',
    timeAgo: '9 ч назад',
    rating: 5.0,
    icon: '📦',
    isLiked: false,
    description: 'Плотный пятислойный гофрокартон, аккуратно сложены, чистые.'
  },
  {
    id: 'ad-13',
    title: 'Ремонт ПК и ноутбуков',
    price: 'Договорная',
    priceRaw: 800,
    category: 'services',
    categoryLabel: 'Услуги',
    location: 'Кв. 92 • 10 ч назад',
    timeAgo: '10 ч назад',
    rating: 4.9,
    icon: '💻',
    isLiked: false,
    description: 'Чистка от пыли, замена термопасты, переустановка ОС, апгрейд SSD и оперативной памяти.'
  },
  {
    id: 'ad-14',
    title: 'Объектив Sony 35mm f/1.8',
    price: '1 000 ₽ / сутки',
    priceRaw: 1000,
    category: 'rent',
    categoryLabel: 'Аренда',
    location: 'Кв. 110 • 12 ч назад',
    timeAgo: '12 ч назад',
    rating: 5.0,
    icon: '📷',
    isLiked: false,
    description: 'Светосильный полнокадровый фикс-объектив для съемки портретов и стрит-фото.'
  },
  {
    id: 'ad-15',
    title: 'Детская кепка Nike',
    price: 'На детской площадке',
    priceRaw: 0,
    category: 'lost',
    categoryLabel: 'Потеряшки',
    location: 'Двор • 14 ч назад',
    timeAgo: '14 ч назад',
    rating: 4.6,
    icon: '🧢',
    isLiked: false,
    description: 'Синяя детская кепка найдена на качелях. Ждет хозяина в охране 1 корпуса.'
  },
  {
    id: 'ad-16',
    title: 'Набор гантелей разборных',
    price: '6 000 ₽',
    priceRaw: 6000,
    category: 'sale',
    categoryLabel: 'Продажа',
    location: 'Кв. 5 • 15 ч назад',
    timeAgo: '15 ч назад',
    rating: 4.9,
    icon: '🏋️‍♂️',
    isLiked: false,
    description: 'Пара гантелей до 20 кг каждая. Хромированные грифы, обрезиненные блины.'
  },
  {
    id: 'ad-17',
    title: 'Мягкие игрушки пакет',
    price: 'Даром',
    priceRaw: 0,
    category: 'free',
    categoryLabel: 'Даром',
    location: 'Кв. 78 • 16 ч назад',
    timeAgo: '16 ч назад',
    rating: 5.0,
    icon: '🧸',
    isLiked: false,
    description: 'Чистые мягкие игрушки после стирки, ребенок вырос.'
  },
  {
    id: 'ad-18',
    title: 'Выгул собак в районе',
    price: '400 ₽ / прогулка',
    priceRaw: 400,
    category: 'services',
    categoryLabel: 'Услуги',
    location: 'Кв. 14 • 18 ч назад',
    timeAgo: '18 ч назад',
    rating: 5.0,
    icon: '🐾',
    isLiked: false,
    description: 'Опытный собаковод, погуляю с вашей собакой утром или вечером. Мытье лап входит.'
  },
  {
    id: 'ad-19',
    title: 'Моющий пылесос Karcher',
    price: '800 ₽ / сутки',
    priceRaw: 800,
    category: 'rent',
    categoryLabel: 'Аренда',
    location: 'Кв. 132 • 20 ч назад',
    timeAgo: '20 ч назад',
    rating: 4.9,
    icon: '🧹',
    isLiked: false,
    description: 'Профессиональный экстрактор для химчистки мягкой мебели, матрасов и ковролина.'
  },
  {
    id: 'ad-20',
    title: 'Зонт черный автомат',
    price: 'В холле 1 подъезда',
    priceRaw: 0,
    category: 'lost',
    categoryLabel: 'Потеряшки',
    location: 'Холл • 1 день назад',
    timeAgo: '1 день назад',
    rating: 4.8,
    icon: '☂️',
    isLiked: false,
    description: 'Забыт на стойке для зонтов во время вчерашнего дождя.'
  }
];

export const INITIAL_ECO_METRICS: EcoMetric[] = [
  { id: 'eco-1', name: 'Макулатура', icon: 'description', current: 420, goal: 500, unit: 'кг', percent: 84 },
  { id: 'eco-2', name: 'Пластик', icon: 'autorenew', current: 85, goal: 100, unit: 'кг', percent: 85 },
  { id: 'eco-3', name: 'Батарейки', icon: 'battery_charging_full', current: 120, goal: 150, unit: 'шт', percent: 80 },
  { id: 'eco-4', name: 'Стекло', icon: 'wine_bar', current: 34, goal: 50, unit: 'кг', percent: 68 },
];

export const INITIAL_YARD_EVENTS: YardEvent[] = [
  {
    id: 'ev-1',
    day: '15',
    month: 'июн',
    time: '12:00',
    category: 'Субботник',
    categoryType: 'ecology',
    title: 'Субботник у второго подъезда',
    description: 'Приглашаем всех жителей навести порядок у второго подъезда: высадим цветы, приведем в порядок клумбы и пообщаемся.',
    participants: 18,
    isParticipating: true
  },
  {
    id: 'ev-2',
    day: '16',
    month: 'июн',
    time: '15:00',
    category: 'Обмен',
    categoryType: 'leisure',
    title: 'Ярмарка «Отдам даром»',
    description: 'Давайте подарим вторую жизнь вещам, которые вам больше не нужны: книги, детские игрушки, комнатные растения.',
    participants: 24,
    isParticipating: false
  },
  {
    id: 'ev-running',
    day: '18',
    month: 'июн',
    time: '19:30',
    category: 'Спорт',
    categoryType: 'leisure',
    title: 'Вечерняя пробежка и разминка',
    description: 'Круговая пробежка вокруг парка и суставная разминка на спортивной площадке двора. Темп комфортный для всех.',
    participants: 15,
    isParticipating: true
  },
  {
    id: 'ev-4',
    day: '20',
    month: 'июн',
    time: 'Весь день',
    category: 'Сбор средств · Экология',
    categoryType: 'ecology',
    title: 'Закупка саженцев для двора',
    description: 'Собираем средства на покупку многолетних кустарников и туй для озеленения центральной аллеи двора.',
    participants: 31,
    isParticipating: false
  },
  {
    id: 'ev-5',
    day: '22',
    month: 'июн',
    time: '18:00',
    category: 'Турнир',
    categoryType: 'leisure',
    title: 'Турнир по шахматам в беседке',
    description: 'Классический турнир для всех любителей шахмат. Приглашаем участников любого возраста побороться за кубок двора.',
    participants: 12,
    isParticipating: false
  },
  {
    id: 'ev-6',
    day: '25',
    month: 'июн',
    time: '09:00 - 20:00',
    category: 'Эко-акция · Утилизация',
    categoryType: 'ecology',
    title: 'Эко-акция «Сдай батарейки»',
    description: 'Специальный пункт сбора отработавших батареек и мелких аккумуляторов возле пункта охраны для безопасной утилизации.',
    participants: 28,
    isParticipating: false
  },
  {
    id: 'ev-boardgames',
    day: '28',
    month: 'июн',
    time: '19:00',
    category: 'Досуг',
    categoryType: 'leisure',
    title: 'Вечер настольных игр на террасе',
    description: 'Играем в Catan, Каркассон и Alias на открытом воздухе в беседке 2 корпуса. Приносите свои любимые игры и чай!',
    participants: 20,
    isParticipating: false
  },
  {
    id: 'ev-3',
    day: '01',
    month: 'июл',
    time: '11:00',
    category: 'Праздник',
    categoryType: 'leisure',
    title: 'Детский праздник во дворе',
    description: 'Веселые аниматоры, игры на свежем воздухе, конкурсы и сладкие призы для всех детей нашего двора.',
    participants: 42,
    isParticipating: false
  },
  {
    id: 'ev-recycle-july',
    day: '05',
    month: 'июл',
    time: '10:00 - 14:00',
    category: 'Раздельный сбор',
    categoryType: 'ecology',
    title: 'Большой сбор макулатуры и пластика',
    description: 'Выездной эко-мобиль примет картон, книги, пластиковые бутылки и крышечки. Все вырученные средства пойдут в фонд двора.',
    participants: 35,
    isParticipating: false
  },
  {
    id: 'ev-cinema-july',
    day: '12',
    month: 'июл',
    time: '21:30',
    category: 'Кинопоказ',
    categoryType: 'leisure',
    title: 'Летний кинотеатр под звездами',
    description: 'Уютный показ семейного фильма на проекторе на центральном газоне. Берите с собой пледы и термосы с чаем.',
    participants: 58,
    isParticipating: true
  },
  {
    id: 'ev-planting-july',
    day: '18',
    month: 'июл',
    time: '11:00',
    category: 'Озеленение',
    categoryType: 'ecology',
    title: 'Посадка гортензий и многолетников',
    description: 'Обустраиваем живую изгородь вдоль детской площадки. Лопаты, перчатки и удобрения предоставляются УК.',
    participants: 22,
    isParticipating: false
  },
  {
    id: 'ev-fest-aug',
    day: '08',
    month: 'авг',
    time: '13:00',
    category: 'Фестиваль',
    categoryType: 'leisure',
    title: 'День добрососедства и дворовый пикник',
    description: 'Большой ежегодный праздник двора ЖК Северный парк: музыка, мастер-классы, домашняя выпечка и награждение активных соседей.',
    participants: 76,
    isParticipating: false
  }
];

export const INITIAL_COUNCIL_VOTES: CouncilVote[] = [
  {
    id: 'vote-1',
    title: 'Установить шлагбаум на въезде?',
    tag: 'Безопасность',
    statusText: 'Завершается через 3 дня',
    votesFor: 87,
    votesAgainst: 41,
    userVote: 'for'
  },
  {
    id: 'vote-2',
    title: 'Нанять консьержа в подъезд?',
    tag: 'Сервис',
    statusText: 'Активно',
    votesFor: 58,
    votesAgainst: 70,
    userVote: null
  },
  {
    id: 'vote-3',
    title: 'Установить видеонаблюдение?',
    tag: 'Безопасность',
    statusText: 'Завершается сегодня',
    votesFor: 105,
    votesAgainst: 23,
    userVote: 'for'
  },
  {
    id: 'vote-4',
    title: 'Ремонт лифта в 1-м подъезде',
    tag: 'Ремонт',
    statusText: 'Принято',
    votesFor: 116,
    votesAgainst: 12,
    userVote: 'for',
    isClosed: true,
    resolutionStatus: 'Закупка материалов'
  }
];

export const INITIAL_CONTRIBUTIONS: Contribution[] = [
  { id: 'cb-1', initials: 'ИП', name: 'Иван П.', timeAgo: '2 дня назад', amount: 5000 },
  { id: 'cb-2', initials: 'АС', name: 'Анна С.', timeAgo: '3 дня назад', amount: 2000 },
  { id: 'cb-3', initials: 'ДМ', name: 'Дмитрий М.', timeAgo: '5 дней назад', amount: 10000 },
];

export const INITIAL_MASTERS: Master[] = [
  {
    id: 'm-1',
    name: 'Игорь Петров',
    category: 'repair',
    categoryLabel: 'Ремонт',
    role: 'Электрик',
    icon: 'wrench',
    description: 'Монтаж проводки, подключение приборов, устранение коротких замыканий. Стаж 10 лет.',
    rating: 4.9,
    reviewsCount: 48,
    priceFrom: 1500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkLdbnAOdxPczcdXy-YhFdHbWHMkU0DzPQnFplD4ybY7JAoc8zBRZVNFLJCTjV43qc1IldVt4PbWnTRiYi2ebFgL84teY9GtQf-gU2xK3L-pzCmqJrgnntuofP6yTooNcVpKwA4G1HtQqlZypoYx3Oz6qOLkC6Rs0Y1jXCzrKovuQ_gMyBW6EKriY5gBmT_MgGiMXJu1uh-Cis0DrQ9oZpqD7FkXeOW_CAfwCxcl-xkNRmcdvNXmB8',
    verified: true,
    phone: '+7 (916) 452-98-11'
  },
  {
    id: 'm-2',
    name: 'Алексей Сидоров',
    category: 'repair',
    categoryLabel: 'Ремонт',
    role: 'Сантехник',
    icon: 'shower',
    description: 'Установка сантехники, замена труб, устранение протечек. Работаю быстро и аккуратно.',
    rating: 4.8,
    reviewsCount: 36,
    priceFrom: 1200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7nGCOUheocszKsTY8HwdoVlIoW5MkVJY_qnNOTBiZ12_uhrbpwOoLpzKZsjFzyBa1AqdgpIeY4UuGx5KNaQP4DfbGFZ3q6nsYhh--tAPDu9yTZcYrGtCLog7BKYOFk1lIyVqF10aaIavGMWtd3XQIUJPEWqA92WftPXPKIT9kS-JxRNAAo_G2E8nF-FRpdCKbvjb3BFzuCEx-pjbKVD8lo578pOMbzWJhkM9PhFnUp4huuZtnR5cl',
    verified: true,
    phone: '+7 (926) 331-10-82'
  },
  {
    id: 'm-3',
    name: 'Анна Иванова',
    category: 'beauty',
    categoryLabel: 'Красота',
    role: 'Мастер маникюра',
    icon: 'spa',
    description: 'Стерильный инструмент, гель-лак, дизайн любой сложности, укрепление ногтевой пластины.',
    rating: 5.0,
    reviewsCount: 92,
    priceFrom: 1200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC-mEThK-pulD7ISH46YLcUMdOoUtQntI1P7wQShpigf4_CCZ5HDwYEyCAr6a-lzsV3FKU385irQPSM-S-E7zwyOgHKguapc5LmCutrheUZRbwf1Oc3N1t3ZdWm5MYgKx2etI_o8nbxuikTPfOHFv9-A934Egcb2vNRIaaq6Fh4Be044JHZ_UwuynJtwQmg5coyZV3iCcOdArTSW_d6LvidPg0SxctissfgK4avoGgatM37XgPPmK8',
    verified: true,
    phone: '+7 (903) 774-22-19'
  },
  {
    id: 'm-4',
    name: 'Ольга Смирнова',
    category: 'beauty',
    categoryLabel: 'Красота',
    role: 'Парикмахер',
    icon: 'scissors',
    description: 'Стрижки, окрашивание любой сложности, уход за волосами прямо у вас дома.',
    rating: 4.9,
    reviewsCount: 64,
    priceFrom: 800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZFPpIZjqdavB0SHSbrf-1F9tyookZwBPMAHAUAYPUQkA347QPcugUtlIY6ZhlGd_mSbbB0B_1kVclnuPhEBDmbI9-Oe0mmN7U1qK7cpE4VQ3gXT3fQIewIvsUe-Vq0LxsHml_lbCNTacBR5GH5ODJdjb-fgObC_aOiNLK1zH3Evyq13XdYF0zooCaovQNs5O8MxL4TEEP_R4PaqGcVHQ83wpNSfG4LBv02RI-y9lJe5i1HxP0Pv6M',
    verified: true,
    phone: '+7 (915) 129-45-67'
  },
  {
    id: 'm-5',
    name: 'Дмитрий Козлов',
    category: 'education',
    categoryLabel: 'Обучение',
    role: 'Репетитор',
    icon: 'school',
    description: 'Подготовка к ОГЭ и ЕГЭ по математике и физике. Понятное объяснение сложных тем.',
    rating: 4.9,
    reviewsCount: 51,
    priceFrom: 1000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqgZe4glETg95d4_dmsfY987DMm-XcGLOEgg_JcfWlVvMMRZycsO4acs2mtRycccCsm_WNSzeP_EYyKE8IB_I5hj0xKM6Pz1tUqefByFCinm9ha6-XNe3Mf59UZ7qA8e54PluMvbYctSOV7fkJDqimGg7f9QwM3L483NZ97kfpTd0sb8bTGQMstrqu9nOFnRNtH5eIlJl3QCEqhBSUzrhv8Y1in3C5XdSdQ1ax6JQxq-se9EixP_Q2',
    verified: true,
    phone: '+7 (925) 880-14-30'
  },
  {
    id: 'm-6',
    name: 'Елена Морозова',
    category: 'household',
    categoryLabel: 'Быт',
    role: 'Клининг',
    icon: 'cleaning_services',
    description: 'Генеральная уборка, после ремонта, мойка окон. Профессиональная химия и инвентарь.',
    rating: 4.7,
    reviewsCount: 78,
    priceFrom: 1500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArug2J4Nsud_4uVXte9UTHd0u1gc7FPDyyi9SdaHX4TnDuimjHylcgXPm0IXkOqeBi1ED5w8FjpGSWkZW3FJ9RAnl1LEIM4NwFceLIvepnRpwL3ah6I-ZmOwDY4gfeHo3CToxuSDqUuIjDJyO1oEp9t9LvsSdrIbBJL6aQ7SJIA9goF5Ut5kwKTghAQ4i0PPtHMaKtgsW2XRn2xIE5L2dhMHwcIPhleVRjxpkYOnJ1rYlY-cnBldvs',
    verified: true,
    phone: '+7 (977) 505-12-88'
  },
  {
    id: 'm-7',
    name: 'Сергей Волков',
    category: 'repair',
    categoryLabel: 'Ремонт',
    role: 'Сборщик мебели',
    icon: 'chair',
    description: 'Сборка и разборка любой корпусной и мягкой мебели. Быстро, качественно, без сколов.',
    rating: 4.8,
    reviewsCount: 39,
    priceFrom: 800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCudeaWFzGjD7oKEwdGnPVKQ_VKVq303kmXViE7CFqtrKos9eAs5j2h_t0pNVRRZnTBhpTQskRXilhG-N-v9PEkKdLWMo-Pb-SxKIfj7x1_l8BvAMWEsskfGUBbBM-4YpNS6WDSGtqsrb2razNvgk36PG8ARHAQd2dIJInzUbDErpvAuoXV_m5UQRT9wzF5pYgxrqnRqgLzPd6VZ-C3dIpnNxL9Fh8J9LmLoRNujewrDAlB914pEeBd',
    verified: true,
    phone: '+7 (905) 912-34-56'
  },
  {
    id: 'm-8',
    name: 'Максим Орлов',
    category: 'household',
    categoryLabel: 'Быт',
    role: 'Грузчик',
    icon: 'fitness_center',
    description: 'Квартирные и офисные переезды, подъем тяжелых стройматериалов на этаж аккуратно.',
    rating: 4.6,
    reviewsCount: 29,
    priceFrom: 800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDySFzjzIrOu0qDZYN3BAFfnpM4dyQWqL636GXmRdKBE6Qd4bexI_Gtb8vEO67WZZVAx978oQB_KcFzy4mXIPNj_qlpoN8FclcPvj5EOhvJ64kqBT2Z35WL835wS00wxP9Oy5vt1kzMbhTIwlb1gEcg9JKzANMFEd10_uyzHW4UxBcNfyt2UwnWWqf_0gFIhQnMYDH4aK4TzTOqriX4FEQiU9DpS7-U4aX1-JBGaukG-J_VOvfDyUPJ',
    verified: true,
    phone: '+7 (909) 670-44-22'
  },
  {
    id: 'm-9',
    name: 'Игорь Новиков',
    category: 'education',
    categoryLabel: 'Обучение',
    role: 'Фотограф',
    icon: 'photo_camera',
    description: 'Семейные фотосессии, портреты, репортажи мероприятий в ЖК и за его пределами.',
    rating: 4.9,
    reviewsCount: 84,
    priceFrom: 3000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClphCUW3toayoxZerGUzNacsvR_RewtD3SHGI5oqfkENTmQZHzPHm1FV15bF8nAIVXNYbewhdvQ9Gjy-dRuu36I4xZoLGIJg4riaWwlRQM4z6CH36tpchd7c4_UaZEE7-uV11bWRHmMbPAjkWucUFfqDYuj-pX1IygOLpOChZRFoSXIj5NkJwHaGqgALD8Dx7nX-HHjiqmNgbGwRa31F-vIbqZ3szTPhJ_4bJL9OtPdNaR_ZcONBdt',
    verified: true,
    phone: '+7 (916) 120-77-99'
  },
  {
    id: 'm-10',
    name: 'Наталья Соколова',
    category: 'beauty',
    categoryLabel: 'Красота',
    role: 'Тренер',
    icon: 'sports_gymnastics',
    description: 'Персональные тренировки, растяжка, корректировка осанки, программы питания.',
    rating: 4.8,
    reviewsCount: 45,
    priceFrom: 1500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwBj2_tE-wnrR-5KLmMVbQLgDcqsV-OHW4DW2_qOSGgRABFSXqVy_VV83uQmIZU9qCeOKw7M64FYceO5zcANdHMZY8oV_mmGhSkWfB8r1CzLMBWU_4Qe0nS5mKrd9_pJuZRUzQnI5qbFCuyHfVUWSSGQDJkHKmcHXnl6OY49PmG5wGaEf0Ah7OiQ8P3Lxj73ToitHN27OCHM_YtPogszvTY5O1J0AUNi2v9_7bCraf2ld22huEAGs9',
    verified: true,
    phone: '+7 (985) 441-23-01'
  },
  {
    id: 'm-11',
    name: 'Мария Лебедева',
    category: 'education',
    categoryLabel: 'Обучение',
    role: 'Психолог',
    icon: 'psychology',
    description: 'Индивидуальные консультации, преодоление стресса, уверенность в себе и личные границы.',
    rating: 4.9,
    reviewsCount: 61,
    priceFrom: 2000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Rq9D2okPVHH1bpPN2sW5tfIdrUyffuB3NVl6EVAr2zsgrRPUjAjeY8SKDq4qgFqY-UrKfQ9mVlUwcLFD3voWTEAtnWjhB0oJcl4N27IkeHn_RFRInbdeOHUpzjNXIvUeCKjB_reVoaHK3j-kCYwnwat48P2hMr0GYZr88ruuZ5DbZViI2lmuXSgxdJBd55Tbi-z8AA67soy3IIQ0Jt9ZpXx3F9_6qCf4zpI_4pLYElwlWUxBgah6',
    verified: true,
    phone: '+7 (968) 789-01-23'
  },
  {
    id: 'm-12',
    name: 'Артём Фёдоров',
    category: 'beauty',
    categoryLabel: 'Красота',
    role: 'Массажист',
    icon: 'self_improvement',
    description: 'Классический, расслабляющий и спортивный массаж. Выезд со столом на дом.',
    rating: 4.8,
    reviewsCount: 53,
    priceFrom: 2500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXbFK0uelf1A0HXkPTNTUJkEuHim6PinbgL2Bn0ZGzZbSyYwj1rq4QIYnquXMHPfqYlSirEY9tgwPBJEO8YdYoX5I3UJXS9aK3rcjn5vTe_DOFHfVfRND2vJ02Bg-evGsN39lR_xUQoV9kme8do05pyuI1Cv0KXvwKZJiIHzypjWaApBieIuY0P0_-ba8KBageDsGlBw3wqX9YhEPYdhoRAb5PcjByg6XJ2W0Ze4v3TtIT3qdWSezv',
    verified: true,
    phone: '+7 (926) 998-11-22'
  }
];

export const INITIAL_STUDIOS: Studio[] = [
  {
    id: 'st-1',
    name: 'Nail Art Studio',
    location: 'Корпус 2, 1 этаж',
    priceFrom: 1500,
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-JJNwXcsBnDzLHB5HNw13VZfUS2FcgD1fPTA3J5JKFVtwJ0c6tnPOBlc9aCoYHdasbcdk4OZmC2SGjTlA4rjOcml3lWMsNFlKj5Bvs5suulP1sbiEGdyiVdmg37NNq7q7Bphp3g5NJt9UYggdODvqo5trP8lg9EcQdvEW12FCGLJrs1mtvh471OvQgRvewUCrpNslV6FeHO-Bnm6GSq1b-pE3Vb1HgOfnYiFR--JufCHqHnOTM4Op'
  },
  {
    id: 'st-2',
    name: 'Лак и Ко',
    location: 'Корпус 4, пом. 12',
    priceFrom: 1200,
    rating: 4.7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpjMMMgKb1yW7SZWjxRVX3mXLioKfQXlntr6YJNAqQHANDqEZztyNZXZLqe7k4Zgw1eJIaqu1QhoCbnXTdfDZLB60iphokuePykPKXiRhU1hKSqi-d5sd8q2SeXy1QcMQWZwEky8gWH2b9qtK541bpxi0QgYBdOd80CacELtvFdevqbDr2QzDz6DbtOzeIwUNk8bAUoR0DunIicJj21DbxP-yP-c_74Nbym8sI-hrKbk7_liCOE1ri'
  },
  {
    id: 'st-3',
    name: 'Маникюр у Анны',
    location: 'Корпус 1, кв. 45',
    priceFrom: 1000,
    rating: 5.0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFElYQQZi8CByalHSFuoBPdviHbEgEi7f99Kw7dQ8ebNV2JAStiw8iJspp-0Q7wLLc_EW6tIkPRnhXaj89yBfqVXjIMuJComuLFqyCY6Ffq73hrVmhArQTiNBbRi10IblKmpcR8FVN9AfYAQncjcrH44wzdGimilzNRqPYTiMiqf6zeVcJT0WG5DGf2ZtYuqnY5SYFXHTwe-i-ic7nQQd3Mx6wjRXZM9mm2i9trM2q2t4e0c_xitn2'
  },
  {
    id: 'st-4',
    name: 'Beauty Room',
    location: 'Корпус 3, 2 этаж',
    priceFrom: 2000,
    rating: 4.8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMVyG8RI04CTcnKo6whNI41NWy7KWLs0q5dQ8GCKIFwnZJ9aDB-GfG77iU42fvrfCwPCw_yucwc73foH7Nb1HKz-1sDpzJqNYHfQW4rqbOgCtZZ4bGQWpUOR3sBuX-7OTQbXOqQz9M1SOdVAquIK7_M_vjYt5XLQXYU5i2BQXqUWIr7zQgzq6mX59iabeWx9yufy3vdfekYcWE5uE12ma2ABlv4cArCN3m79gcZQdmmpyN_psFcKEt'
  },
  {
    id: 'st-5',
    name: 'Ноготочки от Маши',
    location: 'Корпус 5, кв. 112',
    priceFrom: 800,
    rating: 4.6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcQpXn-GP_eDVO4OrP_nFF5wucbO0uZR7q8rw8yKV05B5yjpTkjO0_-HrvM5sDeExUrJR_Hqsia29H4R1QZFepO8gHHgCeKlyqqHxFbvk7BovsEQy0zLhR3TQ18FrNrzFwpRrmSDSKhe0v-7-V2hU02NnX9OQX6Uxvx40t0rNrerhcxlmcOrdOsNbKkoiFB6fCqMQBcNjyZmGooLxr-s4WSo6bgU_VFqB8ajK866mDHpM4AgsTKCYK'
  }
];

export const INITIAL_NEIGHBORS: Neighbor[] = [
  { id: 'n-1', name: 'Анна', age: 28, location: 'Соседний корпус', emoji: '👩‍🎨', tags: ['Корги Лимон', 'Акварель', 'Искусство'] },
  { id: 'n-2', name: 'Дмитрий', age: 32, location: 'Подъезд 2', emoji: '👨‍💻', tags: ['Настолки', 'Бег по утрам', 'ИТ'] },
  { id: 'n-3', name: 'Мария', age: 26, location: 'Корпус А', emoji: '📚', tags: ['Книжный клуб', 'Вьетнамский фо', 'Котики'] },
  { id: 'n-4', name: 'Елена', age: 34, location: 'Корпус Б', emoji: '👩‍👧‍👦', tags: ['Мама двойняшек', 'Прогулки в парке', 'Психология'] },
  { id: 'n-5', name: 'Игорь', age: 40, location: 'Подъезд 4', emoji: '📸', tags: ['Фотограф', 'Съёмки на плёнку', 'Архитектура'] },
  { id: 'n-6', name: 'Ольга', age: 29, location: 'Корпус В', emoji: '🧘‍♀️', tags: ['Йога', 'Утренние занятия', 'Здоровье'] },
  { id: 'n-7', name: 'Сергей', age: 35, location: 'Подъезд 1', emoji: '🎸', tags: ['Гитара', 'Квартирники', 'Рок'] },
  { id: 'n-8', name: 'Наталья', age: 31, location: 'Корпус Б', emoji: '⛰️', tags: ['Психолог', 'Горы', 'Походы'] },
  { id: 'n-9', name: 'Артём', age: 27, location: 'Корпус А', emoji: '🎲', tags: ['D&D', 'Программист', 'Фэнтези'] },
  { id: 'n-10', name: 'Виктория', age: 30, location: 'Подъезд 3', emoji: '🌷', tags: ['Флорист', 'Растения', 'Дизайн'] },
  { id: 'n-11', name: 'Павел', age: 33, location: 'Корпус В', emoji: '🚲', tags: ['Велосипед', 'Ремонт бесплатно', 'Туризм'] },
  { id: 'n-12', name: 'Ксения', age: 25, location: 'Подъезд 2', emoji: '🎨', tags: ['Художница', 'Ищу модель', 'Масло'] },
  { id: 'n-13', name: 'Роман', age: 38, location: 'Корпус Б', emoji: '🍳', tags: ['Повар', 'Ужины для соседей', 'Вино'] },
  { id: 'n-14', name: 'Дарья', age: 27, location: 'Подъезд 4', emoji: '💃', tags: ['Сальса', 'Ищу партнёра', 'Латино'] },
  { id: 'n-15', name: 'Максим', age: 36, location: 'Корпус А', emoji: '🎣', tags: ['Рыбак', 'Выезды', 'Природа'] }
];

export const INITIAL_CLUBS: InterestClub[] = [
  { id: 'club-1', name: 'Бег', emoji: '🏃', membersCount: 12, isJoined: false },
  { id: 'club-2', name: 'Выгул собак', emoji: '🐕', membersCount: 24, isJoined: false },
  { id: 'club-3', name: 'Настолки', emoji: '🎲', membersCount: 18, isJoined: true },
  { id: 'club-4', name: 'Книжный', emoji: '📚', membersCount: 9, isJoined: false },
  { id: 'club-5', name: 'Йога', emoji: '🧘', membersCount: 15, isJoined: false },
  { id: 'club-6', name: 'Велосипед', emoji: '🚴', membersCount: 21, isJoined: true },
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'chat-anna',
    name: 'Анна Петрова',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRfYg8_d2BQqwHSD_PjjrhnB7BvN3R5LzfTtWXd5xvPN_JxVO1BlCVjrxflPkAci5DWeoEorcVatkGe3LtdnbJFvtOFwP3RyP8OmuA0PLlLdGoXkySFj7Qg6Qw36yQOQauelqa8oJoBh3VwnfKl4ifnh3cfK5XSrtsBa_d_e8sUQJDswW5v4TRMJYvOXoTmQwsMt3UqXlrhBos2T_ewlV9F9FEcoFdk_IYCNkrkfwG_zlAT7BK-JV-',
    lastMessage: 'Да, iPhone ещё в продаже',
    timeAgo: '2 мин',
    isOnline: true,
    messages: [
      { id: 'm1', sender: 'other', senderName: 'Анна', text: 'Привет! Видел объявление про iPhone?', time: '18:20' },
      { id: 'm2', sender: 'me', text: 'Да, ещё актуален?', time: '18:22' },
      { id: 'm3', sender: 'other', senderName: 'Анна', text: 'Да, всё в порядке. 75 000 ₽', time: '18:25' },
      { id: 'm4', sender: 'me', text: 'Можно посмотреть сегодня?', time: '18:28' },
      { id: 'm5', sender: 'other', senderName: 'Анна', text: 'Конечно, я дома после 18:00', time: '18:30' },
      { id: 'm6', sender: 'me', text: 'Отлично, в 19:00 удобно?', time: '18:31' },
      { id: 'm7', sender: 'other', senderName: 'Анна', text: 'Да, квартира 42, корпус 2', time: '18:32' },
      { id: 'm8', sender: 'me', text: 'Спасибо! Буду ровно в 19', time: '18:33' }
    ]
  },
  {
    id: 'chat-house15',
    name: 'Чат дома №15',
    icon: 'apartment',
    iconBg: 'bg-secondary-container text-on-secondary-container',
    lastMessage: 'Иван: Собрание в субботу в 12:00',
    timeAgo: '15 мин',
    unreadCount: 1,
    messages: [
      { id: 'mh1', sender: 'other', senderName: 'Ольга', text: 'Соседи, кто оставил коляску в тамбуре на 4 этаже?', time: '14:10' },
      { id: 'mh2', sender: 'other', senderName: 'Иван', text: 'Собрание в субботу в 12:00 во дворе по поводу шлагбаума!', time: '15:45' }
    ]
  },
  {
    id: 'chat-igor',
    name: 'Мастер Игорь',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEviBbuuSpVY2l49t_KyFD29Uw8_RDAsyHCqfdjOiZa7g_fTjOW4CME6JPDMr6kxpCSVx3qZh9Us05Y8_F8dF2KNi6VZLScuht40qyWnYwOy-x3Znrrj6KmxZRwgJsVu3J9Czx9ipLrVCyN0Zyc3hRMvxTWDYVKheLdIUS0XGNtP8JEYhHWwYXx3-oreF7iUuLEIPGA5YS_Ux5mEB-usszxCjmaBpfI5yJd2YTX8UV-PqR2y4QTnVT',
    lastMessage: 'Возьму перфоратор, 800 ₽',
    timeAgo: '1 ч',
    isOnline: false,
    messages: [
      { id: 'mi1', sender: 'me', text: 'Игорь, добрый день! Есть ли бур по бетону на 12мм?', time: '16:00' },
      { id: 'mi2', sender: 'other', senderName: 'Мастер Игорь', text: 'Возьму перфоратор, 800 ₽ за вечер, инструмент подготовлен.', time: '17:15' }
    ]
  },
  {
    id: 'chat-olga',
    name: 'Ольга Смирнова',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdFq7jdnSMavN5cB1WHxH51Ma__pnpUUH4u83gxaS_9zOboRpKQwar-ZEKPYrCQKf0aZPGS879MWnQkbNyVmHrWvj7oQNje19cF90wk4KpxdyYcBk7llQHx4HqzB_j_HHOAar_JEFLh85quIjd3mrRKcvELpMYDXzYC9JaTAxixlRXzCC27SM1107iLPv5Y--9yuJQ4SQFfSgzBgcu5xPREBkVZk2hNYUySBGRq-zR32f9ecLhMkVx',
    lastMessage: 'Спасибо за велосипед!',
    timeAgo: '3 ч',
    isOnline: false,
    messages: [
      { id: 'mo1', sender: 'other', senderName: 'Ольга', text: 'Спасибо за велосипед! Доехали отлично, ребенок счастлив 🚲', time: '15:20' }
    ]
  },
  {
    id: 'chat-runclub',
    name: 'Клуб бега',
    icon: 'directions_run',
    iconBg: 'bg-tertiary-container text-on-tertiary-container',
    lastMessage: 'Завтра в 7:00 у парка',
    timeAgo: '5 ч',
    isOnline: false,
    messages: [
      { id: 'mrc1', sender: 'other', senderName: 'Дмитрий', text: 'Завтра пробежка 5 км в спокойном темпе 6:00 мин/км. Встреча у шлагбаума в 7:00.', time: '13:00' },
      { id: 'mrc2', sender: 'me', text: 'Буду!', time: '13:05' }
    ]
  },
  {
    id: 'chat-dmitry',
    name: 'Дмитрий Козлов',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjdWRELSY09thd85mVeK1hRdQsqz8nixWivbQ9gMofnwv9fjSGStE45xmD4Qbh_ix2JbT-5GHKgRfvG7fiJcgfbPBQI5cz1j0E0dw41D208j9weV8bsaPvZ2RImUngD6WmpQBZLPtLvwwlBPmBsNl8jgWVZQKBFAFUJx6ptrW1H6KDFNu4BJRVFLkinEtAvOJ9DTOoiHC79YOAgUrxdi9IrXRL-mNJFmkfHRZZlR4QrUd76WmUiZfP',
    lastMessage: 'Договорились на 15:00',
    timeAgo: 'вчера',
    isOnline: false,
    messages: [
      { id: 'md1', sender: 'other', senderName: 'Дмитрий', text: 'Договорились на 15:00. Принесу пробные тесты ОГЭ.', time: 'Вчера 19:30' }
    ]
  },
  {
    id: 'chat-maria',
    name: 'Мария Лебедева',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE3uodkSc4tOIrvRZ3E8KJL10twzjHzOUASn4Mgzw-YrAExtS5kp5wkOSkFJUhcRU_lkeC6KeFEelhkHFCtUmx4qB3qb7ZKMKKQKeNYx0wuj43R3UNoVWosMxSX1ZYArp3XuWNjnuPLiK4bFnzwuGhcKXzN2-slHKhNN03DuaGDziMki3oHWKe9kkGCVm-izXbMAg8p-msGNX5Ppv-8t0DD8uAMaD0bpBo-RCub_Z-nuZHkvJSVsV0',
    lastMessage: 'Отправлю рецепт фо',
    timeAgo: 'вчера',
    isOnline: false,
    messages: [
      { id: 'ml1', sender: 'other', senderName: 'Мария', text: 'Отправлю рецепт фо бо с правильными специями сегодня вечером!', time: 'Вчера 18:10' }
    ]
  },
  {
    id: 'chat-sergey',
    name: 'Сосед Сергей',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbp2PUHFEs9ygxkuJbBKUJjNNXrVXimM65mLMQ-kRY80lcRdA2KAReBs_HSATBfJeOCHh4zg65xwFVX3SOHXMSHChBxZ_XtGAl_FFr8HL1mr48dMnG9AO2l0-G_GelGR_ZOEzVMWOO70kFfhm_EgXrB9tS8gIUEeUannpJmbn2_W0h9hmV3kXdBTBlzgGqc3QCdN88ibhs1JmK65LaQwmhN87Zd8IgPgLeEL5rclRilzHuaBvVdrO1',
    lastMessage: 'Скиньте фото стены',
    timeAgo: '2 дня',
    isOnline: false,
    messages: [
      { id: 'ms1', sender: 'other', senderName: 'Сергей', text: 'Скиньте фото стены, где планируете полку вешать, захвачу дюбели.', time: 'Позавчера' }
    ]
  }
];

export const MAP_POINTS: MapPoint[] = [
  { id: 'mp-1', title: 'Корпус 1 (Северный)', category: 'building', categoryLabel: 'Жилой корпус', x: 22, y: 25, description: '16 этажей, 4 подъезда. Домофон, консьерж в под. 1.', details: 'Квартиры 1 - 128' },
  { id: 'mp-2', title: 'Корпус 2 (Центральный)', category: 'building', categoryLabel: 'Жилой корпус', x: 50, y: 20, description: 'Наш дом! 18 этажей. Пункт охраны, колясочная.', details: 'Квартиры 129 - 280' },
  { id: 'mp-3', title: 'Корпус 3 (Восточный)', category: 'building', categoryLabel: 'Жилой корпус', x: 78, y: 25, description: '16 этажей, 3 подъезда. Beauty Room на 2 этаже.', details: 'Квартиры 281 - 410' },
  { id: 'mp-4', title: 'Корпус 4 (Западный)', category: 'building', categoryLabel: 'Жилой корпус', x: 25, y: 70, description: '14 этажей. Студия «Лак и Ко», пом. 12.', details: 'Квартиры 411 - 530' },
  { id: 'mp-5', title: 'Корпус 5 (Южный)', category: 'building', categoryLabel: 'Жилой корпус', x: 75, y: 70, description: '14 этажей. Студия ногтей кв. 112.', details: 'Квартиры 531 - 650' },
  { id: 'mp-6', title: 'Двор А · Детский городок', category: 'facility', categoryLabel: 'Благоустройство', x: 50, y: 48, description: 'Игровая площадка, зона для воркаута, лавочки. Место проведения субботников.', details: 'Целевой сбор на обновление 75%' },
  { id: 'mp-7', title: 'Эко-пункт: Раздельный сбор', category: 'eco', categoryLabel: 'Экология', x: 38, y: 55, description: 'Контейнеры: бумага, пластик, стекло. Бокс для отработанных батареек.', details: 'Вывоз: пн, ср, пт' },
  { id: 'mp-8', title: 'Шлагбаум и Въезд', category: 'facility', categoryLabel: 'Безопасность', x: 50, y: 88, description: 'Главный контрольно-пропускной пункт. Автоматическое считывание номеров.', details: 'Идет голосование совета' },
  { id: 'mp-9', title: 'Nail Art Studio', category: 'master', categoryLabel: 'Мастера и студии', x: 56, y: 28, description: 'Корпус 2, 1 этаж. Маникюр, педикюр, дизайн.', details: 'Рейтинг 4.9 ★' },
  { id: 'mp-10', title: 'Беседка для шахмат', category: 'event', categoryLabel: 'Досуг и события', x: 62, y: 48, description: 'Крытая деревянная беседка. Турнир 22 июня в 18:00.', details: 'Свободный доступ жильцам' },
  { id: 'mp-11', title: 'Въезд в подземный паркинг (-1)', category: 'facility', categoryLabel: 'Паркинг', x: 32, y: 35, description: 'Теплый двухуровневый паркинг на 320 машиномест. Автомойка.', details: 'Доступ по картам' },
];
