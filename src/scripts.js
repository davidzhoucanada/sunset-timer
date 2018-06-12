function toggleWorkBreak() {
    if (document.getElementById("toggleWorkBreakButton").innerHTML === "Break") {
        document.getElementById("toggleWorkBreakButton").innerHTML = "Work";
        // disableButtons = true;
        // workMode = true;
    } else {
        document.getElementById("toggleWorkBreakButton").innerHTML = "Break";
        // workMode = false;
    }

    // toggleBackgroundColour();
}

function toggleBackgroundColour() {
    // change colour
    // disableButtons = false;
}

function startTimer() {

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

    // startTimer();
}

function pause() {
    timer.pause();
}

function reset() {
    timer.reset();
}
