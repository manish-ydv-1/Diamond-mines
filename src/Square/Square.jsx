import './Square.css';
import hoverEffect from '../assets/Sound/hover.wav';
import DiamondEffect from '../assets/Sound/gold.wav';
import goldIcon from '../assets/04.png';
import bombIcon from '../assets/bomb.png';
import blast from '../assets/blast.gif'
import { useEffect, useState } from 'react';

function Square({ mine, setGameOver, gameOver, setScore, gameStarted }) {
  const [image, setImage] = useState(null);
  const [clicked, setClicked] = useState(false); // Track if square has been clicked
  const [boom, setBoom] = useState(false); // Track boom animation trigger

  useEffect(() => {
    if (gameOver) {
      if (mine) {
        setImage(bombIcon); // Show bomb if it's a mine
        setBoom(true); // Trigger boom animation
      } else {
        setImage(goldIcon); // Show diamond if it's not a mine
      }
    }
  }, [gameOver, mine]);

  function mouseEnterHandle() {
    if (!image && !clicked) { // Prevent sound if the square has already been clicked
      const sound = new Audio(hoverEffect);
      sound.play();
    }
  }

  function clickHandler() {
    if (!gameStarted || gameOver || clicked) return; // Disable clicks if game hasn't started, is over, or already clicked

    setClicked(true); // Mark the square as clicked

    if (!mine) {
      setScore((prevValue) => prevValue * 2); // Double the score if it's not a mine
      setImage(goldIcon); // Show diamond
      const sound = new Audio(DiamondEffect);
      sound.play();
    } else {
      alert("You Lose The Game");
      setGameOver(true); // Set the game over state
    }
  }

  return (
    <div
      className={`square-item ${boom ? 'boom' : ''}`} // Add boom animation class
      onMouseEnter={mouseEnterHandle}
      onClick={clickHandler}
    >
      {image && <img height={90} width={90} src={image} />} {/* Display image when the game ends */}
    </div>
  );
}

export default Square;
