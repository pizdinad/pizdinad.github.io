"use strict";
console.log("pizdinad!");

// dateTime:
let dateTimeElement = document.getElementById("dateTimeElement");
let localeStrRu = 'ru-RU';
let timeZoneMos = 'Europe/Moscow';
let timerId;
function setDateTime() {
  let dateTime = new Date();
  dateTimeElement.textContent = dateTime.toLocaleString(localeStrRu, {
    timeZone: timeZoneMos,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  dateTimeElement.textContent += ' ';
  dateTimeElement.textContent += dateTime.toLocaleString(localeStrRu, {
    timeZone: timeZoneMos,
    weekday: 'long',
  });
  dateTimeElement.textContent += ' ';
  dateTimeElement.textContent += dateTime.toLocaleString(localeStrRu, {
    timeZone: timeZoneMos,
    day: '2-digit',
    month: '2-digit',
  });
  dateTimeElement.textContent += '(';
  dateTimeElement.textContent += dateTime.toLocaleString(localeStrRu, {
    timeZone: timeZoneMos,
    month: 'long',
  });
  dateTimeElement.textContent += ').';
  dateTimeElement.textContent += dateTime.toLocaleString(localeStrRu, {
    timeZone: timeZoneMos,
    year: 'numeric',
  });
  dateTimeElement.textContent += ' ' + timeZoneMos;
};
function clockStart() {
  timerId = setInterval(setDateTime, 1000);
  setDateTime();
};
function clockStop() {
  clearInterval(timerId);
  timerId = null;
};
clockStart();





// convertMonth:
let selectMonthDigitElement = document.getElementById("selectMonthDigitElement");
let selectMonthLongElement = document.getElementById("selectMonthLongElement");

selectMonthDigitElement.addEventListener('change', (event) => {
  let selectedIndex = event.target.options.selectedIndex;
  selectMonthLongElement.selectedIndex = selectedIndex;
});

selectMonthLongElement.addEventListener('change', (event) => {
  let selectedIndex = event.target.options.selectedIndex;
  selectMonthDigitElement.selectedIndex = selectedIndex;
});





