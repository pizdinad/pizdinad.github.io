"use strict";

console.log("pizdinad!");






const locale = "ru-RU";
const timeZone = "Europe/Moscow";
// date according to LOCAL TIME  (Mon Jan 09 2023 03:00:00 GMT+0300 (Moscow Standard Time)
// Если никаких аргументов передано не было, конструктор создаёт объект Date для текущих даты и времени, согласно системным настройкам.
// Если передано как минимум два аргумента, отсутствующие аргументы устанавливаются в стартовые значения
const initNowDate = new Date();


const dateTimeEl = document.getElementById("dateTimeEl");

const your_ip_el = document.getElementById("your_ip_el");

const selectMonthDigitEl = document.getElementById("selectMonthDigitEl");
const selectMonthLongEl = document.getElementById("selectMonthLongEl");

const getAgeFormEl = document.getElementById("getAgeFormEl");
const birthdayInputEl = document.getElementById("birthdayInputEl");
const ageEl = document.getElementById("ageEl");

const endCopyEl = document.getElementById("endCopyEl");







function setHTMLAttribute(el, attr, val) {
  el.setAttribute(attr, val);
}

function getDateIntl(option = {}, dateObj) {
  let options = { "timeZone": timeZone };
  Object.assign(options, option);
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

// "yyyy-MM-dd"
function getHTMLDateFormat(dateObj) {
  return getDateIntl({ "year": "numeric" }, dateObj) + "-" + getDateIntl({ "month": "2-digit" }, dateObj) + "-" + getDateIntl({ "day": "2-digit" }, dateObj);
}



function initDateTimeEl() {
  let timerId;
  function setContentDateTime() {
    let dateTime = new Date();
    dateTimeEl.textContent = dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "hour": "2-digit",
      "minute": "2-digit",
      "second": "2-digit",
    });
    dateTimeEl.textContent += " ";
    dateTimeEl.textContent += dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "weekday": "long",
    });
    dateTimeEl.textContent += " ";
    dateTimeEl.textContent += dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "day": "2-digit",
      "month": "2-digit",
    });
    dateTimeEl.textContent += "(";
    dateTimeEl.textContent += dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "month": "long",
    });
    dateTimeEl.textContent += ").";
    dateTimeEl.textContent += dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "year": "numeric",
      "timeZoneName": "long",
    });
    dateTimeEl.textContent += " (" + dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "year": "numeric",
      "timeZoneName": "short",
    }).slice(6) + ")";
  };
  function clockStart() {
    timerId = setInterval(setContentDateTime, 1000);
    setContentDateTime();
  };
  function clockStop() {
    clearInterval(timerId);
    timerId = null;
  };
  clockStart();
};



function initConvertMonthEl() {
  selectMonthDigitEl.addEventListener("change", (event) => {
    let selectedIndex = event.target.options.selectedIndex;
    selectMonthLongEl.selectedIndex = selectedIndex;
  });
  selectMonthLongEl.addEventListener("change", (event) => {
    let selectedIndex = event.target.options.selectedIndex;
    selectMonthDigitEl.selectedIndex = selectedIndex;
  });
};



function initGetAgeEl() {

  let age = 0;
  let mess = "";

  // "yyyy-MM-dd"
  const dateMin = "1000-01-01";
  let dateMax = getHTMLDateFormat(initNowDate);

  setHTMLAttribute(birthdayInputEl, "min", dateMin);
  setHTMLAttribute(birthdayInputEl, "max", dateMax);

  getAgeFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const nowDate = new Date();

    dateMax = getHTMLDateFormat(nowDate);
    setHTMLAttribute(birthdayInputEl, "max", dateMax);

    const data = new FormData(event.target);

    // value type="date" всегда имеет формат "гггг-мм-дд"
    let birthday = data.get("birthday");
    let birthdayDate = new Date(birthday);

    if (birthdayDate == "Invalid Date") {
      mess = "enter the correct date of birth!";
      ageEl.textContent = mess;
      return 0;
    }

    // 1673222400000  - возвращает числовое значение, соответствующее указанной дате по всемирному координированному времени.
    let birthdayInt = birthdayDate.getTime();
    // -30610224000000  ==  "1000-01-01"
    let minDateInt = new Date(dateMin).getTime();
    let todayDate = new Date(dateMax);
    // 1673222400000
    let todayInt = todayDate.getTime();

    if ((minDateInt <= birthdayInt) && (birthdayInt <= todayInt)) {

      function getDateNumArr(dateObj) {
        // [y: 1987, m: 1, d: 8]
        let arr = [];
        arr["y"] = parseInt(getDateIntl({ "year": "numeric" }, dateObj), 10);
        arr["m"] = parseInt(getDateIntl({ "month": "numeric" }, dateObj), 10);
        arr["d"] = parseInt(getDateIntl({ "day": "numeric" }, dateObj), 10);
        return arr;
      }


      let birthNumArr = getDateNumArr(birthdayDate);
      let todayNumArr = getDateNumArr(todayDate);

      let countYear = todayNumArr["y"] - birthNumArr["y"];

      mess = "";

      if (birthNumArr["m"] > todayNumArr["m"]) {
        age = countYear - 1;
      } else if (birthNumArr["m"] < todayNumArr["m"]) {
        age = countYear;
      } else if (birthNumArr["m"] == todayNumArr["m"]) {
        if (birthNumArr["d"] > todayNumArr["d"]) {
          age = countYear - 1;
        } else if (birthNumArr["d"] < todayNumArr["d"]) {
          age = countYear;
        } else if (birthNumArr["d"] == todayNumArr["d"]) {
          age = countYear;
          mess = " - Happy Birthday!";
        }
      }

      ageEl.textContent = age + mess;

    } else {
      mess = "enter the correct date of birth!";
      ageEl.textContent = mess;
      return 0;
    }
  });
};




function initFooterEl() {
  endCopyEl.textContent = getDateIntl({ "year": "numeric" }, initNowDate);
};



//////////////////////////////////////////////////////////////
async function initYourIP() {

  // сделать от имени пользователя запрос на 2ip.deno.dev/api/get-ip  (получить json with ip client) !!!!!!!!!!!!!!!!!!



  // console.log("initYourIP");

  const input = "https://2ip.deno.dev/api/get-ip";
  const init = {
    method: 'POST'
  };
  const response = await fetch(input, init);
  const json = await response.json();
  const { clientIP } = json;


  console.log("clientIP: ", clientIP); // 

  // your_ip_el.textContent = `Your ip: ${clientIP}`;




  return Promise.resolve(1);
}



your_ip_el.textContent = `Your ip: ${clientIP}`;




initDateTimeEl();
initYourIP();
initConvertMonthEl();
initGetAgeEl();
initFooterEl();