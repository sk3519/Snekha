const state = { cat: "all", price: "any", sort: "featured" };

const params = new URLSearchParams(location.search);
if (params.get("cat") && CATS[params.get("cat")]) {
  state.cat = params.get("cat");
}

function apply() {
  let list = [...PRODUCTS];

  if (state.cat !== "all") list = list.filter((p) => p.cat === state.cat);

  if (state.price === "lt200") list = list.filter((p) => p.price < 200);
  else if (state.price === "200to350") list = list.filter((p) => p.price >= 200 && p.price <= 350);
  else if (state.price === "gt350") list = list.filter((p) => p.price > 350);

  switch (state.sort) {
    case "priceAsc": list.sort((a, b) => a.price - b.price); break;
    case "priceDesc": list.sort((a, b) => b.price - a.price); break;
    case "rating": list.sort((a, b) => b.rating - a.rating); break;
    case "discount": list.sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp); break;
    default: break;
  }

  const grid = $("#shopGrid");
  grid.innerHTML = list.map(cardHTML).join("");
  $("#resultCount").textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
  $("#noResults").hidden = list.length !== 0;
}

function initCounts() {
  $$("[data-cnt]").forEach((el) => {
    const c = el.dataset.cnt;
    el.textContent = `(${c === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c).length})`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const radioCat = $(`input[name="cat"][value="${state.cat}"]`);
  if (radioCat) radioCat.checked = true;

  $$('input[name="cat"]').forEach((r) =>
    r.addEventListener("change", () => { state.cat = r.value; apply(); })
  );
  $$('input[name="price"]').forEach((r) =>
    r.addEventListener("change", () => { state.price = r.value; apply(); })
  );
  $("#sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; apply(); });
  $("#clearFilters").addEventListener("click", () => {
    state.cat = "all"; state.price = "any";
    $('input[name="cat"][value="all"]').checked = true;
    $('input[name="price"][value="any"]').checked = true;
    apply();
  });

  initCounts();
  apply();
});
