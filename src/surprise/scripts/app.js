/* ===================================================
   Anniversary Surprise App
   =================================================== */
const startDate = new Date('2016-01-11T14:30:00');
const LOGIN_PASSWORD = 'Jyoshi@123';

const getElement = (id) => {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Expected element with id "${id}" to exist.`);
  }
  return element;
};

/* ===================================================
   1. LIVE COUNTER LOGIC
   =================================================== */
function updateCounter() {
  const now = new Date();
  const diffMs = now.getTime() - startDate.getTime();
  const secondsTotal = Math.floor(diffMs / 1000);
  const minutesTotal = Math.floor(secondsTotal / 60);
  const hoursTotal = Math.floor(minutesTotal / 60);
  const daysTotal = Math.floor(hoursTotal / 24);
  const years = Math.floor(daysTotal / 365.25);
  const remainingDays = Math.floor(daysTotal % 365.25);
  const hours = hoursTotal % 24;
  const minutes = minutesTotal % 60;
  const seconds = secondsTotal % 60;
  getElement('years').textContent = String(years);
  getElement('days').textContent = String(remainingDays);
  getElement('hours').textContent = String(hours);
  getElement('minutes').textContent = String(minutes);
  getElement('seconds').textContent = String(seconds);
}
setInterval(updateCounter, 1000);
updateCounter();

/* ===================================================
   0. LOGIN GATE
   =================================================== */
const loginOverlay = getElement('login-overlay');
const loginForm = getElement('login-form');
const passwordInput = getElement('password-input');
const loginFeedback = getElement('login-feedback');
const loginMessage = getElement('login-message');
const loginEmojiState = getElement('login-emoji-state');

function setLoginState(isSuccess) {
  if (isSuccess) {
    loginFeedback.classList.remove('error');
    loginFeedback.classList.add('success');
    loginMessage.textContent = 'Welcome! You unlocked the surprise 💖';
    loginEmojiState.textContent = '🥰✨';
    loginOverlay.classList.add('hidden');
    setTimeout(() => {
      loginOverlay.style.display = 'none';
    }, 450);
    return;
  }
  loginFeedback.classList.remove('success');
  loginFeedback.classList.add('error');
  loginMessage.textContent = 'Password is incorrect';
  loginEmojiState.textContent = '😢💔';
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const enteredPassword = passwordInput.value.trim();
  if (enteredPassword === LOGIN_PASSWORD) {
    setLoginState(true);
  } else {
    setLoginState(false);
    passwordInput.select();
  }
});

/* ===================================================
   2. WISH & CAKE CUTTING LOGIC
   =================================================== */
const saveWishBtn = getElement('save-wish-btn');
const wishInput = getElement('wish-input');
const cakeEmoji = getElement('cake-emoji');
saveWishBtn.addEventListener('click', () => {
  if (!wishInput.value.trim()) {
    alert('Please write your wish first! ❤️');
    return;
  }
  getElement('wish-section').style.display = 'none';
  getElement('cake-section').style.display = 'block';
});
let cakeCut = false;
cakeEmoji.addEventListener('click', () => {
  if (cakeCut) return;
  cakeCut = true;
  cakeEmoji.textContent = '🎂🍰';
  getElement('cake-heading').textContent = 'Yay! Cake Cut Successfully! 🎉';
  getElement('cake-instruction').textContent = 'Wish saved in our hearts forever!';
  triggerConfetti();
  revealCouples();
  setTimeout(() => {
    const proposalSection = getElement('proposal-section');
    proposalSection.style.display = 'block';
    proposalSection.scrollIntoView({ behavior: 'smooth' });
  }, 1200);
});
function revealCouples() {
  const coupleSection = getElement('couple-section');
  const brideCard = getElement('bride-card');
  const groomCard = getElement('groom-card');
  coupleSection.style.display = 'flex';
  setTimeout(() => {
    brideCard.classList.add('revealed');
    groomCard.classList.add('revealed');
  }, 100);
}

/* ===================================================
   3. PROPOSAL INTERACTIVE LOGIC
   =================================================== */
const btnYes = getElement('btn-yes');
const btnNo = getElement('btn-no');
const responseMsg = getElement('response-msg');
btnYes.addEventListener('click', () => {
  responseMsg.textContent = 'I knew it! Forever & Always! ❤️✨';
  triggerConfetti();
  const timelineSection = getElement('timeline-section');
  timelineSection.style.display = 'block';
  setTimeout(() => {
    timelineSection.scrollIntoView({ behavior: 'smooth' });
  }, 500);
});
btnNo.addEventListener('mouseover', moveNoButton);
btnNo.addEventListener('touchstart', moveNoButton);
function moveNoButton() {
  const x = Math.random() * 260 - 130;
  const y = Math.random() * 120 - 60;
  btnNo.style.transform = `translate(${x}px, ${y}px)`;
}

/* ===================================================
   4. MAGAZINE TIMELINE CONTROLS
   =================================================== */
const pages = document.querySelectorAll('.magazine-page');
const prevBtn = getElement('prev-btn');
const nextBtn = getElement('next-btn');
const pageDotsContainer = getElement('page-dots');
let currentPage = 0;
function setupMagazine() {
  pageDotsContainer.innerHTML = '';
  pages.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to timeline page ${index + 1}`);
    dot.addEventListener('click', () => goToPage(index));
    pageDotsContainer.appendChild(dot);
  });
}
function goToPage(index) {
  if (index < 0 || index >= pages.length) return;
  pages[currentPage].classList.remove('active');
  currentPage = index;
  pages[currentPage].classList.add('active');
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === pages.length - 1;
  document.querySelectorAll('.dot').forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentPage);
  });
}
prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
setupMagazine();

/* ===================================================
   5. PARTICLE BACKGROUND & CONFETTI SYSTEM
   =================================================== */
const canvas = getElement('bg-canvas');
const ctx = canvas.getContext('2d');
if (!ctx) {
  throw new Error('Canvas 2D context is not available.');
}
const particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.opacity = 0;
    this.color = '#ffffff';
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 15 + 8;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.color = ['#ff4d6d', '#c77dff', '#ffb703', '#ffffff'][Math.floor(Math.random() * 4)];
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -20) {
      this.reset();
    }
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.font = `${this.size}px serif`;
    ctx.fillText('♥', this.x, this.y);
    ctx.restore();
  }
}
for (let i = 0; i < 35; i += 1) {
  particles.push(new Particle());
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
function triggerConfetti() {
  for (let i = 0; i < 60; i += 1) {
    const particle = new Particle();
    particle.x = canvas.width / 2;
    particle.y = canvas.height / 2;
    particle.speedY = (Math.random() - 0.5) * 8;
    particle.speedX = (Math.random() - 0.5) * 8;
    particles.push(particle);
  }
}
