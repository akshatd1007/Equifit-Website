// Variables
let cart = [];
let cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartModalContent = document.getElementById('cart-modal-content');

// Update cart count in the header
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Add item to cart
function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: parseFloat(productPrice), // Ensure price is a number
        quantity: 1
    };

    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    updateCartCount();
    saveCart();
    alert(`${product.name} has been successfully added to the cart!`);
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Display cart in modal
function displayCart() {
    if (cart.length === 0) {
        cartModalContent.innerHTML = '<p>Your cart is empty</p>';
    } else {
        let cartItemsHtml = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity; // Calculate total for the item
            total += itemTotal; // Update total for the cart

            cartItemsHtml += `
                <div class="cart-item">
                    <h4>${item.name}</h4>
                    <p>Price: ₹${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: ₹${itemTotal.toFixed(2)}</p>
                    <button class="btn remove-from-cart" data-name="${item.name}">Remove</button>
                </div>
            `;
        });

        // Display total price in rupees
        cartItemsHtml += `<p><strong>Total: ₹${total.toFixed(2)}</strong></p>`;
        cartItemsHtml += '<button class="btn checkout">Checkout</button>';

        cartModalContent.innerHTML = cartItemsHtml;
    }
}

// Open cart modal only when the cart icon is clicked
document.querySelector('#cart').addEventListener('click', function (event) {
    event.preventDefault();
    displayCart();
    cartModal.style.display = 'block'; // Open modal
});

// Close cart modal
document.querySelector('.close-cart').addEventListener('click', function () {
    cartModal.style.display = 'none';
});

// Handle add to cart button click
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.getAttribute('data-name');
        const productPrice = this.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});

// Handle remove from cart button click
cartModal.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-from-cart')) {
        const productName = event.target.getAttribute('data-name');
        cart = cart.filter(item => item.name !== productName);
        saveCart();
        displayCart();
        updateCartCount();
    }
});

// Handle checkout process
cartModal.addEventListener('click', function (event) {
    if (event.target.classList.contains('checkout')) {
        alert('Thank you for your purchase!');
        cart = [];
        saveCart();
        displayCart();
        updateCartCount();
    }
});

// Load cart on page load
window.addEventListener('load', loadCart);

// Preloader functionality
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

// Dropdown functionality for product categories
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(menu => {
    menu.addEventListener('mouseenter', function () {
        this.querySelector('.dropdown-content').style.display = 'block';
    });
    menu.addEventListener('mouseleave', function () {
        this.querySelector('.dropdown-content').style.display = 'none';
    });
});

// Carousel functionality for product section
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(slideIndex) {
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? 'block' : 'none';
    });
}

document.querySelector('.prev-slide').addEventListener('click', function () {
    currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
    showSlide(currentSlide);
});

document.querySelector('.next-slide').addEventListener('click', function () {
    currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
});

// Initialize the first slide on page load
showSlide(currentSlide);

// Hamburger Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger-menu");
    const navItems = document.querySelector("nav ul");

    hamburger.addEventListener("click", function () {
        navItems.classList.toggle("active"); // Toggle active class to show/hide nav items
    });
});
if (cart.length === 0) {
    cartModalContent.innerHTML = '<p>Your cart is empty</p>';
} else {
    // Logic to display cart items
}

