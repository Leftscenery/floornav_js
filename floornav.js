/*
 * VERSION: 1.2.0
 * DATE: 2018-02
 *
 * @ author: Jiawei Zhou, leftscenery@gmail.com
 * @ github: https://github.com/Leftscenery
 * @ doc: https://github.com/Leftscenery/lazyimg_js/blob/master/README.md
 */

let NavigationSystem = (function navigationSystem() {
    let btn = null;
    let winH = document.documentElement.clientHeight;
    let floorMark = null;
    let timerScroll = null;
    let pageSection = Math.floor(document.documentElement.scrollHeight / winH);
    let currentBody = document.getElementsByTagName('body')[0];

    //Default
    let floor = true;
    let toTopText = '⬆';
    let speed = 200;

    //init default value
    let initDefault = function (options = {}) {
        floor = options.hasOwnProperty('floor') ? options.floor : floor;
        toTopText = options.toTopText || toTopText;
        speed = options.hasOwnProperty('speed') ? options.speed : speed;
    };

    //load widget
    let loadWidget = function () {
        //loading structure
        if (floor) {
            currentBody.innerHTML += `
                <p class="floorNavBtn">${toTopText}</p>
                <div class="floorNavMap">
                </div>
            `;
            let str = '';
            let floorMap = document.getElementsByClassName('floorNavMap')[0];
            floorMap.style.height = pageSection * 40 + 'px';
            for (var i = 0; i < pageSection; i++) {
                str += '<div class="floorNavMark"></div>';
            }
            floorMap.innerHTML = str;
            floorMark = document.getElementsByClassName('floorNavMark');
        } else {
            currentBody.innerHTML += `
                <p class="floorNavBtn">${toTopText}</p>
                </div>
            `;
        }

        btn = document.getElementsByClassName('floorNavBtn')[0];
    };

    //listen floor change to change mark
    let changeMark = function () {
        let currentWinBottom = document.documentElement.scrollTop + winH / 2;
        let currentFloor = Math.floor(currentWinBottom / winH);
        //change dots nav
        if (floor) {
            for (let i = 0; i < floorMark.length; i++) {
                floorMark[i].style.opacity = 0.2;
                floorMark[i].style.transform = 'scale(1.0)';
            }
            floorMark[currentFloor].style.opacity = 1;
            floorMark[currentFloor].style.transform = 'scale(1.4)';
        }
        //back to top btn
        if (document.documentElement.scrollTop > (winH - 10)) {
            btn.style.opacity = 1
        } else {
            btn.style.opacity = 0
        }
    };

    //floor buttons
    let loadBtn = function () {
        if (floor) {
            for (let i = 0; i < floorMark.length; i++) {
                floorMark[i].index = i;
                floorMark[i].onclick = function () {
                    clearInterval(timerScroll);
                    scrollTo(this.index * winH);
                }
            }
        }
        btn.onclick = function () {
            clearInterval(timerScroll);
            scrollTo(0);
        }
    };

    //scroll to position
    let scrollTo = function (location) {
        let total = Math.abs(document.documentElement.scrollTop - location);
        let step = 1;
        timerScroll = setInterval(() => {
            step = step < 1 ? 1 : (Math.abs(document.documentElement.scrollTop - location) / total) * speed;
            if (document.documentElement.scrollTop > location) {
                document.documentElement.scrollTop -= step;
            } else {
                document.documentElement.scrollTop += step;
            }
            if (document.documentElement.scrollTop == location) {
                clearInterval(timerScroll);
            }
        }, 17)
    };

    //onscroll event
    let loadScrollEvent = function () {
        window.addEventListener('scroll', changeMark, false);
    };

    // export
    return {
        init: function (options) {
            initDefault(options);
            loadWidget();
            changeMark();
            loadBtn();
            loadScrollEvent();
        },
    }
})();
