const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.heightFt = convertHeightFt(pokeDetail.height);
    pokemon.heightIn = convertHeightIn(pokeDetail.height);
    pokemon.heightCm = convertHeightCm(pokeDetail.height);

    pokemon.weightLbs = convertWeightLbs(pokeDetail.weight);
    pokemon.weightKg = convertWeightKg(pokeDetail.weight);

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability


    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)

}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


function convertHeightFt(height) {
    const heightFt = Math.floor(((height * 10) / 2.54) / 12)
    return heightFt
}

function convertHeightIn(height) {
    const heightFt = convertHeightFt(height)
    const heightIn = (((height * 10) / 2.54)) - (heightFt * 12)
    return heightIn.toFixed(1).replace('.', ',')
}


function convertHeightCm(height) {
    const heightCm = height / 10
    return heightCm.toFixed(2).replace('.', ',')

}

function convertWeightLbs(weight) {
    const weightLbs = weight / 10 * 2.2046
    return weightLbs.toFixed(1).replace('.', ',')
}

function convertWeightKg(weight) {
    const weightKg = weight / 10
    return weightKg.toFixed(1).replace('.', ',')

}