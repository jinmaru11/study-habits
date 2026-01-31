/* ===== 獲得済み偉人 ===== */
const owned = JSON.parse(localStorage.getItem("ownedHeroes") || "[]");

/* ===== 全偉人をフラット化 ===== */
const all = [
  ...HEROES.common.map(h=>({...h,type:"common"})),
  ...HEROES.rare.map(h=>({...h,type:"rare"})),
  ...HEROES.legendary.map(h=>({...h,type:"legendary"}))
];

const grid = document.getElementById("grid");

/* ===== 描画 ===== */
all.forEach(hero=>{
  const key = hero.name;
  const isOwned = owned.includes(key);

  const card = document.createElement("div");
  card.className = `card ${hero.type}`;

  card.innerHTML = `
    <div class="img ${isOwned?"":"locked"}"></div>
    <div class="name ${isOwned?"":"locked"}">
      ${hero.name}
    </div>
    <div class="job ${isOwned?"":"locked"}">
      (${hero.job})
    </div>
    <div class="quote ${isOwned?"":"locked"}">
      ${hero.quote}
    </div>
  `;

  grid.appendChild(card);
});
