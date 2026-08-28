document.addEventListener("DOMContentLoaded", () => {
	const themeStorageKey = "page-theme";
	const themeOptions = new Set(["dark", "light", "auto"]);
	const themeLinks = document.querySelectorAll("[data-theme]");
	const rootElement = document.documentElement;
	const themeToggle = document.querySelector("#theme-toggle");
	const themeIcons = {
		dark: "./assets/mode_night_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",
		light: "./assets/light_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",
		auto: "./assets/contrast_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",
	};

	function applyTheme(theme) {
		const selectedTheme = themeOptions.has(theme) ? theme : "auto";

		rootElement.dataset.theme = selectedTheme;
		localStorage.setItem(themeStorageKey, selectedTheme);
		themeToggle.innerHTML = `<img src="${themeIcons[selectedTheme]}" alt="${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} Mode" /> ${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} Mode`;
	}

	const savedTheme = localStorage.getItem(themeStorageKey) || "auto";
	applyTheme(savedTheme);

	themeLinks.forEach((themeLink) => {
		themeLink.addEventListener("click", (event) => {
			event.preventDefault();
			applyTheme(themeLink.dataset.theme);
		});
	});
});