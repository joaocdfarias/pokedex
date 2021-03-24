const fetchPokemon = () => {
  const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

  const pokemonPromises = [];

  for (let i = 1; i <= 150; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then((response) => response.json())
    );
  }

  Promise.all(pokemonPromises).then((pokemons) => {
    const liPokemon = pokemons.reduce((acc, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
      acc += `<li class="${types[0]}">
        <img class="card-image" src="https://pokeres.bastionbot.org/images/pokemon/${
          pokemon.id
        }.png" />
        <h2>${pokemon.name}</h2>
        <p>${types.join(" | ")}</p>
      </li>`;
      return acc;
    }, "");

    const ul = document.querySelector(".pokemon-ul");
    ul.innerHTML = liPokemon;
  });
};

fetchPokemon();
