function checkJSONFileExistence(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          // Jika berhasil mengurai JSON, file JSON ada
          callback(true);
        } catch (error) {
          // Jika terjadi kesalahan saat mengurai JSON, file JSON tidak ada
          callback(false);
        }
      } else {
        // Jika status bukan 200 OK, file JSON tidak ada
        callback(false);
      }
    }
  };

  xhr.send();
}

var jsonFileUrl = "./jadwalSholat.json";

checkJSONFileExistence(jsonFileUrl, function (isExist) {
  if (isExist) {
    console.log("File JSON ada.");
  } else {
    const fileNotFound = document.querySelector('.file-not-found');
    const fileNotFoundText = document.createElement('div')
    fileNotFound.classList.add('fixed', 'z-50', 'top-0', 'left-0','w-screen', 'h-screen', 'flex', 'items-center', 'justify-center', 'bg-black/80', 'text-white','text-2xl', 'lg:text-4xl', 'font-bold');
    fileNotFoundText.classList.add('container', 'bg-red-700', 'p-10', 'text-center', 'border-2', 'lg:leading-[60px]');
    fileNotFound.appendChild(fileNotFoundText);

    fileNotFoundText.textContent = 'File jadwal sholat tidak ditemukan!!!.... pastikan file yang anda masukkan sesuai dengan format(nama, dan ekstensi) yang ditentukan yaitu: "jadwalSholat.json"'
    
  }
});







var cekTextWaktuSholat = document.querySelectorAll(".waktu-sholat");
const textWaktu = [];

setTimeout(() => {
  cekTextWaktuSholat.forEach((e) => {
    textWaktu.push(e.textContent);
    console.log(textWaktu);

    function checkArrayContent(array) {

      if (array.includes('undefined')) {
        
        const fileFormat = document.querySelector('.file-tidak-sesuai');
        const fileFormatText = document.createElement('div');
        fileFormat.classList.add('fixed', 'z-50', 'top-0', 'left-0','w-screen', 'h-screen', 'flex', 'items-center', 'justify-center', 'bg-black/80', 'text-white', 'text-4xl', 'font-bold')
        fileFormatText.classList.add('file-format-text','container', 'bg-red-700', 'p-10', 'text-center', 'border-2', 'leading-[60px]')
        fileFormat.appendChild(fileFormatText);
        fileFormatText.textContent = 'Format file tidak sesuai!!!'

      } else {
        console.log("Format sesuai");
      }
    }

    checkArrayContent(textWaktu);
  });
}, 2000);
