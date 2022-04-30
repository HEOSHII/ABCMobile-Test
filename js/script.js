//<BUTTONS>
    const question1NextButton = document.getElementById('question1-Btn'); 
    const question2NextButton = document.getElementById('question2-Btn');
    const question3NextButton = document.getElementById('question3-Btn');
    const question4NextButton = document.getElementById('question4-Btn');
    const question5NextButton = document.getElementById('question5-Btn');
    const question6NextButton = document.getElementById('question6-Btn');
    const callButton = document.querySelector('.call');
//</BUTTONS>
//<SECTIONS & BLOCKS>
    const banner = document.querySelector('.banner'); // section with banner
    const info = document.querySelector('.info'); // section with info
    const monthsBlock = document.getElementById('months'); //DIV MONTH
    const yearsBlock = document.getElementById('years'); //DIV YEARS
    const daysBlock = document.getElementById('days'); //DIV DAYS
    const completeLine = document.querySelector('.red-line'); // section with redline statusbar
    const formLine = document.querySelector('.form'); // FROMS LINE
    const dataTable = document.querySelector('.form__data').querySelector('table'); //DATA TABLE
//</SECTIONS & BLOCKS>
const redLine = document.querySelector('.red-line__red'); // redline of statusbar
const loadingBar = document.querySelector('.loading__bar'); //LOADING BAR
const loadingStatuses = document.querySelector('.loading__statuses').querySelectorAll('p'); // LOADING STATUSES


const signBlock = document.querySelector('.with-sign');
signBlock.style.display = 'none';

//creating and adding days to select
    for (let day = 1; day <= 31; day++) {
        let option = document.createElement("option");
        option.value = day;
        if (day < 10) {
            daysBlock.appendChild(option).innerText = '0' + day;
        } else {
            daysBlock.appendChild(option).innerText = day;
        }
    }
//creating and adding months to select
    for (let month = 1; month <= 12; month++) {
        let option = document.createElement("option");
        option.value = month;
        if (month < 10) {
            monthsBlock.appendChild(option).innerText = '0' + month;
        } else {
            monthsBlock.appendChild(option).innerText = month;
        }
    }
//creating and adding years to select
    for (let year = 2022; year >= 1920; year--) {
        let option = document.createElement("option");
        option.value = year;
        yearsBlock.appendChild(option).innerText = year;
    }

//<LISTENERS>
    //MAIN WINDOWS CLICK LISTENER 
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
    //NEXT BUTTIN LISTENERS
        question1NextButton.addEventListener('click', () => {
            moveTo(2);
            banner.style.display = 'none';
            info.style.display = 'none';
            completeLine.style.display = 'block';
            setTimeout(() => {
                moveRedLine(2);
            },100);
        });

        question2NextButton.addEventListener('click', () => {
            moveTo(3);
            moveRedLine(3);
        });

        question3NextButton.addEventListener('click', () => {
            moveTo(4);
            moveRedLine(4);
        });

        question4NextButton.addEventListener('click', () => {
            moveTo(5);
            moveRedLine(5);
        });

        question5NextButton.addEventListener('click', () => {
            moveTo(6);
            moveRedLine(6);
        });

        question6NextButton.addEventListener('click', () => {
            moveTo(7);
            moveRedLine(7);
            completeLine.style.display = 'none';
            startLoading();
        });
    //CALL BYTTON LISTENER
        callButton.addEventListener('click', () => {
            getResponse();
            moveTo(9)
        })

    // CHECK IS THE ALL OF SELECTS ARE NOT EMPTY
        daysBlock.onchange = (event) => {
            isAllSelected();
        }
        monthsBlock.onchange = (event) => {
            isAllSelected();
        }
        yearsBlock.onchange = (event) => {
            isAllSelected();
        }
//</LISTENERS>

//<FUNCTIONS>
    function moveTo(num) {
        formLine.style.left = (num - 1) * (-100) + '%';
    }

    function moveRedLine(num) {
        num > 6 
            ? completeLine.style.display = 'none'
            : redLine.style.left = (6-num) * (-100/5) + '%';
    }

    function isAllSelected() {
        const attention = document.querySelector('.please-make-choice');
        if (monthsBlock.value !== '0') {
            monthsBlock.style.color = '#315DFA';
        }
        if (yearsBlock.value !== '0') {
            yearsBlock.style.color = '#315DFA';
        }
        if (daysBlock.value !== '0') {
            daysBlock.style.color = '#315DFA';
        }
        if (monthsBlock.value !== '0' && yearsBlock.value !== '0' && daysBlock.value !== '0') {
            signBlock.style.display = 'block';
            signBlock.querySelectorAll('img').forEach(img => {
                img.style.opacity = '0';
            })
            let sign = whatZodiacSign(monthsBlock.value,daysBlock.value);
            document.getElementById(sign.name).style.opacity = '1';
            attention.style.display = 'none';
            question6NextButton.style.display = 'flex';
        } else {
            attention.style.display = 'block';
        }
    }

    function whatZodiacSign(month,day) {
        if ((Number(month) === 12 && Number(day) >= 22)
            || (Number(month) === 01 && Number(day) <= 20)) {
                return {name: 'capricorn',nameRus:'Козерог'}
        }
        if ((Number(month) === 01 && Number(day) >= 21)
            || (Number(month) === 02 && Number(day) <= 18)) {
                return {name: 'aquarius',nameRus: 'Водолей'}
        }
        if ((Number(month) === 02 && Number(day) >= 19)
            || (Number(month) === 03 && Number(day) <= 20)) {
                return {name: 'pisces',nameRus: 'Рыбы'}
        }
        if ((Number(month) === 03 && Number(day) >= 21)
            || (Number(month) === 04 && Number(day) <= 20)) {
                return {name: 'aries',nameRus: 'Овен'}
        }
        if ((Number(month) === 04 && Number(day) >= 21)
            || (Number(month) === 05 && Number(day) <= 21)) {
                return {name: 'taurus',nameRus: 'Телец'}
        }
        if ((Number(month) === 05 && Number(day) >= 22)
            || (Number(month) === 06 && Number(day) <= 21)) {
                return {name: 'gemini',nameRus: 'Близнецы'}
        }
        if ((Number(month) === 06 && Number(day) >= 22)
            || (Number(month) === 07 && Number(day) <= 22)) {
                return {name: 'rak',nameRus: 'Рак'}
        }
        if ((Number(month) === 07 && Number(day) >= 23)
            || (Number(month) === 08 && Number(day) <= 23)) {
                return {name: 'leo',nameRus: 'Лев'}
        }
        if ((Number(month) === 08 && Number(day) >= 24)
            || (Number(month) === 09 && Number(day) <= 22)) {
                return {name: 'virgo',nameRus: 'Дева'}
        }
        if ((Number(month) === 09 && Number(day) >= 23)
            || (Number(month) === 10 && Number(day) <= 23)) {
                return {name: 'libra',nameRus: 'Весы'}
        }
        if ((Number(month) === 10 && Number(day) >= 24)
            || (Number(month) === 11 && Number(day) <= 22)) {
                return {name: 'scorpio',nameRus: 'Скорпион'}
        }
        if ((Number(month) === 11 && Number(day) >= 23)
            || (Number(month) === 12 && Number(day) <= 21)) {
                return {name: 'sagittarius',nameRus: 'Стрелец'}
        }
    }

    function startLoading(){
        setTimeout(() => {
            loadingBar.querySelector('div').classList.add('animated');
            const loadingInterval = setInterval(() => {
                console.log('loading animation...')
                const barWidth = loadingBar.clientWidth
                const loadingOffset = loadingBar.querySelector('div').offsetLeft

                const percent = Math.trunc(100 - (-loadingOffset/barWidth)*100)
                console.log(percent)
                if (percent > 0 & percent < 100/7) {
                    loadingStatuses[0].style.display = 'flex'
                }
                if (percent > 100/7 & percent < 2*(100/7)) {
                    loadingStatuses[0].querySelector('span').style.display = 'block'
                    loadingStatuses[1].style.display = 'flex'
                }
                if (percent > 2*(100/7) & percent < 3*(100/7)) {
                    loadingStatuses[1].querySelector('span').style.display = 'block'
                    loadingStatuses[2].style.display = 'flex'
                }
                if (percent > 3*(100/7) & percent < 4*(100/7)) {
                    loadingStatuses[2].querySelector('span').style.display = 'block'
                    loadingStatuses[3].style.display = 'flex'
                }
                if (percent > 4*(100/7) & percent < 5*(100/7)) {
                    loadingStatuses[3].querySelector('span').style.display = 'block'
                    loadingStatuses[4].style.display = 'flex'
                }
                if (percent > 5*(100/7) & percent < 6*(100/7)) {
                    loadingStatuses[4].querySelector('span').style.display = 'block'
                    loadingStatuses[5].style.display = 'flex'
                }
                if (percent > 6*(100/7) & percent < 7*(100/7)) {
                    loadingStatuses[5].querySelector('span').style.display = 'block'
                    loadingStatuses[6].style.display = 'flex'
                    loadingStatuses[7].style.display = 'flex'
                }
                if (loadingBar.querySelector('div').offsetLeft === 0) {
                    loadingStatuses[6].querySelector('span').style.display = 'block'
                    document.querySelector('.recording').style.display = 'none';
                    document.querySelector('.done').style.display = 'block';
                    clearInterval(loadingInterval);
                    setTimeout(()=>{
                        console.log('move next')
                        moveTo(8);
                    }, 2000)
                    console.log('loading animation is done.')
                }
                loadingBar.querySelector('p').innerText = percent + '%';
            },0)
        },1000);
    }

    async function getResponse() {
        fetch('https://swapi.dev/api/people/1/')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (key in data) {
                dataTable.innerHTML += 
                `<tbody>
                    <tr>
                        <td>${key}</td>
                        <td>${data[key]}</td>
                    </tr>
                </tbody>`
            }
        });

    }
    
    /* HOW MUCH DAYS IN A MONTH CHECK
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
        daysCount = 30;
    }

    for (let day = 1; day <= daysCount; day++) {
        let option = document.createElement("button");
        daysBlock.appendChild(option).innerHTML = day;
    }
}

// IS YEAR LEAP
function isYearLeap(year) {
    return (year % 100 === 0) && (year % 400 !== 0) ? false
    : (year % 4 === 0) ? true : false;
}
*/

//</FUNCTIONS>