
//You can edit ALL of the code here


document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const episodeCount = document.getElementById("episode-count");
  const root = document.getElementById("root");


  const episodeSelect = document.createElement("select");
  episodeSelect.id = "episodeSelect";
  document.body.insertBefore(episodeSelect, root);

  const showSelect = document.createElement("select");
  showSelect.id = "showSelect";
  document.body.insertBefore(showSelect, episodeSelect);

  let episodes = [];
  const episodesCache = {};
  const showsCache = [];


  let allShows = [];
  let episodesCache = {};
  let currentEpisodes = [];

  // Create and insert show and episode dropdowns
  const showSelect = document.createElement("select");
  showSelect.id = "showSelect";
  const episodeSelect = document.createElement("select");
  episodeSelect.id = "episodeSelect";
  document.body.insertBefore(showSelect, root);
  document.body.insertBefore(episodeSelect, root);

  // Format episode code like S01E01
  function formatEpisodeCode(season, number) {
    return `S${String(season).padStart(2, "0")}E${String(number).padStart(2, "0")}`;
  }

  function showLoading() {
    root.innerHTML = "<p>Loading episodes, please wait...</p>";
  }

  function showError(message) {
    root.innerHTML = `<p style="color: red;">${message}</p>`;
  }


  // Display episodes
  function displayEpisodes(filteredEpisodes) {
    root.innerHTML = "";

  // Display episodes on the page
  function displayEpisodes(filteredEpisodes) {
    root.innerHTML = ""; // Clear root container

    filteredEpisodes.forEach((episode) => {
      const episodeElement = document.createElement("div");
      episodeElement.id = `episode-${episode.id}`;
      episodeElement.innerHTML = `
        <h2>${episode.name} (${formatEpisodeCode(episode.season, episode.number)})</h2>
        <img src="${episode.image ? episode.image.medium : "placeholder.jpg"}" alt="${episode.name}">
        <p>${episode.summary}</p>
      `;
      root.appendChild(episodeElement);
    });
    episodeCount.textContent = `Episodes found: ${filteredEpisodes.length}`;
  }


  function populateEpisodeDropdown() {
    episodeSelect.innerHTML = "<option value=''>Select an Episode</option>";
    episodes.forEach((episode) => {

  // Populate episode selector
  function populateEpisodeDropdown() {
    episodeSelect.innerHTML = "<option value=''>Select an Episode</option>";
    currentEpisodes.forEach((episode) => {

      const option = document.createElement("option");
      option.value = `episode-${episode.id}`;
      option.textContent = `${formatEpisodeCode(episode.season, episode.number)} - ${episode.name}`;
      episodeSelect.appendChild(option);
    });
  }


  function filterEpisodes() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = episodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(searchTerm) ||
        episode.summary.toLowerCase().includes(searchTerm)
    );
    displayEpisodes(filtered);
  }

  // Populate shows dropdown
  function fetchAndPopulateShows() {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((shows) => {
        showsCache.push(...shows);
        shows.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        showSelect.innerHTML = "<option value=''>Select a Show</option>";
        shows.forEach((show) => {
          const option = document.createElement("option");
          option.value = show.id;
          option.textContent = show.name;
          showSelect.appendChild(option);
        });
      })
      .catch(() => showError("Failed to load shows list."));
  }

  // Fetch episodes for selected show, use cache if available
  function fetchEpisodesForShow(showId) {
    if (episodesCache[showId]) {
      episodes = episodesCache[showId];
      displayEpisodes(episodes);
      populateEpisodeDropdown();
    } else {
      showLoading();
      fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
        .then((res) => res.json())
        .then((data) => {
          episodesCache[showId] = data;
          episodes = data;
          displayEpisodes(episodes);
          populateEpisodeDropdown();
        })
        .catch(() => showError("Could not load episodes for this show."));
    }
  }

  // Scroll to episode
  episodeSelect.addEventListener("change", function () {
    const selectedId = this.value;
    if (selectedId) {
      const element = document.getElementById(selectedId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }

  // Fetch and populate all shows alphabetically
  function fetchAllShows() {
    fetch("https://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((data) => {
        allShows = data.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        populateShowDropdown();
      })
      .catch(() => {
        showError("Failed to load shows. Please refresh the page.");
      });
  }

  function populateShowDropdown() {
    showSelect.innerHTML = "<option value=''>Select a Show</option>";
    allShows.forEach((show) => {
      const option = document.createElement("option");
      option.value = show.id;
      option.textContent = show.name;
      showSelect.appendChild(option);
    });
  }

  // Fetch episodes for a show, with caching
  function fetchEpisodesForShow(showId) {
    if (episodesCache[showId]) {
      currentEpisodes = episodesCache[showId];
      displayEpisodes(currentEpisodes);
      populateEpisodeDropdown();
      return;

    }


  // Show selector change
  showSelect.addEventListener("change", function () {
    const selectedShowId = this.value;
    if (selectedShowId) {
      fetchEpisodesForShow(selectedShowId);
    } else {
      root.innerHTML = "<p>Please select a show to view episodes.</p>";
      episodeSelect.innerHTML = "";
      episodeCount.textContent = "";
    }
  });

  // Search input
  searchInput.addEventListener("input", filterEpisodes);

  // Initial load
  fetchAndPopulateShows();

    showLoading();
    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then((response) => response.json())
      .then((data) => {
        episodesCache[showId] = data;
        currentEpisodes = data;
        displayEpisodes(currentEpisodes);
        populateEpisodeDropdown();
      })
      .catch(() => {
        showError("Failed to load episodes. Please try again later.");
      });
  }

  // Show selection handler
  showSelect.addEventListener("change", function () {
    const selectedShowId = this.value;
    searchInput.value = ""; // Reset search input
    if (selectedShowId) {
      fetchEpisodesForShow(selectedShowId);
    } else {
      root.innerHTML = "";
      episodeSelect.innerHTML = "";
      episodeCount.textContent = "";
    }
  });

  // Search filter
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = currentEpisodes.filter(
      (ep) =>
        ep.name.toLowerCase().includes(searchTerm) ||
        (ep.summary && ep.summary.toLowerCase().includes(searchTerm))
    );
    displayEpisodes(filtered);
  });

  // Episode selector scroll
  episodeSelect.addEventListener("change", function () {
    const id = this.value;
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  // Initial fetch
  fetchAllShows();
});
