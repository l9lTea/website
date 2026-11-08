console.log('Script loaded');

const buttons = document.querySelectorAll('button[data-link]');
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const target = button.dataset.link;
    console.log('Navigating to:', target);
    if (target) {
      window.location.href = target;
    }
  });
});

const quantityButtons = document.querySelectorAll('.quantity-btn');
quantityButtons.forEach(button => {
  button.addEventListener('click', () => {
    const quantitySpan = button.parentElement.querySelector('span');
    let quantity = parseInt(quantitySpan.textContent);
    if (button.textContent === '+') {
      quantity++;
    } else if (button.textContent === '-' && quantity > 1) {
      quantity--;
    }
    quantitySpan.textContent = quantity;
    updateCartTotal();
  });
});

const actionButtons = document.querySelectorAll('button[data-action]');
actionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    console.log(`${button.innerText.trim()} clicked`, action);

    if (action === 'save-profile') {
      alert('Изменения сохранены');
    }

    if (action === 'open-telegram') {
      window.open('https://t.me/ann_romik', '_blank');
    }

    if (action === 'open-instagram') {
      window.open('https://www.instagram.com/ann_romik/', '_blank');
    }

    if (action === 'perform-search') {
      performSearch();
    }

    if (action === 'checkout') {
      alert('Заказ оформлен!');
    }

    if (action === 'remove-item') {
      button.closest('.cart-item').remove();
      updateCartTotal();
    }

    if (action === 'prev-card') {
      console.log('Previous card in collection');
    }

    if (action === 'next-card') {
      console.log('Next card in collection');
    }

    if (action === 'prev-row') {
      const row = button.closest('.collection-section').querySelector('.collection-row');
      shiftRow(row, -1);
    }

    if (action === 'next-row') {
      const row = button.closest('.collection-section').querySelector('.collection-row');
      shiftRow(row, 1);
    }

    if (action === 'arrow-click') {
      console.log('Arrow clicked - navigate to next item');
    }
  });
});

function performSearch() {
  const query = document.querySelector('.search-input').value;
  console.log('Searching for:', query);
}

function updateCartTotal() {
  const items = document.querySelectorAll('.cart-item');
  let total = 0;
  items.forEach(item => {
    const priceText = item.querySelector('.item-price').textContent;
    const price = parseInt(priceText.replace('₽ ', ''));
    const quantity = parseInt(item.querySelector('.item-quantity span').textContent);
    total += price * quantity;
  });
  document.querySelector('.total-amount').textContent = `₽ ${total}`;
}

function shiftRow(row, direction) {
  const cards = row.querySelectorAll('.collection-card');
  const totalCards = cards.length;
  const visibleCards = 3;
  let currentIndex = parseInt(row.dataset.currentIndex || 0);

  console.log('Shifting row:', row, 'direction:', direction, 'currentIndex:', currentIndex, 'totalCards:', totalCards);

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = Math.max(0, totalCards - visibleCards);
  if (currentIndex > totalCards - visibleCards) currentIndex = 0;

  row.dataset.currentIndex = currentIndex;
  const translateX = - (currentIndex * (100 / visibleCards));
  row.style.transform = `translateX(${translateX}%)`;
  console.log('New currentIndex:', currentIndex, 'translateX:', translateX);
}