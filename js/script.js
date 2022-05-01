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
const loadingStatuses = document.querySelectorAll(".loading__statuses p"); //LOADING STATUSES

const warning = document.querySelector(".warning");
const signsBlock = document.querySelector(".signs");
// displayNone(signsBlock);

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
  const elementClass = event.target.className;
  console.log(elementClass);
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

daysSelect.onclick = (event) => {
  const targetParent = event.target.parentNode;
  scaleArrow("open", targetParent);
};

daysSelect.onchange = (event) => {
  const targetParent = event.target.parentNode;
  scaleArrow("close", targetParent);
  isAllSelected();
};

monthsSelect.onclick = (event) => {
  const targetParent = event.target.parentNode;
  scaleArrow("open", targetParent);
  isAllSelected();
};

monthsSelect.onchange = (event) => {
  const targetParent = event.target.parentNode;
  const selectedDay = Number(daysSelect.value);
  const selectedMonth = Number(monthsSelect.value);
  const selectedYear = Number(yearsSelect.value);
  const daysInSelectedMonth = countDaysInMonth(selectedMonth, selectedYear);
  updateDaysSelect(daysInSelectedMonth, selectedDay);
  scaleArrow("close", targetParent);
  isAllSelected();
};

yearsSelect.onclick = (event) => {
  const targetParent = event.target.parentNode;
  scaleArrow("open", targetParent);
  isAllSelected();
};

yearsSelect.onchange = () => {
  const targetParent = event.target.parentNode;
  const selectedDay = Number(daysSelect.value);
  const selectedMonth = Number(monthsSelect.value);
  const selectedYear = Number(yearsSelect.value);
  const daysInSelectedMonth = countDaysInMonth(selectedMonth, selectedYear);
  updateDaysSelect(daysInSelectedMonth, selectedDay);
  scaleArrow("close", targetParent);
  isAllSelected();
};
//</LISTENERS>

//<METHODS>

function scaleArrow(action, target) {
  action === "open"
    ? (target.querySelector("img").style.cssText =
        "transform: translateY(-50%) scaleY(-1)")
    : (target.querySelector("img").style.cssText =
        "transform: translateY(-50%)");
}

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
    displayNone(signsBlock, birthdayButton);
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
    const sign = getZodiacSign(monthsSelect.value, daysSelect.value);
    createBlockBySign(sign);
    displayNone(warning);
    displayFlex(birthdayButton);
  } else {
    displayBlock(warning);
  }
}

function createBlockBySign(sign) {
  const img = document.createElement("img");
  img.setAttribute("src", `assets/sign/${sign.name}.png`);
  img.id = sign.name;
  img.setAttribute("alt", sign.name);
  signsBlock.innerHTML = "";
  signsBlock.innerText = sign.nameRus;
  signsBlock.prepend(img);
}

function getZodiacSign(month, day) {
  month = Number(month);
  day = Number(day);
  if ((month === 12 && day >= 22) || (month === 01 && day <= 20))
    return { name: "capricorn", nameRus: "Козерог" };

  if ((month === 01 && day >= 21) || (month === 02 && day <= 18))
    return { name: "aquarius", nameRus: "Водолей" };

  if ((month === 02 && day >= 19) || (month === 03 && day <= 20))
    return { name: "pisces", nameRus: "Рыбы" };

  if ((month === 03 && day >= 21) || (month === 04 && day <= 20))
    return { name: "aries", nameRus: "Овен" };

  if ((month === 04 && day >= 21) || (month === 05 && day <= 21))
    return { name: "taurus", nameRus: "Телец" };

  if ((month === 05 && day >= 22) || (month === 06 && day <= 21))
    return { name: "gemini", nameRus: "Близнецы" };

  if ((month === 06 && day >= 22) || (month === 07 && day <= 22))
    return { name: "rak", nameRus: "Рак" };

  if ((month === 07 && day >= 23) || (month === 08 && day <= 23))
    return { name: "leo", nameRus: "Лев" };

  if ((month === 08 && day >= 24) || (month === 09 && day <= 22))
    return { name: "virgo", nameRus: "Дева" };

  if ((month === 09 && day >= 23) || (month === 10 && day <= 23))
    return { name: "libra", nameRus: "Весы" };

  if ((month === 10 && day >= 24) || (month === 11 && day <= 22))
    return { name: "scorpio", nameRus: "Скорпион" };

  if ((month === 11 && day >= 23) || (month === 12 && day <= 21))
    return { name: "sagittarius", nameRus: "Стрелец" };
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
