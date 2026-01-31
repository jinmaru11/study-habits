<script>
/* ===== 成長スコア ===== */
function getGrowthScore(){
  return Number(localStorage.getItem("growthScore") || 0);
}

function addGrowthScore(){
  const s = getGrowthScore() + 0.1;
  const fixed = Math.round(s * 10) / 10;
  localStorage.setItem("growthScore", fixed);
  return fixed;
}

/* ===== 抽選 ===== */
function drawHeroType(score){
  const table = [{ type:"common", rate:75 }];

  if(score >= 2) table.push({ type:"rare", rate:22 });
  if(score >= 5) table.push({ type:"legendary", rate:3 });

  const total = table.reduce((s,x)=>s+x.rate,0);
  let r = Math.random() * total;

  for(const t of table){
    if(r < t.rate) return t.type;
    r -= t.rate;
  }
}

/* ===== 偉人取得 ===== */
function drawHero(){
  const score = getGrowthScore();
  const type = drawHeroType(score);
  const list = HEROES[type];
  return { ...list[Math.floor(Math.random()*list.length)], type };
}

/* ===== 保存 ===== */
function saveHero(hero){
  const owned = JSON.parse(localStorage.getItem("ownedHeroes") || "[]");
  if(!owned.includes(hero.name)){
    owned.push(hero.name);
    localStorage.setItem("ownedHeroes", JSON.stringify(owned));
  }
}
</script>
