const buttons = document.querySelectorAll('.buy-button');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
let totalPrice = 0;

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        // Add the product to the cart
        const cartItem = document.createElement('div');
        cartItem.textContent = `${productName} - $${productPrice.toFixed(2)}`;
        cartItems.appendChild(cartItem);

        // Update total price
        totalPrice += productPrice;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    });
});
