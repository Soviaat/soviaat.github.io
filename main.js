function dropDown() {
  document.getElementById("dropDown").classList.toggle("show");
}

window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var dropdowns = document.getElementById("dropDown"); // i know that bootstrap exists but i don't really care
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const dropBtn = document.getElementById("dropbtn");

dropBtn.addEventListener("click", function () {
  const open = document.getElementById("open");
  const close = document.getElementById("close");
  console.log("pushed");

  if (close.style.display == "none") {
    open.style.display = "none";
    close.style.display = "block";
  } else {
    close.style.display = "none";
    open.style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const d = document.getElementById("d");
  const h = document.getElementById("h");
  const m = document.getElementById("m");
  const s = document.getElementById("s");

  function getTrueNumber(num) {
    return num < 10 ? "0" + num : num;
  }
  function calculateRemainingTime() {
    const comingYear = new Date().getFullYear() + 1;
    const comingDate = new Date(`Jan 1, ${comingYear} 00:00:00`);
    const time = document.getElementById("time");

    const now = new Date();
    const remainingTime = comingDate.getTime() - now.getTime();
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((remainingTime % (1000 * 60)) / 1000);

    d.innerHTML = getTrueNumber(days);
    h.innerHTML = getTrueNumber(hours);
    m.innerHTML = getTrueNumber(mins);
    s.innerHTML = getTrueNumber(secs);

    return remainingTime;
  }

  function showNewYearMessage() {
    const newYearDiv = document.getElementById("newyear");
    newYearDiv.removeAttribute("hidden");
    time.style.display = "none";
    resetCountdownAndMessage();
  }

  function resetCountdownAndMessage() {
    setTimeout(function () {
      const newYearDiv = document.getElementById("newyear");
      newYearDiv.setAttribute("hidden", true);
      time.style.display = "block";
    }, 48 * 60 * 60 * 1000);
  }

  const comingYear = new Date().getFullYear() + 1;

  const targetDate = new Date(`Jan 1, ${comingYear} 00:00:00`);
  const currentDate = new Date();

  const timeUntilTargetDate = targetDate.getTime() - currentDate.getTime();

  if (timeUntilTargetDate > 0) {
    setTimeout(showNewYearMessage, timeUntilTargetDate);
  } else {
    showNewYearMessage();
  }

  function initCountdown() {
    const interval = setInterval(() => {
      const remainingTimeInMs = calculateRemainingTime();

      if (remainingTimeInMs <= 1000) {
        clearInterval(interval);
        initCountdown();
      }
    }, 1000);
  }

  initCountdown();

  const container = document.querySelector(".fireworks");
  let fireworks;

  function initializeFireworks() {
    const fireworks = new Fireworks.default(container, {
      traceLength: 4.13,
      traceSpeed: 30,
      flickering: 80,
      intensity: 15,
      explosion: 8,
      acceleration: 1.0,
      opacity: 0.2,
      rocketsPoint: {
        min: 35,
        max: 76,
      },
      sound: {
        enabled: false,
        files: [
          "sounds/explosion0.mp3",
          "sounds/explosion1.mp3",
          "sounds/explosion2.mp3",
        ],
        volume: {
          min: 2,
          max: 2,
        },
      },
      brightness: {
        min: 87,
        max: 100,
      },
      decay: {
        min: 0.015,
        max: 0.0247,
      },
      lineWidth: {
        explosion: {
          min: 1,
          max: 2.58,
        },
        trace: {
          min: 0.1,
          max: 3.71,
        },
      },
      // mouse: {
      //   click: true,
      //   move: true,    why did I even bother? 😹
      //   max: 2,
      // },
    });
    fireworks.start();

    // Mouse Tracking toggle
    const trackingChkbx = document.getElementById("trackingChkbx");
    trackingChkbx.addEventListener("change", (e) => {
      let isChecked = Boolean(e.target.checked);
      if (e.target.checked) {
        console.log("Tracking mouse:", isChecked);
        fireworks.updateOptions({
          mouse: { click: true, move: true, max: 1 },
        });
      } else if (!e.target.checked) {
        console.log("Tracking mouse:", isChecked);
        fireworks.updateOptions({ mouse: { click: false, move: false } });
      }
    });

    // Sound toggle
    const soundChkbx = document.getElementById("soundChkbx");
    soundChkbx.addEventListener("change", (e) => {
      const slideCtnr = document.querySelector(".slidecontainer");
      const volSlider = document.getElementById("slider");
      let isChecked = Boolean(e.target.checked);
      if (e.target.checked) {
        console.log("Sound enabled:", isChecked);
        fireworks.updateOptions({ sound: { enabled: true } });
        volSlider.disabled = false;
        slideCtnr.classList.remove("disabled");
      } else if (!e.target.checked) {
        console.log("Sound enabled:", isChecked);
        fireworks.updateOptions({ sound: { enabled: false } });
        volSlider.disabled = true;
        slideCtnr.classList.add("disabled");
      }
    });

    // Firework toggle
    const toggleFireworks = document.getElementById("toggleFireworks");
    toggleFireworks.addEventListener("change", (e) => {
      if (e.target.checked) {
        fireworks.start();
      } else if (!e.target.checked) {
        fireworks.waitStop();
      }
    });

    const slider = document.getElementById("slider")
    slider.oninput = function() {
        fireworks.updateOptions({sound: {volume: {min: this.value, max: this.value}}})
    }
  }

  initializeFireworks();
});
