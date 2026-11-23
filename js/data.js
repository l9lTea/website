/* FORMA/FUNCTION — единый источник данных о каталоге.*/

const CATEGORIES = [
  {
    slug: 'outerwear',
    title_en: 'Outerwear',
    title: 'Верхняя одежда',
    page: 'outerwear.html',
    hero: 'images/land_top.jpg',
    lead: 'Кожа, структура, асимметрия',
    note: 'Куртки и жилеты из коллекций «14» и «НОЧЬ».'
  },
  {
    slug: 'dresses',
    title_en: 'Dresses & sets',
    title: 'Платья и комплекты',
    page: 'dresses.html',
    hero: 'images/coll_night.jpg',
    lead: 'Прозрачные рукава, тяжёлый шёлк',
    note: 'Вечерние силуэты и комплекты из коллекции «НОЧЬ».'
  },
  {
    slug: 'pants',
    title_en: 'Trousers & skirts',
    title: 'Брюки и юбки',
    page: 'pants.html',
    hero: 'images/land_pants.jpg',
    lead: 'Крой, объём, посадка',
    note: 'Кожаные брюки с фурнитурой и широкий крой.'
  },
  {
    slug: 'shoes',
    title_en: 'Shoes',
    title: 'Обувь',
    page: 'shoes.html',
    hero: 'images/land_shoes.jpg',
    lead: 'Каблук как конструкция',
    note: 'Ботинки и сапоги коллекций «14» и «НОЧЬ».'
  },
  {
    slug: 'accessories',
    title_en: 'Accessories',
    title: 'Аксессуары',
    page: 'accessories.html',
    hero: 'images/land_accs.jpg',
    lead: 'Кожа, металл, минимум',
    note: 'Сумки и детали, которые собирают образ.'
  }
];

const PRODUCTS = [
  /* ---------- Верхняя одежда ---------- */
  {
    id: 'j2', name: 'Жакет на молнии', category: 'outerwear', collection: '14',
    price: 34900, sizes: ['XS', 'S', 'M', 'L'], image: 'images/coll_14_jacket2.png',
    name_en: 'Zip jacket',
    tags_en: ['leather', 'jacket', 'zip', 'outerwear'],
    tags: ['кожа', 'куртка', 'жакет', 'молния', 'верхняя одежда']
  },
  {
    id: 'j4', name: 'Байкерский жакет', category: 'outerwear', collection: '14',
    price: 41900, sizes: ['S', 'M', 'L'], image: 'images/coll_14_jacket4.png',
    name_en: 'Biker jacket',
    tags_en: ['leather', 'jacket', 'biker', 'outerwear'],
    tags: ['кожа', 'куртка', 'байкер', 'верхняя одежда']
  },
  {
    id: 'j3', name: 'Укороченный жакет', category: 'outerwear', collection: '14',
    price: 32500, sizes: ['XS', 'S', 'M'], image: 'images/coll_14_jacket3.png',
    name_en: 'Cropped jacket',
    tags_en: ['leather', 'jacket', 'cropped', 'outerwear'],
    tags: ['кожа', 'куртка', 'жакет', 'верхняя одежда']
  },
  {
    id: 'j1', name: 'Жилет из тиснёной кожи', category: 'outerwear', collection: '14',
    price: 27900, sizes: ['XS', 'S', 'M', 'L'], image: 'images/coll_14_jacket.png',
    name_en: 'Embossed leather vest',
    tags_en: ['vest', 'leather', 'sleeveless', 'outerwear'],
    tags: ['жилет', 'кожа', 'без рукавов', 'верхняя одежда']
  },
  {
    id: 'j5', name: 'Структурный жилет макси', category: 'outerwear', collection: '14',
    price: 38900, sizes: ['S', 'M', 'L'], image: 'images/coll_14_jacket1.png',
    name_en: 'Maxi structured vest',
    tags_en: ['vest', 'maxi', 'structure', 'outerwear'],
    tags: ['жилет', 'макси', 'структура', 'верхняя одежда']
  },
  {
    id: 'w1', name: 'Рубашка с жабо', category: 'outerwear', collection: 'night',
    price: 24900, sizes: ['XS', 'S', 'M'], image: 'images/coll_night_1.png',
    name_en: 'Jabot shirt',
    tags_en: ['shirt', 'white', 'jabot', 'top'],
    tags: ['рубашка', 'белая', 'жабо', 'верх']
  },

  /* ---------- Платья и комплекты ---------- */
  {
    id: 'd1', name: 'Платье с прозрачными рукавами', category: 'dresses', collection: 'night',
    price: 29900, sizes: ['XS', 'S', 'M', 'L'], image: 'images/coll_night_dress.png',
    name_en: 'Sheer-sleeve dress',
    tags_en: ['dress', 'sheer sleeves', 'evening', 'black'],
    tags: ['платье', 'прозрачные рукава', 'вечернее', 'чёрное']
  },
  {
    id: 'd2', name: 'Платье в пол', category: 'dresses', collection: 'night',
    price: 34900, sizes: ['S', 'M', 'L'], image: 'images/coll_night_dress1.png',
    name_en: 'Full-length dress',
    tags_en: ['dress', 'long', 'evening', 'black'],
    tags: ['платье', 'длинное', 'вечернее', 'чёрное']
  },
  {
    id: 'd3', name: 'Комплект: боди и шорты', category: 'dresses', collection: 'night',
    price: 21900, sizes: ['XS', 'S', 'M'], image: 'images/coll_night_comb.png',
    name_en: 'Bodysuit & shorts set',
    tags_en: ['set', 'bodysuit', 'shorts', 'cream'],
    tags: ['комплект', 'боди', 'шорты', 'кремовый']
  },

  /* ---------- Брюки и юбки ---------- */
  {
    id: 'p2', name: 'Кожаные брюки с заклёпками', category: 'pants', collection: '14',
    price: 27900, sizes: ['XS', 'S', 'M', 'L'], image: 'images/coll_14_pants.jpg',
    name_en: 'Studded leather trousers',
    tags_en: ['trousers', 'leather', 'studs', 'black'],
    tags: ['брюки', 'кожа', 'заклёпки', 'чёрные']
  },
  {
    id: 'p3', name: 'Брюки с защипами', category: 'pants', collection: 'night',
    price: 19900, sizes: ['S', 'M', 'L'], image: 'images/coll_night_pants.jpg',
    name_en: 'Pleated trousers',
    tags_en: ['trousers', 'pleats', 'black', 'wide'],
    tags: ['брюки', 'защипы', 'чёрные', 'широкие']
  },
  {
    id: 'p4', name: 'Брюки прямого кроя', category: 'pants', collection: 'night',
    price: 18400, sizes: ['XS', 'S', 'M', 'L'], image: 'images/coll_night_pants1.png',
    name_en: 'Straight-cut trousers',
    tags_en: ['trousers', 'straight', 'beige', 'cream'],
    tags: ['брюки', 'прямые', 'бежевые', 'кремовые']
  },
  {
    id: 'p5', name: 'Брюки с объёмом', category: 'pants', collection: 'night',
    price: 23900, sizes: ['S', 'M', 'L'], image: 'images/coll_night_pants2.jpg',
    name_en: 'Volume trousers',
    tags_en: ['trousers', 'volume', 'black'],
    tags: ['брюки', 'объём', 'чёрные']
  },

  /* ---------- Обувь ---------- */
  {
    id: 's1', name: 'Ботинки на каблуке', category: 'shoes', collection: '14',
    price: 36900, sizes: ['36', '37', '38', '39', '40'], image: 'images/coll_14_shoes.jpg',
    name_en: 'Heeled boots',
    tags_en: ['shoes', 'boots', 'heel', 'black'],
    tags: ['обувь', 'ботинки', 'каблук', 'чёрные']
  },
  {
    id: 's2', name: 'Сапоги металлик', category: 'shoes', collection: 'night',
    price: 28900, sizes: ['36', '37', '38', '39', '40', '41'], image: 'images/coll_night_shoes.png',
    name_en: 'Metallic boots',
    tags_en: ['shoes', 'boots', 'silver', 'metallic'],
    tags: ['обувь', 'сапоги', 'серебро', 'металлик']
  },

  /* ---------- Аксессуары ---------- */
  {
    id: 'a1', name: 'Сумка-хобо', category: 'accessories', collection: 'night',
    price: 32900, sizes: ['one size'], image: 'images/coll_night_bag.png',
    name_en: 'Hobo bag',
    tags_en: ['bag', 'hobo', 'leather', 'accessory'],
    tags: ['сумка', 'хобо', 'кожа', 'аксессуар']
  }
];

/* ---- helpers ---- */

const CATEGORY_TITLE = Object.fromEntries(CATEGORIES.map(c => [c.slug, c.title]));

const COLLECTION_TITLE = { '14': '14', night: 'НОЧЬ' };

/* помощники с учётом языка: RU по умолчанию, EN — если переключено */
function localizedName(product) {
  return window.I18N ? window.I18N.productName(product) : product.name;
}

function localizedCategory(slug) {
  return window.I18N ? window.I18N.categoryTitle(slug) : (CATEGORY_TITLE[slug] || '');
}

function localizedCollection(collection) {
  return window.I18N ? window.I18N.collectionLabel(collection) : (COLLECTION_TITLE[collection] || collection);
}

function formatPrice(value) {
  return value.toLocaleString('ru-RU') + ' ₽';
}

function getCategory(slug) {
  return CATEGORIES.find(c => c.slug === slug);
}

function productsByCategory(slug) {
  return PRODUCTS.filter(p => p.category === slug);
}
