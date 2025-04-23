import "./PrevGuesses.css"

const Guesses = (props) =>{

    const correct = props.correct ? "GuessContainer-correct" : "GuessContainer-incorrect"

    return(
      <div className={correct}>
        <p className="userGuess">{props.guess}</p>
      </div>
    )
  }

  export default Guesses;