// ========== BUTTONS
const body = document.body;
const main = document.querySelector("main");
const headerAndMain = document.querySelector(".header-main");
const genderButton = document.getElementById("gender-Btn");
const birthdayButton = document.getElementById("birthday-Btn");
const callButton = document.querySelector(".call");
const answersOpenButton = document.querySelector(".answers-table-button");
const answersCloseButton = document.querySelector(
  ".answers-objects__close-button"
);
const comebackButton = document.querySelector(".comeback");
//========== /BUTTONS
//========== SECTIONS, BLOCKS, TABLES
const banner = document.querySelector(".banner");
const info = document.querySelector(".info");
const monthsSelect = document.getElementById("months-select");
const yearsSelect = document.getElementById("years-select");
const daysSelect = document.getElementById("days-select");
const formLine = document.querySelector(".form");
const dataTable = document.querySelector(".form__data").querySelector("table");
const signsBlock = document.querySelector(".signs");
const mainTableResult = document.querySelector(".answers-objects");
const tableQuestion = document.querySelector(".question");
const tableAnswer = document.querySelector(".answer");
const warning = document.querySelector(".warning");

//========== /SECTIONS, BLOCKS, TABLES
//========== OTHER
const statusbar = document.querySelector(".statusbar");
const redLine = document.querySelector(".statusbar__red");
const loadingBar = document.querySelector(".loading__bar");
const loadingBarGreen = loadingBar.querySelector(".loading__bar-green");
const loadingBarPercent = loadingBar.querySelector(".loading__bar-percent");
const loadingStatuses = document.querySelectorAll(".loading__statuses p");
const DAYS_BY_DEFAULT = 31;
const result = {
  updateResult(question, answer) {
    this[question] = answer;
  },
};
let formLineStatus = 1,
  firstTounch,
  currentTounch,
  lastTouch,
  startPosition,
  pointToClose;
//========== /OTHER

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
for (let year = 2022; year >= 1922; year--) {
  let option = document.createElement("option");
  option.value = year;
  yearsSelect.appendChild(option).innerText = year;
}

//=========== LISTENERS
document.addEventListener("click", (event) => {
  const elementName = event.target.name;
  const elementID = event.target.id;
  if (elementID === "male" || elementID === "female") {
    displayFlex(genderButton);
    result.updateResult(elementName, elementID);
  }
  if (
    elementID === "morning" ||
    elementID === "night" ||
    elementID === "evening" ||
    elementID === "day"
  ) {
    setTimeout(() => {
      formLineStatus = 3;
      moveFormLine();
      moveRedStatusLine();
    }, 100);
    result.updateResult(elementName, elementID);
  }
  if (elementID === "yes" || elementID === "no" || elementID === "never") {
    setTimeout(() => {
      formLineStatus = 4;
      moveFormLine();
      moveRedStatusLine();
    }, 100);
  }
  if (
    elementID === "feel" ||
    elementID === "not_feel" ||
    elementID === "never_feel"
  ) {
    setTimeout(() => {
      formLineStatus = 5;
      moveFormLine();
      moveRedStatusLine();
    }, 100);
    result.updateResult(elementName, elementID);
  }

  if (
    elementID === "family" ||
    elementID === "career" ||
    elementID === "traveling" ||
    elementID === "all_in"
  ) {
    setTimeout(() => {
      formLineStatus = 6;
      moveFormLine();
      moveRedStatusLine();
    }, 100);
    result.updateResult(elementName, elementID);
  }
});

genderButton.addEventListener("click", () => {
  if (window.innerWidth > 320) {
    comebackButton.style.cssText = "margin-top: 50px";
  } else {
    comebackButton.style.cssText = "margin-top: 25px";
  }
  formLineStatus = 2;
  displayFlex(comebackButton);
  moveFormLine();
  displayNone(banner, info);
  displayBlock(statusbar);
  setTimeout(() => {
    moveRedStatusLine();
  }, 100);
});

birthdayButton.addEventListener("click", (event) => {
  event.preventDefault();
  displayNone(comebackButton);
  formLineStatus = 7;
  moveFormLine();
  moveRedStatusLine();
  displayNone(statusbar);

  let birthdayDay = daysSelect.value;
  let birthdayMonth = monthsSelect.value;
  let birthdayYear = yearsSelect.value;

  if (Number(birthdayDay) < 10) {
    birthdayDay = "0" + birthdayDay;
  }
  if (Number(birthdayMonth) < 10) {
    birthdayMonth = "0" + birthdayMonth;
  }

  result.updateResult(
    "birthday",
    `${birthdayDay}.${birthdayMonth}.${birthdayYear}`
  );
  createAnswersTable(result);
  startLoading();
});

callButton.addEventListener("click", () => {
  formLineStatus = 9;
  moveFormLine();
});

daysSelect.onclick = (event) => {
  const targetParent = event.target.parentNode;
  scaleArrow("open", targetParent);
};

daysSelect.onchange = (event) => {
  const targetParent = event.target.parentNode;
  scaleArrow("close", targetParent);
  areAllSelected();
};

monthsSelect.onclick = (event) => {
  const targetParent = event.target.parentNode;
  scaleArrow("open", targetParent);
  areAllSelected();
};

monthsSelect.onchange = (event) => {
  const targetParent = event.target.parentNode;
  const selectedDay = Number(daysSelect.value);
  const selectedMonth = Number(monthsSelect.value);
  const selectedYear = Number(yearsSelect.value);
  const daysInSelectedMonth = countDaysInMonth(selectedMonth, selectedYear);
  updateDaysSelect(daysInSelectedMonth, selectedDay);
  scaleArrow("close", targetParent);
  areAllSelected();
};

yearsSelect.onclick = (event) => {
  const targetParent = event.target.parentNode;
  scaleArrow("open", targetParent);
  areAllSelected();
};

yearsSelect.onchange = (event) => {
  const targetParent = event.target.parentNode;
  const selectedDay = Number(daysSelect.value);
  const selectedMonth = Number(monthsSelect.value);
  const selectedYear = Number(yearsSelect.value);
  const daysInSelectedMonth = countDaysInMonth(selectedMonth, selectedYear);
  updateDaysSelect(daysInSelectedMonth, selectedDay);
  scaleArrow("close", targetParent);
  areAllSelected();
};

comebackButton.onclick = moveBack;

answersOpenButton.onclick = () => {
  mainTableResult.style.cssText = "left: 0; opacity: 1; pointer-events: all;";
  body.style.cssText = "overflow: hidden;";
  headerAndMain.style.cssText = "filter: blur(5px);";
};

answersCloseButton.onclick = () => {
  mainTableResult.style.left = "10%";
  mainTableResult.style.opacity = "0";
  mainTableResult.style.pointerEvents = "none";
  body.style.overflow = "auto";
  headerAndMain.style.cssText = "filter: blur(0);";
};

mainTableResult.addEventListener("touchstart", (event) => {
  if (
    event.target.className !== "answers-objects__close-button-line" &&
    event.target.className !== "answers-objects__close-button"
  ) {
    pointToClose = mainTableResult.clientWidth / 15;
    firstTounch = event.targetTouches[0].clientX;
    startPosition = event.target.offsetLeft;
  }
});

mainTableResult.addEventListener("touchmove", (event) => {
  event.preventDefault();
  if (
    event.target.className !== "answers-objects__close-button-line" &&
    event.target.className !== "answers-objects__close-button"
  ) {
    event.target.style.transition = "0s";
    currentTounch = event.targetTouches[0].clientX;
    event.target.style.left =
      startPosition + currentTounch - firstTounch + "px";
    headerAndMain.style.cssText = `filter: blur(${
      (mainTableResult.clientWidth - event.target.offsetLeft) / 60
    }px);`;
    event.target.style.opacity = `${
      (100 + (firstTounch - currentTounch)) / 80
    }`;
  }
});

mainTableResult.addEventListener("touchend", (event) => {
  if (
    event.target.className !== "answers-objects__close-button-line" &&
    event.target.className !== "answers-objects__close-button"
  ) {
    lastTouch = event.changedTouches[0].clientX;
    event.target.style.transition = "0.3s";
    if (event.target.offsetLeft > pointToClose) {
      event.target.style.left = `${lastTouch}px`;
      event.target.style.opacity = `0`;
      event.target.style.pointerEvents = `none`;
      body.style.overflow = "auto";
      headerAndMain.style.cssText = "filter: blur(0);";
    } else {
      event.target.style.left = startPosition;
    }
  }
});
//=========== /LISTENERS

//=========== METHODS
//===============SHOW BLOCK(BLOCKS) WITH FLEX
function displayFlex() {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].style.display = "flex";
  }
}
//===============SHOW BLOCK(BLOCKS) WITH BLOCK
function displayBlock() {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].style.display = "block";
  }
}
//===============HIDE BLOCK(BLOCKS)
function displayNone() {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].style.display = "none";
  }
}
//===============ADD DAYS INTO THE SELECT WITH DEFAULT COUNT OF DAYS
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
//===============UPDATE NUMBER OF DAYS DEPENDING ON MONTH
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
//===============COUNT UP DAYS DEPENDING ON MONTH AND YEAR
function countDaysInMonth(month, year = 2000) {
  return month === 2
    ? isYearLeap(year)
      ? 29
      : 28
    : month === 4 || month === 6 || month === 9 || month === 11
    ? 30
    : 31;
}
//===============MOVE MAIN QUESTION LINE
function moveFormLine() {
  formLine.style.left = (formLineStatus - 1) * -100 + "%";
}
//===============MOVE BACK FUNCT
function moveBack() {
  --formLineStatus;
  if (formLineStatus < 2) {
    displayBlock(info, banner);
    displayNone(statusbar, comebackButton);
  }
  moveFormLine();
  moveRedStatusLine();
}
//===============MOVE STATUS LINE
function moveRedStatusLine() {
  formLineStatus > 6
    ? displayNone(statusbar)
    : (redLine.style.left = (6 - formLineStatus) * (-100 / 5) + "%");
}
//===============CHECK ARE ALL <SELECTS> IN BIRTHDAY_BLOCK SELECTED
function areAllSelected() {
  monthsSelect.value !== "0"
    ? (monthsSelect.style.color = "#315DFA")
    : (monthsSelect.style.color = "#000000");
  yearsSelect.value !== "0"
    ? (yearsSelect.style.color = "#315DFA")
    : (yearsSelect.style.color = "#000000");
  daysSelect.value !== "0"
    ? (daysSelect.style.color = "#315DFA")
    : (daysSelect.style.color = "#000000");
  if (
    monthsSelect.value !== "0" &&
    yearsSelect.value !== "0" &&
    daysSelect.value !== "0"
  ) {
    const sign = getZodiacSign(monthsSelect.value, daysSelect.value);
    createBlockBySign(sign);
    displayNone(warning);
    displayFlex(birthdayButton, signsBlock);
  } else {
    displayNone(signsBlock);
    displayBlock(warning);
  }
}
//===============TURN AROUND ARROW IN <SELECTS>
function scaleArrow(action, target) {
  action === "open"
    ? (target.querySelector("img").style.cssText =
        "transform: translateY(-50%) scaleY(-1)")
    : (target.querySelector("img").style.cssText =
        "transform: translateY(-50%)");
}
//===============CREATE BLOCK WITH IMAGE-SIGN
function createBlockBySign(sign) {
  const img = document.createElement("img");
  img.setAttribute("src", `assets/sign/${sign.name}.png`);
  img.id = sign.name;
  img.setAttribute("alt", sign.name);
  signsBlock.innerHTML = "";
  signsBlock.innerText = sign.nameRus;
  signsBlock.prepend(img);
}
//===============GET ZODIAC SIGN DEPENDING ON MONTH AND DAY
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
//===============START LOADING
function startLoading() {
  setTimeout(() => {
    loadingBarGreen.classList.add("animated");
    console.log("start loading animation...");
    body.style.cursor = "progress";
    const loadingInterval = setInterval(() => {
      const barWidth = loadingBar.clientWidth; // FULL BAR
      const loadingOffset = loadingBarGreen.offsetLeft;
      const percent = Math.trunc(100 - (-loadingOffset / barWidth) * 100);
      const numberOfStatuses = 7;
      const pointToShowStatus = 100 / numberOfStatuses;
      if ((percent > 0) & (percent < pointToShowStatus)) {
        displayFlex(loadingStatuses[0]);
        loadingStatuses[0].querySelector(".status-points").innerText += " . ";
      }
      if ((percent > pointToShowStatus) & (percent < 2 * pointToShowStatus)) {
        displayBlock(loadingStatuses[0].querySelector(".status-done"));
        displayFlex(loadingStatuses[1]);
        loadingStatuses[1].querySelector(".status-points").innerText += " . ";
      }
      if (
        (percent > 2 * pointToShowStatus) &
        (percent < 3 * pointToShowStatus)
      ) {
        displayBlock(loadingStatuses[1].querySelector(".status-done"));
        displayFlex(loadingStatuses[2]);
        loadingStatuses[2].querySelector(".status-points").innerText += " . ";
      }
      if (
        (percent > 3 * pointToShowStatus) &
        (percent < 4 * pointToShowStatus)
      ) {
        displayBlock(loadingStatuses[2].querySelector(".status-done"));
        displayFlex(loadingStatuses[3]);
        loadingStatuses[3].querySelector(".status-points").innerText += " . ";
      }
      if (
        (percent > 4 * pointToShowStatus) &
        (percent < 5 * pointToShowStatus)
      ) {
        displayBlock(loadingStatuses[3].querySelector(".status-done"));
        displayFlex(loadingStatuses[4]);
        loadingStatuses[4].querySelector(".status-points").innerText += " . ";
      }
      if (
        (percent > 5 * pointToShowStatus) &
        (percent < 6 * pointToShowStatus)
      ) {
        displayBlock(loadingStatuses[4].querySelector(".status-done"));
        displayFlex(loadingStatuses[5]);
        loadingStatuses[5].querySelector(".status-points").innerText += " . ";
      }
      if (
        (percent > 6 * pointToShowStatus) &
        (percent < 7 * pointToShowStatus)
      ) {
        displayBlock(loadingStatuses[5].querySelector(".status-done"));
        displayFlex(loadingStatuses[6], loadingStatuses[7]);
        loadingStatuses[6].querySelector(".status-points").innerText += " . ";
      }
      if (loadingBarGreen.offsetLeft === 0) {
        displayBlock(
          loadingStatuses[6].querySelector(".status-done"),
          document.querySelector(".done")
        );
        displayNone(document.querySelector(".recording"));
        clearInterval(loadingInterval);
        formLineStatus = 8;
        setTimeout(() => {
          moveFormLine();
        }, 1500);
        console.log("loading animation is done.");
        body.style.cursor = "default";
      }
      loadingBarPercent.innerText = percent + "%";
    }, 200);
  }, 777);
}
//===============CHECK IS YEAR LEAP
function isYearLeap(year) {
  return year % 100 === 0 && year % 400 !== 0
    ? false
    : year % 4 === 0
    ? true
    : false;
}
//===============CREATE TABLE WITH DATA FROM URL
function createTable(data) {
  for (key in data) {
    dataTable.innerHTML += `<tbody>
                                <tr>
                                    <td>${key}</td>
                                    <td>${data[key]}</td>
                                </tr>
                            </tbody>`;
  }
}
//===============CREATE TABLE WITH ANSWERS
function createAnswersTable(object) {
  for (key in object) {
    const question = document.createElement("p");
    const answer = document.createElement("p");
    if (key !== "updateResult") {
      question.innerText = key;
      answer.innerText = object[key];
      tableQuestion.append(question);
      tableAnswer.append(answer);
    }
  }
}
//=========== /METHODS
//=========== FETCH REQUEST
fetch("https://swapi.dev/api/people/1/")
  .then((response) => response.text())
  .then((response) => {
    createTable(JSON.parse(response));
  });
//=========== /FETCH REQUEST
