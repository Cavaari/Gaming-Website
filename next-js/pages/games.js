import React from 'react';

const Games = () => {
  // Simulated navigation function (replace with actual navigation logic in a real app)
  const navigateToGame = (url) => {
    window.location.href = url; // This would be your actual path in a fully functional app
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Select a Game</h1>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm h-100" onClick={() => navigateToGame('/game')} style={{ cursor: 'pointer' }}>
            <div className="card-body">
              <h2 className="card-title">Card Matching</h2>
              <p className="card-text">Test your memory with this matching game.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm h-100" onClick={() => navigateToGame('/wordle')} style={{ cursor: 'pointer' }}>
            <div className="card-body">
              <h2 className="card-title">Wordle</h2>
              <p className="card-text">Challenge your vocabulary with Wordle.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;
