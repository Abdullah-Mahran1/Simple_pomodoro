const progressBar = document.querySelector('.outerRem'),
 minElem = document.querySelector('#minutes'),
    secElem = document.querySelector('#seconds'),
    setting = document.querySelector('#setting');
    startStop = document.querySelector('#stsp');
let toggleSettings = false,
    minutes = document.querySelector('#minutes').innerHTML,
    seconds = document.querySelector('#seconds').innerHTML,
    progress = null,
    progressStart = 0,
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds),
    speed = 1000,
    degTravel = 360 / progressEnd,
    secRem = 0,
    minRem = 0;


    function progressTrack(){
        progressStart++;
    
        secRem = Math.floor((progressEnd - progressStart) % 60);
        minRem = Math.floor((progressEnd - progressStart) / 60);
        secElem.innerHTML = secRem.toString().length == 2? secRem : `0${secRem}`;
        minElem.innerHTML = minRem.toString().length == 2? minRem: `0${minRem}`;
        progressBar.style.background = `conic-gradient(
            #3d0000 ${progressStart * degTravel}deg,
            #17171a ${progressStart * degTravel}deg)`;
        if(progressStart == progressEnd){
            progressBar.style.background = `conic-gradient(
                #00aa51 360deg,
                #00aa51 360deg)`;
        clearInterval(progress);
        startStop.innerHTML = "START";
        progress = null;
        progressStart = 0;
        }
    }
    function startStopProgress(){
        if(!progress) {
            progress = setInterval(progressTrack,speed);
        } else{
            clearInterval(progress);
            progress = null;
            progressStart = 0;
            progressBar.style.background = `conic-gradient(#17171a 360deg, #17171a 360deg)`;
        }
     }
     
     function resetValues(){
        if(progress){
            clearInterval(progress);
        }
        minutes = document.querySelector('#minutes').innerHTML;
        seconds = document.querySelector('#seconds').innerHTML;
        toggleSettings = false;
        minElem.contentEditable = false;
        minElem.style.borderBottom=`none`;
        secElem.contentEditable = false;
        secElem.style.borderBottom=`none`;
        progress = null;
        progressStart = 0;
        progressEnd = parseInt(minutes)*60 + parseInt(seconds);
        degTravel = 360 / progressEnd;
        progressBar.style.background = `conic-gradient(
            #17171a 360deg,
            #17171a 360deg
        )`;
     }
     
setting.onclick = function(){
    if(!toggleSettings){
        toggleSettings = true;
        minElem.contentEditable = true;
        minElem.style.borderBottom = `1px dashed #ffffff50`;
        secElem.contentEditable = true;
        secElem.style.borderBottom = `1px dashed #ffffff50`;
    }
    else{
        resetValues();
    }
};

minElem.onblur = function() {
    resetValues();
}
secElem.onblur = function() {
    resetValues();
}

startStop.onclick = function() {
    if(startStop.innerHTML === "START"){
        if(!(parseInt(minutes) === 0 && parseInt(seconds) === 0)){
            startStop.innerHTML = "STOP";
            startStopProgress();
        } else {
            alert("Enter the Time Value in your Timer");
        }
    } else{
        startStop.innerHTML = "START";
        startStopProgress();
    }
 };

