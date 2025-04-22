import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import PrevGuesses from "./PrevGuesses.jsx";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const GuessRef = useRef("");

  useEffect(()=>{
    let pokeID = Math.floor(Math.random() * 152);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
      .then((response) => {
        const result = {
          name: response.data.name,
          image: response.data.sprites["front_default"],
          type: response.data.types.map((type) => type.type.name).join(", "),
          id: response.data.id,
        };
        setPokemon(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  },[])

  function Guess(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const guess = formData.get("guess");

    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      alert("correct");
      console.log("correct");
    }else{
      alert("wrong");

      console.log("wrong");

    }
  }


  return (
    <div className="App">
      <div className="container">
        <div className="PokemonNameContainer">
          <h1 className="PokemonName">{pokemon.name}</h1>
        </div>
        <div className="PokemonImageContainer">
          <img className="PokemonImage" src={pokemon.image} alt={pokemon.image} />
        </div>
        <form onSubmit={Guess}>
          <input name="guess" type="text"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
