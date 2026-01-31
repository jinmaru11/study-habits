<script>
/* =====================================
   成長スコア
===================================== */
function getGrowthScore(){
  return Number(localStorage.getItem("growthScore") || 0);
}

function addGrowthScore(){
  const s = getGrowthScore() + 0.1;
  const fixed = Math.round(s * 10) / 10;
  localStorage.setItem("growthScore", fixed);
  return fixed;
}

/* =====================================
   抽選ロジック
   Common: 常時
   Rare:   score >= 2
   Legend: score >= 5
===================================== */
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

/* =====================================
   偉人取得
===================================== */
function getHeroByType(type){
  const list = HEROES[type];
  return list[Math.floor(Math.random() * list.length)];
}

/* =====================================
   偉人カード表示
===================================== */
function showHero(hero, type){
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const card = document.createElement("div");
  card.className = "hero " + type;

  card.innerHTML = `
    <h2>${hero.name}
      <span style="font-size:14px;font-weight:normal;">
        （${hero.job}）
      </span>
    </h2>
    <p style="margin-top:12px;">「${hero.quote}」</p>
    <p style="margin-top:10px;font-size:12px;">
      ${type.toUpperCase()}
    </p>
    <p style="margin-top:14px;font-size:12px;">
      タップして閉じる
    </p>
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  overlay.onclick = ()=>overlay.remove();
}
</script>
