const question1NextButton = document.getElementById('question1-Btn'); 
const question2NextButton = document.getElementById('question2-Btn');
const question3NextButton = document.getElementById('question3-Btn');
const question4NextButton = document.getElementById('question4-Btn');
const question5NextButton = document.getElementById('question5-Btn');
const question6NextButton = document.getElementById('question6-Btn');

const banner = document.querySelector('.banner'); // section with banner
const info = document.querySelector('.info'); // section with info

const completeLine = document.querySelector('.red-line'); // section with redline statusbar
const redLine = document.querySelector('.red-line__red'); // redline of statusbar

const formLine = document.querySelector('.form'); // form line

const monthSelectBtn = document.getElementById('mounth-select-btn'); 
const yearSelectBtn = document.getElementById('year-select-btn');
const daySelectBtn = document.getElementById('day-select-btn');



const monthBlock = document.querySelector('.month');
const yearsBlock = document.querySelector('.years');
const daysBlock = document.querySelector('.days');

updateDays('jan');

const months = monthBlock.querySelectorAll('label'); // all months
const days = daysBlock.querySelectorAll('button'); // all days buttons
console.log(days)
const years = yearsBlock.querySelectorAll('button'); //all years buttons

let selectedMonth, selectedDay, selectedYear;
let monthStatus, yearStatus, dayStatus;

// <creating and adding years to block YEARS>
const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= 1920; year--) {
    let option = document.createElement("button");
    yearsBlock.appendChild(option).innerHTML = year;
}
// </creating and adding years to block YEARS>

// <UPDATE count of days>

// </UPDATE count of days>


years.forEach(year => {
    year.onclick = (event) => {
        event.preventDefault();
        monthSelectBtn.classList.remove('opened');
    }
});

// LISTENERS
document.addEventListener('click', (event) => {
    const elementID = event.target.id;
    const elementFor = event.target.getAttribute('for')

    if ((elementID === 'male' || elementFor === 'male')
    || (elementID === 'female' || elementFor === 'female')) {
        question1NextButton.style.display = 'flex';
    }

    if ((elementID === 'morning' || elementFor === 'morning')
    || (elementID === 'night' || elementFor === 'night')
    || (elementID === 'evening' || elementFor === 'evening')
    || (elementID === 'day' || elementFor === 'day')) {
        question2NextButton.style.display = 'flex';
    }

    if ((elementID === 'yes' || elementFor === 'yes')
    || (elementID === 'no' || elementFor === 'no')
    || (elementID === 'never' || elementFor === 'never')) {
        question3NextButton.style.display = 'flex';
    }

    if ((elementID === 'plans-yes' || elementFor === 'plans-yes')
    || (elementID === 'plans-no' || elementFor === 'plans-no')
    || (elementID === 'plans-never' || elementFor === 'plans-never')) {
        question4NextButton.style.display = 'flex';
    }

    if ((elementID === 'family' || elementFor === 'family')
    || (elementID === 'career' || elementFor === 'career')
    || (elementID === 'traveling' || elementFor === 'traveling')
    || (elementID === 'all' || elementFor === 'all')) {
        question5NextButton.style.display = 'flex';
    }
})

question1NextButton.addEventListener('click', () => {
    moveLineTo(2);
    banner.style.display = 'none';
    info.style.display = 'none';
    completeLine.style.display = 'block';
    setTimeout(() => {
        moveRedLine(2);
    },100);
});

question2NextButton.addEventListener('click', () => {
    moveLineTo(3);
    moveRedLine(3);
});

question3NextButton.addEventListener('click', () => {
    moveLineTo(4);
    moveRedLine(4);
});

question4NextButton.addEventListener('click', () => {
    moveLineTo(5);
    moveRedLine(5);
});

question5NextButton.addEventListener('click', () => {
    moveLineTo(6);
    moveRedLine(6);
});

question6NextButton.addEventListener('click', () => {
    moveLineTo(7);
    moveRedLine(7);
});

monthSelectBtn.onclick = (event) => {
    event.preventDefault();
    closeBlock(yearSelectBtn,yearsBlock);
    closeBlock(daySelectBtn,daysBlock);
    monthSelectBtn.classList.toggle('opened');
    if (monthSelectBtn.classList.contains('opened')) {
        monthBlock.style.cssText = 'height: 100%; opacity: 1; pointer-events: all;';
        monthSelectBtn.querySelector('img').style.cssText = 'transform: scaleY(-1);';
    } else {
        monthBlock.style.cssText = 'height: 0; opacity: 0; pointer-events: none;';
        monthSelectBtn.querySelector('img').style.cssText = 'transform: scaleY(1);';
    }
}

yearSelectBtn.onclick = (event) => {
    event.preventDefault();
    closeBlock(daySelectBtn,daysBlock);
    closeBlock(monthSelectBtn,monthBlock);
    yearSelectBtn.classList.toggle('opened');
    if (yearSelectBtn.classList.contains('opened')) {
        yearsBlock.style.cssText = 'height: 100%; opacity: 1; pointer-events: all;';
        yearSelectBtn.querySelector('img').style.cssText = 'transform: scaleY(-1);';
    } else {
        yearsBlock.style.cssText = 'height: 0; opacity: 0; pointer-events: none;';
        yearSelectBtn.querySelector('img').style.cssText = 'transform: scaleY(1);';
    }
}

daySelectBtn.onclick = (event) => {
    event.preventDefault();
    closeBlock(yearSelectBtn,yearsBlock);
    closeBlock(monthSelectBtn,monthBlock);
    daySelectBtn.classList.toggle('opened');
    openClose(daySelectBtn,daysBlock);

}

function openClose(button,block) {
    if (button.classList.contains('opened')) {
        block.style.cssText = 'height: 100%; opacity: 1; pointer-events: all;';
        button.querySelector('img').style.cssText = 'transform: scaleY(-1);';
    } else {
        block.style.cssText = 'height: 0; opacity: 0; pointer-events: none;';
        button.querySelector('img').style.cssText = 'transform: scaleY(1);';
    }
}

function closeBlock(button,block) {
        button.classList.remove('opened');
        block.style.cssText = 'height: 0; opacity: 0; pointer-events: none;';
        button.querySelector('img').style.cssText = 'transform: scaleY(1);';
}



days.forEach(day => {
    day.onclick = (e) => {

        e.preventDefault();
        selectedDay = day.innerText;
        closeBlock(daySelectBtn,daysBlock);
        // daySelectBtn.classList.remove('opened');
        // dayBlock.style.cssText = 'height: 0; opacity: 0; pointer-events: none;';
        daySelectBtn.innerHTML = selectedDay + '<img class="form__select-arrow" src="assets/arrow.svg" alt="arrow">';
        dayStatus = 'ckecked';
        console.log(selectedDay);
    }
});

months.forEach(month => {
    month.onclick = () => {
        selectedMonth = month.getAttribute('for');
        monthSelectBtn.classList.remove('opened');
        monthBlock.style.cssText = 'height: 0; opacity: 0; pointer-events: none;';
        monthSelectBtn.innerHTML = month.innerText + '<img class="form__select-arrow" src="assets/arrow.svg" alt="arrow">';
        updateDays(selectedMonth);
        monthStatus = 'ckecked';
        console.log(selectedMonth);
    }
});
// LISTENERS









function moveLineTo(num) {
    formLine.style.left = (num - 1) * (-100) + '%';
}

function moveRedLine(num) {
    num > 6 
        ? completeLine.style.display = 'none'
        : redLine.style.left = (6-num) * (-100/5) + '%';
}

function updateDays(month, year) {
    daysBlock.innerHTML = '';
    let daysCount;
    if (month === 'feb') {
        if (isYearLeap(year)) {
            console.log('29')
            daysCount = 29;
        } else {
            console.log('28')
            daysCount = 28;
        }
    } else if ( (month === 'jan') 
        || (month === "mar")
        || (month === "may")
        || (month === "jul")
        || (month === "aug")
        || (month === "oct")
        || (month === "des") ) {
            console.log('31')
            daysCount = 31;
    } else {
        console.log('30');
        daysCount = 30;
    }

    for (let day = 1; day <= daysCount; day++) {
        let option = document.createElement("button");
        daysBlock.appendChild(option).innerHTML = day;
    }
}


function isYearLeap(year) {
    return (year % 100 === 0) && (year % 400 !== 0) ? false
    : (year % 4 === 0) ? true : false;
}



