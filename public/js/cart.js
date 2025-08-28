// Cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('keranjang.html')) {
        loadCartPage();
    }
});

function loadCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContent = document.getElementById('cart-content');
    const cartSummary = document.getElementById('cart-summary');
    const emptyCart = document.getElementById('empty-cart');
    
    if (cart.length === 0) {
        cartContent.style.display = 'none';
        cartSummary.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    cartContent.style.display = 'block';
    cartSummary.style.display = 'block';
    emptyCart.style.display = 'none';
    
    renderCartItems(cart);
    updateCartSummary(cart);
}

function renderCartItems(cart) {
    const cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input" 
                               onchange="setQuantity(${index}, this.value)">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="area-control">
                        <label>Luas (m²):</label>
                        <input type="number" value="${item.area || 1}" min="0.1" step="0.1" class="area-input" 
                               onchange="setArea(${index}, this.value)" placeholder="1">
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Hapus</button>
                </div>
            </div>
        `;
        cartContent.appendChild(cartItem);
    });
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartPage();
    updateCartCount();
}

function setQuantity(index, value) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = Math.max(1, parseInt(value) || 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartPage();
    updateCartCount();
}

function setArea(index, value) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].area = Math.max(0.1, parseFloat(value) || 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartPage();
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartPage();
    updateCartCount();
    
    if (cart.length === 0) {
        showNotification('Keranjang sudah kosong');
    }
}

function clearCart() {
    if (confirm('Yakin ingin mengosongkan keranjang?')) {
        localStorage.removeItem('cart');
        loadCartPage();
        updateCartCount();
        showNotification('Keranjang telah dikosongkan');
    }
}

function updateCartSummary(cart) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalArea = cart.reduce((sum, item) => sum + (item.area || 1) * item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.area || 1) * item.quantity), 0);
    
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-area').textContent = `${totalArea.toFixed(1)} m²`;
    document.getElementById('total-price').textContent = formatPrice(totalPrice);
}

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Keranjang kosong! Silakan tambahkan produk terlebih dahulu.');
        return;
    }
    
    let message = "Halo, saya ingin konsultasi untuk produk berikut:\n\n";
    let totalPrice = 0;
    let totalArea = 0;
    
    cart.forEach((item, index) => {
        const area = item.area || 1;
        const itemTotal = item.price * area * item.quantity;
        totalPrice += itemTotal;
        totalArea += area * item.quantity;
        
        message += `${index + 1}. ${item.name}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Luas: ${area} m²\n`;
        message += `   Harga: ${formatPrice(item.price)}/m²\n`;
        message += `   Subtotal: ${formatPrice(itemTotal)}\n\n`;
    });
    
    message += `Total Luas: ${totalArea.toFixed(1)} m²\n`;
    message += `Total Harga: ${formatPrice(totalPrice)}\n\n`;
    message += "Mohon informasi lebih lanjut mengenai ketersediaan dan proses pemesanan. Terima kasih!";
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/082136244654?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}