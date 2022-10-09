import React, { useState, useEffect } from "react";
import PokeCard from "../components/PokeCard";
import "./pokeMain.css";
import Axios from "axios";

const PokeMain = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadPoke, setLoadPoke] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [pokemon, setPokemon] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [pokemonName, setPokemonName] = useState({
    name: "",
    species: "",
    img: "",
    height: "",
    weight: "",
    abilities : "",
    moves: "",
    stats: ""
  });

  const getAllPokemons = async () => {
    const res = await fetch(loadPoke);
    const data = await res.json();
    setLoadPoke(data.next);

    const createPokemonObj = (result) => {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currList) => [...currList, data]);
      });
    };
    createPokemonObj(data.results);
    await console.log(allPokemons);
  };

  console.log(allPokemons, "tring to fetch all pokemons");

  useEffect(() => {
    getAllPokemons();
  }, []);

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemon({
          name: response.data.species.name,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          id: response.data.id,
          height: response.data.height,
          weight: response.data.weight,
          abilities: response.data.abilities?.map((ability)=>(
            ability
          )),
          moves: response.data.moves?.map((move)=> (
            move
          )),
          stats: response.data.stats?.map((stat)=>(
            stat
          ))
        });
      })

      .catch((err) => {
        console.log(err, "error ");
        console.log(err.response.status, "status");
        if (err.response.status === 404) {
          setErrorMsg("Please enter valid Pokemon ID, Name or Type");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
  };

  return (
    <div>
      <div className="poke__main">
        <div className="title__Section">
          <h1>PokeDex</h1>
          <input
            type="text"
            placeholder="Search your Pokemon..."
            onChange={(e) => setPokemonName(e.target.value)}
          />
          {errorMsg && <span>{errorMsg}</span>}
          <button onClick={searchPokemon}>Search Pokemon</button>
        </div>
        <div className="display__Section">
          {pokemon && (
            <PokeCard
              pokeImg={pokemon.img}
              pokeName={pokemon.name}
              pokeId={pokemon.id}
              height={pokemon.height}
              weight ={pokemon.weight}
              abilities={pokemon.abilities}
              moves={pokemon.moves}
              stats={pokemon.stats}
            />
          )}
        </div>
      </div>

      <div className="allCardsWrapper">
        <div className="singleCardWrapper">
          {allPokemons?.map((pokemon, index) => (
            <PokeCard
              pokeId={index + 1}
              pokeName={pokemon.name}
              pokeImg={pokemon.sprites.front_default}
              weight={pokemon.weight}
              height={pokemon.height}
              abilities={pokemon.abilities?.map((ability)=>(
                ability
              ))}
              moves={pokemon.moves?.map((move)=>(
                move
              ))}
              stats={pokemon.stats.map((stat)=>(
                stat
              ))}
            />
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          More Pokemons
        </button>
      </div>
    </div>
  );
};

export default PokeMain;
