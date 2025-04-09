//You can edit ALL of the code here

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const episodeCount = document.getElementById("episode-count");
  const root = document.getElementById("root");
  const selectDropdown = document.createElement("select");
  selectDropdown.id = "episodeSelect";
  document.body.insertBefore(selectDropdown, root);

  let episodes = []; // Will be populated by fetched data

  function formatEpisodeCode(season, number) {
    return `S${String(season).padStart(2, "0")}E${String(number).padStart(2, "0")}`;
  }

  function showLoading() {
    root.innerHTML = "<p>Loading episodes, please wait...</p>";
  }

  function showError(message) {
    root.innerHTML = `<p style="color: red;">${message}</p>`;
  }

  function displayEpisodes(filteredEpisodes) {
    root.innerHTML = "";
    filteredEpisodes.forEach((episode) => {
      const episodeElement = document.createElement("div");
      episodeElement.id = `episode-${episode.id}`;
      episodeElement.innerHTML = `<h2>${episode.name} (${formatEpisodeCode(
        episode.season,
        episode.number
      )})</h2>
       <img src="${
         episode.image ? episode.image.medium : "placeholder.jpg"
       }" alt="${episode.name}">
       <p>${episode.summary}</p>`;
      root.appendChild(episodeElement);
    });
    episodeCount.textContent = `Episodes found: ${filteredEpisodes.length}`;
  }

  function populateDropdown() {
    selectDropdown.innerHTML = "<option value=''>Select an Episode</option>";
    episodes.forEach((episode) => {
      const option = document.createElement("option");
      option.value = `episode-${episode.id}`;
      option.textContent = `${formatEpisodeCode(
        episode.season,
        episode.number
      )} - ${episode.name}`;
      selectDropdown.appendChild(option);
    });
  }

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredEpisodes = episodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(searchTerm) ||
        episode.summary.toLowerCase().includes(searchTerm)
    );
    displayEpisodes(filteredEpisodes);
  });

  selectDropdown.addEventListener("change", function () {
    if (this.value) {
      document
        .getElementById(this.value)
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  function fetchEpisodes() {
    showLoading();
    fetch("https://api.tvmaze.com/shows/82/episodes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        episodes = data;
        displayEpisodes(episodes);
        populateDropdown();
      })
      .catch((error) => {
        showError("Sorry, something went wrong while loading episodes. Please try again later.");
      });
  }

  fetchEpisodes();
});
