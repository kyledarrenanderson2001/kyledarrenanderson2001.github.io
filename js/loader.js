function loadComponent(url, selector, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            return response.text();
        })
        .then(html => {
            document.querySelector(selector).innerHTML = html;
            if (callback) callback(); // e.g. initThemeToggle
        })
        .catch(err => console.error(err));
}

window.addEventListener("DOMContentLoaded", function () {
    loadComponent("components/navigation.html", ".navbar-container", initThemeToggle);
    loadComponent("components/footer.html", "footer");
});
