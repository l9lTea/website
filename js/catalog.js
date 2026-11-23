/* FORMA/FUNCTION — страница категории: сетка товаров, фильтр по размеру, сортировка. */

(function () {
  const page = document.querySelector('[data-category]');
  if (!page) return;

  const slug = page.dataset.category;
  const grid = page.querySelector('[data-product-grid]');
  const sizeRow = page.querySelector('[data-size-filters]');
  const sortSelect = page.querySelector('[data-sort]');
  const countLabel = page.querySelector('[data-count]');

  const products = productsByCategory(slug);

  let activeSize = 'all';
  let order = 'default';

  /* ---- фильтры по размерам ---- */
  const allSizes = [...new Set(products.flatMap(p => p.sizes))];
  const sizeChips = ['all', ...allSizes];

  function renderSizes() {
    sizeRow.innerHTML = sizeChips
      .map(size => {
        const label = size === 'all' ? I18N.s.allSizes : size;
        const active = size === activeSize ? ' is-active' : '';
        return `<button type="button" class="chip${active}" data-size="${size}">${label}</button>`;
      })
      .join('');
  }

  /* ---- сортировка ---- */
  function sorted(list) {
    const copy = [...list];
    if (order === 'price-asc') copy.sort((a, b) => a.price - b.price);
    if (order === 'price-desc') copy.sort((a, b) => b.price - a.price);
    if (order === 'new') copy.sort((a, b) => (a.collection === b.collection ? 0 : a.collection === 'night' ? -1 : 1));
    return copy;
  }

  /* ---- рендер ---- */
  function render() {
    const list = sorted(
      activeSize === 'all' ? products : products.filter(p => p.sizes.includes(activeSize))
    );

    let html = list.map((p, i) => FF.productCard(p, i)).join('');

    if (slug === 'accessories' && list.length) {
      html += FF.soonCard(I18N.s.soonText);
    }

    if (!list.length) {
      html = FF.emptyState(I18N.s.nothing, I18N.s.sizeEmpty, 'collection.html', I18N.s.viewLooks);
    }

    grid.innerHTML = html;
    countLabel.textContent = I18N.s.count(list.length);
  }

  /* ---- события ---- */
  page.addEventListener('click', e => {
    const chip = e.target.closest('[data-size]');
    if (!chip) return;
    activeSize = chip.dataset.size;
    renderSizes();
    render();
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      order = sortSelect.value;
      render();
    });
  }

  /* при смене языка перерисовываем подписи и карточки */
  document.addEventListener('ff:langchange', () => {
    renderSizes();
    render();
  });

  renderSizes();
  render();
})();
