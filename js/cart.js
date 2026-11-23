/* FORMA/FUNCTION — корзина на localStorage.*/

(function () {
  const KEY = 'ff_cart_v1';

  const read = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  };

  const write = cart => {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {}
    document.dispatchEvent(new CustomEvent('cart:change', { detail: cart }));
    paintBadge();
  };

  const items = () => {
    const cart = read();
    return Object.keys(cart)
      .map(id => {
        const product = PRODUCTS.find(p => p.id === id);
        return product ? { ...product, qty: cart[id] } : null;
      })
      .filter(Boolean);
  };

  const count = () => items().reduce((sum, i) => sum + i.qty, 0);
  const total = () => items().reduce((sum, i) => sum + i.price * i.qty, 0);

  const add = (id, qty = 1) => {
    const cart = read();
    cart[id] = (cart[id] || 0) + qty;
    write(cart);
  };

  const setQty = (id, qty) => {
    const cart = read();
    if (qty <= 0) delete cart[id];
    else cart[id] = qty;
    write(cart);
  };

  const remove = id => {
    const cart = read();
    delete cart[id];
    write(cart);
  };

  const clear = () => write({});

  function paintBadge() {
    const n = count();
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = n;
      el.classList.toggle('is-visible', n > 0);
    });
  }

  /* --- добавление в корзину --- */
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-add]');
    if (!btn) return;
    e.preventDefault();
    add(btn.dataset.add);

    const original = btn.dataset.label || btn.textContent;
    btn.dataset.label = original;
    btn.textContent = I18N.s.added;
    btn.classList.add('is-added');
    clearTimeout(btn._t);
    btn._t = setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('is-added');
    }, 1300);
  });

  document.addEventListener('DOMContentLoaded', paintBadge);

  window.FF = window.FF || {};
  window.FF.cart = { read, items, count, total, add, setQty, remove, clear, paintBadge };
})();

/* ---------- страница корзины ---------- */

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('[data-cart-page]');
  if (!page) return;

  const list = page.querySelector('[data-cart-items]');
  const totalWrap = page.querySelector('[data-cart-total]');
  const amount = page.querySelector('[data-cart-amount]');
  const checkout = page.querySelector('[data-checkout]');

  const escapeHtml = str => String(str).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function row(item) {
    return `
      <div class="cart-item" data-id="${item.id}">
        <div class="item-info">
          <div class="item-image"><img src="${item.image}" alt="${escapeHtml(localizedName(item))}" /></div>
          <div class="item-details">
            <h4>${localizedName(item)}</h4>
            <p class="item-sub">${escapeHtml(I18N.s.subline(localizedCategory(item.category), item.collection))}</p>
            <div class="item-price">${formatPrice(item.price)}</div>
          </div>
        </div>
        <div class="item-controls">
          <div class="quantity-controls">
            <button class="quantity-btn" data-qty="-1" data-id="${item.id}" aria-label="${I18N.s.less}">−</button>
            <span class="item-quantity">${item.qty}</span>
            <button class="quantity-btn" data-qty="1" data-id="${item.id}" aria-label="${I18N.s.more}">+</button>
          </div>
          <button class="remove-btn" data-remove="${item.id}">${I18N.s.remove}</button>
        </div>
      </div>`;
  }

  function render() {
    const items = window.FF.cart.items();

    if (!items.length) {
      list.innerHTML = window.FF.emptyState(
        I18N.s.cartEmptyTitle,
        I18N.s.cartEmptyText,
        'index.html',
        I18N.s.goCatalog
      );
      totalWrap.hidden = true;
      checkout.hidden = true;
      return;
    }

    list.innerHTML = items.map(row).join('');
    totalWrap.hidden = false;
    checkout.hidden = false;
    amount.textContent = formatPrice(window.FF.cart.total());
  }

  page.addEventListener('click', e => {
    const qtyBtn = e.target.closest('[data-qty]');
    if (qtyBtn) {
      const item = window.FF.cart.items().find(i => i.id === qtyBtn.dataset.id);
      window.FF.cart.setQty(qtyBtn.dataset.id, (item ? item.qty : 0) + Number(qtyBtn.dataset.qty));
      render();
      return;
    }
    const rm = e.target.closest('[data-remove]');
    if (rm) {
      window.FF.cart.remove(rm.dataset.remove);
      render();
    }
  });

  document.addEventListener('cart:change', render);
  document.addEventListener('ff:langchange', render);
  render();
});
