const COD_LIMIT = 3000;

function totals() {
  const sub = Cart.subtotal();
  const disc = sub >= 2500 ? Math.round(sub * 0.1) : 0;
  const ship = Cart.shipping();
  return { sub, disc, ship, total: sub - disc + ship };
}

function etaDate() {
  return new Date(Date.now() + 5 * 864e5).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
}

function syncPayMethods(t) {
  const codRadio = $('input[name="pay"][value="cod"]');
  const onlineRadio = $('input[name="pay"][value="online"]');
  const overLimit = t.total > COD_LIMIT;
  codRadio.disabled = overLimit;
  $("#codMethod").classList.toggle("disabled", overLimit);
  $("#codNote").textContent = overLimit
    ? "Not available above ₹3,000 — please pay online."
    : "Available on orders up to ₹3,000. Pay when it arrives.";
  if (overLimit && codRadio.checked) onlineRadio.checked = true;
}

function renderSummary() {
  const items = Cart.read();
  if (!items.length) {
    $("#checkoutEmpty").hidden = false;
    $("#checkoutCols").style.display = "none";
    return false;
  }
  $("#checkoutEmpty").hidden = true;

  $("#sumLines").innerHTML = items
    .map(
      (l) => `
    <div class="summary-row">
      <span>${l.emoji} ${l.name} <small style="color:var(--muted)">· ${l.size} × ${l.qty}</small></span>
      <span>${money(l.price * l.qty)}</span>
    </div>`
    )
    .join("");

  const t = totals();
  $("#itemCount").textContent = Cart.count() + (Cart.count() === 1 ? " item" : " items");
  $("#sumSub").textContent = money(t.sub);
  $("#sumShip").innerHTML = t.ship === 0 ? '<span class="free">FREE</span>' : money(t.ship);
  if (t.disc) {
    $("#discRow").hidden = false;
    $("#sumDisc").textContent = "− " + money(t.disc);
  } else {
    $("#discRow").hidden = true;
  }
  $("#sumTotal").textContent = money(t.total);
  $("#btnTotal").textContent = money(t.total);
  $("#etaLine").textContent = etaDate();
  syncPayMethods(t);
  return true;
}

function saveOrder(items, t, payMode, customer) {
  const id = "MF" + Date.now().toString(36).toUpperCase().slice(-8);
  const orders = JSON.parse(localStorage.getItem("mf_orders") || "[]");
  orders.push({ id, at: new Date().toISOString(), items, totals: t, payMode, customer });
  localStorage.setItem("mf_orders", JSON.stringify(orders));
  localStorage.setItem("mf_last_order", id);
  return id;
}

function showSuccess(id, customer, t, payMode) {
  $("#checkoutRoot").style.display = "none";
  $("#successView").hidden = false;
  $("#ordId").textContent = id;
  $("#ordNote").textContent =
    payMode === "cod"
      ? `Keep ₹${t.total.toLocaleString("en-IN")} ready in cash. You'll get WhatsApp + SMS tracking within 24 hours.`
      : `Payment received. You'll get WhatsApp + SMS tracking within 24 hours.`;

  const lastItems = JSON.parse(localStorage.getItem("mf_last_items") || "[]");
  const rows = customer
    ? `<h4>Delivering to</h4>
       <p style="font-size:.88rem">${customer.name} · ${customer.phone}<br/>${customer.address}, ${customer.city}, ${customer.state} — ${customer.pin}</p>`
    : "";
  $("#orderRecap").innerHTML = `
    ${rows}
    <h4>Items</h4>
    ${lastItems
      .map((l) => `<div class="r-row"><span>${l.emoji} ${l.name} <small style="color:var(--muted)">· ${l.size} × ${l.qty}</small></span><span>${money(l.price * l.qty)}</span></div>`)
      .join("")}
    <div class="r-row r-total"><span>Total paid${payMode === "cod" ? " on delivery" : ""}</span><span>${money(t.total)}</span></div>
    <div class="r-row"><span>Estimated delivery</span><span><b>${etaDate()}</b></span></div>`;
  window.scrollTo(0, 0);
}

function openRazorpay(t, customer, onDone) {
  if (typeof Razorpay === "undefined") {
    Toast.show("Razorpay failed to load — using demo payment");
    setTimeout(onDone, 900);
    return;
  }
  if (!RAZORPAY_KEY_ID) {
    Toast.show("Demo mode: add your Razorpay key in js/main.js to accept real payments");
    setTimeout(onDone, 1100);
    return;
  }
  const rzp = new Razorpay({
    key: RAZORPAY_KEY_ID,
    amount: t.total * 100,
    currency: "INR",
    name: "Mithila Farms",
    description: "Farm-direct makhana order",
    image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌾</text></svg>",
    prefill: { name: customer.name, contact: customer.phone, email: customer.email || "" },
    notes: { address: customer.address },
    theme: { color: "#2c5e3f" },
    handler(res) {
      onDone(res.razorpay_payment_id);
    },
    modal: {
      ondismiss() {
        setBusy(false);
        Toast.show("Payment cancelled — your bag is safe");
      }
    }
  });
  rzp.open();
}

let busy = false;
function setBusy(state) {
  busy = state;
  const btn = $("#placeOrderBtn");
  btn.disabled = state;
  $("#btnLabel").textContent = state ? "Processing…" : "Place order ·";
}

document.addEventListener("DOMContentLoaded", () => {
  if (!renderSummary()) return;

  document.addEventListener("cart:change", () => {
    if (!Cart.read().length) location.reload();
    renderSummary();
  });

  $("#addrForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (busy) return;
    const f = new FormData(e.target);
    const customer = Object.fromEntries(f.entries());
    const items = Cart.read();
    const t = totals();

    if (customer.pay === "cod" && t.total > COD_LIMIT) {
      Toast.show(`COD is available only up to ₹3,000 — please pay online`);
      return;
    }

    // keep a copy for the success recap before clearing the cart
    localStorage.setItem("mf_last_items", JSON.stringify(items));

    setBusy(true);

    if (customer.pay === "cod") {
      const id = saveOrder(items, t, "cod", customer);
      Cart.clear();
      setBusy(false);
      showSuccess(id, customer, t, "cod");
    } else {
      openRazorpay(t, customer, (payRef) => {
        const id = saveOrder(items, t, "online:" + (payRef || "demo"), customer);
        Cart.clear();
        setBusy(false);
        showSuccess(id, customer, t, "online");
      });
    }
  });
});
