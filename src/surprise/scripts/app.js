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
  const pluralize = (value, singular, plural) => (value === 1 ? singular : plural);
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

  // Detailed line below the top timer: years, months, weeks, days, hours,
  // minutes, seconds. We compute years/months in a calendar-aware way, then
  // split the remaining duration into weeks/days/time.
  const cursor = new Date(startDate.getTime());
  let detailedYears = 0;
  let detailedMonths = 0;

  while (true) {
    const next = new Date(cursor);
    next.setFullYear(next.getFullYear() + 1);
    if (next <= now) {
      detailedYears += 1;
      cursor.setFullYear(cursor.getFullYear() + 1);
    } else {
      break;
    }
  }

  while (true) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);
    if (next <= now) {
      detailedMonths += 1;
      cursor.setMonth(cursor.getMonth() + 1);
    } else {
      break;
    }
  }

  const remainingAfterMonthsMs = now.getTime() - cursor.getTime();
  const remainingAfterMonthsSeconds = Math.floor(remainingAfterMonthsMs / 1000);
  const remainingAfterMonthsMinutes = Math.floor(remainingAfterMonthsSeconds / 60);
  const remainingAfterMonthsHours = Math.floor(remainingAfterMonthsMinutes / 60);
  const remainingAfterMonthsDays = Math.floor(remainingAfterMonthsHours / 24);

  const detailedWeeks = Math.floor(remainingAfterMonthsDays / 7);
  const detailedDays = remainingAfterMonthsDays % 7;
  const detailedHours = remainingAfterMonthsHours % 24;
  const detailedMinutes = remainingAfterMonthsMinutes % 60;
  const detailedSeconds = remainingAfterMonthsSeconds % 60;

  getElement('detail-years').textContent = String(detailedYears);
  getElement('detail-months').textContent = String(detailedMonths);
  getElement('detail-weeks').textContent = String(detailedWeeks);
  getElement('detail-days').textContent = String(detailedDays);
  getElement('detail-hours').textContent = String(detailedHours);
  getElement('detail-minutes').textContent = String(detailedMinutes);
  getElement('detail-seconds').textContent = String(detailedSeconds);

  getElement('detail-years-bottom').textContent = String(detailedYears);
  getElement('detail-months-bottom').textContent = String(detailedMonths);
  getElement('detail-weeks-bottom').textContent = String(detailedWeeks);
  getElement('detail-days-bottom').textContent = String(detailedDays);
  getElement('detail-hours-bottom').textContent = String(detailedHours);
  getElement('detail-minutes-bottom').textContent = String(detailedMinutes);
  getElement('detail-seconds-bottom').textContent = String(detailedSeconds);

  getElement('detail-years-label').textContent = pluralize(detailedYears, 'year', 'years');
  getElement('detail-months-label').textContent = pluralize(detailedMonths, 'month', 'months');
  getElement('detail-weeks-label').textContent = pluralize(detailedWeeks, 'week', 'weeks');
  getElement('detail-days-label').textContent = pluralize(detailedDays, 'day', 'days');
  getElement('detail-hours-label').textContent = pluralize(detailedHours, 'hour', 'hours');
  getElement('detail-minutes-label').textContent = pluralize(detailedMinutes, 'minute', 'minutes');
  getElement('detail-seconds-label').textContent = pluralize(detailedSeconds, 'second', 'seconds');

  getElement('detail-years-bottom-label').textContent = pluralize(detailedYears, 'year', 'years');
  getElement('detail-months-bottom-label').textContent = pluralize(detailedMonths, 'month', 'months');
  getElement('detail-weeks-bottom-label').textContent = pluralize(detailedWeeks, 'week', 'weeks');
  getElement('detail-days-bottom-label').textContent = pluralize(detailedDays, 'day', 'days');
  getElement('detail-hours-bottom-label').textContent = pluralize(detailedHours, 'hour', 'hours');
  getElement('detail-minutes-bottom-label').textContent = pluralize(detailedMinutes, 'minute', 'minutes');
  getElement('detail-seconds-bottom-label').textContent = pluralize(detailedSeconds, 'second', 'seconds');
}

setInterval(updateCounter, 1000);
updateCounter();

// Balloon-order mini game for the TOP timer. The real values stay hidden
// until balloons 1 → 5 are popped in order.
const timerHeaderEl = getElement('timer-header');
const timerSubtitleEl = getElement('timer-subtitle');
const timerPopWarningEl = getElement('timer-pop-warning');
const timerBalloons = [
  getElement('balloon-years'),
  getElement('balloon-days'),
  getElement('balloon-hours'),
  getElement('balloon-minutes'),
  getElement('balloon-seconds'),
];

let nextBalloonOrder = 1;
let timerUnlocked = false;
let balloonVideoPlaying = false;

const balloonVideoPaths = [
  'videos/i_have_a_secreat.mp4',
  'videos/duck_hearts.mp4',
  'videos/duck_song.mp4',
  'videos/special_delivery.mp4',
  'videos/three_things.mp4',
];

function unlockTimerBalloons() {
  timerUnlocked = true;
  timerHeaderEl.classList.remove('timer-header-locked');
  timerHeaderEl.classList.add('timer-header-unlocked');
  timerSubtitleEl.textContent = 'Years of Magic, Resilient Growth & Togetherness';
  timerPopWarningEl.style.display = 'none';

  const cakeInstructionEl = document.getElementById('cake-instruction');
  const giftBoxWrapEl = document.getElementById('gift-box-wrap');
  if (cakeInstructionEl) {
    cakeInstructionEl.textContent = 'Now tap the gift to open it and reveal the special thing 🎁';
  }
  if (giftBoxWrapEl) {
    giftBoxWrapEl.classList.remove('locked-gift');
  }

  const timerHeader = getElement('timer-header');
  setTimeout(() => {
    timerHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

function handleBalloonPop(event) {
  if (timerUnlocked || balloonVideoPlaying) return;

  const balloon = event.currentTarget;
  const order = Number(balloon.dataset.order);

  if (order !== nextBalloonOrder) {
    timerPopWarningEl.textContent = `Please pop the balloons in order — next is ${nextBalloonOrder} 🎈`;
    timerPopWarningEl.style.display = 'block';
    return;
  }

  timerPopWarningEl.style.display = 'none';
  getElement('gift-warning').style.display = 'none';
  balloon.classList.add('popped');
  nextBalloonOrder += 1;

  playBalloonVideo(order, () => {
    if (nextBalloonOrder > timerBalloons.length) {
      unlockTimerBalloons();
    }
  });
}

function playBalloonVideo(order, onComplete) {
  const videoPath = balloonVideoPaths[order - 1];
  if (!videoPath) {
    onComplete();
    return;
  }

  balloonVideoPlaying = true;
  balloonVideoSource.src = videoPath;
  balloonVideo.load();
  balloonVideo.currentTime = 0;
  balloonVideoOverlay.style.display = 'flex';
  balloonVideoOverlay.setAttribute('aria-hidden', 'false');

  let completed = false;
  const finishBalloonVideo = () => {
    if (completed) return;
    completed = true;
    balloonVideo.pause();
    balloonVideoOverlay.style.display = 'none';
    balloonVideoOverlay.setAttribute('aria-hidden', 'true');
    balloonVideoPlaying = false;
    onComplete();
  };

  balloonVideo.onended = finishBalloonVideo;
  balloonVideo.onerror = finishBalloonVideo;

  const playPromise = balloonVideo.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(finishBalloonVideo);
  }
}

timerBalloons.forEach((balloon) => {
  balloon.addEventListener('click', handleBalloonPop);
});

/* ===================================================
   0. LOGIN GATE
   =================================================== */
const loginOverlay = getElement('login-overlay');
const loginForm = getElement('login-form');
const passwordInput = getElement('password-input');
const loginBtn = getElement('login-btn');
const loginFeedback = getElement('login-feedback');
const loginMessage = getElement('login-message');
const loginEmojiState = getElement('login-emoji-state');
const loginAttemptsEl = getElement('login-attempts');
const loginHintBtn = getElement('login-hint-btn');
const loginHintEl = getElement('login-hint');
const introVideoOverlay = getElement('intro-video-overlay');
const introVideo = getElement('intro-video');
const balloonVideoOverlay = getElement('balloon-video-overlay');
const balloonVideo = getElement('balloon-video');
const balloonVideoSource = getElement('balloon-video-source');
const duduKissVideoOverlay = getElement('dudu-kiss-video-overlay');
const duduKissVideo = getElement('dudu-kiss-video');
const askingQuestionVideo = getElement('asking-question-video');
const takeCareVideoOverlay = getElement('take-care-video-overlay');
const takeCareVideo = getElement('take-care-video');
const givingFlowersVideoWrap = getElement('giving-flowers-video-wrap');
const givingFlowersVideo = getElement('giving-flowers-video');

// R2: Bubu wrong-password scene elements
const bubuScene = getElement('bubu-scene');
const bubuTryAgainBtn = getElement('bubu-try-again-btn');
const tryAgainPrompt = getElement('try-again-prompt');

let wrongAttempts = 0;
let tryAgainRevealTimer = null;

// R2: Show the Bubu-peeks-from-house animation on wrong password, hiding
// the form/feedback until the user clicks "Try Again".
//
// We keep the same DOM node across attempts (no cloning). To restart the
// CSS animations each time, we wipe `animation` inline, force a reflow,
// then clear the inline style so the stylesheet's animations run again.
function restartBubuAnimations() {
  const targets = bubuScene.querySelectorAll(
    '.dudu-door-leaf-v, .dudu-peek-side, .dudu-peek-side .angry-img'
  );
  targets.forEach((el) => {
    el.style.animation = 'none';
  });
  // Force reflow — reading offsetWidth flushes pending style changes.
  // eslint-disable-next-line no-unused-expressions
  bubuScene.offsetWidth;
  targets.forEach((el) => {
    el.style.animation = '';
  });
}

function showBubuScene() {
  loginForm.style.display = 'none';
  loginFeedback.style.display = 'none';
  bubuScene.style.display = 'block';
  tryAgainPrompt.style.display = 'none';
  tryAgainPrompt.classList.remove('visible');

  if (tryAgainRevealTimer) {
    clearTimeout(tryAgainRevealTimer);
    tryAgainRevealTimer = null;
  }

  restartBubuAnimations();

  // Let Bubu come out first, then reveal the cute speech-bubble CTA.
  tryAgainRevealTimer = setTimeout(() => {
    tryAgainPrompt.style.display = 'block';
    // Force reflow so the fade/slide-in plays every time.
    // eslint-disable-next-line no-unused-expressions
    tryAgainPrompt.offsetWidth;
    tryAgainPrompt.classList.add('visible');
  }, 1500);
}

function hideBubuScene() {
  if (tryAgainRevealTimer) {
    clearTimeout(tryAgainRevealTimer);
    tryAgainRevealTimer = null;
  }

  tryAgainPrompt.classList.remove('visible');
  tryAgainPrompt.style.display = 'none';
  bubuScene.style.display = 'none';
  loginForm.style.display = 'flex';
  loginFeedback.style.display = 'block';
  loginBtn.disabled = !passwordInput.value.trim();
  passwordInput.focus();
}

// Bind the Try Again button once — the node is reused across attempts.
bubuTryAgainBtn.addEventListener('click', hideBubuScene);

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

function showWelcomeOverlay() {
  const welcomeOverlay = getElement('welcome-overlay');
  welcomeOverlay.style.display = 'flex';
}

function showIntroVideo() {
  introVideoOverlay.style.display = 'flex';
  introVideoOverlay.setAttribute('aria-hidden', 'false');
  // Try audio first. If a mobile browser rejects audio autoplay after a
  // reload, retry automatically muted instead of hiding the intro video.
  introVideo.muted = false;
  introVideo.currentTime = 0;

  const finishIntroVideo = () => {
    introVideo.pause();
    introVideoOverlay.style.display = 'none';
    introVideoOverlay.setAttribute('aria-hidden', 'true');
    showWelcomeOverlay();
  };

  introVideo.onended = finishIntroVideo;
  introVideo.onerror = finishIntroVideo;

  const playPromise = introVideo.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      introVideo.muted = true;
      const mutedPlayPromise = introVideo.play();
      if (mutedPlayPromise && typeof mutedPlayPromise.catch === 'function') {
        mutedPlayPromise.catch(finishIntroVideo);
      }
    });
  }
}

function startGivingFlowersVideo() {
  givingFlowersVideoWrap.style.display = 'block';
  givingFlowersVideoWrap.setAttribute('aria-hidden', 'false');
  givingFlowersVideo.loop = true;
  givingFlowersVideo.muted = true;

  const playPromise = givingFlowersVideo.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      // Muted autoplay is normally allowed; if a browser still blocks it,
      // leave the inline video visible so the user can start it manually.
    });
  }
}

function stopGivingFlowersVideo() {
  givingFlowersVideo.pause();
  givingFlowersVideo.currentTime = 0;
  givingFlowersVideoWrap.style.display = 'none';
  givingFlowersVideoWrap.setAttribute('aria-hidden', 'true');
}

function startAskingQuestionVideo() {
  askingQuestionVideo.loop = true;
  askingQuestionVideo.muted = true;
  const playPromise = askingQuestionVideo.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      // The inline video remains visible with native controls unavailable;
      // muted autoplay is normally permitted by modern browsers.
    });
  }
}

function playDuduKissVideo(onComplete) {
  duduKissVideo.currentTime = 0;
  duduKissVideoOverlay.style.display = 'flex';
  duduKissVideoOverlay.setAttribute('aria-hidden', 'false');

  let completed = false;
  const finishDuduKissVideo = () => {
    if (completed) return;
    completed = true;
    duduKissVideo.pause();
    duduKissVideoOverlay.style.display = 'none';
    duduKissVideoOverlay.setAttribute('aria-hidden', 'true');
    onComplete();
  };

  duduKissVideo.onended = finishDuduKissVideo;
  duduKissVideo.onerror = finishDuduKissVideo;

  const playPromise = duduKissVideo.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(finishDuduKissVideo);
  }
}

function playTakeCareVideo(onComplete) {
  takeCareVideo.currentTime = 0;
  takeCareVideoOverlay.style.display = 'flex';
  takeCareVideoOverlay.setAttribute('aria-hidden', 'false');

  let completed = false;
  const finishTakeCareVideo = () => {
    if (completed) return;
    completed = true;
    takeCareVideo.pause();
    takeCareVideoOverlay.style.display = 'none';
    takeCareVideoOverlay.setAttribute('aria-hidden', 'true');
    onComplete();
  };

  takeCareVideo.onended = finishTakeCareVideo;
  takeCareVideo.onerror = finishTakeCareVideo;

  const playPromise = takeCareVideo.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(finishTakeCareVideo);
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
    // Start from the submit gesture so browsers allow the video to play.
    showIntroVideo();

    setTimeout(() => {
      loginOverlay.style.display = 'none';
    }, 450);
    return;
  }


  loginFeedback.classList.remove('success');
  loginFeedback.classList.add('error');
  loginMessage.textContent = 'Password is incorrect';
  loginEmojiState.textContent = '😢💔';

  // R4: Clear password field and track attempts
  passwordInput.value = '';
  loginBtn.disabled = true;

  wrongAttempts += 1;
  loginAttemptsEl.style.display = 'block';
  loginAttemptsEl.textContent = `Wrong attempts: ${wrongAttempts}`;

  // Show hint button after 3 wrong attempts
  if (wrongAttempts >= 3) {
    loginHintBtn.style.display = 'inline-block';
  }

  // R2: Play the Bubu-peeks-from-house animation on wrong entry.
  showBubuScene();
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const enteredPassword = passwordInput.value.trim();
  if (!enteredPassword) {
    loginBtn.disabled = true;
    passwordInput.focus();
    return;
  }

  if (enteredPassword === LOGIN_PASSWORD) {
    setLoginState(true);
  } else {
    setLoginState(false);
    passwordInput.focus();
  }
});

passwordInput.addEventListener('input', () => {
  loginBtn.disabled = !passwordInput.value.trim();
});

loginBtn.disabled = !passwordInput.value.trim();

// R4: Reveal hint on click
loginHintBtn.addEventListener('click', () => {
  loginHintEl.style.display = 'block';
  loginHintBtn.style.display = 'none';
});

// R9: If a valid session exists (within LOGIN_SESSION_MINUTES of the last
// successful login), skip the login gate but replay the intro before showing
// the Welcome overlay. If mobile blocks audio autoplay, the video retries
// automatically muted so the intro is still shown.
if (isLoginSessionActive()) {
  loginOverlay.style.display = 'none';
  showIntroVideo();
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
      startGivingFlowersVideo();
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
    // Prepare both the timer and cake BEFORE the popup fully fades away,
    // so they are already rendered behind it and appear together.
    getElement('wish-section').style.display = 'none';
    getElement('timer-header').style.display = 'block';
    getElement('cake-section').style.display = 'block';
    getElement('timer-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
    getElement('cake-emoji').classList.remove('gift-revealed', 'assembling', 'cut');
    cakeCut = false;
    cakeReadyToCut = false;

    const giftBoxWrapEl = getElement('gift-box-wrap');
    const cakeHeadingEl = getElement('cake-heading');
    const cakeInstructionEl = getElement('cake-instruction');
    giftBoxWrapEl.classList.remove('opened');
    giftBoxWrapEl.classList.add('locked-gift');
    getElement('gift-warning').style.display = 'none';
    cakeHeadingEl.textContent = 'Open the Gift to Reveal Your Cake 🎁🎂';
    cakeInstructionEl.textContent = 'Pop all the balloons first, then open the gift to see the magic ✨';

    wishPopupOverlay.classList.add('hidden');
    setTimeout(() => {
      wishPopupOverlay.style.display = 'none';
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
const cakeHeading = getElement('cake-heading');
const cakeInstruction = getElement('cake-instruction');
const giftWarning = getElement('gift-warning');
const giftBoxWrap = getElement('gift-box-wrap');

saveWishBtn.addEventListener('click', () => {
  if (!wishInput.value.trim()) {
    wishWarning.textContent = 'Please make a wish before going ahead  ❤️';
    wishWarning.style.display = 'block';
    return;
  }

  // Stop the looping flower video when the secret wish is submitted, then
  // continue with the existing wish popup flow.
  stopGivingFlowersVideo();
  const wishPopupOverlay = getElement('wish-popup-overlay');
  wishPopupOverlay.classList.remove('hidden');
  wishPopupOverlay.style.display = 'flex';
});

wishInput.addEventListener('input', () => {
  wishWarning.style.display = 'none';
});

let cakeCut = false;
let giftOpened = false;
let cakeReadyToCut = false;

cakeEmoji.addEventListener('click', () => {
  if (!giftOpened) return;
  if (!cakeReadyToCut) return;
  if (cakeCut) return;

  cakeCut = true;
  // R6: New animated multi-tier cake — apply cut animation class
  cakeEmoji.classList.add('cut');
  cakeHeading.textContent = 'Yay! Cake Cut Successfully! 🎉';
  cakeInstruction.textContent = 'Wish saved in our hearts forever!';

  triggerConfetti();
  revealCouples();

  playDuduKissVideo(() => {
    setTimeout(() => {
      // Show proposal yes/no question section after the kiss video.
      const proposalSection = getElement('proposal-section');
      proposalSection.style.display = 'block';
      startAskingQuestionVideo();
      proposalSection.scrollIntoView({ behavior: 'smooth' });
      // No button starts inline (side-by-side with Yes) and only runs away on hover.
    }, 1200);
  });

});

giftBoxWrap.addEventListener('click', () => {
  if (!timerUnlocked) {
    giftWarning.textContent = 'Please pop all the balloons first before opening the gift 🎈';
    giftWarning.style.display = 'block';
    return;
  }

  if (giftOpened) return;

  giftWarning.style.display = 'none';
  giftOpened = true;
  giftBoxWrap.classList.add('opened');
  cakeEmoji.classList.add('gift-revealed');
  cakeHeading.textContent = 'Tap the Cake to Cut It! 🔪🎂';
  cakeInstruction.textContent = 'Your surprise cake is here now — tap it to cut and continue the celebration ✨';

  // Existing layer-by-layer cake build animation now plays after the gift opens.
  cakeEmoji.classList.remove('assembling');
  // Force reflow so the animation restarts cleanly.
  // eslint-disable-next-line no-unused-expressions
  cakeEmoji.offsetWidth;
  cakeEmoji.classList.add('assembling');
  setTimeout(() => {
    cakeEmoji.classList.remove('assembling');
    cakeReadyToCut = true;
  }, 3800);
});


function revealCouples() {
  const coupleSection = getElement('couple-section');
  const coupleImageCard = getElement('couple-image-card');

  coupleSection.style.display = 'flex';

  setTimeout(() => {
    coupleImageCard.classList.add('revealed');
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
  const lastPageIndex = pages.length - 1;
  if (index < 0 || index > lastPageIndex) return;

  if (currentPage === lastPageIndex && index > lastPageIndex) {
    playTakeCareVideo(() => goToPage(lastPageIndex));
    return;
  }

  pages[currentPage].classList.remove('active');
  currentPage = index;
  pages[currentPage].classList.add('active');

  prevBtn.disabled = currentPage === 0;
  // Keep Next enabled on the 2026 page so it can replay the Take Care video.
  nextBtn.disabled = false;

  document.querySelectorAll('.dot').forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentPage);
  });
}

prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
nextBtn.addEventListener('click', () => {
  if (currentPage === pages.length - 1) {
    playTakeCareVideo(() => goToPage(currentPage));
    return;
  }

  goToPage(currentPage + 1);
});

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
