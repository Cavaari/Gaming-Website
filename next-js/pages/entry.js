import React, { useEffect, useState } from 'react';

export default function MysteryPage() {
  const [stage, setStage] = useState('asteroid');

  useEffect(() => {
    let timers = [];
    timers.push(setTimeout(() => setStage('fireworks'), 4000)); //  fireworks after asteroid
    timers.push(setTimeout(() => setStage('content'), 6000)); //  content after fireworks

    return () => timers.forEach(timer => clearTimeout(timer)); // timers
  }, []);

  return (
    <>
      <div className="mysteryContainer">
        {stage === 'asteroid' && <div className="asteroid"></div>}
        {stage === 'fireworks' && <div className="fireworks"></div>}
        {stage === 'content' && (
          <>
            <h1 className="title fadeIn">Welcome to Team 9 Mystery</h1>
            <div className="inputGroup fadeIn">
              <input type="text" placeholder="Enter your mystery..." className="mysteryInput" />
              <button className="mysteryButton">Submit</button>
            </div>
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

        .asteroid {
          position: absolute;
          background-color: var(--second-color);
          width: 100px;
          height: 100px;
          border-radius: 50%;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          animation: fall 3s forwards;
        }

        @keyframes fall {
          0% {
            top: -100px;
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

        .fireworks {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, transparent 0%, transparent 70%, var(--first-color) 70%);
          background-repeat: no-repeat;
          background-position: center;
          background-size: 300% 300%;
          animation: fireworks 1.5s ease-in-out forwards, colors 1s infinite alternate;
        }

        @keyframes fireworks {
          from {
            background-size: 300% 300%;
            opacity: 0;
          }
          to {
            background-size: 100% 100%;
            opacity: 1;
          }
        }

        @keyframes colors {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(-360deg);
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
          color: var(--second-color);
          background: transparent;
        }

        .mysteryButton {
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          background-color: var(--first-color);
          color: var(--third-color);
          cursor: pointer;
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
