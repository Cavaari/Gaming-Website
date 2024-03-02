import React, { useState } from 'react';
import Image from 'next/image';
import matchPic from '../public/mainPage/match.png';
import wordlePic from '../public/mainPage/wordle.png';

const Games = () => {
  const [isHoveredMatch, setIsHoveredMatch] = useState(false);
  const [isHoveredWordle, setIsHoveredWordle] = useState(false);

  
  const navigateToGame = (url) => {
    window.location.href = url; 
  };

  // Hover Scale Style
  const hoverStyle = {
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease-in-out', 
  };

  return (
    <div className="container-fluid text-center bg-third new-section text-first" style={{ minHeight: '100vh' }}>
      <h1 className="mb-4">Select a Game</h1>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div 
            className="card mb-4 shadow-sm h-100" 
            onClick={() => navigateToGame('/game')} 
            style={{ cursor: 'pointer', ...(isHoveredMatch ? hoverStyle : {}) }}
            onMouseEnter={() => setIsHoveredMatch(true)}
            onMouseLeave={() => setIsHoveredMatch(false)}
          >
            <div className="card-body">
              <h2 className="card-title">Card Matching</h2>
              <p className="card-text">Test your memory with this matching game.</p>
              <div className="h-50 d-flex flex-column align-items-center justify-content-center">
                <Image src={matchPic} width={350} height={300} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div 
            className="card mb-4 shadow-sm h-100" 
            onClick={() => navigateToGame('/wordle')} 
            style={{ cursor: 'pointer', ...(isHoveredWordle ? hoverStyle : {}) }}
            onMouseEnter={() => setIsHoveredWordle(true)}
            onMouseLeave={() => setIsHoveredWordle(false)}
          >
            <div className="card-body">
              <h2 className="card-title">Wordle</h2>
              <p className="card-text">Challenge your vocabulary with Wordle.</p>
              <Image src={wordlePic} width={350} height={391} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;
