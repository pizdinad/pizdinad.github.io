"use strict";



console.log("pizdinad!");





// DATETIME:
function dateTime() {
  let dateTimeElement = document.getElementById("dateTimeElement");
  let localeStrRu = 'ru-RU';
  let timeZoneMos = 'Europe/Moscow';
  let timerId;
  function setDateTime() {
    // date according to LOCAL TIME  (Mon Jan 09 2023 03:00:00 GMT+0300 (Moscow Standard Time)
    // Если никаких аргументов передано не было, конструктор создаёт объект Date для текущих даты и времени, согласно системным настройкам.
    // Если передано как минимум два аргумента, отсутствующие аргументы устанавливаются в стартовые значения
    let dateTime = new Date();
    // new Intl.DateTimeFormat(localeStrRu, options).format(dateTime);
    dateTimeElement.textContent = dateTime.toLocaleString(localeStrRu, {
      'timeZone': timeZoneMos,
      'hour': '2-digit',
      'minute': '2-digit',
      'second': '2-digit',
    });
    dateTimeElement.textContent += ' ';
    dateTimeElement.textContent += dateTime.toLocaleString(localeStrRu, {
      'timeZone': timeZoneMos,
      'weekday': 'long',
    });
    dateTimeElement.textContent += ' ';
    dateTimeElement.textContent += dateTime.toLocaleString(localeStrRu, {
      'timeZone': timeZoneMos,
      'day': '2-digit',
      'month': '2-digit',
    });
    dateTimeElement.textContent += '(';
    dateTimeElement.textContent += dateTime.toLocaleString(localeStrRu, {
      'timeZone': timeZoneMos,
      'month': 'long',
    });
    dateTimeElement.textContent += ').';
    dateTimeElement.textContent += dateTime.toLocaleString(localeStrRu, {
      'timeZone': timeZoneMos,
      'year': 'numeric',
      'timeZoneName': 'long',
    });
    dateTimeElement.textContent += " (" + dateTime.toLocaleString(localeStrRu, {
      'timeZone': timeZoneMos,
      'year': 'numeric',
      'timeZoneName': 'short',
    }).slice(6) + ")";
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
}
dateTime();











// CONVERT_MONTH:
function convertMonth() {
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
}
convertMonth();













// AGE:
function getAge() {

  let age = 0;
  let mess = "";


  let getAgeFormElement = document.getElementById("getAgeFormElement");
  let birthdayInputElement = document.getElementById("birthdayInputElement");
  let ageElement = document.getElementById("ageElement");

  
  let locale = 'ru-RU';
  let timeZone = 'Europe/Moscow';

  const today = new Date();


  function getDateIntl(option = {}, dateObj) {
    let options = { 'timeZone': timeZone };
    Object.assign(options, option);
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  }


  function getDateFormatMax() {
    return getDateIntl({ 'year': 'numeric' }, today) + "-" + getDateIntl({ 'month': '2-digit' }, today) + "-" + getDateIntl({ 'day': '2-digit' }, today);
  }



  // yyyy-MM-dd
  const dateFormatMin = "1000-01-01";
  birthdayInputElement.setAttribute("min", dateFormatMin);
  const dateFormatMax = getDateFormatMax();
  birthdayInputElement.setAttribute("max", dateFormatMax);




  getAgeFormElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    // value type="date" всегда имеет формат гггг-мм-дд
    let birthday = data.get('birthday');
    let birthdayDate = new Date(birthday);




    if (birthdayDate == "Invalid Date") {
      mess = "enter the correct date of birth!";
      ageElement.textContent = mess;
      return 0;
    }



    // 1673222400000  - возвращает числовое значение, соответствующее указанной дате по всемирному координированному времени.
    let birthdayInt = birthdayDate.getTime();

    // -30610224000000  ==  1000-01-01
    let minDateInt = new Date(dateFormatMin).getTime();

    // dateFormatMax - yyyy-MM-dd
    let todayDate = new Date(dateFormatMax);
    // 1673222400000
    let todayInt = todayDate.getTime();



    if ((minDateInt <= birthdayInt) && (birthdayInt <= todayInt)) {

      function getDateNumArr(dateObj) {
        // [y: 1987, m: 1, d: 8]
        let arr = [];
        arr['y'] = parseInt(getDateIntl({ 'year': 'numeric' }, dateObj), 10);
        arr['m'] = parseInt(getDateIntl({ 'month': 'numeric' }, dateObj), 10);
        arr['d'] = parseInt(getDateIntl({ 'day': 'numeric' }, dateObj), 10);
        return arr;
      }


      let birthNumArr = getDateNumArr(birthdayDate);
      let todayNumArr = getDateNumArr(todayDate);

      let countYear = todayNumArr['y'] - birthNumArr['y'];

      mess = "";

      if (birthNumArr['m'] > todayNumArr['m']) {
        age = countYear - 1;
      } else if (birthNumArr['m'] < todayNumArr['m']) {
        age = countYear;
      } else if (birthNumArr['m'] == todayNumArr['m']) {
        if (birthNumArr['d'] > todayNumArr['d']) {
          age = countYear - 1;
        } else if (birthNumArr['d'] < todayNumArr['d']) {
          age = countYear;
        } else if (birthNumArr['d'] == todayNumArr['d']) {
          age = countYear;
          mess = " - Happy Birthday!";
        }
      }

      ageElement.textContent = age+mess;

    } else {
      mess = "enter the correct date of birth!";
      ageElement.textContent = mess;
      return 0;
    }
  });
}
getAge();





















// FOOTER:
function setFooter() {
  let endCopyEl = document.getElementById("endCopyEl");
  endCopyEl.textContent = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", year: 'numeric' }).format(new Date());
}
setFooter();


