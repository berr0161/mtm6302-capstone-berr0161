let pokemons = [];

let offset = 0;

async function getPokemon(url){
    const result = await fetch(url)
        .then((response) => response.json())
        .then((data) => data);
    return result
}



function getPokemons(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
        .then((response) => response.json())
        .then(async(data) => {
            console.log(data.results)
            pokemons = data.results
            const main = document.getElementById('main')
            const html = []
            for (const pokemon of pokemons){
                const detailPokemon = await getPokemon(pokemon.url)

                const types = []

                for (const type of detailPokemon.types) {
                    types.push(`<span class="type">${type.type.name}</span>`)
                    console.log(type)
                }
                html.push(`
                    <div>
                        <p>${pokemon.name}</p>                    
                        <img src="${detailPokemon.sprites.front_default}"/> 
                        ${types.join('')}
                    </div>
                `)
            }
            main.innerHTML = html.join('')
        });
}

//getPokemons()
          