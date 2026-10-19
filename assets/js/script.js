const pokemonSection = document.querySelector(".pokemon_display"); // Div with the Pokemon list
const searchInput = document.querySelector("#pokemon_search"); // Search input tag

const apiURL = "https://draigarial.eu.org/pkmnsave.php";

let pokemonlist = []; // To fetch once, filter many times

// Fetch API data once, stores on pokemonlist
async function getPokemon() {
    const res = await fetch(apiURL); 
    const pokemonlist = await res.json(); 
    return pokemonlist;
}

// Compares pokemonlist data to search input, populates only matching instances
function renderPokemon(searchTerm = "") {
    let filteredPokemon = pokemonlist.filter((pokemon) => {
        let nickname = (pokemon.pkss_nickname || "").toLowerCase();
        let species = (pokemon.pk_species_name || "").toLowerCase();
        let search = searchTerm.toLowerCase().trim();
        return nickname.includes(search) || species.includes(search);
    });

    let template = "";
    filteredPokemon.forEach((pokemon) => {
        let dexnumber = `${pokemon.pkss_species_id}`;
        template += `
            <div class="pokemon_card card card-sleek">
                <div class="card-body">
                    <img src="assets/images/pokemon/${dexnumber.toString().padStart(3,'0')}.png"/>
                    <h3 class="card-title">${pokemon.pkss_nickname}</h3>
                    <p class="card-text">${pokemon.pk_species_name}</p>
                    <p class="card-text">HP EV: ${pokemon.pkss_hp_ev}</p>
                    <p class="card-text">Attack EV: ${pokemon.pkss_attack_ev}</p>
                    <p class="card-text">Defense EV: ${pokemon.pkss_defense_ev}</p>
                    <p class="card-text">Speed EV: ${pokemon.pkss_speed_ev}</p>
                    <p class="card-text">SP Attack EV: ${pokemon.pkss_spattack_ev}</p>
                    <p class="card-text">SP Defense EV: ${pokemon.pkss_spdefense_ev}</p>

                    <p class="card-text">HP IV: ${pokemon.pkss_hp_iv}</p>
                    <p class="card-text">Attack IV: ${pokemon.pkss_attack_iv}</p>
                    <p class="card-text">Defense IV: ${pokemon.pkss_defense_iv}</p>
                    <p class="card-text">Speed IV: ${pokemon.pkss_speed_iv}</p>
                    <p class="card-text">SP Attack IV: ${pokemon.pkss_spattack_iv}</p>
                    <p class="card-text">SP Defense IV: ${pokemon.pkss_spdefense_iv}</p>
                </div>
            </div>
        `;
    });

    pokemonSection.innerHTML = template;
}

// Fetches once, renders the first time
async function initPokemon() {
  pokemonlist = await getPokemon();
  renderPokemon();
}

// Updates Pokemon list after search input change
searchInput.addEventListener("input", () => {
    renderPokemon(searchInput.value);
});

initPokemon();
