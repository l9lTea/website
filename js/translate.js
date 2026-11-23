/* FORMA/FUNCTION — переключение языка RU / EN. */

(function () {
  const KEY = 'ff_lang';
  const HTML_LANG = { ru: 'ru', en: 'en' };

  let lang = 'ru';
  try { lang = localStorage.getItem(KEY) === 'en' ? 'en' : 'ru'; } catch (e) {}

  /* ---------- словарь статичного текста ---------- */
  const DICT = {
    /* шапка и вкладки */
    'Каталог': 'Catalog',
    'Образы': 'Looks',
    'Поиск': 'Search',
    'Профиль': 'Profile',
    'Корзина': 'Cart',
    'Верхняя одежда': 'Outerwear',
    'Платья и комплекты': 'Dresses & sets',
    'Брюки и юбки': 'Trousers & skirts',
    'Обувь': 'Shoes',
    'Аксессуары': 'Accessories',
    'Категории одежды': 'Clothing categories',

    /* низ */
    'Контакты': 'Contacts',
    'Адреса': 'Stores',
    'Помощь': 'Help',
    'Поиск по каталогу': 'Search the catalog',
    'Москва': 'Moscow',
    'Санкт-Петербург': 'Saint Petersburg',
    'Екатеринбург': 'Yekaterinburg',

    /* главная */
    'О нас': 'About',
    'FF предлагает не просто одежду — мы создаем атмосферу, где каждый элемент имеет значение. Мода — это форма самовыражения. Мы стремимся создать пространство, где мода и искусство пересекаются. Присоединяйтесь к нам в этом увлекательном путешествии. Исследуйте нашу коллекцию и найдите свой уникальный стиль с FORMA/FUNCTION':
      'FORMA/FUNCTION is more than clothing — we build an atmosphere where every element matters. Fashion is a form of self-expression. We are creating a space where fashion and art intersect. Join us on this journey. Explore the collection and find your own style with FORMA/FUNCTION',

    /* страницы категорий */
    'Коллекции «14» и «НОЧЬ»': 'Collections “14” and “NIGHT”',
    'Куртки и жилеты из коллекций «14» и «НОЧЬ»: тиснёная кожа, асимметричный крой, фурнитура.':
      'Jackets and vests from the “14” and “NIGHT” collections: embossed leather, asymmetric cuts, metal hardware.',
    'Вечерние силуэты и комплекты из коллекции «НОЧЬ».':
      'Evening silhouettes and sets from the “NIGHT” collection.',
    'Кожаные брюки с заклёпками и широкий крой из коллекции «НОЧЬ».':
      'Studded leather trousers and wide cuts from the “NIGHT” collection.',
    'Ботинки и сапоги коллекций «14» и «НОЧЬ».': 'Boots and shoes from the “14” and “NIGHT” collections.',
    'Сумки и детали, которые собирают образ.': 'Bags and details that hold a look together.',
    'Смотреть образы': 'View looks',
    'Сортировка': 'Sort',
    'Все размеры': 'All sizes',
    'по коллекции': 'by collection',
    'сначала новые': 'newest first',
    'цена ↑': 'price ↑',
    'цена ↓': 'price ↓',
    'Скоро': 'Soon',
    'Коллекция пополняется': 'Collection in progress',
    'Следить в Telegram': 'Follow on Telegram',
    'Вторая сумка и ремни — в следующем дропе. Следите за обновлениями в Telegram.':
      'A second bag and belts are coming in the next drop. Follow updates on Telegram.',

    /* карточки и корзина */
    'В корзину': 'Add to cart',
    'Добавлено': 'Added',
    'Удалить': 'Remove',
    'Меньше': 'Decrease',
    'Больше': 'Increase',
    'Итого': 'Total',
    'Оформить заказ': 'Checkout',
    'Заказ': 'Order',
    'Корзина пуста': 'Your cart is empty',
    'Пока здесь ничего нет. Загляните в каталог — там кожа, брюки и обувь из двух коллекций.':
      'Nothing here yet. Take a look at the catalog — leather, trousers and shoes from two collections.',
    'Перейти в каталог': 'Go to catalog',

    /* поиск */
    'Начните вводить:': 'Start typing:',
    'Найти': 'Find',
    'Все': 'All',
    'Очистить поиск': 'Clear search',
    'Ничего не нашлось': 'Nothing found',
    'Вернуться в каталог': 'Back to catalog',
    'Название, категория, материал': 'Name, category, material',
    'кожа': 'leather',
    'брюки': 'trousers',
    'сумка': 'bag',
    'сапоги': 'boots',

    /* образы */
    'Коллекция «14»': 'Collection “14”',
    'Коллекция «НОЧЬ»': 'Collection “NIGHT”',

    /* профиль */
    'Имя': 'First name',
    'Фамилия': 'Last name',
    'Телефон': 'Phone',
    'Дата рождения': 'Date of birth',
    'Сохранить изменения': 'Save changes',
    'Выйти': 'Log out',
    'Заказы': 'Orders',
    'Подписки': 'Subscriptions',
    'Верхняя одежда · коллекция «14»': 'Outerwear · collection “14”',
    'Иван': 'Ivan',
    'Иванов': 'Ivanov',
    '+7 (___) ___-__-__': '+00 (___) ___-__-__',
    'example@mail.ru': 'example@mail.com',

    /* названия товаров  */
    'Жакет на молнии': 'Zip jacket',
    'Байкерский жакет': 'Biker jacket',
    'Укороченный жакет': 'Cropped jacket',
    'Жилет из тиснёной кожи': 'Embossed leather vest',
    'Структурный жилет макси': 'Maxi structured vest',
    'Рубашка с жабо': 'Jabot shirt',
    'Платье с прозрачными рукавами': 'Sheer-sleeve dress',
    'Платье в пол': 'Full-length dress',
    'Комплект: боди и шорты': 'Bodysuit & shorts set',
    'Кожаные брюки с заклёпками': 'Studded leather trousers',
    'Брюки с защипами': 'Pleated trousers',
    'Брюки прямого кроя': 'Straight-cut trousers',
    'Брюки с объёмом': 'Volume trousers',
    'Ботинки на каблуке': 'Heeled boots',
    'Сапоги металлик': 'Metallic boots',
    'Сумка-хобо': 'Hobo bag'
  };

  /* ---------- заголовки вкладки браузера ---------- */
  const TITLES = {
    'index.html': ['FORMA/FUNCTION — одежда как форма самовыражения', 'FORMA/FUNCTION — clothing as a form of self-expression'],
    'collection.html': ['Образы — FORMA/FUNCTION', 'Looks — FORMA/FUNCTION'],
    'profile.html': ['Профиль — FORMA/FUNCTION', 'Profile — FORMA/FUNCTION'],
    'search.html': ['Поиск — FORMA/FUNCTION', 'Search — FORMA/FUNCTION'],
    'cart.html': ['Корзина — FORMA/FUNCTION', 'Cart — FORMA/FUNCTION'],
    'outerwear.html': ['Верхняя одежда — FORMA/FUNCTION', 'Outerwear — FORMA/FUNCTION'],
    'dresses.html': ['Платья и комплекты — FORMA/FUNCTION', 'Dresses & sets — FORMA/FUNCTION'],
    'pants.html': ['Брюки и юбки — FORMA/FUNCTION', 'Trousers & skirts — FORMA/FUNCTION'],
    'shoes.html': ['Обувь — FORMA/FUNCTION', 'Shoes — FORMA/FUNCTION'],
    'accessories.html': ['Аксессуары — FORMA/FUNCTION', 'Accessories — FORMA/FUNCTION']
  };

  /* ---------- падежи и форматы ---------- */
  const pluralRu = (n, forms) => {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return forms[0];
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return forms[1];
    return forms[2];
  };

  const collectionLabel = {
    ru: c => (c === 'night' ? 'НОЧЬ' : c),
    en: c => (c === 'night' ? 'NIGHT' : c)
  };

  /* строки */
  const STRINGS = {
    ru: {
      addToCart: 'В корзину',
      added: 'Добавлено',
      remove: 'Удалить',
      total: 'Итого',
      checkout: 'Оформить заказ',
      allSizes: 'Все размеры',
      sortByCollection: 'по коллекции',
      sortNew: 'сначала новые',
      soon: 'Скоро',
      soonTitle: 'Коллекция пополняется',
      soonText: 'Вторая сумка и ремни — в следующем дропе. Следите за обновлениями в Telegram.',
      follow: 'Следить в Telegram',
      all: 'Все',
      nothing: 'Ничего не нашлось',
      backToCatalog: 'Вернуться в каталог',
      viewLooks: 'Смотреть образы',
      cartEmptyTitle: 'Корзина пуста',
      cartEmptyText: 'Пока здесь ничего нет. Загляните в каталог — там кожа, брюки и обувь из двух коллекций.',
      goCatalog: 'Перейти в каталог',
      sizeEmpty: 'В этом размере пока пусто. Сбросьте фильтр или посмотрите другие категории.',
      searchEmptyText: q => `По запросу «${q}» товаров нет. Попробуйте короче: «кожа», «брюки», «сумка», «сапоги».`,
      count: n => `${n} ${pluralRu(n, ['товар', 'товара', 'товаров'])}`,
      results: (n, q) => `${n} ${pluralRu(n, ['результат', 'результата', 'результатов'])} по запросу «${q}»`,
      collection: c => `Коллекция «${collectionLabel.ru(c)}»`,
      subline: (category, collection) => `${category} · коллекция «${collectionLabel.ru(collection)}»`,
      less: 'Меньше',
      more: 'Больше'
    },
    en: {
      addToCart: 'Add to cart',
      added: 'Added',
      remove: 'Remove',
      total: 'Total',
      checkout: 'Checkout',
      allSizes: 'All sizes',
      sortByCollection: 'by collection',
      sortNew: 'newest first',
      soon: 'Soon',
      soonTitle: 'Collection in progress',
      soonText: 'A second bag and belts are coming in the next drop. Follow updates on Telegram.',
      follow: 'Follow on Telegram',
      all: 'All',
      nothing: 'Nothing found',
      backToCatalog: 'Back to catalog',
      viewLooks: 'View looks',
      cartEmptyTitle: 'Your cart is empty',
      cartEmptyText: 'Nothing here yet. Take a look at the catalog — leather, trousers and shoes from two collections.',
      goCatalog: 'Go to catalog',
      sizeEmpty: 'Nothing in this size yet. Clear the filter or browse other categories.',
      searchEmptyText: q => `No items for “${q}”. Try something shorter: “leather”, “trousers”, “bag”, “boots”.`,
      count: n => `${n} ${n === 1 ? 'item' : 'items'}`,
      results: (n, q) => `${n} ${n === 1 ? 'result' : 'results'} for “${q}”`,
      collection: c => `Collection “${collectionLabel.en(c)}”`,
      subline: (category, collection) => `${category} · collection “${collectionLabel.en(collection)}”`,
      less: 'Decrease',
      more: 'Increase'
    }
  };

  /* ---------- перевод строки ---------- */
  const PATTERNS = [
    [/^Коллекция (14|ночь) (\d+)$/, (m) => `Collection ${m[1] === 'ночь' ? 'night' : m[1]} ${m[2]}`]
  ];

  function translate(key) {
    if (DICT[key] !== undefined) return DICT[key];
    for (const [re, fn] of PATTERNS) {
      const m = key.match(re);
      if (m) return fn(m);
    }
    return undefined;
  }

  /* ---------- перевод разметки ---------- */
  const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  const SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 };

  function translateText() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentNode;
        if (!parent || SKIP[parent.nodeName]) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    let node;
    while ((node = walker.nextNode())) {
      if (node.__ffRu === undefined) node.__ffRu = node.nodeValue;
      const raw = node.__ffRu;
      const key = raw.trim();

      if (lang === 'ru') {
        node.nodeValue = raw;
        continue;
      }

      const exact = translate(key);
      if (exact !== undefined) {
        node.nodeValue = raw.replace(key, exact);
        continue;
      }

      /* абзац */
      const collapsed = key.replace(/\s+/g, ' ');
      const loose = translate(collapsed);
      if (loose !== undefined) node.nodeValue = loose;
    }
  }

  function translateAttrs() {
    document.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach(el => {
      ATTRS.forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        if (!el.__ffAttr) el.__ffAttr = {};
        if (el.__ffAttr[attr] === undefined) el.__ffAttr[attr] = el.getAttribute(attr) || '';
        const raw = el.__ffAttr[attr];
        const key = raw.trim();
        const translated = lang === 'en' ? translate(key) : undefined;
        el.setAttribute(attr, translated !== undefined ? translated : raw);
      });
    });
  }

  function translateTitle() {
    const file = (location.pathname.split('/').pop() || 'index.html') || 'index.html';
    const pair = TITLES[file];
    if (pair) document.title = lang === 'en' ? pair[1] : pair[0];
  }

  function paintSwitch() {
    document.querySelectorAll('[data-lang]').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function apply() {
    translateText();
    translateAttrs();
    translateTitle();
    paintSwitch();
  }

  function setLang(next) {
    lang = next === 'en' ? 'en' : 'ru';
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.documentElement.lang = HTML_LANG[lang];
    apply();
    document.dispatchEvent(new CustomEvent('ff:langchange', { detail: { lang } }));
  }

  /* публичное API */
  const api = {
    get lang() { return lang; },
    isEn() { return lang === 'en'; },
    t(ru) { return lang === 'en' && DICT[ru] !== undefined ? DICT[ru] : ru; },
    s: null, /* заполняется ниже — зависит от текущего языка */
    setLang,
    toggle() { setLang(lang === 'en' ? 'ru' : 'en'); },
    apply,
    productName(product) {
      if (lang === 'en' && product.name_en) return product.name_en;
      return product.name;
    },
    categoryTitle(slug) {
      const list = typeof CATEGORIES !== 'undefined' ? CATEGORIES : [];
      const category = list.find(c => c.slug === slug);
      if (!category) return '';
      return lang === 'en' && category.title_en ? category.title_en : category.title;
    },
    collectionLabel(collection) {
      return collectionLabel[lang](collection);
    }
  };

  Object.defineProperty(api, 's', { get: () => STRINGS[lang] });

  document.documentElement.lang = HTML_LANG[lang];

  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-lang]');
      if (btn) {
        e.preventDefault();
        if (btn.dataset.lang !== lang) setLang(btn.dataset.lang);
      }
    });
  });

  window.I18N = api;
})();
