// Select the "Buy Now" buttons
const buttons = document.querySelectorAll('.buy-button');

// Variables to hold cart information
let cartItemsArray = JSON.parse(localStorage.getItem('cartItems')) || []; // Load from localStorage or initialize empty
let cartCount = 0; // Initialize to 0 for recalculation
let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0; // Load from localStorage or initialize to 0

// Recalculate the cart count based on the number of items in localStorage
cartItemsArray.forEach(item => {
    cartCount += item.quantity; // Add up the quantity of all items in the cart
});

// Select the cart elements in the header (top-right corner)
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');

// On page load, update the cart display with stored data
window.onload = function() {
    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = cartTotal.toFixed(2);
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

        // Update the number of items in the cart and the total price
        cartCount++;
        cartTotal += productPrice;

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

// Select the form element
const form = document.getElementById('signup-form');
const successMessage = document.getElementById('signup-success-message');

// Add an event listener to handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way (page reload)

    // Display success message after form submission
    successMessage.style.display = 'block'; // Show the success message

    // Optionally clear the form after submission
    form.reset();
});

// Example function for handling payment completion
function completePayment() {
    const transactionId = 'TX' + new Date().getTime(); // Example transaction ID
    const transactionTotal = cartTotal;

    // Push the payment event to the dataLayer for GTM
    window.dataLayer.push({
        'event': 'payment_complete',
        'transaction_id': transactionId,
        'transaction_total': transactionTotal
    });

    // Notify the user
    alert('Thank you! Your payment was completed successfully.');
    
    // Clear cart data
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartCount');
    localStorage.removeItem('cartTotal');
    
    // Redirect to a Thank You page or reload
    window.location.href = 'thankyou.html';
}
