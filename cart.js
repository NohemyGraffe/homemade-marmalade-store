window.onload = function() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalAmount = document.getElementById('cart-total-amount');

    // Get cart data from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartTotal = localStorage.getItem('cartTotal') || '0.00';

    // If there are items in the cart, display them
    if (cartItems.length > 0) {
        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.innerHTML = `
                ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
                <button class="remove-button" data-index="${index}">Remove</button>
            `;
            cartItemsList.appendChild(cartItemElement);
        });

        // Display the total amount at the bottom
        const totalElement = document.createElement('p');
        totalElement.style.fontWeight = "bold"; // Make total bold
        totalElement.textContent = `Total: $${parseFloat(cartTotal).toFixed(2)}`;
        cartItemsList.appendChild(totalElement);
    } else {
        cartItemsList.textContent = 'Your cart is empty.';
    }

    // Update the total amount in the dedicated span
    cartTotalAmount.textContent = parseFloat(cartTotal).toFixed(2);

    // Handle "Remove" button clicks
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemIndex = parseInt(this.getAttribute('data-index'));
            removeItemFromCart(itemIndex);
        });
    });
};

// Function to remove an item from the cart
function removeItemFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    // Update total price and remove the item
    const itemToRemove = cartItems[index];
    cartTotal -= itemToRemove.price * itemToRemove.quantity;
    cartItems.splice(index, 1);

    // Update localStorage with new cart data
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', cartTotal.toFixed(2));

    // Reload the cart page to reflect changes
    window.location.reload();
}

// Handle the "Proceed to Payment" button
document.getElementById('pay-button').addEventListener('click', function() {
    alert('Proceeding to payment...');

    // Define dynamic transaction details
    const transactionID = `T${Date.now()}`; // Generate a simple transaction ID using a timestamp
    const cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0.00;

    // Push transaction details to the Data Layer
    dataLayer.push({
        'event': 'paymentButtonClick',
        'transactionID': transactionID,
        'amount': cartTotal
    });

    // Clear cart data from localStorage after payment
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartCount');
    localStorage.removeItem('cartTotal');

    // Redirect to the Thank You page
    window.location.href = 'thanks.html';
});


    // Clear cart data from localStorage after payment
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartCount');
    localStorage.removeItem('cartTotal');

    // Redirect to the Thank You page
    window.location.href = 'thanks.html';
});


