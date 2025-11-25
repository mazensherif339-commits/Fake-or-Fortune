const translations = { /* 135 لغة كاملة في ملف languages.js */ };
let currentLang = localStorage.getItem('lang') || 'en';
let stats = { real: 0, fake: 0 };
let currentIsReal = Math.random() > 0.5;
let score = parseInt(localStorage.getItem('score') || '0');
let money = 0;

// تحميل اللغات
fetch('languages.js').then(r => r.text()).then(eval);

function loadImage() {
  document.getElementById('person-img').src = `https://thispersondoesnotexist.com/image?t=${Date.now()}`;
  document.getElementById('amount').textContent = Math.floor(Math.random() * 600) + 50;
  currentIsReal = Math.random() > 0.5;
}
loadImage();

function updateLanguage() {
  const t = translations[currentLang] || translations.en;
  document.getElementById('subtitle').textContent = t.subtitle;
  document.getElementById('real-text').textContent = t.real;
  document.getElementById('fake-text').textContent = t.fake;
  document.querySelector('[data-choice="real"]').textContent = t.real;
  document.querySelector('[data-choice="fake"]').textContent = t.fake;
  document.getElementById('next-btn').textContent = t.next;
}

function showResult(correct) {
  const t = translations[currentLang] || translations.en;
  const text = document.getElementById('result-text');
  if (correct) {
    text.innerHTML = `CORRECT! It was <strong>${currentIsReal ? t.real : t.fake}</strong>`;
    document.getElementById('correct').play();
    score++; localStorage.setItem('score', score);
  } else {
    text.innerHTML = `WRONG! It was <strong>${!currentIsReal ? t.real : t.fake}</strong>`;
    document.getElementById('wrong').play();
  }
  const total = (stats.real + stats.fake) || 1;
  document.getElementById('stats').textContent = `${Math.round(stats.real/total*100)}% ${t.stats.split('•')[0]} • ${Math.round(stats.fake/total*100)}% ${t.stats.split('•')[1]}`;
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('share-buttons').classList.remove('hidden');
  updateLeaderboard();
}

document.querySelectorAll('.choice-btn').forEach(b => b.onclick = () => showResult(b.dataset.choice === 'real' ? currentIsReal : !currentIsReal));
document.getElementById('next-btn').onclick = () => { document.getElementById('result').classList.add('hidden'); document.getElementById('share-buttons').classList.add('hidden'); loadImage(); };

setInterval(() => { money += Math.floor(Math.random()*1200)+400; document.getElementById('money').textContent = money.toLocaleString(); }, 900);

function share(p) {
  const text = `I scored ${score} on Fake or Fortune! Can you beat me?`;
  const url = location.href;
  if(p==='twitter') open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
  if(p==='tiktok') { navigator.clipboard.writeText(url); alert("Copied for TikTok!"); }
  if(p==='whatsapp') open(`https://wa.me/?text=${text} ${url}`);
}

document.getElementById('theme-toggle').onclick = () => { document.body.classList.toggle('light'); };
function updateLeaderboard() {
  document.getElementById('toplist').innerHTML = `<li>You → ${score}</li><li>AI_Slayer → 89</li><li>ProGuess → 77</li><li>NoobKing → 65</li><li>Legend → 58</li>`;
}
updateLeaderboard();

particlesJS("particles-js", {particles:{number:{value:120},color:{value:"#00ffff"},line_linked:{enable:true,color:"#00ffff"},move:{speed:3}},interactivity:{events:{onhover:{enable:true,mode:"repulse"}}}});
