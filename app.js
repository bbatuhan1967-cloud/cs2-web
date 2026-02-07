fetch("data/skins.json")
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById("buySkin");
    select.innerHTML = "";

    Object.entries(data).forEach(([category, skins]) => {
      const group = document.createElement("optgroup");
      group.label = category;

      skins.forEach(skin => {
        const option = document.createElement("option");
        option.value = skin.includes("|") ? skin : `${category} | ${skin}`;
        option.textContent = option.value;
        group.appendChild(option);
      });

      select.appendChild(group);
    });
  })
  .catch(() => {
    document.getElementById("buyResult").innerText =
      "Skin listesi yüklenemedi";
  });

function analyze() {
  const skin = document.getElementById("buySkin").value;
  const float = parseFloat(document.getElementById("buyFloat").value || 0);

  const score = Math.max(0, 100 - float * 100);

  let verdict =
    score > 90 ? "💎 MÜKEMMEL" :
    score > 75 ? "🔥 ÇOK İYİ" :
    score > 60 ? "✅ ORTA" :
    "⚠️ RİSKLİ";

  document.getElementById("buyResult").innerHTML = `
    <div style="font-weight:bold;font-size:18px">${skin}</div>
    <div>Float: ${float}</div>
    <div>Kalite Skoru: ${score.toFixed(1)}</div>
    <div>${verdict}</div>
  `;
}
