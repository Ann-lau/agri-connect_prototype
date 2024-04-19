let searchForm = document.querySelector('.search-form');
let shoppingCart = document.querySelector('.shopping-cart');
let loginForm = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
}

document.querySelector('#cart-btn').onclick = () => {
  shoppingCart.classList.toggle('active');
  searchForm.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
}

document.querySelector('#login-btn').onclick = () => {
  // Simulate login validation
  let username = document.querySelector('#username').value;
  let password = document.querySelector('#password').value;

  if (username === 'your_username' && password === 'your_password') {
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
    // Clear input fields after successful login
    document.querySelector('#username').value = '';
    document.querySelector('#password').value = '';
  } else {
    // Display error message or handle invalid login
    alert('Invalid username or password. Please try again.');
  }
}

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
}

window.onscroll = () => {
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
}

let swiper = new Swiper(".souk-slider", {
  loop:true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});

const cards = document.querySelectorAll('.box');
const cart = document.querySelector('.shopping-cart');
const totalElement = document.getElementById('total');
const selectedItems = {};

function handleCardClick(event) {
    const card = event.currentTarget;
    const itemId = card.id;
    const itemName = card.querySelector('h3').textContent;
    const itemPrice = parseFloat(card.querySelector('.price').textContent.replace(' SSP/-', ''));

    if (selectedItems[itemId]) {
        selectedItems[itemId].count++;
    } else {
        selectedItems[itemId] = {
            name: itemName,
            price: itemPrice,
            count: 1,
        };
    }

    updateCart();
}

function updateCart() {
    cart.innerHTML = '';
    let total = 0;

    for (const itemId in selectedItems) {
        const item = selectedItems[itemId];
        const listItem = document.createElement('li');
        const quantityContainer = document.createElement('div');
        const quantityText = document.createElement('span');
        const addButton = document.createElement('button');
        const subtractButton = document.createElement('button');

        addButton.textContent = '+';
        subtractButton.textContent = '-';
        quantityText.textContent = item.count;

        addButton.addEventListener('click', () => {
            addItem(itemId);
        });

        subtractButton.addEventListener('click', () => {
            removeItem(itemId);
        });

        const hr = document.createElement('hr');

        quantityContainer.appendChild(subtractButton);
        quantityContainer.appendChild(quantityText);
        quantityContainer.appendChild(addButton);
        quantityContainer.appendChild(hr);

        listItem.textContent = `${item.name} - $${item.price * item.count}`;
        listItem.appendChild(quantityContainer);
        cart.appendChild(listItem);

        total += item.price * item.count;
    }

    totalElement.textContent = `Total : ${total.toFixed(2)} SSP/-`;
}

function addItem(itemId) {
    if (selectedItems[itemId]) {
        selectedItems[itemId].count++;
    }
    updateCart();
}

function removeItem(itemId) {
    if (selectedItems[itemId]) {
        selectedItems[itemId].count--;
        if (selectedItems[itemId].count <= 0) {
            delete selectedItems[itemId];
        }
    }
    updateCart();
}

cards.forEach((card) => {
    const addToCartBtn = card.querySelector('.btn');
    addToCartBtn.addEventListener('click', handleCardClick);
});

