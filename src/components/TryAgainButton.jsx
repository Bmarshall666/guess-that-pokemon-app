import React from 'react';
import "./TryAgainButton.css"

const TryAgainButton = (props) => {

    let gameOverMsg = ""

    if (props.win) {
        gameOverMsg = "You Win! Try Again?"
    } else {
        gameOverMsg = "You Loose! Try Again?"
    }

    return (
        <div className='btnContaier'>
            <button onClick={() => window.location.reload()} className="btn">
                <span className="back" />
                <span className="front" />
            </button>
            <p clasName="texbtnTextt">{gameOverMsg}</p>
        </div>


    );
}


export default TryAgainButton;
