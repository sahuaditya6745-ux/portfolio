const themeButton = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const projectSearch = document.getElementById("projectSearch");
const technologyFilter = document.getElementById("technologyFilter");
const clearFiltersButton = document.getElementById("clearFilters");
const projectCount = document.getElementById("projectCount");
const noProjectsMessage = document.getElementById("noProjects");
const projectCards = Array.from(document.querySelectorAll(".project-card"));

function setTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );
    themeLabel.textContent = isDark ? "Light theme" : "Dark theme";
}

setTheme(localStorage.getItem("portfolio-theme") === "dark");

themeButton.addEventListener("click", function () {
    const isDark = !document.body.classList.contains("dark-mode");
    setTheme(isDark);
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
});

function filterProjects() {
    const searchTerm = projectSearch.value.trim().toLocaleLowerCase();
    const selectedTechnology = technologyFilter.value.toLocaleLowerCase();
    let visibleCount = 0;

    projectCards.forEach(function (card) {
        const searchableText = [
            card.dataset.name,
            card.dataset.technologies,
            card.dataset.keywords,
            card.textContent
        ].join(" ").toLocaleLowerCase();
        const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
        const technologies = (card.dataset.technologies || "")
            .toLocaleLowerCase()
            .split(/\s+/);
        const matchesTechnology =
            selectedTechnology === "all" || technologies.includes(selectedTechnology);
        const isVisible = matchesSearch && matchesTechnology;

        card.hidden = !isVisible;
        visibleCount += Number(isVisible);
    });

    projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
    noProjectsMessage.hidden = visibleCount !== 0;
    clearFiltersButton.hidden = !searchTerm && selectedTechnology === "all";
}

projectSearch.addEventListener("input", filterProjects);
technologyFilter.addEventListener("change", filterProjects);
clearFiltersButton.addEventListener("click", function () {
    projectSearch.value = "";
    technologyFilter.value = "all";
    filterProjects();
    projectSearch.focus();
});

document.addEventListener("keydown", function (event) {
    if (event.key === "/" && !event.ctrlKey && !event.metaKey &&
            !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        event.preventDefault();
        projectSearch.focus();
    }
});

const year = document.getElementById("year");
year.textContent = new Date().getFullYear();
filterProjects();