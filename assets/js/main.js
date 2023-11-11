const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 5;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="about">
                <span class="about-content">About</span>
                <ol class="attributes">
                    <li class="attribute"><span class="attribute-name">Height</span><span>${pokemon.heightFt}'${pokemon.heightIn}" (${pokemon.heightCm} cm)</span></li>
                    <li class="attribute"><span class="attribute-name">Weight</span><span>${pokemon.weightLbs} (${pokemon.weightKg} kg)</span></li>
                    <li class="attribute"><span class="attribute-name">Abilities</span>${pokemon.abilities.map((ability) => `<span class="ability ${ability}">${ability}</span>`).join('|')}</li>
                    
                </ol>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
