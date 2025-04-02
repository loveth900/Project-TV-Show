//You can edit ALL of the code here
document.addEventListener("DOMContentLoaded", function () {
  const episodes = getAllEpisodes();
  const searchInput = document.getElementById("searchInput");
  const episodeCount = document.getElementById("episode-count");
  const root = document.getElementById("root");
  const selectDropdown = document.createElement("select");
  selectDropdown.id = "episodeSelect";
  document.body.insertBefore(selectDropdown, root);

  function formatEpisodeCode(season, number) {
    return `S${String(season).padStart(
      2,
      "0"
    )}E${String(number).padStart(2, "0")}`;
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

  displayEpisodes(episodes);
  populateDropdown();
});

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  // Iterate through each episode and create HTML elements
  episodeList.forEach((episode) => {
    const episodeContainer = document.createElement("div");
    episodeContainer.classList.add("episode");

    // Episode code (e.g., S01E01)
    const episodeCode = `S${String(episode.season).padStart(2, "0")}E${String(
      episode.number
    ).padStart(2, "0")}`;

    // Episode name
    const episodeName = document.createElement("h2");
    episodeName.textContent = episode.name;

    // Episode code
    const episodeCodeElem = document.createElement("p");
    episodeCodeElem.textContent = `Episode Code: ${episodeCode}`;

    // Episode image
    const episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeImage.alt = episode.name;

    // Episode summary
    const episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;

    // Append elements to the episode container
    episodeContainer.appendChild(episodeName);
    episodeContainer.appendChild(episodeCodeElem);
    episodeContainer.appendChild(episodeImage);
    episodeContainer.appendChild(episodeSummary);

    // Append the episode container to the root element
    rootElem.appendChild(episodeContainer);
  });

  // Add a footer with the source attribution
  const footer = document.createElement("footer");
  const attribution = document.createElement("p");
  attribution.innerHTML = `Data sourced from <a href="https://www.tvmaze.com/">TVMaze.com</a>.`;
  footer.appendChild(attribution);
  rootElem.appendChild(footer);
}

window.onload = setup;
