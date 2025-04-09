import { useEffect, useState } from "react";
import "./App.css";
import Square from "./Square/Square";
import Gems from "./assets/Gems.png";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNumbers = [];

// Generate random mines for the game (3 random numbers between 1 and 25)
while (randomNumbers.length < 3) {
  let randomNumber = getRandomInt(1, 25);
  if (!randomNumbers.includes(randomNumber)) {
    randomNumbers.push(randomNumber);
  }
}

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(100);
  const [gameStarted, setGameStarted] = useState(false); // Track game state (started or not)
  const [cashoutMode, setCashoutMode] = useState(false); // To toggle between Cashout and Start

  let items = [];

  const startGame = () => {
    if (gameStarted) {
      // If the game is already started, reload the page
      console.log(gameStarted, "game started");
      window.location.reload();
    } else {
      // If the game hasn't started, start the game
      setGameStarted(true);
      setCashoutMode(false); // Hide cashout mode
      setScore(100); // Reset score
      setGameOver(false); // Reset gameOver state
    }
  };

  useEffect(() => {}, []);

  // Generate the grid when the game has started
  for (let index = 1; index < 26; index++) {
    items.push(
      <Square
        setScore={setScore}
        gameOver={gameOver}
        setGameOver={setGameOver}
        mine={randomNumbers.includes(index)}
        gameStarted={gameStarted} // Pass gameStarted as prop to each square
        key={index}
      />
    );
  }

  return (
    <>
      <div className="max-w-screen-lg min-h-screen mx-auto p-8">
        <div className="flex justify-center gap-4">
          <img src={Gems} alt="Gems" className="h-8" />
          {/* Show the grid even if the game is not started, but squares will be disabled */}
          <div className="grid grid-cols-5 gap-2.5">{items}</div>
        </div>
      </div>

      <div className="bg-gray-900 fixed bottom-0 w-full flex justify-between py-4 z">
        <div className="text-xl text-white ml-48">
          <p>Total Balance</p>
          <p>{score}</p>
        </div>

        <p className="text-white text-xl">
          Total Bet amount
          <div className="flex gap-4 item-center">
          <div className="">0 </div>
         <div className="ml-12"> <FaCaretUp /> <FaCaretDown /> </div>

         </div>
        </p>

        <p className="text-white text-xl">Choose your Bet and Press Start</p>

        {/* Display Start or Cashout button based on the game state */}
        <button
          className={`flex items-center justify-center w-16 h-16 rounded-full text-white font-bold text-xl shadow-lg transition-all mr-48 ${
            gameStarted ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`} // Conditional class for button color
          onClick={startGame} // Conditional function call based on game state
        >
          {gameStarted ? "Cashout" : "Start"}
        </button>
      </div>
    </>
  );
}

export default App;
