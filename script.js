document.addEventListener("DOMContentLoaded", () => {
  setBackground();
  enableButtonSound();
  fadeInElements();
  setupTooltips();
  setupScreenSwitching();
});

function setBackground() {
  const now = new Date();
  const hour = now.getHours();
  document.getElementById("time_lapse").style.backgroundImage = `url(./images/time_lapse/${hour}.webp)`;
}

function enableButtonSound() {
  const buttonSound = document.getElementById('button-sound');
  if (!buttonSound) return;
  buttonSound.volume = 0.25;
  document.querySelectorAll('.styled').forEach(button => {
    button.addEventListener('mousedown', () => {
      buttonSound.currentTime = 0;
      buttonSound.play();
    });
  });
}

function fadeInElements() {
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach(element => {
      element.classList.add("visible");
    });
  }, 50);
}

function setupTooltips() {
  const tooltip = document.getElementById('tooltip');
  if (!tooltip) return;
  const buttons = document.querySelectorAll('.styled');

  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      const text = button.getAttribute('data-tooltip');
      if (text) {
        tooltip.textContent = text;
        tooltip.classList.add('visible');
      }
    });

    button.addEventListener('mouseout', () => {
      tooltip.classList.remove('visible');
    });
  });

  document.addEventListener('mousemove', (e) => {
    if (tooltip.classList.contains('visible')) {
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;

      let tooltipX = e.pageX + 10;
      let tooltipY = e.pageY + 10;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (tooltipX + tooltipWidth > windowWidth) {
        tooltipX = windowWidth - tooltipWidth - 10;
      }
      if (tooltipY + tooltipHeight > windowHeight) {
        tooltipY = windowHeight - tooltipHeight - 10;
      }

      tooltip.style.left = `${tooltipX}px`;
      tooltip.style.top = `${tooltipY}px`;
    }
  });
}

function setupScreenSwitching() {
  const singleBtn = document.querySelector(".styled[id=single-button]");
  const backBtn = document.getElementById("back-to-menu");

  const mainMenu = document.getElementById("main-menu");
  const singleScreen = document.getElementById("single-screen");

  if (singleBtn) {
    singleBtn.addEventListener("click", () => {
      mainMenu.style.display = "none";
      singleScreen.style.display = "flex"; // または block
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      singleScreen.style.display = "none";
      mainMenu.style.display = "flex";
    });
  }
}

const closeBtn = document.getElementById("tooltipButton");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    window.close();
  });
}
