//<BUTTONS>
const genderButton = document.getElementById("gender-Btn");
const birthdayButton = document.getElementById("birthday-Btn");
const callButton = document.querySelector(".call");
//</BUTTONS>
//<SECTIONS & BLOCKS>
const banner = document.querySelector(".banner"); // section with banner
const info = document.querySelector(".info"); // section with info
const monthsSelect = document.getElementById("months-select"); //SELECT MONTH
const yearsSelect = document.getElementById("years-select"); //SELECT YEARS
const daysSelect = document.getElementById("days-select"); //SELECT DAYS
const completeLine = document.querySelector(".red-line"); // section with redline statusbar
const formLine = document.querySelector(".form"); // FROMS LINE
const dataTable = document.querySelector(".form__data").querySelector("table"); //DATA TABLE
//</SECTIONS & BLOCKS>
const redLine = document.querySelector(".red-line__red"); // redline of statusbar
const loadingBar = document.querySelector(".loading__bar"); //LOADING BAR
const loadingStatuses = document
  .querySelector(".loading__statuses")
  .querySelectorAll("p"); // LOADING STATUSES

const attention = document.querySelector(".please-make-choice");

const signBlock = document.querySelector(".with-sign");
signBlock.style.display = "none";

const DAYS_BY_DEFAULT = 31;

//creating and adding days to select

addDaysByDefault();

//creating and adding months to select
for (let month = 1; month <= 12; month++) {
  let option = document.createElement("option");
  option.value = month;
  if (month < 10) {
    monthsSelect.appendChild(option).innerText = "0" + month;
  } else {
    monthsSelect.appendChild(option).innerText = month;
  }
}
//creating and adding years to select
for (let year = 2022; year >= 1920; year--) {
  let option = document.createElement("option");
  option.value = year;
  yearsSelect.appendChild(option).innerText = year;
}

//<LISTENERS>
document.addEventListener("click", (event) => {
  const elementID = event.target.id;
  const elementFor = event.target.getAttribute("for");
  if (
    elementID === "male" ||
    elementFor === "male" ||
    elementID === "female" ||
    elementFor === "female"
  ) {
    displayFlex(genderButton);
  }

  if (
    elementID === "morning" ||
    elementFor === "morning" ||
    elementID === "night" ||
    elementFor === "night" ||
    elementID === "evening" ||
    elementFor === "evening" ||
    elementID === "day" ||
    elementFor === "day"
  ) {
    setTimeout(() => {
      moveFormLineTo(3);
      moveRedStatusLineTo(3);
    }, 300);
  }

  if (
    elementID === "yes" ||
    elementFor === "yes" ||
    elementID === "no" ||
    elementFor === "no" ||
    elementID === "never" ||
    elementFor === "never"
  ) {
    setTimeout(() => {
      moveFormLineTo(4);
      moveRedStatusLineTo(4);
    }, 300);
  }

  if (
    elementID === "plans-yes" ||
    elementFor === "plans-yes" ||
    elementID === "plans-no" ||
    elementFor === "plans-no" ||
    elementID === "plans-never" ||
    elementFor === "plans-never"
  ) {
    setTimeout(() => {
      moveFormLineTo(5);
      moveRedStatusLineTo(5);
    }, 300);
  }

  if (
    elementID === "family" ||
    elementFor === "family" ||
    elementID === "career" ||
    elementFor === "career" ||
    elementID === "traveling" ||
    elementFor === "traveling" ||
    elementID === "all" ||
    elementFor === "all"
  ) {
    setTimeout(() => {
      moveFormLineTo(6);
      moveRedStatusLineTo(6);
    }, 300);
  }
});
genderButton.addEventListener("click", () => {
  if (window.innerWidth > 320) {
    document.querySelector(".form-window").style.cssText = "margin-top: 102px";
  } else {
    document.querySelector(".form-window").style.cssText = "margin-top: 25px";
  }
  moveFormLineTo(2);
  displayNone(banner, info);
  displayBlock(completeLine);
  setTimeout(() => {
    moveRedStatusLineTo(2);
  }, 100);
});

birthdayButton.addEventListener("click", (event) => {
  event.preventDefault();
  moveFormLineTo(7);
  moveRedStatusLineTo(7);
  displayNone(completeLine);
  startLoading();
});
//CALL BYTTON LISTENER
callButton.addEventListener("click", () => {
  getResponse();
  moveFormLineTo(9);
});

// CHECK IS THE ALL OF SELECTS ARE NOT EMPTY

daysSelect.onchange = () => {
  isAllSelected();
};

monthsSelect.onchange = () => {
  const selectedDay = Number(daysSelect.value);
  const selectedMonth = Number(monthsSelect.value);
  const selectedYear = Number(yearsSelect.value);
  const daysInSelectedMonth = countDaysInMonth(selectedMonth, selectedYear);
  updateDaysSelect(daysInSelectedMonth, selectedDay);
  isAllSelected();
};

yearsSelect.onchange = () => {
  const selectedDay = Number(daysSelect.value);
  const selectedMonth = Number(monthsSelect.value);
  const selectedYear = Number(yearsSelect.value);
  const daysInSelectedMonth = countDaysInMonth(selectedMonth, selectedYear);
  updateDaysSelect(daysInSelectedMonth, selectedDay);
  isAllSelected();
};
//</LISTENERS>

//<METHODS>
function displayFlex() {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].style.display = "flex";
  }
}

function displayNone() {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].style.display = "none";
  }
}

function displayBlock() {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].style.display = "block";
  }
}

function addDaysByDefault() {
  for (let day = 1; day <= DAYS_BY_DEFAULT; day++) {
    let option = document.createElement("option");
    option.value = day;
    if (day < 10) {
      daysSelect.appendChild(option).innerText = "0" + day;
    } else {
      daysSelect.appendChild(option).innerText = day;
    }
  }
}

function updateDaysSelect(countDays, selectedDay) {
  daysSelect.innerHTML = "";
  const selectedOption = document.createElement("option");
  if (countDays < selectedDay || selectedDay === 0) {
    selectedOption.value = 0;
    selectedOption.innerText = "День";
    daysSelect.style.cssText = "color: black;";
    selectedOption.setAttribute("disabled", "disabled");
    selectedOption.setAttribute("selected", "selected");
    displayNone(signBlock, birthdayButton);
  } else {
    selectedOption.value = selectedDay;
    if (selectedDay < 10) {
      selectedOption.innerText = "0" + selectedDay;
    } else {
      selectedOption.innerText = selectedDay;
    }
    selectedOption.setAttribute("disabled", "disabled");
    selectedOption.setAttribute("selected", "selected");
  }
  daysSelect.append(selectedOption);
  for (let day = 1; day <= countDays; day++) {
    let option = document.createElement("option");
    option.value = day;
    if (day < 10) {
      daysSelect.appendChild(option).innerText = "0" + day;
    } else {
      daysSelect.appendChild(option).innerText = day;
    }
  }
}

function countDaysInMonth(month, year = 2000) {
  return month === 2
    ? isYearLeap(year)
      ? 29
      : 28
    : month === 4 || month === 6 || month === 9 || month === 11
    ? 30
    : 31;
}

function moveFormLineTo(num) {
  formLine.style.left = (num - 1) * -100 + "%";
}

function moveRedStatusLineTo(num) {
  num > 6
    ? displayNone(completeLine)
    : (redLine.style.left = (6 - num) * (-100 / 5) + "%");
}

function isAllSelected() {
  if (monthsSelect.value !== "0") {
    monthsSelect.style.color = "#315DFA";
  }
  if (yearsSelect.value !== "0") {
    yearsSelect.style.color = "#315DFA";
  }
  if (daysSelect.value !== "0") {
    daysSelect.style.color = "#315DFA";
  }
  if (
    monthsSelect.value !== "0" &&
    yearsSelect.value !== "0" &&
    daysSelect.value !== "0"
  ) {
    displayBlock(signBlock);
    signBlock.querySelectorAll("img").forEach((img) => {
      img.style.opacity = "0";
    });
    let sign = whatZodiacSign(monthsSelect.value, daysSelect.value);
    document.getElementById(sign.name).style.opacity = "1";
    signBlock.querySelector("p").innerHTML = sign.nameRus;
    displayNone(attention);
    displayFlex(birthdayButton);
  } else {
    displayBlock(attention);
  }
}

function whatZodiacSign(month, day) {
  if (
    (Number(month) === 12 && Number(day) >= 22) ||
    (Number(month) === 01 && Number(day) <= 20)
  ) {
    return { name: "capricorn", nameRus: "Козерог" };
  }
  if (
    (Number(month) === 01 && Number(day) >= 21) ||
    (Number(month) === 02 && Number(day) <= 18)
  ) {
    return { name: "aquarius", nameRus: "Водолей" };
  }
  if (
    (Number(month) === 02 && Number(day) >= 19) ||
    (Number(month) === 03 && Number(day) <= 20)
  ) {
    return { name: "pisces", nameRus: "Рыбы" };
  }
  if (
    (Number(month) === 03 && Number(day) >= 21) ||
    (Number(month) === 04 && Number(day) <= 20)
  ) {
    return { name: "aries", nameRus: "Овен" };
  }
  if (
    (Number(month) === 04 && Number(day) >= 21) ||
    (Number(month) === 05 && Number(day) <= 21)
  ) {
    return { name: "taurus", nameRus: "Телец" };
  }
  if (
    (Number(month) === 05 && Number(day) >= 22) ||
    (Number(month) === 06 && Number(day) <= 21)
  ) {
    return { name: "gemini", nameRus: "Близнецы" };
  }
  if (
    (Number(month) === 06 && Number(day) >= 22) ||
    (Number(month) === 07 && Number(day) <= 22)
  ) {
    return { name: "rak", nameRus: "Рак" };
  }
  if (
    (Number(month) === 07 && Number(day) >= 23) ||
    (Number(month) === 08 && Number(day) <= 23)
  ) {
    return { name: "leo", nameRus: "Лев" };
  }
  if (
    (Number(month) === 08 && Number(day) >= 24) ||
    (Number(month) === 09 && Number(day) <= 22)
  ) {
    return { name: "virgo", nameRus: "Дева" };
  }
  if (
    (Number(month) === 09 && Number(day) >= 23) ||
    (Number(month) === 10 && Number(day) <= 23)
  ) {
    return { name: "libra", nameRus: "Весы" };
  }
  if (
    (Number(month) === 10 && Number(day) >= 24) ||
    (Number(month) === 11 && Number(day) <= 22)
  ) {
    return { name: "scorpio", nameRus: "Скорпион" };
  }
  if (
    (Number(month) === 11 && Number(day) >= 23) ||
    (Number(month) === 12 && Number(day) <= 21)
  ) {
    return { name: "sagittarius", nameRus: "Стрелец" };
  }
}

function startLoading() {
  setTimeout(() => {
    loadingBar.querySelector("div").classList.add("animated");
    console.log("start loading animation...");
    const loadingInterval = setInterval(() => {
      const barWidth = loadingBar.clientWidth; // FULL BAR
      const loadingOffset = loadingBar.querySelector("div").offsetLeft;
      const percent = Math.trunc(100 - (-loadingOffset / barWidth) * 100);
      if ((percent > 0) & (percent < 100 / 7)) {
        displayFlex(loadingStatuses[0]);
      }
      if ((percent > 100 / 7) & (percent < 2 * (100 / 7))) {
        displayBlock(loadingStatuses[0].querySelector("span"));
        displayFlex(loadingStatuses[1]);
      }
      if ((percent > 2 * (100 / 7)) & (percent < 3 * (100 / 7))) {
        displayBlock(loadingStatuses[1].querySelector("span"));
        displayFlex(loadingStatuses[2]);
      }
      if ((percent > 3 * (100 / 7)) & (percent < 4 * (100 / 7))) {
        displayBlock(loadingStatuses[2].querySelector("span"));
        displayFlex(loadingStatuses[3]);
      }
      if ((percent > 4 * (100 / 7)) & (percent < 5 * (100 / 7))) {
        displayBlock(loadingStatuses[3].querySelector("span"));
        displayFlex(loadingStatuses[4]);
      }
      if ((percent > 5 * (100 / 7)) & (percent < 6 * (100 / 7))) {
        displayBlock(loadingStatuses[4].querySelector("span"));
        displayFlex(loadingStatuses[5]);
      }
      if ((percent > 6 * (100 / 7)) & (percent < 7 * (100 / 7))) {
        displayBlock(loadingStatuses[5].querySelector("span"));
        displayFlex(loadingStatuses[6], loadingStatuses[7]);
      }
      if (loadingBar.querySelector("div").offsetLeft === 0) {
        displayBlock(
          loadingStatuses[6].querySelector("span"),
          document.querySelector(".done")
        );
        displayNone(document.querySelector(".recording"));
        clearInterval(loadingInterval);
        setTimeout(() => {
          console.log("move next");
          moveFormLineTo(8);
        }, 1500);
        console.log("loading animation is done.");
      }
      loadingBar.querySelector("p").innerText = percent + "%";
    }, 0);
  }, 777);
}

// IS YEAR LEAP
function isYearLeap(year) {
  return year % 100 === 0 && year % 400 !== 0
    ? false
    : year % 4 === 0
    ? true
    : false;
}

async function getResponse() {
  fetch("https://swapi.dev/api/people/1/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (key in data) {
        dataTable.innerHTML += `<tbody>
                    <tr>
                        <td>${key}</td>
                        <td>${data[key]}</td>
                    </tr>
                </tbody>`;
      }
    });
}
//</METHODS>
