document.write('<script src="utils.js"></script>');

//按屏幕均分
var navigationSystem = (function navigationSystem () {
    let btn = null;
    let winH = document.documentElement.clientHeight;
    let floorMark = null;
    let timerScroll = null;
    let pageSection = Math.floor(document.documentElement.scrollHeight/winH);
    let currentBody = document.getElementsByTagName('body')[0];

    //加载控件
    var loadWidget = function () {
        //加载结构
        currentBody.innerHTML += `
        <p class="floorNavBtn">⬆UP</p>
        <div class="floorNavMap">
        </div>
        `;

        //加载按钮
        btn = document.getElementsByClassName('floorNavBtn')[0];
        var str = '';
        var floorMap = document.getElementsByClassName('floorNavMap')[0];
        floorMap.style.height = pageSection*40 + 'px';
        for (var i = 0; i < pageSection; i++) {
            str += '<div class="floorNavMark"></div>';
        }
        floorMap.innerHTML = str;
        floorMark = document.getElementsByClassName('floorNavMark');

    };

    //更改Speed
    var setSpeed = function (n) {
        // speed = n;
    };

    //楼层探测更改floorMark
    var changeMark = function () {
        var currentWinBottom = document.documentElement.scrollTop + winH/2;
        var currentFloor = Math.floor(currentWinBottom/winH);
        //改变圆点点亮
        for (var i = 0; i < floorMark.length; i++) {
            floorMark[i].style.opacity = 0.2;
            floorMark[i].style.transform = 'scale(1.0)';
        }
        floorMark[currentFloor].style.opacity = 1;
        floorMark[currentFloor].style.transform = 'scale(1.4)';
        //返回顶部键
        if(document.documentElement.scrollTop>(winH-10)){
            btn.style.opacity = 1
        }else{
            btn.style.opacity = 0
        }
    };

    //楼层按钮
    var loadBtn = function(){
        for (var i = 0; i < floorMark.length; i++) {
            floorMark[i].index = i;
            floorMark[i].onclick = function(){
                clearInterval(timerScroll);
                scrollTo(this.index*winH);
            }
        }
        btn.onclick = function () {
            clearInterval(timerScroll);
            scrollTo(0);
        }
    };

    //滑动跳转到指定位置
    var scrollTo = function (location) {
        let speed = 200;
        let total = Math.abs(document.documentElement.scrollTop - location);
        let step = 1;
        timerScroll = setInterval(()=>{
            step = step<1 ? 1: (Math.abs(document.documentElement.scrollTop-location) / total)*speed;
            if(document.documentElement.scrollTop>location){
                document.documentElement.scrollTop -= step;
            }else{
                document.documentElement.scrollTop += step;
            }
            if(document.documentElement.scrollTop==location){
                clearInterval(timerScroll);
            }
        },17)
    };

    //onscroll事件
    var loadScrollEvent = function () {
        window.addEventListener('scroll',changeMark,false);
    };

    // 对外借口
    return {
        init:function () {
            loadWidget();
            changeMark();
            loadBtn();
            loadScrollEvent();
        },
        changeMark,
        setSpeed
    }
})();
