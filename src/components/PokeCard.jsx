import { useState } from "react";
import PokePopup from "./PokePopup";
import "./singlePoke.css";

const SinglePoke = ({ pokeName, pokeImg, pokeId, weight, height, abilities, stats, moves }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const modifiedName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
  const openPokePopup = () => {
    console.log("hello world");
    setOpenPopup(true);
  };

  return (
    <div>
        {openPopup ? <PokePopup pokeImg={pokeImg} pokeName={modifiedName} pokeId={pokeId} height={height} weight={weight} abilities={abilities} moves={moves} stats={stats} setOpenPopup={setOpenPopup}/> : null}
      <div className="singlePoke__main" onClick={openPokePopup}>
        <img className="pokeImg" src={pokeImg} height="100px" alt={pokeName} />
        <div className="singlePoke__info">
          <p className="pokeInfo__main">{modifiedName}</p>
          <span>#{pokeId}</span>
        </div>
      </div>
    </div>
  );
};

export default SinglePoke;
