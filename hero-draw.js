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

/* ===== 抽選ロジック ===== */
function drawHero(growthScore){
  let table = [];

  table.push({ type:"common", rate:75 });

  if(growthScore >= 2){
    table.push({ type:"rare", rate:22 });
  }

  if(growthScore >= 5){
    table.push({ type:"legendary", rate:3 });
  }

  const total = table.reduce((s,x)=>s+x.rate,0);
  let r = Math.random() * total;

  for(const t of table){
    if(r < t.rate) return t.type;
    r -= t.rate;
  }
}

/* ===== 偉人取得 ===== */
function getHeroByType(type){
  const list = HEROES[type];
  return list[Math.floor(Math.random() * list.length)];
}
</script>
