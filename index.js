import axios from "./node_modules/axios/dist/esm/axios.js";

// Mine variabler og værdier
const pokemonList = document.getElementById("pokemon-list");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
// tager fat i min første header fordi vi kan have flere headers på siden.
const header = document.getElementsByTagName("header")[0];
const limit = 10;
let offset = 10;

function createPokemonDiv(pokemon) {
  const div = document.createElement("div");
  div.classList.add("pokemon-card");
  div.addEventListener("click", () => {
    localStorage.setItem(pokemon.name, JSON.stringify(pokemon));
    window.location.href = `pokemon-details.html?name=${pokemon.name}`;
  });

  axios.get(pokemon.url)
    .then(res => {
      const stats = res.data.stats
        .map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
        .join("");
      div.innerHTML = `
        <p class="pokemon-card__title">${pokemon.name}</p>
        <div class="pokeball">
        <img class="sprites" src="${res.data.sprites.front_default}" alt="${pokemon.name}">
        </div>
        <ul class="pokemon-card__list">${stats}</ul>
      `;
    });
  return div
}

// min funktion der fetcher mine pokemons.
function fetchPokemonList() {
  axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then(res => {
      pokemonList.innerHTML = "";
      res.data.results.forEach((pokemon) => {
        const div = createPokemonDiv(pokemon);
        pokemonList.appendChild(div);
      });
    });
}

// min prev button
prevBtn.addEventListener("click", () => {
  if (offset >= limit) {
    offset -= limit;
    fetchPokemonList();
  }
});
// min next button
nextBtn.addEventListener("click", () => {
  offset += limit;
  fetchPokemonList();
});

fetchPokemonList();

// tilføjer mit billede til min header.
const img = document.createElement("img");
img.src = "images/logo.svg";
header.appendChild(img);
