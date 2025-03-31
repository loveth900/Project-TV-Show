//You can edit ALL of the code here
/*function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;*/

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  // Iterate through each episode and create HTML elements
  episodeList.forEach(episode => {
    const episodeContainer = document.createElement("div");
    episodeContainer.classList.add("episode");

    // Episode code (e.g., S01E01)
    const episodeCode = `S${String(episode.season).padStart(2, '0')}E${String(episode.number).padStart(2, '0')}`;

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


