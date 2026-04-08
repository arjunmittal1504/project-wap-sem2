const weatherData = [
  { id: 1, city: "Mumbai", condition: "Rain", temp: 29, favorite: false },
  { id: 2, city: "Delhi", condition: "Clear", temp: 34, favorite: false },
  { id: 3, city: "London", condition: "Clouds", temp: 18, favorite: false },
  { id: 4, city: "Tokyo", condition: "Clear", temp: 23, favorite: false },
  { id: 5, city: "Dubai", condition: "Clear", temp: 38, favorite: false },
];

if (typeof document !== "undefined") {
  const cards = document.getElementById("cards");
  const search = document.getElementById("search");
  const filter = document.getElementById("filter");
  const sort = document.getElementById("sort");
  const info = document.getElementById("info");
  const themeBtn = document.getElementById("themeBtn");

  let data = [...weatherData];

  function showData() {
    let result = data.filter((item) =>
      item.city.toLowerCase().includes(search.value.toLowerCase())
    );

    result = result.filter((item) =>
      filter.value === "all" ? true : item.condition === filter.value
    );

    result = result.sort((a, b) => {
      if (sort.value === "asc") return a.temp - b.temp;
      if (sort.value === "desc") return b.temp - a.temp;
      if (sort.value === "name") return a.city.localeCompare(b.city);
      return a.id - b.id;
    });

    info.textContent =
      "Cities: " +
      result.length +
      " | Favorites: " +
      data.filter((item) => item.favorite).length;

    cards.innerHTML = result
      .map(
        (item) => `
        <div class="card">
          <h3>${item.city}</h3>
          <p>Condition: ${item.condition}</p>
          <p>Temperature: ${item.temp}°C</p>
          <button class="fav" data-id="${item.id}">
            ${item.favorite ? "Favorited" : "Favorite"}
          </button>
        </div>
      `
      )
      .join("");

    document.querySelectorAll(".fav").forEach((button) => {
      button.addEventListener("click", () => {
        const id = Number(button.dataset.id);
        data = data.map((item) =>
          item.id === id ? { ...item, favorite: !item.favorite } : item
        );
        showData();
      });
    });
  }

  search.addEventListener("input", showData);
  filter.addEventListener("change", showData);
  sort.addEventListener("change", showData);

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.textContent = document.body.classList.contains("dark")
      ? "Light Mode"
      : "Dark Mode";
  });

  showData();
} else {
  console.log("Open index.html in your browser.");
}
