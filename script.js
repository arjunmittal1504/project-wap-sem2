const apiUrl = "https://api.openweathermap.org";
const data=fetch(apiUrl)

if (typeof document !== "undefined") {
  const showLinkBtn = document.getElementById("showLinkBtn");
  const output = document.getElementById("output");

  if (showLinkBtn && output) {
    showLinkBtn.addEventListener("click", () => {
      output.textContent = `API Link: ${apiUrl}`;
    });
  }
} else {
  console.log(`API Link: ${apiUrl}`);
}
