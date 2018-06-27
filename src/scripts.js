document.addEventListener('DOMContentLoaded', function () {
    var workMode = true;
    var disabledButtons = false;

    const workBreakButton = document.querySelector('#toggleWorkBreakButton');
    workBreakButton.addEventListener('click', toggleWorkBreak);
    document.body.addEventListener('transitionend', enableButtons);

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

    function enableButtons() {
        disabledButtons = false;
    }
});
