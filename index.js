const pokemonList = document.getElementById("pokemon-list");

fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.results.forEach((pokemon) => {
            const div = document.createElement("div");
            div.classList.add("pokemon-card");

            // Add event listener to the Pokemon div
            div.addEventListener("click", () => {
                // Save the Pokemon's data to local storage
                localStorage.setItem(pokemon.name, JSON.stringify(pokemon));
                
                // Redirect to Pokemon details page
                window.location.href = `pokemon-details.html?name=${pokemon.name}`;
            });

            fetch(pokemon.url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const stats = data.stats.map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("");
                    div.innerHTML = `
                    <p class="pokemon-card__title">${pokemon.name}</p>
                    <img class="sprites" src="${data.sprites.front_default}" alt="${pokemon.name}">
                    <ul class="pokemon-card__list">${stats}</ul>
                    `;
                });
            pokemonList.appendChild(div);
        });
    });

const header = document.getElementsByTagName("header")[0];
const img = document.createElement("img");
img.src = "images/logo.svg";
header.appendChild(img);
