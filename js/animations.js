// FORMA/FUNCTION — анимации (подключается через <script defer> в <head>)
(() => {
  // Уважаем системную настройку «уменьшить движение»
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  root.classList.add('js');

  const here = location.pathname.split('/').pop() || 'index.html';

  // 1. Подсветка текущей страницы в меню
  document.querySelectorAll('.nav-button').forEach(btn => {
    if (btn.dataset.link === here) btn.classList.add('is-current');
  });

  // 2. Нумерация элементов для каскадных анимаций (--i)
  const stagger = selector => {
    document.querySelectorAll(selector).forEach((el, i) => el.style.setProperty('--i', i));
  };
  stagger('.collection-card');
  stagger('.cart-item');
  stagger('.result-item');
  stagger('.profile-field');
  stagger('.profile-menu-button');

  // 3. Появление блоков при прокрутке
  const revealSelectors = [
    '.category-card', '.big-category', '.about-section', '.collection-title',
    '.cart-panel', '.search-panel', '.profile-panel', '.footer'
  ];
  const targets = [...document.querySelectorAll(revealSelectors.join(','))];
  targets.forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.categories-grid .category-card').forEach((el, i) => {
    el.style.setProperty('--d', `${i * 0.15}s`);
  });

  const sections = [...document.querySelectorAll('.collection-section')];
  const watched = [...targets, ...sections];

  if (!('IntersectionObserver' in window)) {
    watched.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    watched.forEach(el => io.observe(el));
  }

  // 4. Плавный переход между страницами
  document.addEventListener('click', e => {
    const btn = e.target.closest('button[data-link]');
    if (!btn || !btn.dataset.link) return;
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.add('is-leaving');
    setTimeout(() => { window.location.href = btn.dataset.link; }, 300);
  }, true);

  window.addEventListener('pageshow', e => {
    if (e.persisted) document.body.classList.remove('is-leaving');
  });

  // 5. Корзина: плавное удаление товара
  document.addEventListener('click', e => {
    const btn = e.target.closest('button[data-action="remove-item"]');
    if (!btn) return;
    e.stopPropagation();
    const item = btn.closest('.cart-item');
    if (!item || item.classList.contains('is-removing')) return;
    item.classList.add('is-removing');
    setTimeout(() => {
      item.remove();
      if (typeof updateCartTotal === 'function') updateCartTotal();
    }, 350);
  }, true);

  // 6. Корзина: «пульс» у количества и итоговой суммы при изменении
  const pop = el => {
    el.classList.remove('pop');
    void el.offsetWidth; // перезапуск анимации
    el.classList.add('pop');
  };
  const observer = new MutationObserver(list => list.forEach(m => pop(m.target)));
  document.querySelectorAll('.item-quantity span, .total-amount').forEach(el => {
    observer.observe(el, { childList: true });
  });
})();
