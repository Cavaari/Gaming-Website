import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faGift } from '@fortawesome/free-solid-svg-icons';

export default function MysteryPage() {
  const [stage, setStage] = useState('asteroid');
  const [mysteryCode, setMysteryCode] = useState(''); // State to hold the mystery code input
  const [isVerified, setIsVerified] = useState(false); // State to show/hide the verified text and button

  useEffect(() => {
    let timers = [];
    timers.push(setTimeout(() => setStage('content'), 4000));

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page


    const r = await fetch(
        `${process.env.HOST_URL}/api/puzzle/check_code?` +
        new URLSearchParams({
            code: mysteryCode 
        })
    );
    const data = await r.json();

    if(data == "Right Code!"){
      setIsVerified(true); // Show verified text and button
    }
  };

  return (
    <>
      <div className="mysteryContainer">
        {stage === 'asteroid' && (
          <div className="iconContainer">
            <FontAwesomeIcon icon={faGift} size="3x" />
          </div>
        )}
        {stage === 'content' && (
          <>
            <div className="titleContainer">
              <h1 className="title fadeIn">Welcome to Team 9 Mystery</h1>
            </div>
            <form className="inputGroup fadeIn" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your mystery code..."
                className="mysteryInput"
                value={mysteryCode}
                onChange={(e) => setMysteryCode(e.target.value)}
              />
              <button type="submit" className="mysteryButton">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            {isVerified && (
              <div className="verifiedSection fadeIn">
                <p>Verified</p>
                <button onClick={() => { window.location.href = '/puzzle'; }}>Click here to proceed</button>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background-color: var(--third-color);
          overflow: hidden;
        }
      `}</style>

      <style jsx>{`
        .mysteryContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          position: relative;
          background-color: var(--third-color);
          color: var(--first-color);
        }

        .iconContainer {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          animation: fall 3s forwards;
        }

        @keyframes fall {
          0% {
            top: -100px;
            opacity: 1;
          }
          90% {
            top: calc(100vh - 150px);
            opacity: 1;
          }
          100% {
            top: calc(100vh - 100px);
            opacity: 0;
          }
        }

        .titleContainer {
          position: relative;
          display: inline-block;
          overflow: hidden;
        }

        .titleContainer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          animation: clearFog 3s forwards;
        }

        @keyframes clearFog {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .title {
          margin-bottom: 20px;
          color: var(--first-color);
        }

        .inputGroup {
          display: flex;
          gap: 10px;
        }

        .mysteryInput {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid var(--first-color);
          color: var(--first-color);
          background: transparent;
        }

        .mysteryButton {
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          background-color: var(--first-color);
          color: var(--third-color);
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .mysteryButton:hover {
          background-color: #fff;
          color: var(--second-color);
        }

        .verifiedSection {
          margin-top: 20px;
          text-align: center;
        }

        .verifiedSection button {
          margin-top: 10px;
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          background-color: var(--first-color);
          color: var(--third-color);
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .verifiedSection button:hover {
          background-color: #fff;
          color: var(--second-color);
        }

        .fadeIn {
          animation: fadeIn 1s ease-in forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
