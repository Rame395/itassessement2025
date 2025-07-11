// navigation bar
function showSidebar(){
    const sidebar=document.querySelector('.side-bar')
    sidebar.style.display='flex'
};
function hideSidebar(){
    const sidebar=document.querySelector('.side-bar')
    sidebar.style.display='none'
};




function openOrderModal() {
  document.getElementById("order-modal").classList.remove("hidden");

  const savedOption = localStorage.getItem("orderOption");
  const savedAddress = localStorage.getItem("deliveryAddress");

  if (savedOption) {
    selectOption(savedOption);
    if (savedOption === "Delivery") {
      document.getElementById("addressInput").value = savedAddress || '';
    }
  }
}

function closeOrderModal() {
  document.getElementById("order-modal").classList.add("hidden");
}



function selectOption(option) {
  const pickupBtn = document.getElementById("pickupBtn");
  const deliveryBtn = document.getElementById("deliveryBtn");
  const addressSection = document.getElementById("delivery-address");
  const pickupInfo = document.getElementById("pickup-info");

  if (option === "Pickup") {
    pickupBtn.classList.add("active");
    deliveryBtn.classList.remove("active");
    addressSection.classList.add("hidden");
    pickupInfo.classList.remove("hidden");
  } else {
    deliveryBtn.classList.add("active");
    pickupBtn.classList.remove("active");
    addressSection.classList.remove("hidden");
    pickupInfo.classList.add("hidden");
  }

  localStorage.setItem("orderOption", option);
}


function saveOrderChoice() {
  const selected = localStorage.getItem("orderOption");
  const addressInput = document.getElementById("addressInput").value.trim();

  if (selected === "Delivery" && addressInput === "") {
    alert("Please enter a delivery address.");
    return;
  }

  if (selected === "Delivery") {
    localStorage.setItem("deliveryAddress", addressInput);
  }

  closeOrderModal();
  alert(`${selected} option saved${selected === 'Delivery' ? ' to ' + addressInput : ''}.`);
}






// Initialize cart from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let total = 0;
let itemCount = 0;

// Adding item to cart
function addToCart(foodCard) {
    const name = foodCard.querySelector('.food-name').textContent;
    const priceText = foodCard.querySelector('.food-price').textContent;
    const price = parseFloat(priceText.replace('Rs', ''));
    const imgSrc = foodCard.querySelector('.food-image').src;

    const existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            name,
            price,
            quantity: 1,
            Image: imgSrc
        });
    }

    updateLocalStorage();
    updateCartDisplay();
    animateAddToCart(foodCard);
}

// Updating cart UI
function updateCartDisplay() {
    const cartList = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');
    const countElement = document.getElementById('cart-count');

    cartList.innerHTML = '';

    total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.classList = 'cart-item';
        li.innerHTML = `
            <img src="${item.Image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Rs${item.price} x ${item.quantity}</div>
            </div>
            <div class="quantity-controls">
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
                <button onclick="changeQuantity('${item.name}', 1)">+</button>
            </div>
            <button class="remove" onclick="removeItem('${item.name}')">x</button>
        `;
        cartList.appendChild(li);
    });

    totalElement.textContent = total.toFixed(2);
    countElement.textContent = itemCount;
}

//Animation on add to cart
function animateAddToCart(element) {
    const cartIcon = document.getElementById('cart-icon');
    const cartRect = cartIcon.getBoundingClientRect();
    const rect = element.getBoundingClientRect();

    const flyingItem = document.createElement('div');
    flyingItem.className = 'flying-item';

    const imageElement = element.querySelector('.food-image') || element.querySelector('.product-image');

    flyingItem.style.cssText = `
        position: fixed;
        z-index: 1000;
        width: 150px;
        height: 150px;
        background-image: url(${imageElement.src});
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        left: ${rect.left}px;
        top: ${rect.top}px;
        transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
        pointer-events: none;
    `;

    document.body.appendChild(flyingItem);

    // Trigger animation
    setTimeout(() => {
        flyingItem.style.transform = 'scale(0.3)';
        flyingItem.style.left = `${cartRect.left + cartRect.width / 2 - 25}px`;
        flyingItem.style.top = `${cartRect.top + cartRect.height / 2 - 25}px`;
        flyingItem.style.opacity = '0';
    }, 50);

    // Remove from DOM after animation ends
    flyingItem.addEventListener('transitionend', () => {
        flyingItem.remove();
    });
}


// Update localStorage
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Change quantity
function changeQuantity(name, delta) {
    const item = cartItems.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeItem(name);
        } else {
            updateLocalStorage();
            updateCartDisplay();
           ;
        }
    }
}

// Remove item
function removeItem(name) {
    cartItems = cartItems.filter(item => item.name !== name);
    updateLocalStorage();
    updateCartDisplay();
}

// Bind buttons on page load
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const foodCard = button.closest('.food-card');
            addToCart(foodCard);
        });
    });

    // Show cart from previous session
    updateCartDisplay();
});









// cart open and close
document.addEventListener("DOMContentLoaded", () => {
  const cartModel = document.getElementById("cart-model");
  const cartOverlay = document.getElementById("cart-overlay");
  const openCartBtn = document.getElementById("open-cart");
  const closeCartBtn = document.getElementById("close-cart");

  function openCart() {
    cartModel.style.right = "0";
    cartOverlay.style.display = "block";
  }

  function closeCart() {
    cartModel.style.right = "-100%";
    cartOverlay.style.display = "none";
  }

  openCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openCart();
  });

  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
});





