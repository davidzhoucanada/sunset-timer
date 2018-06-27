document.addEventListener('DOMContentLoaded', function () {
    var timeEnum = Object.freeze({
        "work": 25,
        "break5": 5,
        "break15": 15
    });
    var workMode = true;
    var disabledButtons = false;

    const buttons = document.querySelectorAll('button');
    const workBreakButton = document.querySelector('#toggleWorkBreakButton');
    const startButton = document.querySelector('#start');
    const stopButton = document.querySelector('#stop');
    const resetButton = document.querySelector('#reset');
    const time = document.querySelector('#time');

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
    workBreakButton.addEventListener('click', toggleWorkBreak);
    buttons.forEach(button => {
        button.addEventListener('click', beginTransitionButton);
        button.addEventListener('transitionend', endTransitionButton);
    });
    document.body.addEventListener('transitionend', endTransition);

    var start = Date.now();
    setInterval(function () {
        var delta = Date.now() - start; // milliseconds elapsed since start
        //console.log(Math.round(delta / 1000)); // in seconds
        // alternatively just show wall clock time:
        //console.log(new Date().toUTCString());
    }, 1000); // update about every second

    function startTimer() {

    }

    function stopTimer() {

    }

    function resetTimer() {
        start = Date.now();
    }

    function toggleWorkBreak() {
        if (disabledButtons) {
            return;
        }
        disabledButtons = true;
        if (workMode) {
            workBreakButton.innerHTML = 'work';
            document.body.style.backgroundColor = '#E2346B';
            workMode = false;
        } else {
            workBreakButton.innerHTML = 'break';
            document.body.style.backgroundColor = '#E2571C';
            workMode = true;
        }
    }

    function beginTransitionButton() {
        if (disabledButtons) {
            return;
        }
        this.classList.add('clicked');
    }

    function endTransitionButton() {
        this.classList.remove('clicked');
    }

    function endTransition(e) {
        if (e.propertyName === 'background-color') {
            disabledButtons = false;
        }
    }
});
