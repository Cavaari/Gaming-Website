import React, { useState } from 'react';
import Image from 'next/image';
import matchPic from '../public/games/match.gif';
import wordlePic from '../public/games/wordle.gif';
import jeopardyPic from '../public/games/jeopardy.gif';
import comingSoon from '../public/games/comingSoon.gif';

const Games = () => {
  const [isHoveredMatch, setIsHoveredMatch] = useState(false);
  const [isHoveredWordle, setIsHoveredWordle] = useState(false);
  const [isHoveredJeopardy, setIsHoveredJeopardy] = useState(false);
  const [isHoveredMaze, setIsHoveredMaze] = useState(false);

  const navigateToGame = (url) => {
    window.location.href = url;
  };

  // Style object for transforming scale on hover
  const hoverStyle = {
    transform: 'scale(1.02)',
    transition: 'transform 0.3s ease-in-out', // Only transforming scale, assuming your CSS handles background color transition
  };

  return (
    <div className="bg-primary d-flex flex-column align-items-center justify-content-center">
      <div className="h-100 text-secondary text-center container-fluid">
        <h1 className="p-3 mb-4 mt-5" style={{ fontSize: "4rem" }} >Select a Game</h1>
        <div className="row justify-content-center">
          <div className="col-11 col-md-4" style={{ marginBottom: "3.9rem" }}>
            <div
              className={`card mb-4 shadow-sm h-100 card-hover-transition ${isHoveredMatch ? 'bg-first' : 'bg-second'}`}
              onClick={() => navigateToGame('/game')}
              style={{ cursor: 'pointer', ...(isHoveredMatch ? hoverStyle : {}) }}
              onMouseEnter={() => setIsHoveredMatch(true)}
              onMouseLeave={() => setIsHoveredMatch(false)}
            >
              <div className="card-body text-secondary d-flex flex-column">
                <h2 className="card-title">Card Matching</h2>
                <p>Test your memory with card-matching. Can you beat our hardest level?</p>
                <div className='align-self-center h-100 d-flex align-items-center justify-content-center'>
                  <Image className='img-fluid rounded' src={matchPic} width={350} height={300} alt="GIF of Card Matching game" />
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
              <div className="card-body text-secondary d-flex flex-column">
                <h2 className="card-title">Wordle</h2>
                <p>Can you guess the word? Or is it too hard for you?</p>
                <div className='align-self-center h-100 d-flex align-items-center justify-content-center'>
                  <Image className='img-fluid rounded' src={wordlePic} width={350} height={391} alt="GIF of Wordle game" />
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
              <div className="card-body text-secondary d-flex flex-column">
                <h2 className="card-title">Jeopardy</h2>
                <p>Test your random fact knowledge. Play locally with 3 friends!</p>
                <div className='align-self-center h-100 d-flex align-items-center justify-content-center'>
                  <Image className='img-fluid rounded' src={jeopardyPic} width={350} height={391} alt="GIF with image of Jeopardy game" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-11 col-md-4" style={{ marginBottom: "3.9rem" }}>
            <div
              className={`card mb-4 shadow-sm h-100 card-hover-transition ${isHoveredMaze ? 'bg-first' : 'bg-second'}`}
              onClick={() => navigateToGame('/maze')}
              style={{ cursor: 'pointer', ...(isHoveredMaze ? hoverStyle : {}) }}
              onMouseEnter={() => setIsHoveredMaze(true)}
              onMouseLeave={() => setIsHoveredMaze(false)}
            >
              <div className="card-body text-secondary d-flex flex-column">
                <h2 className="card-title">Maze</h2>
                <p>Can you beat all 3 stages?</p>
                <div className='align-self-center h-100 d-flex align-items-center justify-content-center'>
                  <Image className='img-fluid rounded' src={comingSoon} width={350} height={391} alt="GIF with text that says coming soon" />
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
