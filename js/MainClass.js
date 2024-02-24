"use strict";

console.log("pizdinad");


const dateTimeMoscowEl = document.getElementById("dateTimeMoscowEl");
const localTimeEl = document.getElementById("localTimeEl");
const your_ip_el = document.getElementById("your_ip_el");
const selectMonthDigitEl = document.getElementById("selectMonthDigitEl");
const selectMonthLongEl = document.getElementById("selectMonthLongEl");
const getAgeFormEl = document.getElementById("getAgeFormEl");
const birthdayInputEl = document.getElementById("birthdayInputEl");
const ageEl = document.getElementById("ageEl");
const endCopyEl = document.getElementById("endCopyEl");


function initDateTimeMoscowEl() {
  const locale = "ru-RU";
  const timeZone = "Europe/Moscow";
  let timerId;

  function setContentDateTime() {

    let dateTime = new Date();
    let timeZoneNameLong,
      timeZoneNameShort,
      dateTimeStr1,
      dateTimeStr2 = ``;


    // В реализациях, поддерживающих Intl.DateTimeFormat API, этот метод(toLocaleString) просто вызывает Intl.DateTimeFormat
    // toLocaleString without arguments : the default locale, and the default time zone
    timeZoneNameLong = dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "year": "numeric",
      "timeZoneName": "long",
    }).slice(6) + ":";




    timeZoneNameShort = "(" + dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "year": "numeric",
      "timeZoneName": "short",
    }).slice(6) + ")";




    dateTimeStr1 = dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "hour": "2-digit",
      "minute": "2-digit",
      "second": "2-digit",
    });

    dateTimeStr1 += " ";

    dateTimeStr1 += dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "weekday": "long",
    });








    dateTimeStr2 = dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "day": "2-digit",
      "month": "2-digit",
    });

    dateTimeStr2 += "(";

    dateTimeStr2 += dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "month": "long",
    });

    dateTimeStr2 += ").";



    dateTimeStr2 += dateTime.toLocaleString(locale, {
      "timeZone": timeZone,
      "year": "numeric",
    });




    dateTimeMoscowEl.innerHTML = `
    <div class='fw-bold'>${timeZoneNameLong}</div>
    <div>${timeZoneNameShort}</div>
    <div>${dateTimeStr1}</div>
    <div>${dateTimeStr2}</div>
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


function initLocalTimeEl() {

  let timerId;

  function setContentDateTime() {
    // console.log(Date.now()); // 1708677324631  - возвращает количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC.
    // Intl.DateTimeFormat - предоставляет возможности форматирования даты и времени в соответствии с языковыми правилами.
    // the default locale, and the default time zone - without arguments
    // console.log(new Intl.DateTimeFormat().format(Date.now())); // 2/23/2024  - if all component properties are undefined, then year, month, and day default to "numeric".
    // can be called with or without new
    // If any of the date-time component options is specified, then dateStyle and timeStyle must be undefined.
    // Для указания настроек, но использования локали по умолчанию, нужно передать undefined
    // ru: 22.02.2024, 21:12:55  ,  en: 2/22/24, 9:15:35 PM  , undefined: 2/22/24, 9:50:21 PM


    const label = 'Local time (device):';
    const str_dateTime = Intl.DateTimeFormat(
      undefined,
      {
        timeStyle: "short",
        dateStyle: "short",
      }
    ).format(Date.now());


    const str_timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


    localTimeEl.innerHTML = `
      <div class='fw-bold'>${label}</div>
      <div>${str_dateTime}</div>
      <div>${str_timeZone}</div>
    `;

  };

  function clockStart() {
    timerId = setInterval(setContentDateTime, 30000);
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
  // с точки зрения CORS - это простой запрос:
  const init = {
    mode: 'cors',
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
  };
  const response = await fetch(input, init);
  const json = await response.json();

  // ex: geo:  {"status":"fail"} || {status: 'success', country: 'The Netherlands', city: 'Amsterdam', query: '146.0.78.177',"timezone": "America/Toronto"}
  const { clientIP, geo } = json;


  let geo_str = ``;



  if (geo.status === 'success') {

    const { country, city } = geo;

    geo_str += `${country}, ${city}`;

  }



  your_ip_el.innerHTML = `
  <div class='fw-bold'>Your ip:</div>
  <div>${clientIP} (${geo_str}: <span id='geoTimeEl'></span>)</div>
  `;



  function initGeoTime() {

    const geoTimeEl = document.getElementById("geoTimeEl");

    let timerId;

    function setContentDateTime() {
      // also see: function initLocalTimeEl()

      const str_dateTime = Intl.DateTimeFormat(
        undefined,
        {
          timeStyle: "short",
          dateStyle: "short",
          timeZone: geo.timezone,
        }
      ).format(Date.now());

      geoTimeEl.textContent = str_dateTime;
    };

    function clockStart() {
      timerId = setInterval(setContentDateTime, 30000);
      setContentDateTime();
    };
    function clockStop() {
      clearInterval(timerId);
      timerId = null;
    };
    clockStart();

  };
  initGeoTime();


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
initLocalTimeEl();
initYourIP();
initConvertMonthEl();
initGetAgeEl();
initFooterEl();



