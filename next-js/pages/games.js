import React, { useState } from 'react';
import Image from 'next/image';
import matchPic from '../public/mainPage/match.png';
import wordlePic from '../public/mainPage/wordle.png';
import jeopardyPic from '../public/mainPage/jeopardy.png';

const Games = () => {
  const [isHoveredMatch, setIsHoveredMatch] = useState(false);
  const [isHoveredWordle, setIsHoveredWordle] = useState(false);
  const [isHoveredJeopardy, setIsHoveredJeopardy] = useState(false);

  const navigateToGame = (url) => {
    window.location.href = url;
  };

  // Style object for transforming scale on hover
  const hoverStyle = {
    transform: 'scale(1.02)',
    transition: 'transform 0.3s ease-in-out', // Only transforming scale, assuming your CSS handles background color transition
  };

  return (
    <div className="new-section bg-third d-flex flex-column align-items-center justify-content-center">
      <div className="h-100 bg-third text-first text-center container-fluid">
        <h1 className="p-3 mb-4" style={{fontSize: "4rem", textShadow: "2px 2px #000000"}} >Select a Game</h1>
        <div className="row justify-content-center">
          <div className="col-11 col-md-4" style={{ marginBottom: "3.9rem" }}>
            <div
              className={`card mb-4 shadow-sm h-100 card-hover-transition ${isHoveredMatch ? 'bg-first' : 'bg-second'}`}
              onClick={() => navigateToGame('/game')}
              style={{ cursor: 'pointer', ...(isHoveredMatch ? hoverStyle : {}) }}
              onMouseEnter={() => setIsHoveredMatch(true)}
              onMouseLeave={() => setIsHoveredMatch(false)}
            >
              <div className="card-body text-white d-flex flex-column">
                <h2 className="card-title" style={{textShadow: "2px 2px #000000"}}>Card Matching</h2>
                <p className="card-text">Test your memory with this matching game.</p>

                <div className='align-self-center h-100 d-flex align-items-center justify-content-center'>
                  <Image className='img-fluid' src={matchPic} width={350} height={300} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-11 col-md-4" style={{ marginBottom: "3.9rem" }}>
            <div
              className={`card mb-4 shadow-sm h-100 card-hover-transition ${isHoveredWordle ? 'bg-first' : 'bg-second'}`}
              onClick={() => navigateToGame('/wordle')}
              style={{ cursor: 'pointer', ...(isHoveredWordle ? hoverStyle : {}) }}
              onMouseEnter={() => setIsHoveredWordle(true)}
              onMouseLeave={() => setIsHoveredWordle(false)}
            >
              <div className="card-body text-white d-flex flex-column">
                <h2 className="card-title" style={{textShadow: "2px 2px #000000"}}>Wordle</h2>
                <p className="card-text">Challenge your vocabulary with Wordle.</p>
                <div className='align-self-center h-100 d-flex align-items-center justify-content-center'>
                  <Image className='img-fluid' src={wordlePic} width={350} height={391} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-11 col-md-4" style={{ marginBottom: "3.9rem" }}>
            <div
              className={`card mb-4 shadow-sm h-100 card-hover-transition ${isHoveredJeopardy ? 'bg-first' : 'bg-second'}`}
              onClick={() => navigateToGame('/jeopardy')}
              style={{ cursor: 'pointer', ...(isHoveredJeopardy ? hoverStyle : {}) }}
              onMouseEnter={() => setIsHoveredJeopardy(true)}
              onMouseLeave={() => setIsHoveredJeopardy(false)}
            >
              <div className="card-body text-white d-flex flex-column">
                <h2 className="card-title" style={{textShadow: "2px 2px #000000"}}>Jeopardy</h2>
                <p className="card-text">Test your luck with JEOPARDY!.</p>
                <div className='align-self-center h-100 d-flex align-items-center justify-content-center'>
                  <Image className='img-fluid' src={jeopardyPic} width={350} height={391} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    
  );
}

export default Games;
