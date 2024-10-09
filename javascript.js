document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const orderTotalElement = document.getElementById('order-total');

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <span class="remove-item" data-name="${item.name}">&times;</span>
            `;
            cartItemsElement.appendChild(cartItemElement);
            total += item.price;
        });
        cartCountElement.textContent = cart.length;
        orderTotalElement.textContent = total.toFixed(2);
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            cart.push({name, price});
            updateCart();
        });
    });

    cartItemsElement.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-item')) {
            const name = e.target.getAttribute('data-name');
            const index = cart.findIndex(item => item.name === name);
            if (index !== -1) {
                cart.splice(index, 1);
                updateCart();
            }
        }
    });
});