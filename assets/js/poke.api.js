const pokeApi = {};

function convertPokeApiDetailToPokemon(pokemonDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetail.id;
    pokemon.name = pokemonDetail.name;

    // array com o nome de todos os tipos em ordem
    const types = pokemonDetail.types.map(typeSlot => typeSlot.type.name);
    const [ type ] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;

    return pokemon;
}
pokeApi.getPokemonDetail = async (pokemon) => {
    const response = await fetch(pokemon.url);
    return convertPokeApiDetailToPokemon(await response.json());
}

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    try {
        const response = await fetch(url);
        const jsonBody = await response.json();
        const pokemons = jsonBody.results;

        const pokemonPromiseList = await pokemons.map(pokeApi.getPokemonDetail)

        const pokemonDetails = await Promise.all(pokemonPromiseList);

        return pokemonDetails;

    } catch (err) {
        console.error(err);
        return 0;
    }
}