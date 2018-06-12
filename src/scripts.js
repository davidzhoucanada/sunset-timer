/*function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60);
        seconds = parseInt(timer % 60);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        timer--;
        if (timer < 0 || ) {
            timer = duration;
        }
    }, 1000);
}
*/

function toggleWorkBreak() {
    if (document.getElementById("toggleWorkBreakButton").innerHTML === "Break") {
        document.getElementById("toggleWorkBreakButton").innerHTML = "Work";
        // disableButtons = true;
    } else {
        document.getElementById("toggleWorkBreakButton").innerHTML = "Break";
    }

    // toggleBackgroundColour();
}

function toggleBackgroundColour() {
    // change colour
    // disableButtons = false;
}

function startTimer(seconds, container, oncomplete) {
    var startTime, timer, obj, ms = seconds * 1000,
        display = document.getElementById(container);

    obj = {};

    obj.resume = function() {
        startTime = new Date().getTime();
        timer = setInterval(obj.step,250);  // adjust this number to affect granularity
                                            // lower numbers are more accurate, but more CPU-expensive
    };

    obj.pause = function() {
        ms = obj.step();
        clearInterval(timer);
    };

    obj.reset = function() {
        ms = seconds * 1000;
    };

    obj.step = function() {
        var now = Math.max(0, ms - (new Date().getTime() - startTime)),
            m = Math.floor(now / 60000), s = Math.floor(now / 1000) % 60;
        s = (s < 10 ? "0" : "") + s;
        display.innerHTML = m + ":" + s;
        if (now == 0) {
            clearInterval(timer);
            obj.resume = function() {};
            if (oncomplete) {
                oncomplete();
            }
        }
        return now;
    };

    obj.resume();
    
    return obj;
}

function start() {
    var duration = 60;

    if (true) {
        duration *= 25;
    } else {
        if (true) {
            duration *= 5;
        } else {
            duration *= 15;
        }
    }

    var timer = startTimer(duration, "timer", function() {alert("Done!");});
}

function pause() {
    timer.pause();
}

function reset() {
    timer.reset();
}
