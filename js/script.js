function initThemeToggle() {
    const toggleSwitch = document.getElementById("theme-toggle");
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    function setThemeFromLocalStorage() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('darkMode');
            document.body.classList.remove('lightMode');
            toggleSwitch.checked = true;
            sunIcon.classList.remove('visible');
            moonIcon.classList.add('visible');
            sunIcon.classList.add('fade-out');
            moonIcon.classList.remove('fade-out');
        } else {
            document.body.classList.add('lightMode');
            document.body.classList.remove('darkMode');
            toggleSwitch.checked = false;
            sunIcon.classList.add('visible');
            moonIcon.classList.remove('visible');
            sunIcon.classList.remove('fade-out');
            moonIcon.classList.add('fade-out');
        }
    }

    if (toggleSwitch) {
        setThemeFromLocalStorage();

        toggleSwitch.addEventListener("change", function () {
            if (this.checked) {
                document.body.classList.remove('lightMode');
                document.body.classList.add('darkMode');
                localStorage.setItem('theme', 'dark');
                sunIcon.classList.remove('visible');
                moonIcon.classList.add('visible');
                sunIcon.classList.add('fade-out');
                moonIcon.classList.remove('fade-out');
            } else {
                document.body.classList.remove('darkMode');
                document.body.classList.add('lightMode');
                localStorage.setItem('theme', 'light');
                sunIcon.classList.add('visible');
                moonIcon.classList.remove('visible');
                sunIcon.classList.remove('fade-out');
                moonIcon.classList.add('fade-out');
            }
        });
    }
}

// Make it globally available to loader.js
window.initThemeToggle = initThemeToggle;
