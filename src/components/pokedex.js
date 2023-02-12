import { useState, useEffect } from "react"

const Pokedex = () => {
    const [pokemon, setPokemon] = useState([])
    const [search, setSearch] = useState("")
    useEffect(() => {
        const fetchPokemon = async () => {
            let pokemonList;
            const url = 'https://pokeapi.co/api/v2/pokemon?limit=15&offset=0';
            try {
                const res = await fetch(url);
                pokemonList = await res.json();
                setPokemon(pokemonList.results);
            } catch (e) {
                console.log('error: ', e)
            }
        }
        fetchPokemon()
    }, [])

    return (
        <>
            <p className="title">Pokemon!</p>
            <input id="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)}></input>
            <div className="pokedex">
            {pokemon.map((poke, i) => {
                const pokemonIndex = poke.url.split('/')[poke.url.split('/').length - 2];
                console.log(pokemonIndex)
                
                return (poke.name.includes(search.toLowerCase())? <div key={i} className="pokeCard">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`} alt={poke.name} />
                    <p>{poke.name}</p>
                </div> : <></>)
            })}
            </div>
        </>
    )
}
export default Pokedex;