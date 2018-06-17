(function(){
    "user strict";

    var timer = document.getElementById("timer");
    var start = document.getElementById("start");
    var stop = document.getElementById("stop");
    var reset = document.getElementById("reset");

    var StartTime;
    var elapsedTime=0;
    var TimerId;
    var timeToAdd = 0;
    var isRunning = false;

    function updateButtonStuation(startButtonStuation,stopButtonStuation,resetButtonStuation){
      start.className = startButtonStuation ? "btn":"btn inactive";
      stop.className = stopButtonStuation ? "btn":"btn inactive";
      reset.className = resetButtonStuation ? "btn":"btn inactive";
    }

    function updateTimerText(){
      var m = Math.floor(elapsedTime/60000);
      var s = Math.floor(elapsedTime%60000/1000);
      var ms = elapsedTime%1000;

      m = ('0'+ m).slice(-2);
      s = ('0'+ s).slice(-2);
      ms = ('00'+ ms).slice(-3);

      timer.textContent = m + ':' + s + '.' + ms;
    }

    function CountUp(){
      TimerId = setTimeout(function()
        {elapsedTime = Date.now() - StartTime + timeToAdd;
        updateTimerText()
        CountUp();
      },10);
    
    }

    updateButtonStuation(true,false,false);

    // start.className = "btn";
    // stop.className = "btn inactive";
    // reset.className = "btn inactive";


    start.addEventListener('click',function(){
        if(isRunning === true){
          return;
        }
        // start:false,stop:true,reset:false
        isRunning = true;
        updateButtonStuation(false,true,false);
        StartTime = Date.now();
        CountUp();
    });
    stop.addEventListener('click',function(){
      if(isRunning === false){
        return;
      }
      // start:true,stop:false,reset:true
      isRunning = false;
      updateButtonStuation(true,false,true);
      clearTimeout(TimerId);
      timeToAdd += Date.now() - StartTime;
      
    });
    reset.addEventListener('click',function(){
      if(isRunning === true){
        return;
      }
      updateButtonStuation(true,false,false);
      elapsedTime=0;
      timeToAdd = 0;
      updateTimerText();
  });

})();