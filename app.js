fetch("data/skins.json")
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById("buySkin");
    select.innerHTML = "";

    Object.keys(data).forEach(weapon => {
      const group = document.createElement("optgroup");
      group.label = weapon;

      data[weapon].forEach(skin => {
        const opt = document.createElement("option");
        opt.value = `${weapon} | ${skin}`;
        opt.textContent = `${weapon} | ${skin}`;
        group.appendChild(opt);
      });

      select.appendChild(group);
    });
  });

function analyze() {
  const skin = document.getElementById("buySkin").value;
  const float = parseFloat(document.getElementById("buyFloat").value || 0);
  const price = parseFloat(document.getElementById("buyPrice").value || 0);

  let score = Math.max(0, 100 - float * 100);
  let verdict =
    score > 90 ? "💎 MÜKEMMEL" :
    score > 75 ? "🔥 ÇOK İYİ" :
    score > 60 ? "✅ İYİ" :
    "⚠️ RİSKLİ";

  document.getElementById("buyResult").innerHTML = `
    <div style="font-weight:bold;font-size:18px">${skin}</div>
    <div>Float: ${float}</div>
    <div>Skor: ${score.toFixed(1)}</div>
    <div>${verdict}</div>
  `;
}
