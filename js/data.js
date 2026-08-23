const PRODUCTS = [
  {
    id: "peri-peri-makhana",
    name: "Peri Peri Makhana",
    cat: "flavoured",
    emoji: "🌶️",
    hue: "#fde4d8,#fbcbaf",
    claims: ["Fiery Peri Peri", "Roasted Not Fried", "High Protein"],
    desc: "Crunchy fox nuts tossed in a bold peri peri masala blend. Roasted in small batches with cold-pressed oil, never fried. Grown and hand-graded by our partner farmers in Madhubani, Bihar.",
    price: 149,
    mrp: 199,
    sizes: [
      { label: "60g", delta: 0 },
      { label: "150g", delta: 110 }
    ],
    rating: 4.8,
    reviews: 214
  },
  {
    id: "cheese-herb-makhana",
    name: "Cheese & Herbs Makhana",
    cat: "flavoured",
    emoji: "🧀",
    hue: "#fdf3d1,#f7e3a1",
    claims: ["Real Cheese Seasoning", "Kids Favourite", "Guilt-Free"],
    desc: "Creamy cheese and Italian herb seasoning on sun-dried Mithila makhana. A snack the whole family fights over.",
    price: 149,
    mrp: 199,
    sizes: [
      { label: "60g", delta: 0 },
      { label: "150g", delta: 110 }
    ],
    rating: 4.7,
    reviews: 168
  },
  {
    id: "pudina-makhana",
    name: "Pudina (Mint) Makhana",
    cat: "flavoured",
    emoji: "🌿",
    hue: "#ddf3dd,#bfe3bf",
    claims: ["Cool Mint Punch", "Digestive Friendly", "Roasted Not Fried"],
    desc: "Farm-fresh pudina ground with rock salt and spices, coating every puff. Light, tangy and endlessly snackable.",
    price: 139,
    mrp: 189,
    sizes: [
      { label: "60g", delta: 0 },
      { label: "150g", delta: 100 }
    ],
    rating: 4.6,
    reviews: 97
  },
  {
    id: "tomato-salsa-makhana",
    name: "Tangy Tomato Makhana",
    cat: "flavoured",
    emoji: "🍅",
    hue: "#fddcd6,#f9b8ab",
    claims: ["Tangy Tomato", "No Palm Oil", "Zero Cholesterol"],
    desc: "Sun-ripened tomato tang with a whisper of chilli. Our bestseller for chai-time snacking.",
    price: 139,
    mrp: 189,
    sizes: [
      { label: "60g", delta: 0 },
      { label: "150g", delta: 100 }
    ],
    rating: 4.5,
    reviews: 142
  },
  {
    id: "chocolate-makhana",
    name: "Dark Chocolate Makhana",
    cat: "flavoured",
    emoji: "🍫",
    hue: "#e8d8cc,#d3b49c",
    claims: ["70% Dark Cocoa", "Dessert Swap", "Antioxidant Rich"],
    desc: "Crisp makhana enrobed in real 70% dark chocolate. Your evening dessert, minus the guilt.",
    price: 179,
    mrp: 229,
    sizes: [
      { label: "60g", delta: 0 },
      { label: "150g", delta: 130 }
    ],
    rating: 4.9,
    reviews: 231
  },
  {
    id: "pink-salt-pepper-makhana",
    name: "Pink Salt & Pepper Makhana",
    cat: "flavoured",
    emoji: "🧂",
    hue: "#efe6f7,#dcc8ee",
    claims: ["Himalayan Pink Salt", "Keto Friendly", "Low Calorie"],
    desc: "Simple, clean and classic — Himalayan pink salt and cracked black pepper on perfectly roasted makhana.",
    price: 139,
    mrp: 179,
    sizes: [
      { label: "60g", delta: 0 },
      { label: "150g", delta: 100 }
    ],
    rating: 4.7,
    reviews: 118
  },
  {
    id: "natural-makhana-premium",
    name: "Premium Natural Makhana",
    cat: "natural",
    emoji: "🤍",
    hue: "#f2ede2,#ddd3bd",
    claims: ["Grade A Big Puff", "Raw & Sun-Dried", "Direct From Ponds"],
    desc: "Hand-picked, sun-dried Sona Chura variety fox nuts from the ponds of Madhubani. Big, white and uniformly puffed — perfect for roasting, kheer, makhana curry or your own seasoning.",
    price: 249,
    mrp: 320,
    sizes: [
      { label: "250g", delta: 0 },
      { label: "500g", delta: 220 },
      { label: "1kg", delta: 550 }
    ],
    rating: 4.9,
    reviews: 386
  },
  {
    id: "roasted-salted-makhana",
    name: "Roasted & Salted Makhana",
    cat: "natural",
    emoji: "🍿",
    hue: "#f6efdc,#e8dbba",
    claims: ["Lightly Salted", "Dry Roasted", "Everyday Snack"],
    desc: "The classic. Dry-roasted premium makhana with just a kiss of sendha namak. Clean energy for mid-day cravings.",
    price: 199,
    mrp: 260,
    sizes: [
      { label: "200g", delta: 0 },
      { label: "400g", delta: 170 },
      { label: "800g", delta: 430 }
    ],
    rating: 4.8,
    reviews: 274
  },
  {
    id: "california-almonds",
    name: "California Almonds",
    cat: "nuts",
    emoji: "🌰",
    hue: "#f3e2d8,#e2c4ae",
    claims: ["California Origin", "Crunchy & Fresh", "Rich In Vitamin E"],
    desc: "Premium-grade California almonds, steam-sterilised and packed at source freshness.",
    price: 299,
    mrp: 380,
    sizes: [
      { label: "250g", delta: 0 },
      { label: "500g", delta: 270 }
    ],
    rating: 4.7,
    reviews: 156
  },
  {
    id: "cashew-w240",
    name: "Whole Cashews W240",
    cat: "nuts",
    emoji: "🥜",
    hue: "#faf0dc,#ecd8a8",
    claims: ["W240 Grade", "Creamy Whole Kernels", "Pantry Essential"],
    desc: "Large W240 whole cashews — buttery, creamy and consistent. For snacking, gravies and gifting boxes.",
    price: 349,
    mrp: 450,
    sizes: [
      { label: "250g", delta: 0 },
      { label: "500g", delta: 320 }
    ],
    rating: 4.6,
    reviews: 132
  },
  {
    id: "roasted-pistachios",
    name: "Roasted Salted Pistachios",
    cat: "nuts",
    emoji: "💚",
    hue: "#e4f2dd,#c8e2ba",
    claims: ["Roasted In-House", "Naturally Open", "Protein Rich"],
    desc: "Naturally-opened pistachios roasted lightly in-house and finished with sea salt. No colour, no preservatives.",
    price: 399,
    mrp: 520,
    sizes: [
      { label: "200g", delta: 0 },
      { label: "400g", delta: 360 }
    ],
    rating: 4.8,
    reviews: 98
  },
  {
    id: "walnut-kernels",
    name: "Walnut Kernels (Giri)",
    cat: "nuts",
    emoji: "🧠",
    hue: "#efe7da,#d9c8b0",
    claims: ["Himalayan Walnuts", "Omega-3 Rich", "Light Halves"],
    desc: "Light-coloured walnut kernels from Himalayan orchards. Buttery, never bitter — great for brains and bakes alike.",
    price: 379,
    mrp: 480,
    sizes: [
      { label: "250g", delta: 0 },
      { label: "500g", delta: 340 }
    ],
    rating: 4.7,
    reviews: 111
  },
  {
    id: "mithila-garam-masala",
    name: "Mithila Garam Masala",
    cat: "spices",
    emoji: "🪔",
    hue: "#f5e3cf,#ecc9a3",
    claims: ["Family Recipe", "Stone Ground", "Small Batch"],
    desc: "A warming garam masala blended from a Mithila family recipe — bay leaf, cassia, green & black cardamom, clove and more. Stone-ground weekly.",
    price: 129,
    mrp: 165,
    sizes: [
      { label: "100g", delta: 0 },
      { label: "250g", delta: 160 }
    ],
    rating: 4.9,
    reviews: 187
  },
  {
    id: "high-curcumin-turmeric",
    name: "High-Curcumin Turmeric",
    cat: "spices",
    emoji: "🌟",
    hue: "#fdeeb8,#f7dc82",
    claims: ["5%+ Curcumin", "Single Origin", "No Colour Added"],
    desc: "Deep-gold turmeric from Salem, high in natural curcumin. Sun-dried, boiled and stone-ground — the colour speaks for itself.",
    price: 99,
    mrp: 140,
    sizes: [
      { label: "200g", delta: 0 },
      { label: "500g", delta: 130 }
    ],
    rating: 4.8,
    reviews: 203
  },
  {
    id: "red-chilli-powder",
    name: "Guntur Red Chilli Powder",
    cat: "spices",
    emoji: "🔥",
    hue: "#fadbd3,#f0ab97",
    claims: ["Guntur Sannam", "Spicy & Bright", "Zero Fillers"],
    desc: "Fiery Guntur sannam chillies, sun-dried and stone-ground without fillers or artificial colour. A little goes a long way.",
    price: 119,
    mrp: 155,
    sizes: [
      { label: "200g", delta: 0 },
      { label: "500g", delta: 155 }
    ],
    rating: 4.6,
    reviews: 94
  }
];

const CATS = {
  all: { label: "All Products" },
  flavoured: { label: "Flavoured Makhana" },
  natural: { label: "Natural Makhana" },
  nuts: { label: "Nuts" },
  spices: { label: "Spices" }
};

const FREE_SHIP_ABOVE = 500;
const SHIP_FEE = 49;
