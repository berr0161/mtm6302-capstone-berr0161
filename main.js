let pokemons = [];

let offset = 0;

async function getPokemon(url){
    const result = await fetch(url)
        .then((response) => response.json())
        .then((data) => data);
    return result
}

function addZero(number){
    if (number < 10){
        return `00${number}`
    } else if (number < 100) {
        return `0${number}`
    }
    return number
} 


function getPokemons(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
        .then((response) => response.json())
        .then(async(data) => {
            console.log(data.results)
            pokemons = data.results
            const main = document.getElementById('pokedex-container')
            const html = []
            for (const pokemon of pokemons){
                const detailPokemon = await getPokemon(pokemon.url)

                const types = []

                for (const type of detailPokemon.types) {
                    types.push(`<button class="pokemon-type ${type.type.name}">${type.type.name}</button>`)
                    console.log(type)
                }
                html.push(`
                    <div class="pokemons-container">
                        <div class="pokemon-image">
                            <img src="${detailPokemon.sprites.front_default}" alt="${pokemon.name}">
                        </div>
                        <h3>#${addZero(detailPokemon.id)}</h3>
                        <div class="pokemon-details">
                            <h3 class="pokemon-name">${pokemon.name}</h3>                 
                            <div class="pokemon-types">
                                ${types.join('')}
                            </div>
                        </div>
                    </div>
                `)
            }
            main.innerHTML = html.join('')
        });
}

getPokemons()
          

