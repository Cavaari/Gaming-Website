import React, { useState, useEffect } from 'react';
import GamesCarousel from '../components/carousel/carousel';

export default function Home() {
  const [h1Text, setH1Text] = useState("");
  const [fadeClass, setFadeClass] = useState("text-fade");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const text = "Welcome to team 9’s web app";
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setH1Text(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const changeText = () => {
    if (!clicked) {
      setClicked(true);
      setFadeClass("text-fade text-hidden");
      setTimeout(() => {
        setH1Text("To find the hidden page, enter the secret room");
        setFadeClass("text-fade");
      }, 500);
    }
  };

  return (
    <>
      <style jsx>{`
        .new-section {
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }

        .text-first {
          color: #E9A400;
          position: relative;
          z-index: 2;
        }

        .text-fade {
          transition: opacity 0.5s ease;
        }

        .text-hidden {
          opacity: 0;
        }

        .carousel-container {
          display: flex; 
          flex-direction: column;
          align-items: center; 
          justify-content: center; 
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
          width: 100%;
        }
      `}</style>
      <div className="new-section bg-third">
        <div className="carousel-container bg-third text-first" onClick={changeText}>
          <h1 className={fadeClass}>{h1Text}</h1>
          <GamesCarousel />
        </div>
      </div>
    </>
  );
}
