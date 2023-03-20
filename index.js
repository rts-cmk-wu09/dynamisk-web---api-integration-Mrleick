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

  fetch(pokemon.url)
    .then((response) => response.json())
    .then((data) => {
      const stats = data.stats
        .map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
        .join("");
      div.innerHTML = `
        <p class="pokemon-card__title">${pokemon.name}</p>
        <div class="pokeball">
        <img class="sprites" src="${data.sprites.front_default}" alt="${pokemon.name}">
        </div>
        <ul class="pokemon-card__list">${stats}</ul>
      `;
    });
  return div
}

// min funktion der fetcher mine pokemons.
function fetchPokemonList() {
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {
      pokemonList.innerHTML = "";

      data.results.forEach((pokemon) => {
        const div = createPokemonDiv(pokemon);
        pokemonList.appendChild(div);
      });
    });
}


// mine next og prev knapper.
prevBtn.addEventListener("click", () => {
  if (offset >= limit) {
    offset -= limit;
    fetchPokemonList();
  }
});

nextBtn.addEventListener("click", () => {
  offset += limit;
  fetchPokemonList();
});

fetchPokemonList();

// tilføjer mit billede til min header.
const img = document.createElement("img");
img.src = "images/logo.svg";
header.appendChild(img);
