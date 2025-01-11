// Inisialisasi keranjang belanja dari localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi untuk menyimpan keranjang ke localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Fungsi untuk menampilkan keranjang belanja
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');

    // Jika keranjang kosong
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Keranjang Anda kosong!</p>';
    } else {
        // Menampilkan daftar item di keranjang
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <p>${item.name}</p>
                <p>Harga: Rp ${item.price.toLocaleString()}</p>
            </div>
        `).join('');
    }

    // Menampilkan total harga
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    totalPriceContainer.textContent = `Rp ${totalPrice.toLocaleString()}`;
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(id, name, price) {
    // Cek apakah produk sudah ada di keranjang
    const existingProduct = cart.find(item => item.id === id);
    
    if (existingProduct) {
        alert('Produk sudah ada di keranjang!');
    } else {
        // Menambahkan produk baru ke keranjang
        cart.push({ id, name, price });
        saveCart();
        displayCart();
        alert(`${name} berhasil ditambahkan ke keranjang!`);
    }
}

// Event listener untuk tombol "Tambahkan ke Keranjang" di halaman beranda
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.closest('.item');
        const id = item.dataset.id;
        const name = item.dataset.name;
        const price = parseInt(item.dataset.price);

        addToCart(id, name, price);
    });
});

// Fungsi untuk proses checkout
document.getElementById('checkout-btn')?.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong. Silakan tambahkan produk!');
        return;
    }

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const confirmCheckout = confirm(`Total Belanja: Rp ${totalPrice.toLocaleString()}\nApakah Anda yakin ingin melanjutkan?`);

    if (confirmCheckout) {
        // Jika transaksi berhasil, kosongkan keranjang dan simpan
        cart = [];
        saveCart();
        displayCart();
        alert('Transaksi Berhasil! Terima kasih atas pembelian Anda.');
    }
});

// Menampilkan keranjang pada halaman transaksi
if (document.getElementById('cart-items')) {
    displayCart();
}
