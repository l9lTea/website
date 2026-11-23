/* FORMA/FUNCTION — карточка товара. Одна разметка для каталога и поиска. */

(function () {
  const escapeHtml = str => String(str).replace(/[&<>"]/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[s]));

  function productCard(product, index = 0) {
    const sizes = product.sizes
      .map(size => `<span>${escapeHtml(size)}</span>`)
      .join('');

    const name = localizedName(product);

    return `
      <article class="product-card" style="--i:${index}">
        <div class="product-media">
          <img src="${product.image}" alt="${escapeHtml(name)}" loading="lazy" />
          <span class="product-badge">${escapeHtml(I18N.s.collection(product.collection))}</span>
        </div>
        <div class="product-body">
          <h3 class="product-name">${escapeHtml(name)}</h3>
          <p class="product-sub">${escapeHtml(localizedCategory(product.category))}</p>
          <div class="sizes">${sizes}</div>
          <div class="product-row">
            <span class="product-price">${formatPrice(product.price)}</span>
            <button type="button" class="add-button" data-add="${product.id}">${I18N.s.addToCart}</button>
          </div>
        </div>
      </article>`;
  }

  function soonCard(text) {
    const s = I18N.s;
    return `
      <div class="soon-card">
        <p class="eyebrow">${s.soon}</p>
        <p class="soon-title">${s.soonTitle}</p>
        <p>${text}</p>
        <p style="margin-top:6px"><a class="ghost-button" href="https://t.me/l9ltea" target="_blank" rel="noopener">${s.follow}</a></p>
      </div>`;
  }

  function emptyState(title, text, actionHref, actionLabel) {
    return `
      <div class="empty-state">
        <h3>${title}</h3>
        <p>${text}</p>
        ${actionHref ? `<p style="margin-top:22px"><button type="button" class="ghost-button" data-link="${actionHref}">${actionLabel}</button></p>` : ''}
      </div>`;
  }

  window.FF = window.FF || {};
  window.FF.productCard = productCard;
  window.FF.soonCard = soonCard;
  window.FF.emptyState = emptyState;
})();
