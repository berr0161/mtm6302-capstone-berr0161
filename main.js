let pokemons = [];

let offset = 0;
let limit = 20;
let actualPokemon = null

async function fetchPokeApi(url){
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


function getPokemons(limitPokemon = 20, offsetPokemon = offset){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limitPokemon}&offset=${offsetPokemon}`)
        .then((response) => response.json())
        .then(async(data) => {
            pokemons = data.results
            const main = document.getElementById('pokedex-container')
            const savedPokemons = localStorage.getItem('savedPokemons')
            const savedPokemonsParse = JSON.parse(savedPokemons)
            const html = []
            for (const pokemon of pokemons){
                const detailPokemon = await fetchPokeApi(pokemon.url)

                const types = []

                for (const type of detailPokemon.types) {
                    types.push(`<span class="pokemon-type ${type.type.name}">${type.type.name}</span>`)
                }
                const caught = savedPokemonsParse.some(element => element == detailPokemon.id)
                html.push(`
                    <div class="pokemons-container">
                        <div class="pokemon-image">
                            <img style="cursor: pointer;" id="${detailPokemon.id}" src="${detailPokemon.sprites.front_default}" alt="${pokemon.name}">
                        </div>
                        <div style="width: 90%;  display: flex; align-items: center; justify-content: space-between">
                            <span class="number">#${addZero(detailPokemon.id)}</span>
                            <img id="catch::${detailPokemon.id}" style="cursor: pointer;" src="${caught ? "images/icons8-pokeball-48.png" : "images/icons8-pokeball-abierto-48.png"}"/>
                        </div>   
                        <div class="pokemon-details">
                            <h3 class="pokemon-name">${pokemon.name}</h3>                 
                            <div class="pokemon-types">
                                ${types.join('')}
                            </div>
                        </div>
                    </div>
                `)
            }
            main.innerHTML += html.join('')
            if (actualPokemon !== null) location.hash = '#' + actualPokemon
        });
}

getPokemons()

const $button = document.getElementById('button-more')
$button.addEventListener('click', () => {
    offset += 20;
    limit += 20;
    getPokemons() 
})

function innerStat(stat){
    const bars = []
    for (let i=10;i>0;i--){
       if(i<stat){
        bars.push('<span class="bar full-bar"></span>')
       } 
       else{
        bars.push('<span class="bar"></span>')
       }
   }
return bars 
}



const $pokedexContainer = document.getElementById('pokedex-container')
$pokedexContainer.addEventListener('click', function (e) {
    if(e.target.tagName === "IMG"){
        if (e.target.id.includes('catch')) {
            const id = e.target.id.split("catch::")[1]
            const savedPokemons = localStorage.getItem('savedPokemons')
            let savedPokemonsParse = JSON.parse(savedPokemons)
            if (!savedPokemons) savedPokemonsParse = [] 
            const indexSavedPokemon = savedPokemonsParse.findIndex(pokemon => pokemon === id)
            if (indexSavedPokemon >= 0) {
                e.target.src = "images/icons8-pokeball-abierto-48.png"
                savedPokemonsParse.splice(indexSavedPokemon, 1)
            } else {
                e.target.src = "images/icons8-pokeball-48.png"
                savedPokemonsParse.push(id)
            }
            localStorage.setItem("savedPokemons", JSON.stringify(savedPokemonsParse))
        }
        else{
            fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.id}`)
                .then((response) => response.json())
                .then(async(data) => {
                    actualPokemon = e.target.id
                    const $buttonContainer = document.getElementById('button-container')
                    $buttonContainer.style.display = "none"
                    $pokedexContainer.innerHTML = ""
                    const $detailPokemon = document.getElementById('detail-pokemon')
                    const pokemonSpecie = await fetchPokeApi(data.species.url)
                    const evolutionChain = await fetchPokeApi(pokemonSpecie.evolution_chain.url)
                    const babyPokemonSpecies = await fetchPokeApi(evolutionChain.chain.species.url)
                    const babyPokemon = await fetchPokeApi(`https://pokeapi.co/api/v2/pokemon/${babyPokemonSpecies.id}`)
                    const evolves = [babyPokemon];
                    async function getEvolutions(chain){
                        if (chain.evolves_to.length > 0) {
                            const pokemonSpecieEvolves = await fetchPokeApi(chain.evolves_to[0].species.url);
                            const pokemon = await fetchPokeApi(`https://pokeapi.co/api/v2/pokemon/${pokemonSpecieEvolves.id}`);
                            evolves.push(pokemon)
                            await getEvolutions(chain.evolves_to[0])
                        } 
                    }
                    await getEvolutions(evolutionChain.chain)
                    const evolvesHtml = []
                    evolves.forEach((evolve, index) => {
                        const typesEvolve = []

                        for (const type of evolve.types) {
                            typesEvolve.push(`<span class="pokemon-type ${type.type.name}">${type.type.name}</span>`)
                        }
                        evolvesHtml.push(`<div class="pokemons-container">
                            <div class="pokemon-image">
                                <img src="${evolve.sprites.front_default}"
                                    alt="${evolve.name}">
                                ${ (evolves.length - 1) > index ? `<i class="${evolves.length === 2 ? 'two-evolutions' : ''} arrow fa-solid fa-circle-arrow-right"></i>` : "" }
                            </div>
                            <span class="number">#${addZero(evolve.id)}</span>
                            <div class="pokemon-details">
                                <h3 class="pokemon-name">${evolve.name}</h3>
                                <div class="pokemon-types">
                                    ${typesEvolve.join('')}
                                </div>
                            </div>
                        </div>`)
                    })

                    const detailTypes = []
                    const types = []
                    for (const type of data.types) {
                        const detailType = await fetchPokeApi(type.type.url)
                        detailTypes.push(detailType)
                        types.push(`<span class="pokemon-type ${type.type.name}">${type.type.name}</span>`)
                    }
                    const fullBars = []
                    for (const stat of data.stats) {
                        const refStat = (10 / 150) * stat.base_stat;
                        const bars = []
                        for (let i = 10; i > 0; i--){
                            if(i < refStat){
                                bars.push('<span class="bar full-bar"></span>')
                            } 
                            else{
                                bars.push('<span class="bar"></span>')
                            }
                        }
                        fullBars.push(`
                            <div>
                                <div class="bars">
                                ${bars.join('')}
                                </div>
                                <p>${stat.stat.name}</p>
                            </div>
                        `)
                    }

                    const weaknesses = [];
                    const completeWeaknesess = [];
                    for (const detailType of detailTypes) {
                        for (const weakness of detailType.damage_relations.double_damage_from) {
                            const validateNoDamage = detailTypes.some((element) => element.damage_relations.no_damage_from.some((e) => e.name === weakness.name))
                            const validateHalfDamage = detailTypes.some((element) => element.damage_relations.half_damage_from.some((e) => e.name === weakness.name))
                            const validateDoubleWeakness = completeWeaknesess.some(element => element.name === weakness.name)
                            if (!validateNoDamage && !validateHalfDamage && !validateDoubleWeakness){
                                weaknesses.push(`<span class="pokemon-type ${weakness.name}">${weakness.name}</span>`)
                                completeWeaknesess.push(weakness)
                            }
                        }
                        
                    }

                    $detailPokemon.innerHTML =
                    `<div class="specific">
                    <button id="back" style="position: absolute; top: 0; right: 100%;padding: 4px 8px;">Back</button>
                            <img class="image" src="${data.sprites.front_default}"
                                alt="${data.name}">
                            <h3 class="name">${data.name} #${addZero(data.id)}</h3>
                        </div>
                
                        <p class="description">${pokemonSpecie.flavor_text_entries[0].flavor_text}</p>
                
                
                        <!--POKEMON INFORMATION-->
                        <div class="info">
                
                            <div class="info-detail">
                                <p class="label">Height:</p>
                                <p class="value">${data.height}</p>
                            </div>
                
                            <div class="info-detail">
                                <p class="label">Gender:</p>
                                <p class="value">♀ ♂</p>
                            </div>
                
                            <div class="info-detail">
                                <p class="label">Category:</p>
                                <p class="value">${pokemonSpecie.egg_groups[0].name} </p>
                            </div>
                
                            <div class="info-detail">
                                <p class="label">Abilities</p>
                                <p class="value">${data.abilities[0].ability.name}</p>
                            </div>
                
                        </div>
                
                        <!--TYPE AND WEAKNESESS-->
                        <div class="info-2">
                            <div>
                                <p>Type:</p>
                                <div>
                                    ${types.join('')}
                                </div>
                            </div>
                
                            <div>
                                <p>Weaknesses</p>
                                <div class="weaknesses">
                                ${weaknesses.filter((e, index) => index < 4).join('')}
                                </div>
                            </div>
                
                        </div>
                
                        <!-- STATISTICS -->
                        <div id="stats" class="stats">
                            ${fullBars.join('')}
                        </div>
                
                
                
                
                
                
                        <!-- EVOLUTIONS-->
                
                        <div class="evolutions">
                            <h3>Evolutions</h3>
                            <!--BULBASAUR-->
                            <div class="contain-evolutions">
                                ${evolvesHtml.join('')}
                            </div>
                
                        </div>
                    `
                    const $back = document.getElementById('back')
                    $back.addEventListener('click', () => {
                        $detailPokemon.innerHTML = ''
                        $buttonContainer.style.display = "flex"
                        getPokemons(limit, 0)
                    })   
                })
        }
    } 
})

