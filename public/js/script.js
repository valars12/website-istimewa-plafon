// Dropdown Kategori
document.querySelector('.dropdown-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    document.querySelector('.category-dropdown').classList.toggle('open');
});

document.addEventListener('click', function(e) {
    const dropdown = document.querySelector('.category-dropdown');
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// Burger Menu
document.getElementById('burger-menu').onclick = function() {
    document.getElementById('nav-list').classList.toggle('active');
};

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart function
function addToCart(name, price, image, quantity = 1) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification(`${name} ditambahkan ke keranjang!`);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2563eb;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Pagination Produk (for produk.html)
if (document.getElementById('product-container')) {
    let currentPage = 1;
    const itemsPerPage = 8;
    const allProducts = Array.from(document.querySelectorAll("#product-container .card-image"));
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    function renderProducts() {
        allProducts.forEach(p => p.style.display = "none");

        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;

        for (let i = start; i < end && i < allProducts.length; i++) {
            allProducts[i].style.display = "block";
        }

        renderPageNumbers();
    }

    function renderPageNumbers() {
        const pageNumbersContainer = document.getElementById("pageNumbers");
        if (!pageNumbersContainer) return;
        
        pageNumbersContainer.innerHTML = "";

        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            startPage = 1;
            endPage = Math.min(totalPages, maxVisible);
        }

        if (currentPage >= totalPages - 2) {
            endPage = totalPages;
            startPage = Math.max(1, totalPages - (maxVisible - 1));
        }

        if (startPage > 1) {
            addPageButton(1);
            if (startPage > 2) {
                addEllipsis(pageNumbersContainer);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            addPageButton(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                addEllipsis(pageNumbersContainer);
            }
            addPageButton(totalPages);
        }
    }

    function addPageButton(page) {
        const pageNumbersContainer = document.getElementById("pageNumbers");
        if (!pageNumbersContainer) return;
        
        const pageBtn = document.createElement("button");
        pageBtn.textContent = page;
        pageBtn.classList.add("page-number");
        if (page === currentPage) pageBtn.classList.add("active");

        pageBtn.addEventListener("click", () => {
            currentPage = page;
            renderProducts();
        });

        pageNumbersContainer.appendChild(pageBtn);
    }

    function addEllipsis(container) {
        const span = document.createElement("span");
        span.textContent = "...";
        span.style.margin = "0 4px";
        span.style.color = "#6b7280";
        container.appendChild(span);
    }

    // Navigation buttons
    if (document.getElementById("prevBtn")) {
        document.getElementById("prevBtn").addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderProducts();
            }
        });
    }

    if (document.getElementById("nextBtn")) {
        document.getElementById("nextBtn").addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderProducts();
            }
        });
    }

    // Initialize pagination
    renderProducts();
}