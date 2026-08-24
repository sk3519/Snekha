document.addEventListener("DOMContentLoaded", () => {
  const sub = $("#drawerSubtotal");
  const cnt = $(".drawer-count");
  if (!sub) return;
  const sync = () => {
    sub.textContent = money(Cart.subtotal());
    cnt.textContent = Cart.count();
  };
  sync();
  document.addEventListener("cart:change", sync);
});
