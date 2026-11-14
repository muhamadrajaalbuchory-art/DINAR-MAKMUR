/**
 * RAJA MINYAK - JAVASCRIPT UTAMA
 * Tema: Penjualan Minyak Berkualitas (Grosir & Ritel)
 * Semua class dan ID berstandar Raja
 */

// --- DATA PRODUK RAJA MINYAK ---
const rajaProductsData = [
  {
    id: 1,
    name: "Minyak Goreng Sawit Raja Emas",
    category: "sawit",
    categoryLabel: "Minyak Sawit",
    volume: "Pouch 2 Liter",
    price: 34000,
    rating: 4.9,
    reviews: 1420,
    badge: "Paling Laris",
    badgeType: "gold",
    icon: "🛢️",
    desc: "Minyak goreng sawit pilihan melalui 2x proses penyaringan higienis. Menghasilkan gorengan super renyah, jernih, dan tidak cepat hitam.",
    smokePoint: "230°C",
    composition: "100% Minyak Kelapa Sawit Murni, Vitamin A"
  },
  {
    id: 2,
    name: "Minyak Goreng Sawit Raja Murni",
    category: "sawit",
    categoryLabel: "Minyak Sawit",
    volume: "Pouch 1 Liter",
    price: 17500,
    rating: 4.8,
    reviews: 980,
    badge: "Hemat",
    badgeType: "green",
    icon: "🟡",
    desc: "Pilihan praktis keluarga cerdas. Bening, bebas kolesterol, dan kaya provitamin A untuk kebutuhan masakan harian rumah tangga.",
    smokePoint: "230°C",
    composition: "Minyak Kelapa Sawit, Fortifikasi Vitamin A"
  },
  {
    id: 3,
    name: "Minyak Kelapa Murni (VCO) Raja Herbal",
    category: "kelapa",
    categoryLabel: "Minyak Kelapa",
    volume: "Botol Kaca 500 ml",
    price: 55000,
    rating: 5.0,
    reviews: 640,
    badge: "Organik 100%",
    badgeType: "green",
    icon: "🥥",
    desc: "Cold-pressed Virgin Coconut Oil tanpa pemanasan. Kaya Asam Laurat untuk imunitas tubuh, diet keto, dan perawatan kulit/rambut.",
    smokePoint: "177°C",
    composition: "100% Ekstrak Kelapa Segar Alami"
  },
  {
    id: 4,
    name: "Extra Virgin Olive Oil Raja Mediterania",
    category: "zaitun",
    categoryLabel: "Minyak Zaitun",
    volume: "Botol Kaca 1 Liter",
    price: 125000,
    rating: 4.9,
    reviews: 512,
    badge: "Grade Premium",
    badgeType: "gold",
    icon: "🫒",
    desc: "Minyak zaitun murni perasan pertama dari perkebunan Mediterania. Cocok untuk salad dressing, diminum langsung, maupun menumis ringan.",
    smokePoint: "190°C",
    composition: "100% Extra Virgin Olive Oil Alami"
  },
  {
    id: 5,
    name: "Minyak Jagung Sehat Raja Fit",
    category: "jagung",
    categoryLabel: "Minyak Jagung",
    volume: "Jerigen 2 Liter",
    price: 72000,
    rating: 4.8,
    reviews: 380,
    badge: "Ramah Jantung",
    badgeType: "gold",
    icon: "🌽",
    desc: "Minyak jagung alami tinggi asam lemak tak jenuh ganda dan pitosterol yang terbukti membantu menjaga kadar kolesterol sehat.",
    smokePoint: "232°C",
    composition: "100% Minyak Biji Jagung Murni"
  },
  {
    id: 6,
    name: "Minyak Wijen Murni Raja Aromatik",
    category: "wijen",
    categoryLabel: "Minyak Wijen",
    volume: "Botol 600 ml",
    price: 48000,
    rating: 4.9,
    reviews: 430,
    badge: "Aroma Kuat",
    badgeType: "gold",
    icon: "✨",
    desc: "Dihasilkan dari biji wijen panggang pilihan. Memberikan keharuman khas oriental istimewa untuk aneka hidangan restoran dan tumisan.",
    smokePoint: "177°C",
    composition: "100% Ekstrak Biji Wijen Panggang"
  },
  {
    id: 7,
    name: "Minyak Goreng Jerigen Industri Raja Grosir",
    category: "sawit",
    categoryLabel: "Minyak Industri",
    volume: "Jerigen 18 Liter",
    price: 285000,
    rating: 4.9,
    reviews: 820,
    badge: "Harga Pabrik",
    badgeType: "red",
    icon: "🛢️",
    desc: "Dirancang khusus untuk katering, restoran, bakery, dan industri makanan. Kualitas stabil untuk penggorengan berulang skala besar.",
    smokePoint: "235°C",
    composition: "Minyak Olein Sawit Industri CP8 / CP10"
  },
  {
    id: 8,
    name: "Minyak Kanola Sehat Raja Nutri",
    category: "jagung",
    categoryLabel: "Minyak Kanola",
    volume: "Botol 2 Liter",
    price: 68000,
    rating: 4.7,
    reviews: 290,
    badge: "Omega 3 & 6",
    badgeType: "green",
    icon: "🌾",
    desc: "Pilihan terbaik untuk gaya hidup sehat. Rasa netral, titik asap tinggi, serta kaya Omega 3 & 6 untuk kelezatan memasak tanpa rasa bersalah.",
    smokePoint: "204°C",
    composition: "100% Minyak Biji Bunga Kanola Murni"
  }
];

// --- SISTEM KERANJANG BELANJA RAJA ---
let rajaCart = [];

// Muat keranjang dari LocalStorage
function rajaInitCart() {
  const savedCart = localStorage.getItem("raja_cart_data");
  if (savedCart) {
    try {
      rajaCart = JSON.parse(savedCart);
    } catch (e) {
      rajaCart = [];
    }
  }
  rajaUpdateCartUI();
}

// Simpan keranjang ke LocalStorage
function rajaSaveCart() {
  localStorage.setItem("raja_cart_data", JSON.stringify(rajaCart));
  rajaUpdateCartUI();
}

// Tambah produk ke keranjang
function rajaAddToCart(productId) {
  const product = rajaProductsData.find(p => p.id === productId);
  if (!product) return;

  const existingItem = rajaCart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    rajaCart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      volume: product.volume,
      icon: product.icon,
      qty: 1
    });
  }

  rajaSaveCart();
  rajaShowToast(`Berhasil menambah "${product.name}" ke keranjang!`, "success");
}

// Perbarui jumlah produk
function rajaUpdateQty(productId, change) {
  const item = rajaCart.find(i => i.id === productId);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    rajaRemoveFromCart(productId);
    return;
  }
  rajaSaveCart();
}

// Hapus item dari keranjang
function rajaRemoveFromCart(productId) {
  rajaCart = rajaCart.filter(i => i.id !== productId);
  rajaSaveCart();
  rajaShowToast("Produk dihapus dari keranjang", "info");
}

// Format Rupiah
function rajaFormatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
}

// Perbarui Tampilan Keranjang
function rajaUpdateCartUI() {
  const badgeCounts = document.querySelectorAll(".raja-cart-badge-count");
  const totalItems = rajaCart.reduce((acc, curr) => acc + curr.qty, 0);

  badgeCounts.forEach(b => {
    b.textContent = totalItems;
  });

  const cartList = document.getElementById("raja-cart-items-list");
  const cartTotal = document.getElementById("raja-cart-total-amount");

  if (!cartList) return;

  if (rajaCart.length === 0) {
    cartList.innerHTML = `
      <div class="raja-cart-empty">
        <div class="raja-cart-empty-icon">🛒</div>
        <h3>Keranjang Belanja Kosong</h3>
        <p>Anda belum memilih produk minyak unggulan kami.</p>
        <button class="raja-btn raja-btn-primary raja-btn-sm" style="margin-top: 15px;" onclick="rajaCloseCart(); window.location.href='produk.html';">
          Mulai Belanja Minyak
        </button>
      </div>
    `;
    if (cartTotal) cartTotal.textContent = rajaFormatRupiah(0);
    return;
  }

  let totalHarga = 0;
  let html = "";

  rajaCart.forEach(item => {
    const subtotal = item.price * item.qty;
    totalHarga += subtotal;

    html += `
      <div class="raja-cart-item">
        <div class="raja-cart-item-icon">${item.icon}</div>
        <div class="raja-cart-item-info">
          <div class="raja-cart-item-title">${item.name}</div>
          <div class="raja-cart-item-price">${rajaFormatRupiah(item.price)} <small>(${item.volume})</small></div>
          <div class="raja-cart-qty-ctrl">
            <button class="raja-qty-btn" onclick="rajaUpdateQty(${item.id}, -1)">-</button>
            <span style="font-weight: 700; font-size: 0.9rem; min-width: 20px; text-align: center;">${item.qty}</span>
            <button class="raja-qty-btn" onclick="rajaUpdateQty(${item.id}, 1)">+</button>
            <span style="font-size: 0.8rem; color: #64748b; margin-left: 8px;">Subtotal: ${rajaFormatRupiah(subtotal)}</span>
          </div>
        </div>
        <button class="raja-cart-del-btn" onclick="rajaRemoveFromCart(${item.id})" title="Hapus Produk">
          &times;
        </button>
      </div>
    `;
  });

  cartList.innerHTML = html;
  if (cartTotal) cartTotal.textContent = rajaFormatRupiah(totalHarga);
}

// Buka Modal Keranjang
function rajaOpenCart() {
  const modal = document.getElementById("raja-cart-modal");
  if (modal) {
    modal.classList.add("raja-modal-open");
    document.body.style.overflow = "hidden";
  }
}

// Tutup Modal Keranjang
function rajaCloseCart() {
  const modal = document.getElementById("raja-cart-modal");
  if (modal) {
    modal.classList.remove("raja-modal-open");
    document.body.style.overflow = "";
  }
}

// Checkout langsung via WhatsApp
function rajaCheckoutWhatsApp() {
  if (rajaCart.length === 0) {
    rajaShowToast("Keranjang belanja masih kosong!", "info");
    return;
  }

  let pesan = "Halo Admin *DINAR MAKMUR*! 🌿\n";
  pesan += "Saya ingin melakukan pemesanan minyak dengan rincian berikut:\n\n";

  let total = 0;
  rajaCart.forEach((item, idx) => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    pesan += `${idx + 1}. *${item.name}* (${item.volume})\n`;
    pesan += `   Jumlah: ${item.qty} x ${rajaFormatRupiah(item.price)} = ${rajaFormatRupiah(subtotal)}\n`;
  });

  pesan += `\n*Total Estimasi:* ${rajaFormatRupiah(total)}\n\n`;
  pesan += "Mohon info ketersediaan stok, ongkos kirim, dan nomor rekening pembayarannya. Terima kasih!";

  const nomorAdminWA = "6281234567890";
  const urlWA = `https://api.whatsapp.com/send?phone=${nomorAdminWA}&text=${encodeURIComponent(pesan)}`;

  window.open(urlWA, "_blank");
}

// --- TOAST NOTIFIKASI RAJA ---
function rajaShowToast(message, type = "success") {
  let toast = document.getElementById("raja-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "raja-toast";
    toast.className = "raja-toast";
    document.body.appendChild(toast);
  }

  const icon = type === "success" ? "✅" : type === "info" ? "ℹ️" : "⚠️";
  toast.innerHTML = `<span class="raja-toast-icon">${icon}</span> <span>${message}</span>`;
  toast.className = `raja-toast raja-toast-${type} raja-toast-show`;

  setTimeout(() => {
    toast.classList.remove("raja-toast-show");
  }, 3200);
}

// --- RENDER KATALOG PRODUK (Untuk produk.html & index.html) ---
function rajaRenderProductGrid(containerId, filterCategory = "all", searchQuery = "", limit = 0) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let filtered = rajaProductsData;

  // Filter Kategori
  if (filterCategory !== "all") {
    filtered = filtered.filter(p => p.category === filterCategory);
  }

  // Filter Pencarian
  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      p.categoryLabel.toLowerCase().includes(query)
    );
  }

  // Limit jika dibutuhkan (misal di halaman utama)
  if (limit > 0) {
    filtered = filtered.slice(0, limit);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <div style="font-size: 50px; margin-bottom: 15px;">🔍</div>
        <h3 style="color: var(--raja-dark);">Produk Minyak Tidak Ditemukan</h3>
        <p style="color: var(--raja-text-muted);">Coba cari dengan kata kunci lain seperti "Sawit", "Zaitun", atau "Kelapa".</p>
      </div>
    `;
    return;
  }

  let html = "";
  filtered.forEach(p => {
    html += `
      <div class="raja-product-card" data-category="${p.category}">
        <div class="raja-product-img-box">
          <span class="raja-badge raja-badge-${p.badgeType} raja-product-badge-float">${p.badge}</span>
          <div class="raja-product-emoji">${p.icon}</div>
        </div>
        <div class="raja-product-body">
          <span class="raja-product-cat">${p.categoryLabel}</span>
          <h3 class="raja-product-name">${p.name}</h3>
          <div class="raja-product-rating">
            ★★★★★ <span class="raja-rating-text">${p.rating} (${p.reviews} ulasan)</span>
          </div>
          <p class="raja-product-desc">${p.desc}</p>
          <div class="raja-product-footer">
            <div class="raja-product-price-box">
              <span class="raja-price-volume">${p.volume}</span>
              <span class="raja-price-amount">${rajaFormatRupiah(p.price)}</span>
            </div>
            <button class="raja-add-cart-btn" onclick="rajaAddToCart(${p.id})" title="Tambah ke Keranjang">
              🛒
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// --- SETUP EVENT LISTENERS (ON LOAD) ---
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi Keranjang
  rajaInitCart();

  // Mobile Menu Toggle
  const toggleBtn = document.getElementById("raja-menu-toggle");
  const navMenu = document.getElementById("raja-nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("raja-mobile-open");
    });

    // Tutup menu saat link diklik
    document.querySelectorAll(".raja-nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("raja-mobile-open");
      });
    });
  }

  // Header Scroll Effect
  const header = document.querySelector(".raja-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header?.classList.add("raja-scrolled");
    } else {
      header?.classList.remove("raja-scrolled");
    }
  });

  // Keranjang Modal Triggers
  const cartTriggers = document.querySelectorAll(".raja-cart-trigger");
  cartTriggers.forEach(t => {
    t.addEventListener("click", rajaOpenCart);
  });

  const cartCloseBtn = document.getElementById("raja-cart-close-btn");
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener("click", rajaCloseCart);
  }

  const cartOverlay = document.getElementById("raja-cart-overlay");
  if (cartOverlay) {
    cartOverlay.addEventListener("click", rajaCloseCart);
  }

  const checkoutBtn = document.getElementById("raja-checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", rajaCheckoutWhatsApp);
  }

  // Accordion FAQ Toggle
  const accordionHeaders = document.querySelectorAll(".raja-accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains("raja-accordion-open");

      // Tutup accordion lain dalam grup yang sama jika diinginkan
      document.querySelectorAll(".raja-accordion-item").forEach(acc => {
        acc.classList.remove("raja-accordion-open");
      });

      if (!isOpen) {
        item.classList.add("raja-accordion-open");
      }
    });
  });

  // Filter Tab Produk di produk.html
  const filterBtns = document.querySelectorAll(".raja-filter-btn");
  const searchInput = document.getElementById("raja-search-input");
  let currentCategory = "all";

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("raja-filter-active"));
      btn.classList.add("raja-filter-active");
      currentCategory = btn.getAttribute("data-category") || "all";
      rajaRenderProductGrid("raja-catalog-grid", currentCategory, searchInput ? searchInput.value : "");
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      rajaRenderProductGrid("raja-catalog-grid", currentCategory, e.target.value);
    });
  }

  // Render awal produk di halaman produk
  if (document.getElementById("raja-catalog-grid")) {
    rajaRenderProductGrid("raja-catalog-grid", "all", "", 0);
  }

  // Render produk unggulan di halaman utama (4 produk)
  if (document.getElementById("raja-featured-products-grid")) {
    rajaRenderProductGrid("raja-featured-products-grid", "all", "", 4);
  }

  // Form Kontak Submit
  const contactForm = document.getElementById("raja-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nama = document.getElementById("raja-form-nama")?.value || "";
      rajaShowToast(`Terima kasih, ${nama}! Pesan Anda telah terkirim ke Tim DINAR MAKMUR.`, "success");
      contactForm.reset();
    });
  }

  // Form Kemitraan Submit (di layanan.html)
  const partnershipForm = document.getElementById("raja-partner-form");
  if (partnershipForm) {
    partnershipForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const usaha = document.getElementById("raja-form-usaha")?.value || "Usaha Anda";
      rajaShowToast(`Pendaftaran kemitraan ${usaha} berhasil dikirim! Tim B2B kami akan segera menghubungi Anda.`, "success");
      partnershipForm.reset();
    });
  }
});
