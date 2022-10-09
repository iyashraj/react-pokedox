import React, { useEffect, useState } from "react";
import "./pokeSearch.css";
import Axios from "axios";
import PokeCard from "../components/PokeCard";
import PokeMain from "./PokeMain";

const PokeSearch = () => {
  const [pokemon, setPokemon] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [pokemonName, setPokemonName] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });


  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) =>{
        setPokemon({
          name: response.data.species.name,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
          id: response.data.id
        })
      }
    )
  
    .catch(err=> {
      console.log(err, "error ")
      console.log(err.response.status, "status")
      if(err.response.status === 404){
        setErrorMsg("Please enter valid Pokemon ID, Name or Type")
        setTimeout(()=>{
          window.location.reload()
        }, 3000)
      } 
    })
  };


  return (
    <div className="poke__main">
      <div className="title__Section">
        <h1>PokeDex</h1>
        <input type="text" placeholder="Search your Pokemon..." onChange={(e) => setPokemonName(e.target.value)} />
        {errorMsg && <span>{errorMsg}</span> }
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="display__Section">
        {pokemon && <PokeCard pokeImg={pokemon.img} pokeName={pokemon.name} pokeId={pokemon.id}/>}    
      </div>
      <PokeMain />
    </div>
  );
};

export default PokeSearch;
