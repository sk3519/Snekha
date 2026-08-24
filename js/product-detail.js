let current = null;
let selSize = 0;
let qty = 1;

function render() {
  const id = new URLSearchParams(location.search).get("id");
  const p = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
  current = p;
  document.title = `${p.name} — Mithila Farms`;

  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  const [h1, h2] = p.hue.split(",");

  $("#detailRoot").innerHTML = `
    <div>
      <div class="detail-art" style="background:linear-gradient(135deg,${h1},${h2})">
        <span class="big">${p.emoji}</span>
        ${p.img ? `<img class="detail-img" src="${p.img}" alt="${p.name}" onerror="this.remove()">` : ""}
      </div>
    </div>
    <div class="detail-info">
      <span class="card-cat">${CATS[p.cat].label}</span>
      <h1>${p.name}</h1>
      <span class="rating"><span class="stars">★★★★★</span> ${p.rating} · ${p.reviews} reviews</span>
      <div class="price-row" style="margin-top:.8rem">
        <span class="price" style="font-size:1.5rem" id="pdpPrice">${money(p.price)}</span>
        <span class="mrp" id="pdpMrp">${money(p.mrp)}</span>
        <span class="off">${off}% off</span>
      </div>
      <div class="claims-row">
        ${p.claims.map((c) => `<span class="claim-chip">${c}</span>`).join("")}
      </div>
      <div class="opt-label">Choose size</div>
      <div class="swatch-row" id="sizeRow">
        ${p.sizes
          .map(
            (s, i) =>
              `<button class="swatch${i === 0 ? " on" : ""}" data-i="${i}">${s.label} · ${money(p.price + s.delta)}</button>`
          )
          .join("")}
      </div>
      <div class="buy-row">
        <div class="qty-stepper" style="height:46px;padding:0 .3rem">
          <button id="qMinus" style="width:36px;height:100%">−</button>
          <span id="qVal" style="min-width:34px;font-size:1rem">1</span>
          <button id="qPlus" style="width:36px;height:100%">+</button>
        </div>
        <button class="btn btn-accent" id="pdpAdd" style="flex:1;min-width:200px">Add to cart · <span id="lineTotal"></span></button>
      </div>
      <div class="trust-mini">
        <div>🚚 Free shipping ₹500+</div>
        <div>🔒 Secure Razorpay checkout</div>
        <div>↩️ Damaged pack? Free replacement</div>
      </div>
    </div>
    <div style="grid-column:1/-1;margin-top:2.6rem">
      <details class="acc" open>
        <summary>Description</summary>
        <div class="acc-body">${p.desc}</div>
      </details>
      <details class="acc">
        <summary>Nutrition (per 100g, approx.)</summary>
        <div class="acc-body">
          ${nutritionTable(p.cat)}
        </div>
      </details>
      <details class="acc">
        <summary>Sourcing &amp; farmer impact</summary>
        <div class="acc-body">
          ${
            p.cat === "nuts"
              ? "Sourced through certified import partners and repacked in our Bihar facility under strict quality checks."
              : `Grown by partner farmer families in the <a href="farmers.html" style="color:var(--green-700);font-weight:700">Mithila region of Bihar</a>. We buy at the farm gate at 20–30% above local mandi rates and settle payments within 48 hours — every purchase directly supports them.`
          }
        </div>
      </details>
      <details class="acc">
        <summary>Shipping &amp; returns</summary>
        <div class="acc-body">Dispatched within 24 hours from our Madhubani facility. Free shipping over ₹500 (₹49 below). Damaged or leaking packs are replaced free — just share a photo within 48 hours of delivery.</div>
      </details>
    </div>`;

  const rel = PRODUCTS.filter((x) => x.id !== p.id && x.cat !== p.cat).slice(0, 4);
  const relGrid = $("#relatedGrid");
  if (relGrid) relGrid.innerHTML = rel.map(cardHTML).join("");

  bindDetail();
}

function nutritionTable(cat) {
  if (cat === "spices") {
    return `<table class="nutri-table"><tr><td>Serving</td><td>2g (~½ tsp)</td></tr><tr><td>Energy</td><td>~8 kcal</td></tr><tr><td>Storage</td><td>Cool, dry place</td></tr><tr><td>Shelf life</td><td>12 months</td></tr></table>`;
  }
  return `<table class="nutri-table">
    <tr><td>Energy</td><td>${cat === "natural" || cat === "flavoured" ? "347 kcal" : "580–650 kcal"}</td></tr>
    <tr><td>Protein</td><td>${cat === "natural" || cat === "flavoured" ? "9.7 g" : "15–21 g"}</td></tr>
    <tr><td>Carbohydrates</td><td>${cat === "natural" || cat === "flavoured" ? "76 g" : "14–22 g"}</td></tr>
    <tr><td>Fat</td><td>${cat === "natural" || cat === "flavoured" ? "0.1 g" : "45–55 g"}</td></tr>
    <tr><td>Dietary fibre</td><td>${cat === "natural" || cat === "flavoured" ? "14 g" : "8–11 g"}</td></tr>
  </table>`;
}

function bindDetail() {
  const upd = () => {
    const price = current.price + current.sizes[selSize].delta;
    $("#pdpPrice").textContent = money(price);
    $("#pdpMrp").textContent = money(current.mrp + Math.round(current.sizes[selSize].delta * ((current.mrp - current.price) / current.price)));
    $("#lineTotal").textContent = money(price * qty);
    $("#qVal").textContent = qty;
  };
  $$("#sizeRow .swatch").forEach((s) =>
    s.addEventListener("click", () => {
      $$("#sizeRow .swatch").forEach((x) => x.classList.remove("on"));
      s.classList.add("on");
      selSize = +s.dataset.i;
      upd();
    })
  );
  $("#qMinus").addEventListener("click", () => { qty = Math.max(1, qty - 1); upd(); });
  $("#qPlus").addEventListener("click", () => { qty = Math.min(20, qty + 1); upd(); });
  $("#pdpAdd").addEventListener("click", () => {
    Cart.add(current.id, current.sizes[selSize].label, qty);
  });
  upd();
}

document.addEventListener("DOMContentLoaded", render);
