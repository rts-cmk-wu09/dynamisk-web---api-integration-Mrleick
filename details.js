import axios from "./node_modules/axios/dist/esm/axios.js";

const pokemonName = new URLSearchParams(window.location.search).get("name");
const pokemon = JSON.parse(localStorage.getItem(pokemonName));

const pokemonDetails = document.getElementById("pokemon-details");

// Make an API request to get the details of the Pokemon
axios.get(pokemon.url)
.then(res => {
        // Update the HTML with the details of the Pokemon
        pokemonDetails.innerHTML = `
            <h1>${pokemon.name}</h1>
            <img src="${res.data.sprites.front_default}" alt="${pokemon.name}">
            <ul>
                <li>Weight: ${res.data.weight}</li>
                <li>Height: ${res.data.height}</li>
                <li>Base Experience: ${res.data.base_experience}</li>
            </ul>
        `;
    })
    .catch(error => {
        console.error(error);
        pokemonDetails.innerHTML = "<p>An error occurred while fetching the Pokemon details</p>";
    });
