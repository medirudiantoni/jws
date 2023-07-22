

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
            alarmSound.play();
            setTimeout(() => {
              alarmRinging.classList.add("hidden");
              alarmSound.pause();
              alarmSound.currentTime = 0;
              clearInterval(intervalId); // Clear interval when alarm is ringing
              resolve(); // Resolve the promise after the alarm rings
            }, 5000);
          }
        }, 1000); // Run every 1 second
      });
    }
  
    async function runSequentially() {
      for (const jadwal of jadwalSholat) {
        await setAlarm(jadwal);
      }
    }
  
    runSequentially();
  }
  
  async function getJadwalSholatFromJSON() {
    try {
      const response = await fetch("jadwalSholat.json");
      const jsonData = await response.json();
      const jadwalSholat = jsonData.map((data) => data.Subuh);
      return jadwalSholat;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }
  
  async function main() {
    jadwalSholat = await getJadwalSholatFromJSON();
    console.log(jadwalSholat);
    alarmSholat(jadwalSholat, 'subuh');
  }
  main();
  