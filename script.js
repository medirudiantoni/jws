// File: script.js

// let intervalId;
function updateClock() {
  const now = new Date();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const day = days[now.getDay()];

  const date = now.getDate().toString().padStart(2, "0");
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const month = months[now.getMonth()];

  const year = now.getFullYear();

  const dayNow = document.getElementById("day");
  const dateNow = document.getElementById("date");
  const monthNow = document.getElementById("month");
  const yearNow = document.getElementById("year");
  dayNow.innerHTML = day;
  dateNow.innerHTML = date;
  monthNow.innerHTML = month;
  yearNow.innerHTML = year;
  const clockHourAndMunite = document.querySelector("#clock #hM");
  const clockSeconds = document.querySelector("#clock #s");
  clockHourAndMunite.textContent = `${hours}:${minutes}`;
  clockSeconds.textContent = seconds;
}

setInterval(updateClock, 1000);

const clockTime = document.getElementById("hM");
const alarmRinging = document.getElementById("alarm-ringing");
const AdzanMessage = document.getElementById("adzan-message");
const alarmSound = document.getElementById("alarmSound");

const countdownDiv = document.createElement("div");
countdownDiv.id = "count-down";
const CountdownContainer = document.querySelector(".count-down");
let duration = 10 * 60;

function startCountdown(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  const intervalId = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      // Countdown has finished, you can perform any actions here
      clearInterval(intervalId);
      display.classList.add('lg:text-[150px]')
      display.textContent = "waktunya iqamah";
      alarmSound.play();
      setTimeout(() => {
        CountdownContainer.removeChild(countdownDiv);
        display.classList.remove('lg:text-[150px]')
        display.textContent = minutes + ":" + seconds;
        alarmSound.pause();
        alarmSound.currentTime = 0;
      }, 5000);
    }
  }, 1000);
}

function hitungMundur() {
  countdownDiv.classList.add(
    "w-screen",
    "h-screen",
    "fixed",
    "z-[2000]",
    "top-0",
    "left-0",
    "flex",
    "items-center",
    "justify-center",
    "bg-slate-950",
    "text-white",
    "text-7xl",
    "lg:text-[400px]",
    "font-bold"
  );
  CountdownContainer.appendChild(countdownDiv);
}

function mundur() {
  hitungMundur();
  startCountdown(duration, countdownDiv);
}

function setJadwalSholat(waktuSholat, start) {
  function alarmSholat(jadwal, jam) {
    let jadwalSholat = jadwal;

    function setAlarm(inputAlarmValue) {
      return new Promise((resolve) => {
        const outputAlarm = document.getElementById(jam);
        outputAlarm.innerHTML = inputAlarmValue;

        let intervalId = setInterval(() => {
          let timeText = clockTime.innerText;

          if (timeText === inputAlarmValue) {
            alarmRinging.classList.remove("hidden");
            AdzanMessage.innerText = `waktunya adzan ${waktuSholat}`;
            alarmSound.play();
            setTimeout(() => {
              alarmRinging.classList.add("hidden");
              alarmSound.pause();
              alarmSound.currentTime = 0;
              clearInterval(intervalId);
              resolve();
            }, 5000);
          }
        }, 1000);
      });
    }

    async function runSequentially() {
      for (const jadwal of jadwalSholat) {
        await setAlarm(jadwal);
        await mundur();
      }
    }

    runSequentially();
  }

  async function getJadwalSholatFromJSON() {
    try {
      const response = await fetch("jadwalSholat.json");
      const jsonData = await response.json();
      const startTime = jsonData.slice(start - 1)
      let jadwalSholat = null;
      if (waktuSholat === "subuh") {
        jadwalSholat = startTime;
        return jadwalSholat.map((data) => data.Subuh);
      }
      if (waktuSholat === "dzuhur") {
        jadwalSholat = startTime;
        return jadwalSholat.map((data) => data.Dzuhur);
      }
      if (waktuSholat === "ashar") {
        jadwalSholat = startTime;
        return jadwalSholat.map((data) => data.Ashar);
      }
      if (waktuSholat === "maghrib") {
        jadwalSholat = startTime;
        return jadwalSholat.map((data) => data.Maghrib);
      }
      if (waktuSholat === "isya") {
        jadwalSholat = startTime;
        return jadwalSholat.map((data) => data.Isya);
      }
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  async function main() {
    jadwalSholat = await getJadwalSholatFromJSON();
    alarmSholat(jadwalSholat, waktuSholat);
  }

  main();
}


const dateNow = document.getElementById("date");
setTimeout(() => {
  let date = dateNow.childNodes[0].nodeValue;
  console.log(date);

  setJadwalSholat("subuh", date)
  setJadwalSholat("dzuhur", date)
  setJadwalSholat("ashar", date)
  setJadwalSholat("maghrib", date)
  setJadwalSholat("isya", date)

}, 1000);


