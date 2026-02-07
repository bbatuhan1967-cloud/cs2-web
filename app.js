let prices = {};

fetch("data/prices.json")
  .then(res => res.json())
  .then(data => prices = data);

function floatMultiplier(f) {
  if (f < 0.07) return 1.35;
  if (f < 0.15) return 1.15;
  if (f < 0.38) return 1.0;
  if (f < 0.45) return 0.85;
  return 0.7;
}

function stickerBonus(count) {
  return 1 + (count * 0.05);
}

function analyze(prefix) {
  const skin = document.getElementById(prefix + "Skin").value;
  const float = Number(document.getElementById(prefix + "Float").value);
  const stickers = Number(document.getElementById(prefix + "Sticker").value);
  const buyPrice = Number(document.getElementById(prefix + "Price").value);

  if (!prices[skin]) {
    alert("Skin verisi bulunamadı");
    return;
  }

  const data = prices[skin];
  const base = data.avg * floatMultiplier(float);
  const finalPrice = base * stickerBonus(stickers);

  let verdict = "🟡 BEKLE";
  if (buyPrice < finalPrice * 0.95) verdict = "🟢 ALINIR";
  if (buyPrice > finalPrice * 1.1) verdict = "🔴 PAHALI";

  document.getElementById(prefix + "Result").innerHTML = `
    Ortalama Değer: <b>${finalPrice.toFixed(0)} ₺</b><br>
    Likidite: ${data.liq}/10<br>
    Karar: <b>${verdict}</b>
  `;

  drawChart(data.history, prefix + "Chart");
}

function drawChart(values, canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const max = Math.max(...values);

  ctx.strokeStyle = "#22c55e";
  ctx.beginPath();

  values.forEach((val, i) => {
    const x = (i / (values.length - 1)) * canvas.width;
    const y = canvas.height - (val / max) * canvas.height;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}
