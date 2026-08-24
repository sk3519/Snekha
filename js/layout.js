(function () {
  document.head.insertAdjacentHTML(
    "beforeend",
    '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet" />'
  );

  const page = (location.pathname.split("/").pop() || "index.html").split("?")[0];

  const drop = (catKey) => {
    const items = PRODUCTS.filter((p) => p.cat === catKey);
    const catLabel = CATS[catKey]?.label || catKey;
    return `
    <div class="cat-item">
      <a href="shop.html?cat=${catKey}">${catLabel}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>
      </a>
      <div class="cat-drop">
        <div class="drop-head">Shop ${catLabel}</div>
        ${items
          .map(
            (p) => `<a href="product.html?id=${p.id}">
              <span class="drop-art" style="background:linear-gradient(135deg,${p.hue.split(",")[0]},${p.hue.split(",")[1]})">${p.emoji}</span>
              <span>${p.name}</span>
            </a>`
          )
          .join("")}
        <a href="shop.html?cat=${catKey}" style="color:var(--green-700);font-weight:700;border-top:1px solid var(--line);border-radius:0;margin-top:.3rem;padding-top:.7rem">View all ${catLabel} →</a>
      </div>
    </div>`;
  };

  const header = `
  <div class="topbar">🚚 FREE shipping above <b>₹500</b> · Extra 10% off above ₹2,500 · Roasted, never fried</div>
  <div class="mainbar">
    <div class="container mainbar-inner">
      <button id="burger" class="icon-btn burger" aria-label="Menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
      <a href="index.html" class="logo">
        <span class="logo-mark">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22V8"/><path d="M12 8C12 8 8 7 6 4c4 0 6 4 6 4z"/><path d="M12 8c0 0 4-1 6-4-4 0-6 4-6 4z"/><path d="M12 14c0 0-3-1-5-3 3-.5 5 3 5 3z"/><path d="M12 14c0 0 3-1 5-3-3-.5-5 3-5 3z"/></svg>
        </span>
        <span><span class="logo-text">mithila<em>farms</em></span><small class="logo-sub">Farm to Family · Bihar</small></span>
      </a>
      <form class="search-wrap" id="searchForm" action="shop.html" role="search">
        <div class="search-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input type="search" name="q" id="searchInput" placeholder='Search "peri peri makhana", almonds, turmeric…' aria-label="Search products" autocomplete="off" />
          <button class="search-btn" type="submit" aria-label="Search">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </button>
        </div>
      </form>
      <div class="main-actions">
        <a href="about.html" class="icon-btn" aria-label="Account">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>
          <span class="action-label">Account</span>
        </a>
        <button id="openCart" class="icon-btn" aria-label="Cart">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 7h12l-1.5 12h-9L6 7z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>
          <span class="cart-count" style="display:none">0</span>
        </button>
      </div>
    </div>
  </div>
  <nav class="catbar">
    <div class="container catbar-inner">
      <a href="index.html" class="cat-link${page === "index.html" ? " active" : ""}">Home</a>
      <div class="cat-item"><a href="shop.html">Shop All</a></div>
      ${drop("flavoured")}
      ${drop("natural")}
      ${drop("nuts")}
      ${drop("spices")}
      <div class="cat-item"><a href="shop.html?sort=rating">Bestsellers</a></div>
      <span class="nav-spacer"></span>
      <a href="farmers.html" class="cat-link${page === "farmers.html" ? " active" : ""}">Our Farmers</a>
      <a href="about.html" class="cat-link${page === "about.html" ? " active" : ""}">About Us</a>
      <a href="b2b.html" class="cat-link${page === "b2b.html" ? " active" : ""}">Bulk &amp; HoReCa</a>
      <a href="shop.html?sale=1" class="sale-pill">On Sale</a>
    </div>
  </nav>
  <div id="mobileMenu" class="mobile-menu">
    <a href="index.html">Home</a>
    <div class="mm-head">Shop</div>
    <a href="shop.html">Shop All</a>
    <a href="shop.html?sort=rating">Bestsellers</a>
    <a href="shop.html?sale=1">On Sale</a>
    <a href="shop.html?cat=flavoured">Flavoured Makhana</a>
    <a href="shop.html?cat=natural">Natural Makhana</a>
    <a href="shop.html?cat=nuts">Nuts</a>
    <a href="shop.html?cat=spices">Spices</a>
    <div class="mm-head">Company</div>
    <a href="farmers.html">Our Farmers</a>
    <a href="about.html">About Us</a>
    <a href="b2b.html">Bulk &amp; HoReCa Orders</a>
    <a href="cart.html">My Bag</a>
  </div>`;

  const footer = `
  <footer>
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo" style="color:#fff">
          <span class="logo-mark">🌾</span>
          <span><span class="logo-text" style="color:#fff">mithila<em style="color:var(--gold)">farms</em></span></span>
        </a>
        <p>Premium makhana, nuts and spices sourced directly from farming families of Mithila, Bihar. Fair to farmers. Honest to you.</p>
        <div class="socials">
          <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
          <a href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 8s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.1-1C16.1 4.5 12 4.5 12 4.5s-4.1 0-7 .2c-.4.1-1.3.1-2.1 1C2.2 6.4 2 8 2 8s-.2 1.9-.2 3.7v1.6C1.8 15.1 2 17 2 17s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.8.2 6.7.2 6.7.2s4.1 0 7-.2c.4-.1 1.3-.1 2.1-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.6C22.2 9.9 22 8 22 8zM10 14.6V8.9l5.2 2.9L10 14.6z"/></svg></a>
          <a href="https://wa.me/919000000000" target="_blank" rel="noopener" aria-label="WhatsApp"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 1-13.4 7.9L3 21l1.2-4.5A9 9 0 1 1 21 12z"/><path d="M8.5 9.5c.5 3 3 5.5 6 6l1.5-1.5-2-1.5-1 .5c-.8-.5-1.5-1.2-2-2l.5-1-1.5-2z" fill="currentColor" stroke="none"/></svg></a>
        </div>
      </div>
      <div>
        <h4>Shop</h4>
        <a href="shop.html?cat=flavoured">Flavoured Makhana</a>
        <a href="shop.html?cat=natural">Natural Makhana</a>
        <a href="shop.html?cat=nuts">Nuts &amp; Seeds</a>
        <a href="shop.html?cat=spices">Spices &amp; Masalas</a>
        <a href="shop.html?sort=rating">Bestsellers</a>
      </div>
      <div>
        <h4>Company</h4>
        <a href="about.html">About Us</a>
        <a href="farmers.html">Our Farmers</a>
        <a href="b2b.html">Bulk &amp; HoReCa Orders</a>
        <a href="cart.html">My Bag</a>
      </div>
      <div>
        <h4>Stay in touch</h4>
        <p style="font-size:.82rem;opacity:.75;margin-bottom:.6rem">New flavours, farm stories &amp; subscriber-only discounts.</p>
        <form class="newsletter" data-newsletter>
          <input type="email" placeholder="you@email.com" required />
          <button type="submit">Join</button>
        </form>
        <p style="font-size:.78rem;opacity:.65;margin-top:.9rem">hello@mithilafarms.in<br/>Madhubani, Bihar 847211</p>
      </div>
    </div>
    <div class="footer-bottom container">
      <span>© <span id="year"></span> Mithila Farms Pvt. Ltd. · Made with pride in Bihar 🇮🇳</span>
      <span>Privacy · Terms · Shipping &amp; Returns</span>
    </div>
  </footer>`;

  const drawer = `
  <div id="drawerBackdrop" class="drawer-backdrop"></div>
  <aside id="cartDrawer" class="cart-drawer" aria-label="Shopping bag">
    <div class="cart-drawer-head">
      <h3>Your Bag (<span class="drawer-count">0</span>)</h3>
      <button id="drawerClose" class="icon-btn" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <div id="drawerBody" class="cart-drawer-body"></div>
    <div id="drawerFoot" class="cart-drawer-foot">
      <div class="cart-subtotal"><span>Subtotal</span><span id="drawerSubtotal">₹0</span></div>
      <div class="ship-hint" id="shipHint"></div>
      <a href="checkout.html" class="btn btn-accent btn-block">Checkout securely →</a>
      <a href="cart.html" class="btn btn-outline btn-block continue-shop">View full bag</a>
    </div>
  </aside>`;

  const waBtn = `
  <a href="https://wa.me/919000000000?text=Hi%20Mithila%20Farms!" target="_blank" rel="noopener" class="wa-float" aria-label="Chat on WhatsApp">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.5-.3-3 .8.8-2.9-.3-.5A8 8 0 0 1 12 4zm-3.1 4.2c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2.2-1.3-.8-.7-1.3-1.6-1.5-1.8-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.4-.4-.5-.6-.5z"/></svg>
  </a>`;

  function inject() {
    const h = document.getElementById("siteHeader");
    if (h) h.outerHTML = header;
    const f = document.getElementById("siteFooter");
    if (f) f.outerHTML = footer;
    document.body.insertAdjacentHTML("beforeend", drawer + waBtn);

    $("#burger")?.addEventListener("click", () => $("#mobileMenu").classList.toggle("open"));

    document.addEventListener("submit", (e) => {
      if (e.target.matches("[data-newsletter]")) {
        e.preventDefault();
        e.target.reset();
        Toast.show("Thanks! You're on the list 🌾");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", inject);
})();
