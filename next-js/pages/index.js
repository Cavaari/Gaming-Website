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
    <div>
      
      
        <h1 className={fadeClass}>{h1Text} onClick={changeText}</h1>
     
      <div className="new-section bg-third">
        <div className="carousel-container bg-third text-first" >
          <GamesCarousel />
        </div>
      </div>
    </div>
  );
}
