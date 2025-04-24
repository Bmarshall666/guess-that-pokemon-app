import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PrevGuesses from "./components/PrevGuesses.jsx";
import SubmitButton from "./components/SubmitButton.jsx"
import TryAgainButton from "./components/TryAgainButton.jsx"

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [guessCount, setGuessCount] = useState(0);

  let RestartButton = null;

  let pokemonName = null;

  let form = (
    <form autocomplete="off" onSubmit={handleGuess}>
      <input onChange={handleChange} name="guess" type="text" value={guess} />
      <SubmitButton/>
    </form>
  );

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (guesses.some((guess) => guess.correct)) {
      setGuessCount("Win");
    }
  }, [guesses, guessCount]);

  function handleChange(event) {
    setGuess(event.target.value);
  }

  function handleGuess(event) {
    event.preventDefault();
    setGuessCount(guessCount + 1);
    const guessName = guess;
    setGuess("");
    const newGuess = {
      name: guessName,
      correct: guessName.toLowerCase() === pokemon.name.toLowerCase(),
    };

    setGuesses((prevGuesses) => [...prevGuesses, newGuess]);
  }

  if (guessCount >= 5) {
    RestartButton = (
      <TryAgainButton win={false}/>
    );
    pokemonName = (
      <h2 className="PokemonName">
        The Pokemon was {pokemon.name}! Better Luck Next Time!
      </h2>
    );
    form = <></>;
  }

  if (guesses.some((guess) => guess.correct)) {
    RestartButton = (
      <TryAgainButton win={true}/>

    );
    pokemonName = (
      <h2 className="PokemonName">
        The Pokemon was {pokemon.name}! Well Done!
      </h2>
    );
    form = <></>;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="PokemonNameContainer">
          <h1 className="PokemonName">Guess That Pokemon!</h1>
          {pokemonName}
        </div>
        <div className="imageContainer">
          <div className="PokemonImageContainer">
            <img
              className={`PokemonImage` + guessCount}
              src={pokemon.image}
              alt={pokemon.image}
            />
          </div>
        </div>
      </div>
      {form}
      <div className="UserGuessContainer">
        {guesses.map((guess, index) => {
          return (
            <PrevGuesses
              key={index}
              guess={guess.name}
              correct={guess.correct}
            />
          );
        })}
      </div>
      <div>{RestartButton}</div>
    </div>
  );
}

export default App;
