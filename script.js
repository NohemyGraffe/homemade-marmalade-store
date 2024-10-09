// Select the "Buy Now" buttons
const buttons = document.querySelectorAll('.buy-button');

// Variables to hold cart information, initially loaded from localStorage
let cartItemsArray = JSON.parse(localStorage.getItem('cartItems')) || [];

// Select the cart elements in the header (top-right corner)
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');

// Function to update the cart display with data from localStorage
function updateCartDisplay() {
    // Reload cart data from localStorage
    cartItemsArray = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartCount = 0;
    let cartTotal = 0;

    // Recalculate cart count and total
    cartItemsArray.forEach(item => {
        cartCount += item.quantity;
        cartTotal += item.price * item.quantity;
    });

    // Update the display elements with the latest values
    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = cartTotal.toFixed(2);
}

// On page load, update the cart display with stored data
window.onload = function() {
    updateCartDisplay();
};

// When users click the "Buy Now" button, update the cart
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        // Check if the product is already in the cart
        const existingProduct = cartItemsArray.find(item => item.name === productName);
        
        if (existingProduct) {
            // If product is already in the cart, increase its quantity
            existingProduct.quantity++;
        } else {
            // If product is not in the cart, add it with quantity 1
            cartItemsArray.push({ name: productName, price: productPrice, quantity: 1 });
        }

        // Update cart count and total
        let cartCount = 0;
        let cartTotal = 0;
        cartItemsArray.forEach(item => {
            cartCount += item.quantity;
            cartTotal += item.price * item.quantity;
        });

        // Update the top-right cart display
        cartCountElement.textContent = cartCount;
        cartTotalElement.textContent = cartTotal.toFixed(2);

        // Store cart items, count, and total in localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
        localStorage.setItem('cartCount', cartCount);
        localStorage.setItem('cartTotal', cartTotal.toFixed(2));

        // Push the add-to-cart event to the dataLayer for GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'add_to_cart',
            'item_name': productName,
            'item_price': productPrice,
            'quantity': existingProduct ? existingProduct.quantity : 1
        });

        // Notify the user that the item has been added to the cart
        alert(`${productName} has been added to your cart.`);
    });
});

// Handle clicking on the cart icon to go to the cart page
const cartInfo = document.getElementById('cart-info');
cartInfo.addEventListener('click', function() {
    window.location.href = 'cart.html'; // Redirect to cart.html page
});

// Optional: Define your other functions (like form submission and payment completion) here
