import React from "react";
import { ImCross } from "react-icons/im";
import "./pokePopup.css";

const PokePopup = ({
  pokeName,
  pokeImg,
  pokeId,
  weight,
  height,
  abilities,
  stats,
  moves,
  setOpenPopup,
}) => {
  console.log(stats, moves);

  return (
    <div className="popupMain">
      <div className="popupContainer">
        <span
          className="modelCloseBtn"
          onClick={() => {
            setOpenPopup(false);
          }}
        >
          <ImCross />
        </span>
        <h2>{pokeName}</h2>
        <img src={pokeImg} alt={pokeName} />
        <p>
          <span className="headerItemtitle">
            Height:{" "}
          </span>
          {height}
        </p>
        <p>
          <span className="headerItemtitle">
            Weight:{" "}
          </span>
          {weight}
        </p>
        <p className="descWrapper">
          <span className="headerItemtitle">
            Abilities:
          </span>
          {abilities?.map((ability) => (
            <span>{ability.ability.name},</span>
          ))}
        </p>
        <p className="descWrapper">
          <span className="headerItemtitle">
            Stats:{" "}
          </span>
          {stats?.map((stat) => (
            <span>{stat?.stat?.name},</span>
          ))}
        </p>
        <p className="descWrapper">
          <span className="headerItemtitle">
            Moves:
          </span>
          {moves?.map((move) => (
            <span>{move?.move?.name},</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default PokePopup;
