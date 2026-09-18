/* ================================================================
   CUSTOMIZATION — edit the values below.
   ================================================================ */
const FRIEND_NAME   = "Prashant";          
const NICKNAME       = "Sasu Maa";          

const CLASS_8_PHOTO  = "assets/class8.jpg";        
const FRIEND_PHOTO   = "assets/friend-photo.jpg";   
const BIRTHDAY_AUDIO = "assets/birthday-voice.mp3"; 

const MEMORY_CAPTION =
  "Socha nahi tha ki vo 8 class ka normal handshake itni aachi dosti mai badal jayegaa , but that's what happen.";

const FINAL_MESSAGES = [
  "Sasu maa, you've made every ordinary day feel like a masterpiece of friendship.",
  "Tu hi hai jise mai apna gadha keh sakta hu. 🗣️",
  "Bhaiii tuu meri jaan haiii ❤️",
  "May you live 6000 years and may God blast you 💥"
];

const NO_EXCUSES = [
  "Plans cancelled by the universe 🌌",
  "6000 years already booked, no refunds 📅",
  "NO button is filing a complaint 📝",
  "Bro the NO button just quit 🏳️"
];

const REJECT_MESSAGES = [
  "Bhai tu mujhe बेरोजगार karega?? 😭",
  "CEO seat is still open, think again 👑",
  "Bro please, the company needs a CEO 🥺"
];

const STICKER_JOKES = [
  "Reminder: tu abhi bhi mujhse height mein chota hai 📏",
  "CEO salary update: bhai dekh lenge 😭",
  "6000 saal ke baad bhi tu gadha hi rahega 🫏"
];

let currentScreen = 1;
const TOTAL_SCREENS = 6;

let dodgeCount = 0;
let yesScale = 1;

let declineCount = 0;
let stickersFound = new Set();

const bgMusic = document.getElementById('bg-music');
const finalMusic = document.getElementById('final-music');

document.addEventListener('DOMContentLoaded', () => {
  applyCustomization();
  setupIdentityScreen();
  setupContractDodge();
  setupAudioPlayer();
  setupReactions();
  setupBusinessDeal();
  setupCharacterPicker();
  setupFinalScreen();
  setupStickers();
  setupGenericNav();
  goScreen(1);
});

function applyCustomization(){
  document.querySelectorAll('.js-nickname').forEach(el => el.textContent = NICKNAME);
  document.querySelectorAll('.js-nickname-upper').forEach(el => el.textContent = NICKNAME.toUpperCase());
  document.querySelectorAll('.js-friendname-upper').forEach(el => el.textContent = FRIEND_NAME.toUpperCase());

  const postName = document.getElementById('postName');
  if(postName) postName.textContent = NICKNAME + ' & ' + FRIEND_NAME;

  const memoryCaption = document.getElementById('memoryCaption');
  if(memoryCaption) memoryCaption.textContent = MEMORY_CAPTION;

  const contractFounder = document.getElementById('contractFounder');
  if(contractFounder) contractFounder.textContent = FRIEND_NAME;

  const founderInline = document.getElementById('founderNameInline');
  if(founderInline) founderInline.textContent = FRIEND_NAME;

  setupImage('class8Photo', CLASS_8_PHOTO);
  setupImage('friendAvatar', FRIEND_PHOTO);
  renderFinalMessages();
}

function setupImage(imgId, src){
  const img = document.getElementById(imgId);
  if(!img) return;
  img.addEventListener('load', () => { img.style.display = 'block'; });
  img.addEventListener('error', () => { img.style.display = 'none'; });
  img.src = src;
}

function renderFinalMessages(){
  const wrap = document.getElementById('finalMessages');
  if(!wrap) return;
  wrap.innerHTML = '';
  FINAL_MESSAGES.forEach(msg => {
    const p = document.createElement('p');
    p.textContent = msg;
    wrap.appendChild(p);
  });
}

function goScreen(n){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + n);
  if(target) target.classList.add('active');
  currentScreen = n;
  updateStoryBar(n);

  if(n === 2) resetDodge();
  if(n === 3) replayUnlockAnimation();
}

function updateStoryBar(n){
  document.querySelectorAll('.story-seg').forEach((seg, i) => {
    seg.classList.toggle('filled', i < n);
  });
}

function replayUnlockAnimation(){
  const badge = document.getElementById('unlockBadge');
  if(!badge) return;
  badge.style.animation = 'none';
  void badge.offsetWidth;
  badge.style.animation = '';
}

function setupGenericNav(){
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if(!el) return;
    const action = el.dataset.action;
    switch(action){
      case 'goto-4': goScreen(4); break;
      case 'goto-6': goScreen(6); break;
      default: break;
    }
  });
}

function setupIdentityScreen(){
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if(!el) return;
    if(el.dataset.action === 'identity-yes'){
      showToast('Identity confirmed ✅ Welcome, ' + NICKNAME + '!');
      goScreen(2);
    }
    if(el.dataset.action === 'identity-no'){
      showToast('LIAR DETECTED 🚨 Try again, gadha.');
    }
  });
}

/* SCREEN 2 — 6000 YEAR CONTRACT FIXED */
function setupContractDodge(){
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  if(noBtn){
    noBtn.addEventListener('pointerdown', dodgeNo);
    noBtn.addEventListener('pointerenter', dodgeNo);
    
    // Fix click bleed-through when size drops
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fireConfetti(yesBtn);
      showToast('6000 years, locked in 💖');
      goScreen(3);
    });
  }
  if(yesBtn){
    yesBtn.addEventListener('click', () => {
      fireConfetti(yesBtn);
      showToast('6000 years, locked in 💖');
      goScreen(3);
    });
  }
}

function resetDodge(){
  dodgeCount = 0;
  yesScale = 1;
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const hint = document.getElementById('noHint');
  if(yesBtn) yesBtn.style.transform = 'scale(1)';
  if(noBtn){
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtn.style.opacity = '1';
    noBtn.style.transform = 'scale(1)';
  }
  if(hint) hint.textContent = 'Choose wisely bhai\u2026';
}

function dodgeNo(e){
  if(e) e.preventDefault();
  const wrap = document.getElementById('dodgeWrap');
  const btn = document.getElementById('noBtn');
  if(!wrap || !btn) return;

  const maxX = Math.max(wrap.clientWidth - btn.offsetWidth, 0);
  const maxY = Math.max(wrap.clientHeight - btn.offsetHeight, 0);
  btn.style.left = (Math.random() * maxX) + 'px';
  btn.style.top = (Math.random() * maxY) + 'px';

  dodgeCount++;

  yesScale = Math.min(1 + dodgeCount * 0.1, 1.7);
  const yesBtn = document.getElementById('yesBtn');
  if(yesBtn) yesBtn.style.transform = 'scale(' + yesScale + ')';

  const noScale = Math.max(1 - dodgeCount * 0.1, 0.4);
  const noOpacity = Math.max(1 - dodgeCount * 0.1, 0.35);
  btn.style.transform = 'scale(' + noScale + ')';
  btn.style.opacity = String(noOpacity);

  const hint = document.getElementById('noHint');
  if(hint){
    if(dodgeCount === 1) hint.textContent = 'Arre bhaag kyu raha hai button? 😂';
    else if(dodgeCount === 3) hint.textContent = 'NO ka option cancel hai aaj ke din! 🚫';
    else if(dodgeCount >= 6) hint.textContent = 'Bas YES daba de ab! 💖';
  }

  if(dodgeCount === 1 || dodgeCount === 5){
    showToast(NO_EXCUSES[dodgeCount % NO_EXCUSES.length]);
  }
}

function setupReactions(){
  const likeBtn = document.getElementById('likeBtn');
  const laughBtn = document.getElementById('laughBtn');
  if(likeBtn){
    likeBtn.addEventListener('click', () => bumpCounter('likeCount'));
  }
  if(laughBtn){
    laughBtn.addEventListener('click', () => bumpCounter('laughCount'));
  }
}
function bumpCounter(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.textContent = String(parseInt(el.textContent, 10) + 1);
}

/* SCREEN 3 — AUDIO MESSAGE DUCKING LOGIC */
function setupAudioPlayer(){
  const audio = document.getElementById('bdayAudio');
  const toggle = document.getElementById('audioToggle');
  const track = document.getElementById('progressTrack');
  const fill = document.getElementById('progressFill');
  const volume = document.getElementById('volumeSlider');
  const mascot = document.getElementById('audioMascot');
  const missingHint = document.getElementById('audioMissingHint');
  const player = document.getElementById('audioPlayer');
  if(!audio || !toggle) return;

  let hasError = false;

  audio.addEventListener('error', () => {
    hasError = true;
    if(player) player.style.display = 'none';
    if(missingHint) missingHint.style.display = 'block';
  });

  toggle.addEventListener('click', () => {
    if(hasError) return;
    if(audio.paused){ audio.play().catch(() => {}); }
    else { audio.pause(); }
  });

  audio.addEventListener('play', () => {
    if (bgMusic) bgMusic.volume = 0.1; // Lower background music volume
    toggle.textContent = '⏸';
    if(mascot) mascot.classList.add('bounce');
  });
  audio.addEventListener('pause', () => {
    if (bgMusic) bgMusic.volume = 1.0; // Restore background volume
    toggle.textContent = '▶';
    if(mascot) mascot.classList.remove('bounce');
  });
  audio.addEventListener('ended', () => {
    if (bgMusic) bgMusic.volume = 1.0; // Restore background volume
    toggle.textContent = '▶';
    if(mascot) mascot.classList.remove('bounce');
  });
  audio.addEventListener('timeupdate', () => {
    if(audio.duration && fill){
      fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
    }
  });

  if(track){
    track.addEventListener('click', (e) => {
      if(hasError || !audio.duration) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      audio.currentTime = ratio * audio.duration;
    });
  }
  if(volume){
    volume.addEventListener('input', () => { audio.volume = parseFloat(volume.value); });
  }

  audio.src = BIRTHDAY_AUDIO;
}

function stopAudioIfPlaying(){
  const audio = document.getElementById('bdayAudio');
  if(audio && !audio.paused) audio.pause();
}

function setupBusinessDeal(){
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if(!el) return;
    if(el.dataset.action === 'accept-deal'){
      const stamp = document.getElementById('dealStamp');
      if(stamp) stamp.classList.add('show');
      fireConfetti(el);
      setTimeout(() => goScreen(5), 550);
    }
    if(el.dataset.action === 'reject-deal'){
      const msg = REJECT_MESSAGES[declineCount % REJECT_MESSAGES.length];
      declineCount++;
      showToast(msg);
      const screen = document.getElementById('screen-4');
      if(screen){
        screen.classList.remove('shake');
        requestAnimationFrame(() => screen.classList.add('shake'));
      }
    }
  });
}
function resetDealStamp(){
  const stamp = document.getElementById('dealStamp');
  if(stamp) stamp.classList.remove('show');
}

/* SCREEN 5 — CHOOSE YOUR RIDE FIXED TEXT */
function setupCharacterPicker(){
  document.querySelectorAll('.pick-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pick-item').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      
      const rideMsg = document.getElementById('rideMessage');
      if(rideMsg) {
        rideMsg.textContent = "mere jaisa dost mila to gya tujeee , or kyaa chaiyee!!! LALCHIIII Aurat";
        rideMsg.classList.remove('hidden');
      }

      const continueBtn = document.getElementById('pickContinueBtn');
      if(continueBtn) continueBtn.disabled = false;
    });
  });
}
function resetCharacterPicker(){
  document.querySelectorAll('.pick-item').forEach(b => b.classList.remove('selected'));
  const continueBtn = document.getElementById('pickContinueBtn');
  if(continueBtn) continueBtn.disabled = true;
  const rideMsg = document.getElementById('rideMessage');
  if(rideMsg) rideMsg.classList.add('hidden');
}

function setupFinalScreen(){
  const celebrateBtn = document.getElementById('celebrateBtn');
  const replayBtn = document.getElementById('replayBtn');
  if(celebrateBtn){
    celebrateBtn.addEventListener('click', () => fireConfetti(celebrateBtn));
  }
  if(replayBtn){
    replayBtn.addEventListener('click', resetExperience);
  }
}

/* SCREEN 6 — CANDLE BLOWING & FINAL SONG SWITCH */
function blowCandles() {
  const candleSection = document.getElementById('candleSection');
  if (candleSection) candleSection.style.display = 'none';

  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }
  if (finalMusic) {
    finalMusic.play();
  }

  const msgWrapper = document.getElementById('cakeMessageWrapper');
  if (msgWrapper) {
    msgWrapper.classList.add('show');
  }
}

function resetExperience(){
  stopAudioIfPlaying();
  resetDodge();
  resetDealStamp();
  resetCharacterPicker();
  declineCount = 0;
  
  const candleSection = document.getElementById('candleSection');
  if (candleSection) candleSection.style.display = 'block';
  
  const msgWrapper = document.getElementById('cakeMessageWrapper');
  if (msgWrapper) msgWrapper.classList.remove('show');

  if (finalMusic) {
    finalMusic.pause();
    finalMusic.currentTime = 0;
  }
  if (bgMusic) {
    bgMusic.play();
  }

  const likeCount = document.getElementById('likeCount');
  const laughCount = document.getElementById('laughCount');
  if(likeCount) likeCount.textContent = '0';
  if(laughCount) laughCount.textContent = '0';
  goScreen(1);
}

function setupStickers(){
  document.querySelectorAll('.hidden-sticker').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = btn.dataset.sticker;
      if(!stickersFound.has(idx)){
        stickersFound.add(idx);
        btn.classList.add('found');
        const counter = document.getElementById('stickerCounter');
        if(counter) counter.textContent = '🔍 ' + stickersFound.size + '/' + STICKER_JOKES.length;
      }
      showToast(STICKER_JOKES[idx] || 'Secret found! 🎉');
    });
  });
}

function showToast(message, duration){
  const stack = document.getElementById('toastStack');
  if(!stack) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  stack.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration || 2400);
}

function fireConfetti(originEl){
  const colors = ['#D98880', '#E0A96D', '#8C6239', '#F3E1D0', '#B85C53'];
  let originRect = { left: window.innerWidth / 2, top: window.innerHeight / 3, width: 0, height: 0 };
  if(originEl && originEl.getBoundingClientRect){
    originRect = originEl.getBoundingClientRect();
  }
  const startX = originRect.left + originRect.width / 2;
  const startY = originRect.top + originRect.height / 2;

  for(let i = 0; i < 28; i++){
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = startX + 'px';
    piece.style.top = startY + 'px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 140;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 60;

    piece.style.setProperty('--dx', dx + 'px');
    piece.style.setProperty('--dy', dy + 'px');
    piece.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');

    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
    }
      
