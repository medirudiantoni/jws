// File: script.js
let audio = "./assets/audio/alarm.mp3";


// let intervalId;
function updateClock() {
  const now = new Date();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const clockHourAndMunite = document.querySelector("#clock #hM");
  const clockSeconds = document.querySelector("#clock #s");
  clockHourAndMunite.textContent = `${hours}:${minutes}`;
  clockSeconds.textContent = seconds;
}

setInterval(updateClock, 1000);




let jadwalSubuh = ['07:41','07:42','07:43',];
const clockTime = document.getElementById("hM");
const alarmRinging = document.getElementById("alarm-ringing");


function setAlarm(inputAlarmValue) {
  const outputAlarm = document.getElementById('subuh');

  outputAlarm.innerHTML = inputAlarmValue;

  let timeText = "";
  function incrementCounter() {
    timeText = clockTime.childNodes[0].nodeValue;
    console.log(timeText);

    if (timeText === inputAlarmValue) {
      alarmRinging.classList.remove("hidden");
      setTimeout(() => {
        alarmRinging.classList.add("hidden");
        outputAlarm.innerHTML = '';
      }, 5000);

      clearInterval(intervalId);
    }
  }
  const intervalId = setInterval(incrementCounter, 1000);
}

async function runSequentially() {
  await setAlarm(jadwalSubuh[0])
  await setAlarm(jadwalSubuh[1])
  await setAlarm(jadwalSubuh[2])
}

runSequentially();


[
    {
     "Tanggal": 1,
     "Subuh": "04:30",
     "Dzuhur": "11:44",
     "Ashar": "15:05",
     "Maghrib": "17:34",
     "Isya": "18:49"
    },
    {
     "Tanggal": 2,
     "Subuh": "04:30",
     "Dzuhur": "11:44",
     "Ashar": "15:05",
     "Maghrib": "17:35",
     "Isya": "18:50"
    },
    {
     "Tanggal": 3,
     "Subuh": "04:31",
     "Dzuhur": "11:44",
     "Ashar": "15:05",
     "Maghrib": "17:35",
     "Isya": "18:50"
    }
]

