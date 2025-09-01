// Cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('keranjang.html')) {
        loadCartPage();
    }
});

function loadCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Normalize units: ornamen/figura/piting should not be 'meter'
    let updated = false;
    cart.forEach((it) => {
        const n = (it.name || '').toLowerCase();
        if ((n.includes('ornamen') || n.includes('ornament') || n.includes('figura') || n.includes('piting')) && (it.unit === 'meter' || !it.unit)) {
            it.unit = 'pcs';
            updated = true;
        }
    });
    if (updated) localStorage.setItem('cart', JSON.stringify(cart));
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
        const unit = item.unit || 'meter';
        const showMeasure = unit === 'meter';
        const measureLabel = unit === 'meter' ? 'Panjang (m):' : unit === 'Lembar' ? 'Jumlah (lembar)' : 'Jumlah (gulung)';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <div class="cart-item-price">${formatPrice(item.price)} <span style="color:#6b7280;font-weight:500;">/ ${unit}</span></div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input" 
                               onchange="setQuantity(${index}, this.value)">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    ${showMeasure ? `
                    <div class="area-control">
                        <label>${measureLabel}</label>
                        <input type="number" value="${item.area || 1}" min="0.1" step="0.1" class="area-input" 
                               onchange="setArea(${index}, this.value)" placeholder="1">
                    </div>
                    ` : ''}
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
    try { window.dispatchEvent(new Event('cart:updated')); } catch (e) {}
}

function setQuantity(index, value) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = Math.max(1, parseInt(value) || 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartPage();
    updateCartCount();
    try { window.dispatchEvent(new Event('cart:updated')); } catch (e) {}
}

function setArea(index, value) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].area = Math.max(0.1, parseFloat(value) || 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartPage();
    try { window.dispatchEvent(new Event('cart:updated')); } catch (e) {}
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartPage();
    updateCartCount();
    try { window.dispatchEvent(new Event('cart:updated')); } catch (e) {}
    
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
        try { window.dispatchEvent(new Event('cart:updated')); } catch (e) {}
    }
}

function updateCartSummary(cart) {
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalMeter = cart
        .filter((i) => (i.unit || 'meter') === 'meter')
        .reduce((sum, item) => sum + (item.quantity || 0) * (item.area || 1), 0);
    const totalPrice = cart.reduce((sum, item) => {
        const unit = item.unit || 'meter';
        const measure = unit === 'meter' ? (item.area || 1) : 1;
        return sum + (item.price * measure * (item.quantity || 0));
    }, 0);

    const itemsEl = document.getElementById('total-items');
    const areaEl = document.getElementById('total-area');
    const priceEl = document.getElementById('total-price');
    if (itemsEl) itemsEl.textContent = totalItems.toString();
    if (areaEl) areaEl.textContent = `${totalMeter.toFixed(1)} m`;
    if (priceEl) priceEl.textContent = formatPrice(totalPrice);
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
        const measure = (item.unit || 'meter') === 'meter' ? area : 1;
        const itemTotal = item.price * measure * item.quantity;
        totalPrice += itemTotal;
        totalArea += ((item.unit || 'meter') === 'meter') ? area * item.quantity : 0;
        
        message += `${index + 1}. ${item.name}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        if ((item.unit || 'meter') === 'meter') {
          message += `   Panjang: ${area} m\n`;
        }
        message += `   Satuan: ${item.unit || 'meter'}\n`;
        message += `   Harga: ${formatPrice(item.price)}\n`;
        message += `   Subtotal: ${formatPrice(itemTotal)}\n\n`;
    });
    
    if (totalArea > 0) message += `Total Meter (PVC): ${totalArea.toFixed(1)} m\n`;
    message += `Total Harga: ${formatPrice(totalPrice)}\n\n`;
    message += "Mohon informasi lebih lanjut mengenai ketersediaan dan proses pemesanan. Terima kasih!";
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/082136244654?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}
