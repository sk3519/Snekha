const RAZORPAY_KEY_ID = "";

const money = (n) => "₹" + Number(n).toLocaleString("en-IN");
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const Cart = {
  read() {
    try { return JSON.parse(localStorage.getItem("mf_cart") || "[]"); }
    catch { return []; }
  },
  write(items) {
    localStorage.setItem("mf_cart", JSON.stringify(items));
    Cart.renderBadge();
  },
  add(id, size, qty = 1) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const items = Cart.read();
    const line = items.find((l) => l.id === id && l.size === size);
    if (line) line.qty += qty;
    else items.push({ id, size, qty, price: p.price + (p.sizes.find((s) => s.label === size)?.delta || 0), name: p.name, emoji: p.emoji, hue: p.hue });
    Cart.write(items);
    Toast.show(`${p.name} added to bag`);
    Cart.openDrawer();
  },
  updateQty(index, delta) {
    const items = Cart.read();
    if (!items[index]) return;
    items[index].qty += delta;
    if (items[index].qty <= 0) items.splice(index, 1);
    Cart.write(items);
    document.dispatchEvent(new CustomEvent("cart:change"));
  },
  remove(index) {
    const items = Cart.read();
    items.splice(index, 1);
    Cart.write(items);
    document.dispatchEvent(new CustomEvent("cart:change"));
  },
  clear() {
    Cart.write([]);
  },
  count() {
    return Cart.read().reduce((a, l) => a + l.qty, 0);
  },
  subtotal() {
    return Cart.read().reduce((a, l) => a + l.qty * l.price, 0);
  },
  shipping() {
    const s = Cart.subtotal();
    return s === 0 || s >= FREE_SHIP_ABOVE ? 0 : SHIP_FEE;
  },
  renderBadge() {
    const n = Cart.count();
    $$(".cart-count").forEach((el) => {
      el.textContent = n;
      el.style.display = n ? "grid" : "none";
    });
  },
  renderDrawer() {
    const body = $("#drawerBody");
    const foot = $("#drawerFoot");
    if (!body) return;
    const items = Cart.read();
    if (!items.length) {
      body.innerHTML = `<div class="cart-empty"><div style="font-size:2.6rem;margin-bottom:.6rem">🧺</div><p>Your bag is empty.</p><a href="shop.html" class="btn btn-primary" style="margin-top:1rem">Shop Makhana</a></div>`;
      if (foot) foot.style.display = "none";
      return;
    }
    if (foot) foot.style.display = "";
    body.innerHTML = items
      .map(
        (l, i) => `
      <div class="cart-line">
        <div class="cart-line-art" style="background:linear-gradient(135deg,${l.hue.split(",")[0]},${l.hue.split(",")[1]})">${l.emoji}</div>
        <div class="cart-line-info">
          <div class="cart-line-name">${l.name}</div>
          <div class="cart-line-meta">${l.size} · ${money(l.price)}</div>
          <button class="line-remove" data-rm="${i}">Remove</button>
        </div>
        <div style="text-align:right">
          <div class="qty-stepper">
            <button data-q="-1" data-i="${i}">−</button><span>${l.qty}</span><button data-q="1" data-i="${i}">+</button>
          </div>
          <div class="cart-line-price" style="margin-top:4px">${money(l.price * l.qty)}</div>
        </div>
      </div>`
      )
      .join("");
    const sub = Cart.subtotal();
    const shipEl = $("#shipHint");
    if (shipEl) {
      if (sub >= FREE_SHIP_ABOVE) {
        shipEl.innerHTML = `<span class="free-pill">🎉 You unlocked FREE shipping</span>`;
      } else {
        const pct = Math.min(100, Math.round((sub / FREE_SHIP_ABOVE) * 100));
        shipEl.innerHTML =
          `<div class="ship-bar"><i style="width:${pct}%"></i></div>` +
          `<span>Add ${money(FREE_SHIP_ABOVE - sub)} more for FREE shipping</span>`;
      }
    }
  },
  openDrawer() {
    Cart.renderDrawer();
    $("#cartDrawer")?.classList.add("open");
    $("#drawerBackdrop")?.classList.add("open");
    document.body.style.overflow = "hidden";
  },
  closeDrawer() {
    $("#cartDrawer")?.classList.remove("open");
    $("#drawerBackdrop")?.classList.remove("open");
    document.body.style.overflow = "";
  }
};

const Toast = {
  show(msg) {
    let wrap = $(".toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "toast-wrap";
      document.body.appendChild(wrap);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }
};

function cardHTML(p) {
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  return `
  <article class="card">
    ${off > 0 ? `<span class="badge">${off}% off</span>` : ""}
    <a class="card-media" href="product.html?id=${p.id}" style="background:linear-gradient(135deg,${p.hue.split(",")[0]},${p.hue.split(",")[1]})">
      <span class="card-art">${p.emoji}</span>
    </a>
    <div class="card-body">
      <span class="card-cat">${CATS[p.cat]?.label || p.cat}</span>
      <a class="card-title" href="product.html?id=${p.id}">${p.name}</a>
      <span class="rating"><span class="stars">★★★★★</span> ${p.rating} (${p.reviews})</span>
      <div class="price-row">
        <span class="price">${money(p.price)}</span>
        <span class="mrp">${money(p.mrp)}</span>
        <span class="off">${off}% off</span>
      </div>
      ${
        p.sizes.length > 1
          ? `<div class="swatch-row">${p.sizes.map((s, i) => `<span class="swatch${i === 0 ? " on" : ""}" data-size="${s.label}">${s.label}</span>`).join("")}</div>`
          : ""
      }
      <div class="card-actions">
        <button class="btn-add" data-add="${p.id}" data-defsize="${p.sizes[0].label}">Add to cart</button>
        <a class="btn-view" href="product.html?id=${p.id}">View details</a>
      </div>
    </div>
  </article>`;
}

document.addEventListener("click", (e) => {
  const swatch = e.target.closest(".swatch[data-size]");
  if (swatch) {
    const card = swatch.closest(".card");
    $$(".swatch", card).forEach((s) => s.classList.remove("on"));
    swatch.classList.add("on");
    const btn = $(".btn-add", card);
    if (btn) btn.dataset.defsize = swatch.dataset.size;
    return;
  }
  const addBtn = e.target.closest("[data-add]");
  if (addBtn) {
    e.preventDefault();
    Cart.add(addBtn.dataset.add, addBtn.dataset.defsize || PRODUCTS.find((p) => p.id === addBtn.dataset.add).sizes[0].label);
    return;
  }
  if (e.target.closest("#openCart")) { e.preventDefault(); Cart.openDrawer(); return; }
  if (e.target.closest("#drawerClose") || e.target.closest("#drawerBackdrop") || e.target.closest(".continue-shop")) { Cart.closeDrawer(); return; }
  const rm = e.target.closest("[data-rm]");
  if (rm) { Cart.remove(+rm.dataset.rm); return; }
  const q = e.target.closest("[data-q]");
  if (q) { Cart.updateQty(+q.dataset.i, +q.dataset.q); Cart.renderDrawer(); }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") Cart.closeDrawer();
});

document.addEventListener("DOMContentLoaded", () => {
  Cart.renderBadge();

  const grids = $$("[data-grid]");
  grids.forEach((g) => {
    let list = g.dataset.grid === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === g.dataset.grid);
    if (g.dataset.limit) list = list.slice(0, +g.dataset.limit);
    g.innerHTML = list.map(cardHTML).join("");
  });

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
});
