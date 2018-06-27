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
            workBreakButton.innerHTML = 'break';
            document.body.style.backgroundColor = '#FF72EE';
            workMode = false;
        } else {
            workBreakButton.innerHTML = 'work';
            document.body.style.backgroundColor = '#E2721C';
            workMode = true;
        }
    }

    function enableButtons() {
        disabledButtons = false;
    }
});
