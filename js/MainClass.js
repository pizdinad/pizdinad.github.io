"use strict";

console.log("pizdinad");


const dateTimeMoscowEl = document.getElementById("dateTimeMoscowEl");

const your_ip_el = document.getElementById("your_ip_el");

const selectMonthDigitEl = document.getElementById("selectMonthDigitEl");
const selectMonthLongEl = document.getElementById("selectMonthLongEl");

const getAgeFormEl = document.getElementById("getAgeFormEl");
const birthdayInputEl = document.getElementById("birthdayInputEl");
const ageEl = document.getElementById("ageEl");

const endCopyEl = document.getElementById("endCopyEl");





















// ////////////////////////////////////Geolocation:
// // https://support.google.com/maps/answer/18539?hl=ru&co=GENIE.Platform%3DAndroid - Как найти координаты или выполнить поиск по широте и долготе
// // ex: 55.6105728, 37.584896 (Широта/latitude, Долгота/longitude)



// //// ДОПОЛНИТЕЛЬНО:
// // ) ВРЕМЯ ПОКАЗЫВАТЬ НА ОСНОВЕ ПОЗИЦИИ WIFI  : locale "ru-RU" , timeZone  "Europe/Moscow"
// // 



// if ("geolocation" in navigator) {
//   console.log("местоположение доступно ");

//   const geo = navigator.geolocation;



//   var options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0,
//   };

//   function success(pos) {
//     var crd = pos.coords;

//     console.log("Ваше текущее местоположение:"); // !!! ОПРЕДЕЛЯЕТСЯ ПОЗИЦИЯ БРОУЗЕРА (НЕ КОНЕЧНОЙ ТОЧКИ С КОТОРОЙ ВХОДИТ НА САЙТ , НАПРИМЕР VPN)
//     console.log(`Широта: ${crd.latitude} `);
//     console.log(`Долгота: ${crd.longitude} `);
//     console.log(`Плюс - минус ${crd.accuracy} метров.`);
//     console.log(`высота над уровнем моря: ${crd.altitude} `);
//   }

//   function error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message} `);
//   }

//   geo.getCurrentPosition(success, error, options);




// } else {
//   console.log("местоположение НЕ доступно");
// }



// ////////////////////////////////////Geolocation: //
















function initDateTimeMoscowEl() {
  const locale = "ru-RU";
  const timeZone = "Europe/Moscow";
  let timerId;

  function setContentDateTime() {

    let dateTime = new Date();
    let timeZoneName, dateTimeStr = ``;


    timeZoneName = dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "year": "numeric",
      "timeZoneName": "long",
    }).slice(6);

    timeZoneName += " (" + dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "year": "numeric",
      "timeZoneName": "short",
    }).slice(6) + ")";




    dateTimeStr = dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "hour": "2-digit",
      "minute": "2-digit",
      "second": "2-digit",
    });

    dateTimeStr += " ";

    dateTimeStr += dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "weekday": "long",
    });

    dateTimeStr += " ";

    dateTimeStr += dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "day": "2-digit",
      "month": "2-digit",
    });

    dateTimeStr += "(";

    dateTimeStr += dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "month": "long",
    });

    dateTimeStr += ").";



    dateTimeStr += dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "year": "numeric",
    });




    dateTimeMoscowEl.innerHTML = `
    <div>${timeZoneName}</div>
    <div>${dateTimeStr}</div>
  `;


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


async function initYourIP() {

  const input = "https://2ip.deno.dev/api/get-ip";
  const init = {
    method: 'POST'
  };
  const response = await fetch(input, init);
  const json = await response.json();
  const { clientIP, geo } = json; // ex: geo:  {"status":"fail"} || {"status":"success","country":"Russia","city":"Moscow"}
  let geo_str = ``;

  //////////////////////////////////////////////
  //  ЛОКАЦИЮ АЙПИ ПРИШЕДШЕГО НА САЙТ   !!!!!

  // console.log("geo:", geo);

  // your_ip_el.textContent = `Your ip: ${clientIP} `;








  your_ip_el.innerHTML = `
  <span class='fw-bold'>Your ip:</span> ${clientIP} ${geo_str}
  `;

  ///////////////////////////////////////////////


  return Promise.resolve(1);
}


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

  const time_format_resolvedOptions = Intl.DateTimeFormat().resolvedOptions();
  // ex:
  // {
  //   "locale": "en-US", // "ru-RU"
  //   "calendar": "gregory",
  //   "numberingSystem": "latn",
  //   "timeZone": "Europe/Moscow", // Asia/Karachi
  //   "year": "numeric",
  //   "month": "numeric",
  //   "day": "numeric"
  // }


  const locale = time_format_resolvedOptions.locale;
  const timeZone = time_format_resolvedOptions.timeZone;



  const initNowDate = new Date();

  function getDateIntl(option = {}, dateObj) {
    let options = { "timeZone": timeZone };
    Object.assign(options, option);
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  }


  // "yyyy-MM-dd"
  function getHTMLDateFormat(dateObj) {
    return getDateIntl({ "year": "numeric" }, dateObj) + "-" + getDateIntl({ "month": "2-digit" }, dateObj) + "-" + getDateIntl({ "day": "2-digit" }, dateObj);
  }

  function setHTMLAttribute(el, attr, val) {
    el.setAttribute(attr, val);
  }


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

  // date according to LOCAL TIME  (Mon Jan 09 2023 03:00:00 GMT+0300 (Moscow Standard Time)
  // Если никаких аргументов передано не было, конструктор создаёт объект Date для текущих даты и времени, согласно системным настройкам.
  // Если передано как минимум два аргумента, отсутствующие аргументы устанавливаются в стартовые значения
  const initNowDate = new Date();

  const locale = "ru-RU";
  const timeZone = "Europe/Moscow";

  function getDateIntl(option = {}, dateObj) {
    let options = { "timeZone": timeZone };
    Object.assign(options, option);
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  }


  endCopyEl.textContent = getDateIntl({ "year": "numeric" }, initNowDate);
};



initDateTimeMoscowEl();
initYourIP();
initConvertMonthEl();
initGetAgeEl();
initFooterEl();


