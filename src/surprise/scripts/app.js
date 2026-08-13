/* ===================================================
   Anniversary Surprise App
   =================================================== */

// R5/R8: Proposed date/time — Jan 11th 2016, 11:45 IST (fixed absolute instant).
// Using an explicit IST offset means the "time together" is computed against the
// same UTC instant everywhere; each viewer's system time zone is applied by the
// browser automatically when comparing with `new Date()` (which is UTC-anchored).
const startDate = new Date('2016-01-11T11:45:00+05:30');

const LOGIN_PASSWORD = 'Jyoshi@2016';

// R9: How long a successful login is remembered (in minutes). Change this
// single variable to tune the session skip window. Persisted in localStorage
// so the session survives reloads / new-tab visits within the window.
const LOGIN_SESSION_MINUTES = 5;
const LOGIN_SESSION_KEY = 'anniversary_login_at';

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

  // Update bottom counter
  getElement('years-bottom').textContent = String(years);
  getElement('days-bottom').textContent = String(remainingDays);
  getElement('hours-bottom').textContent = String(hours);
  getElement('minutes-bottom').textContent = String(minutes);
  getElement('seconds-bottom').textContent = String(seconds);
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
const loginAttemptsEl = getElement('login-attempts');
const loginHintBtn = getElement('login-hint-btn');
const loginHintEl = getElement('login-hint');

let wrongAttempts = 0;

// R9: Persist the last successful login timestamp so we can skip the login
// gate on reloads/re-visits within the configured window.
function isLoginSessionActive() {
  try {
    const raw = localStorage.getItem(LOGIN_SESSION_KEY);
    if (!raw) return false;
    const at = parseInt(raw, 10);
    if (!Number.isFinite(at)) return false;
    const ageMs = Date.now() - at;
    return ageMs >= 0 && ageMs < LOGIN_SESSION_MINUTES * 60 * 1000;
  } catch (e) {
    return false;
  }
}

function markLoginSuccess() {
  try {
    localStorage.setItem(LOGIN_SESSION_KEY, String(Date.now()));
  } catch (e) {
    // ignore storage errors (private mode, etc.)
  }
}

function setLoginState(isSuccess) {
  if (isSuccess) {
    // R9: Remember the successful login for the configured window.
    markLoginSuccess();

    loginFeedback.classList.remove('error');
    loginFeedback.classList.add('success');
    loginMessage.textContent = 'Welcome! You unlocked the surprise 💖';
    loginEmojiState.textContent = '🥰✨';
    loginOverlay.classList.add('hidden');

    setTimeout(() => {
      loginOverlay.style.display = 'none';
      // Show the Welcome overlay (Congratulations/Welcome) right after login
      const welcomeOverlay = getElement('welcome-overlay');
      welcomeOverlay.style.display = 'flex';
    }, 450);
    return;
  }


  loginFeedback.classList.remove('success');
  loginFeedback.classList.add('error');
  loginMessage.textContent = 'Password is incorrect';
  loginEmojiState.textContent = '😢💔';

  // R4: Clear password field and track attempts
  passwordInput.value = '';

  wrongAttempts += 1;
  loginAttemptsEl.style.display = 'block';
  loginAttemptsEl.textContent = `Wrong attempts: ${wrongAttempts}`;

  // Show hint button after 3 wrong attempts
  if (wrongAttempts >= 3) {
    loginHintBtn.style.display = 'inline-block';
  }
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === LOGIN_PASSWORD) {
    setLoginState(true);
  } else {
    setLoginState(false);
    passwordInput.focus();
  }
});

// R4: Reveal hint on click
loginHintBtn.addEventListener('click', () => {
  loginHintEl.style.display = 'block';
  loginHintBtn.style.display = 'none';
});

// R9: If a valid session exists (within LOGIN_SESSION_MINUTES of the last
// successful login), skip the login gate entirely and go straight to the
// Welcome overlay.
if (isLoginSessionActive()) {
  loginOverlay.style.display = 'none';
  const welcomeOverlay = getElement('welcome-overlay');
  welcomeOverlay.style.display = 'flex';
}


/* ===================================================
   0. WELCOME / HAPPY ANNIVERSARY PAGE & WISH POPUP LOGIC
   =================================================== */
function setupWelcomePage() {
  const welcomeOverlay = getElement('welcome-overlay');
  const welcomeAnniversaryTitle = getElement('welcome-anniversary-title');
  const welcomeGoBtn = getElement('welcome-go-btn');
  const welcomeQtpiLine = getElement('welcome-qtpi-line');

  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  const hasCelebratedThisYear = (now.getMonth() > startDate.getMonth()) ||
                                (now.getMonth() === startDate.getMonth() && now.getDate() >= startDate.getDate());
  if (!hasCelebratedThisYear) {
    years--;
  }
  const displayYears = years + 1; // 11 in 2026, 12 in 2027

  function getOrdinal(n) {
    const j = n % 10;
    const k = n % 100;
    if (j === 1 && k !== 11) {
      return n + "st";
    }
    if (j === 2 && k !== 12) {
      return n + "nd";
    }
    if (j === 3 && k !== 13) {
      return n + "rd";
    }
    return n + "th";
  }

  welcomeAnniversaryTitle.textContent = `Happy ${getOrdinal(displayYears)} Anniversary`;
  // R3: Add "Happy Nth Anniversary my qtπ" with heart-hands emoji
  welcomeQtpiLine.textContent = `Happy ${getOrdinal(displayYears)} Anniversary my qtπ 🫶💖`;

  welcomeGoBtn.addEventListener('click', () => {
    welcomeOverlay.classList.add('hidden');
    setTimeout(() => {
      welcomeOverlay.style.display = 'none';
      // Ensure only make a wish section is shown, hide timer, cake, couple, proposal, timeline
      getElement('timer-header').style.display = 'none';
      getElement('wish-section').style.display = 'block';
      getElement('cake-section').style.display = 'none';
      getElement('couple-section').style.display = 'none';
      getElement('proposal-section').style.display = 'none';
      getElement('timeline-section').style.display = 'none';
    }, 450);
  });

  // Wish popup "Go Ahead" logic
  const wishPopupGoBtn = getElement('wish-popup-go-btn');
  const wishPopupOverlay = getElement('wish-popup-overlay');

  wishPopupGoBtn.addEventListener('click', () => {
    wishPopupOverlay.classList.add('hidden');
    setTimeout(() => {
      wishPopupOverlay.style.display = 'none';
      // Hide wish and show only cake section
      getElement('wish-section').style.display = 'none';
      getElement('cake-section').style.display = 'block';
    }, 450);
  });
}

setupWelcomePage();

/* ===================================================
   2. WISH & CAKE CUTTING LOGIC
   =================================================== */
const saveWishBtn = getElement('save-wish-btn');
const wishInput = getElement('wish-input');
const cakeEmoji = getElement('cake-emoji');
const wishWarning = getElement('wish-warning');

saveWishBtn.addEventListener('click', () => {
  if (!wishInput.value.trim()) {
    wishWarning.textContent = 'Please make a wish before cutting the cake ❤️';
    wishWarning.style.display = 'block';
    return;
  }

  // Show wish popup overlay ("hope your wish come true")
  const wishPopupOverlay = getElement('wish-popup-overlay');
  wishPopupOverlay.classList.remove('hidden');
  wishPopupOverlay.style.display = 'flex';
});

wishInput.addEventListener('input', () => {
  wishWarning.style.display = 'none';
});

let cakeCut = false;

cakeEmoji.addEventListener('click', () => {
  if (cakeCut) return;

  cakeCut = true;
  // R6: New animated multi-tier cake — apply cut animation class
  cakeEmoji.classList.add('cut');
  getElement('cake-heading').textContent = 'Yay! Cake Cut Successfully! 🎉';
  getElement('cake-instruction').textContent = 'Wish saved in our hearts forever!';

  triggerConfetti();
  revealCouples();

  setTimeout(() => {
    // Show proposal yes/no question section
    const proposalSection = getElement('proposal-section');
    proposalSection.style.display = 'block';
    proposalSection.scrollIntoView({ behavior: 'smooth' });
    // No button starts inline (side-by-side with Yes) and only runs away on hover.

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

// R10: Yes button is visible but locked. It only becomes active after the
// user has interacted with the No button at least this many times
// (hover-enter or click each count as one interaction).
const NO_UNLOCK_THRESHOLD = 3;
let noInteractionCount = 0;

btnYes.disabled = true;

function bumpNoInteraction() {
  if (!btnYes.disabled) return; // already unlocked
  noInteractionCount += 1;
  if (noInteractionCount >= NO_UNLOCK_THRESHOLD) {
    btnYes.disabled = false;
  }
}


// Count each mouseenter/mouseover/click/touch on No as an interaction.
// (mouseover in addition to mouseenter because after the button teleports,
// the pointer may not immediately leave and re-enter cleanly.)
btnNo.addEventListener('mouseenter', bumpNoInteraction);
btnNo.addEventListener('click', bumpNoInteraction);
btnNo.addEventListener('touchstart', bumpNoInteraction);


btnYes.addEventListener('click', () => {
  if (btnYes.disabled) return;

  responseMsg.textContent = 'I knew it! Forever & Always! ❤️✨';
  triggerConfetti();

  // Show both Live Counter (Timer), Bottom Timer and Magazine Timeline on YES
  const timerHeader = getElement('timer-header');
  const timerBottom = getElement('timer-bottom');
  const timelineSection = getElement('timeline-section');

  timerHeader.style.display = 'block';
  timerBottom.style.display = 'block';
  timelineSection.style.display = 'block';

  setTimeout(() => {
    timelineSection.scrollIntoView({ behavior: 'smooth' });
  }, 500);
});

// R7: Make "No" button truly run away — teleport far across viewport.
btnNo.addEventListener('mouseover', moveNoButton);
btnNo.addEventListener('mousemove', moveNoButton);
btnNo.addEventListener('touchstart', moveNoButton);
btnNo.addEventListener('focus', moveNoButton);

// R7: No button stays inline (side-by-side with Yes) until the user hovers it,
// then switches to fixed positioning so it can teleport across the viewport.
// This guarantees no overlap when it first appears.

// Container the No button is allowed to escape within (the proposal tile).
const proposalSection = getElement('proposal-section');

function ensureNoFixed() {
  if (btnNo.style.position !== 'absolute') {
    // Ensure the proposal tile is the positioning context.
    if (getComputedStyle(proposalSection).position === 'static') {
      proposalSection.style.position = 'relative';
    }
    // Remember original spot so left/top math below matches what user saw.
    const originalRect = btnNo.getBoundingClientRect();
    // Move the No button OUT of `.proposal-buttons` (which has its own
    // `position: relative` and would otherwise be the offset parent) and
    // append directly to the proposal tile. Now `absolute` coords are
    // measured against the tile, and CSS `overflow: hidden` on the tile
    // will clip anything trying to escape.
    proposalSection.appendChild(btnNo);
    const parentRect = proposalSection.getBoundingClientRect();
    btnNo.style.position = 'absolute';
    btnNo.style.zIndex = '5';
    btnNo.style.left = `${originalRect.left - parentRect.left}px`;
    btnNo.style.top = `${originalRect.top - parentRect.top}px`;
    btnNo.style.margin = '0';
  }
}



function rectsOverlap(a, bLeft, bTop, bW, bH) {
  const pad = 12;
  return !(
    bLeft + bW + pad < a.left ||
    bLeft > a.right + pad ||
    bTop + bH + pad < a.top ||
    bTop > a.bottom + pad
  );
}


// Keeps No button reachable AND strictly inside the proposal tile.
// Coordinates are RELATIVE to the proposal tile (position: absolute).
function moveNoButton(event) {
  ensureNoFixed();
  const parentRect = proposalSection.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();
  const yesRect = btnYes.getBoundingClientRect();

  const btnW = btnRect.width || 100;
  const btnH = btnRect.height || 50;
  const pad = 12; // padding inside the tile

  const tileW = parentRect.width;
  const tileH = parentRect.height;

  // Yes rect in LOCAL (tile) coordinates
  const yesLocal = {
    left:   yesRect.left - parentRect.left,
    top:    yesRect.top  - parentRect.top,
    right:  yesRect.right - parentRect.left,
    bottom: yesRect.bottom - parentRect.top,
  };

  // Safety buffer around Yes so No never touches it.
  const gap = 24;
  const yesBuffer = {
    left:   yesLocal.left   - gap,
    top:    yesLocal.top    - gap,
    right:  yesLocal.right  + gap,
    bottom: yesLocal.bottom + gap,
  };

  // Cursor position in LOCAL coordinates
  const cx = (event && event.clientX ? event.clientX : btnRect.left + btnW / 2) - parentRect.left;
  const cy = (event && event.clientY ? event.clientY : btnRect.top  + btnH / 2) - parentRect.top;

  const minEscape = 50; // min distance from cursor

  // Max valid left/top so the button never goes past the tile edges.
  const maxLeft = Math.max(pad, tileW - btnW - pad);
  const maxTop  = Math.max(pad, tileH - btnH - pad);

  function overlapsYes(left, top) {
    // Does [left..left+btnW] x [top..top+btnH] overlap yesBuffer?
    return !(left + btnW < yesBuffer.left ||
             left > yesBuffer.right ||
             top + btnH < yesBuffer.top ||
             top > yesBuffer.bottom);
  }

  let bestLeft = null;
  let bestTop = null;

  // 1) Random search — must fit tile, avoid Yes buffer, be far enough from cursor.
  for (let i = 0; i < 80; i += 1) {
    const left = pad + Math.random() * (maxLeft - pad);
    const top  = pad + Math.random() * (maxTop  - pad);

    if (overlapsYes(left, top)) continue;

    const centerX = left + btnW / 2;
    const centerY = top  + btnH / 2;
    if (Math.hypot(centerX - cx, centerY - cy) < minEscape) continue;

    bestLeft = left;
    bestTop = top;
    break;
  }

  // 2) Grid fallback — walk the tile in a grid and pick the first cell that
  //    doesn't overlap Yes and is furthest from the cursor.
  if (bestLeft === null) {
    const step = 20;
    let bestDist = -1;
    for (let top = pad; top <= maxTop; top += step) {
      for (let left = pad; left <= maxLeft; left += step) {
        if (overlapsYes(left, top)) continue;
        const d = Math.hypot(left + btnW / 2 - cx, top + btnH / 2 - cy);
        if (d > bestDist) {
          bestDist = d;
          bestLeft = left;
          bestTop = top;
        }
      }
    }
  }

  // 3) Absolute last resort — clamp Yes's own position + gap horizontally.
  if (bestLeft === null) {
    bestLeft = Math.min(maxLeft, Math.max(pad, yesLocal.right + gap));
    bestTop  = Math.min(maxTop,  Math.max(pad, yesLocal.top));
  }

  // Final clamp — never let it exit the tile.
  bestLeft = Math.min(Math.max(pad, bestLeft), maxLeft);
  bestTop  = Math.min(Math.max(pad, bestTop),  maxTop);

  btnNo.style.transform = 'none';
  btnNo.style.left = `${bestLeft}px`;
  btnNo.style.top = `${bestTop}px`;
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

/* Confetti Burst */
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
