import React, { useState } from 'react';
import GamesCarousel from '../components/carousel/carousel'; 

export default function Home() {
  const [h1Text, setH1Text] = useState("Welcome to team 9’s web app");
  const [fadeClass, setFadeClass] = useState("text-fade");

  const changeText = () => {
    setFadeClass("text-fade text-hidden");
    setTimeout(() => {
      setH1Text("To find the hidden page, enter the secret room");
      setFadeClass("text-fade");
    }, 500);
  };

  return (
    <>
      <div className="new-section bg-third d-flex align-items-center justify-content-center text-first">
        <h1 className={fadeClass} onClick={changeText}>{h1Text}</h1>
      </div>
      <GamesCarousel />
    </>
  );
}
