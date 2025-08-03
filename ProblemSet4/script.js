/**
 * Portfolio Website Functionality
 * - Theme switching
 * - Random image display
 * - Inspirational quote button
 * - Countdown timer
 */

function initThemeSwitcher() {
  const themeSelector = document.getElementById('color-theme');
  if (themeSelector) {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeSelector.value = savedTheme;

    themeSelector.addEventListener('change', function () {
      const theme = this.value;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('portfolio-theme', theme);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();

  // RANDOM IMAGE
  const randomImageElement = document.querySelector('#random-image');
  if (randomImageElement) {
    const images = [
      "images/IMG_1448.jpg",
      "images/IMG_4436 3.jpg"
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    randomImageElement.src = images[randomIndex];
  }

  // INSPIRATIONAL QUOTE BUTTON
  const quoteButton = document.querySelector('#quote-button');
  if (quoteButton) {
    quoteButton.addEventListener('click', () => {
      const textElement = document.querySelector('#text');
      if (textElement) {
        textElement.innerHTML = "Music expresses what words cannot. It unites people, captures emotion, and allows stories to be shared without speaking a single word. It's more than sound — it's connection.";
      }
    });
  }

  // COUNTDOWN TIMER
  const startButton = document.querySelector('#start-button');
  let countdownInterval;
  if (startButton) {
    startButton.addEventListener('click', () => {
      if (countdownInterval) clearInterval(countdownInterval);

      const input = document.querySelector('#countdown-input');
      const display = document.querySelector('#count-display');
      if (!input || !display) return;

      let count = parseInt(input.value);
      if (isNaN(count) || count < 1) {
        display.textContent = "Please enter a valid number.";
        return;
      }

      display.textContent = count;
      countdownInterval = setInterval(() => {
        count--;
        if (count < 0) {
          clearInterval(countdownInterval);
          alert("boo!");
          display.textContent = "";
          return;
        }
        display.textContent = count;
      }, 1000);
    });
  }

  console.log("Portfolio initialized");
});
