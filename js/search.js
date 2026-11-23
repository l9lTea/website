/* FORMA/FUNCTION — поиск по каталогу.*/

(function () {
  const page = document.querySelector('[data-search-page]');
  if (!page) return;

  const input = page.querySelector('[data-search-input]');
  const grid = page.querySelector('[data-search-grid]');
  const countLabel = page.querySelector('[data-search-count]');
  const chipsRow = page.querySelector('[data-search-chips]');
  const clearBtn = page.querySelector('[data-search-clear]');
  const hint = page.querySelector('[data-search-hint]');

  let category = 'all';

  const normalize = str => String(str).toLowerCase().replace(/ё/g, 'е').trim();

  /* поисковый индекс: название + категория + коллекция + теги */
  const index = PRODUCTS.map(product => ({
    product,
    haystack: normalize([
      product.name,
      product.name_en || '',
      CATEGORY_TITLE[product.category],
      (CATEGORIES.find(c => c.slug === product.category) || {}).title_en || '',
      product.collection === 'night' ? 'ночь night' : '14',
      ...(product.tags || []),
      ...(product.tags_en || [])
    ].join(' '))
  }));

  function matches(query) {
    const q = normalize(query);
    const words = q.split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return index
      .filter(({ product }) => category === 'all' || product.category === category)
      .filter(({ haystack }) => words.every(word => haystack.includes(word)))
      .map(({ product }) => product);
  }

  function renderChips() {
    const chips = [{ slug: 'all', title: I18N.s.all }, ...CATEGORIES.map(c => ({ slug: c.slug, title: localizedCategory(c.slug) }))];
    chipsRow.innerHTML = chips
      .map(c => `<button type="button" class="chip${c.slug === category ? ' is-active' : ''}" data-cat="${c.slug}">${c.title}</button>`)
      .join('');
  }

  function render() {
    const query = input.value;
    const hasQuery = normalize(query).length > 0;
    const results = hasQuery
      ? matches(query)
      : PRODUCTS.filter(p => category === 'all' || p.category === category);

    if (!results.length) {
      grid.innerHTML = FF.emptyState(
        I18N.s.nothing,
        I18N.s.searchEmptyText(query.trim()),
        'index.html',
        I18N.s.backToCatalog
      );
      countLabel.textContent = I18N.s.count(0);
    } else {
      grid.innerHTML = results.map((p, i) => FF.productCard(p, i)).join('');
      countLabel.textContent = hasQuery
        ? I18N.s.results(results.length, query.trim())
        : I18N.s.count(results.length);
    }

    clearBtn.classList.toggle('is-visible', hasQuery || category !== 'all');
    hint.classList.toggle('is-hidden', hasQuery);
    syncUrl(query);
  }

  function syncUrl(query) {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category !== 'all') params.set('cat', category);
    const next = params.toString();
    const url = next ? `${location.pathname}?${next}` : location.pathname;
    history.replaceState(null, '', url);
  }

  /* ---- ивенты ---- */
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(render, 120);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(timer);
      render();
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (e.key === 'Escape') {
      input.value = '';
      category = 'all';
      renderChips();
      render();
    }
  });

  chipsRow.addEventListener('click', e => {
    const chip = e.target.closest('[data-cat]');
    if (!chip) return;
    category = chip.dataset.cat;
    renderChips();
    render();
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    category = 'all';
    renderChips();
    render();
    input.focus();
  });

  /* кнопка «Найти» и подсказки-запросы */
  document.addEventListener('click', e => {
    const suggestion = e.target.closest('[data-suggest]');
    if (suggestion) {
      input.value = suggestion.dataset.suggest;
      render();
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (e.target.closest('[data-action="perform-search"]')) {
      render();
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* «/» фокусирует поиск с любой страницы */
  document.addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === '/' && !typing) {
      e.preventDefault();
      input.focus();
    }
  });

  /* ---- стартовое состояние из ссылки ---- */
  const params = new URLSearchParams(location.search);
  if (params.get('q')) input.value = params.get('q');
  if (params.get('cat') && CATEGORIES.some(c => c.slug === params.get('cat'))) category = params.get('cat');

  document.addEventListener('ff:langchange', () => {
    renderChips();
    render();
  });

  renderChips();
  render();
  if (params.get('q')) input.setSelectionRange(input.value.length, input.value.length);
})();
