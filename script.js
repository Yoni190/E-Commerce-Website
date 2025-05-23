const cartCountElem = document.getElementById('cart-count');
const cartItemsElem = document.getElementById('cart-items');
const cartTotalElem = document.getElementById('cart-total');

let cart = [];

function updateCartUI() {
    if (cart.length === 0) {
        cartItemsElem.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElem.textContent = '';
        cartCountElem.textContent = '0';
        return;
    }

    cartCountElem.textContent = cart.length;

    cartItemsElem.innerHTML = '';

    cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span>${item.name} - $${item.price} / month</span>
            <button data-id="${item.id}">Remove</button>
        `;
        cartItemsElem.appendChild(div);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalElem.textContent = `Total: $${total} / month`;

    const removeButtons = cartItemsElem.querySelectorAll('button');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            removeFromCart(id);
        });
    });
}

function addToCart(product) {
    if (cart.find(item => item.id === product.id)) {
        alert('This plan is already in your cart.');
        return;
    }
    cart.push(product);
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productDiv = button.closest('.product');
        const product = {
            id: productDiv.getAttribute('data-id'),
            name: productDiv.getAttribute('data-name'),
            price: Number(productDiv.getAttribute('data-price')),
        };
        addToCart(product);
    });
});

updateCartUI();
