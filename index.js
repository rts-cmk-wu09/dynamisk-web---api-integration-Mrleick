const pokemonList = document.getElementById("pokemon-list");

fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.results.forEach((pokemon) => {
            const div = document.createElement("div"); // laver en div for hver pokemon
            fetch(pokemon.url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    div.innerHTML = `
                    <p>${pokemon.name}</p>
                    <img class="sprites" src="${data.sprites.front_default}" alt="${pokemon.name}">
                    `;
                });
            pokemonList.appendChild(div); // tilføjer vores div til vores pokemon liste
        });
    });

const header = document.getElementsByTagName("header")[0];
const img = document.createElement("img");
img.src = "images/logo.svg";
header.appendChild(img);