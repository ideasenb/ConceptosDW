var toggle = document.getElementById("container");
var body = document.querySelector("body");
var storageKey = "themeMode";

function applyTheme(isDark) {
  toggle.classList.toggle("active", isDark);
  body.classList.toggle("active", isDark);
  localStorage.setItem(storageKey, isDark ? "dark" : "light");
}

toggle.onclick = function () {
  var isDark = !body.classList.contains("active");
  applyTheme(isDark);
};

var savedTheme = localStorage.getItem(storageKey);
if (savedTheme === "dark") {
  applyTheme(true);
}