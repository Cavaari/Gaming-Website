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
      <div style={{
        backgroundColor: '#000080', // dark blue background
        padding: '10px 0', // smaller padding for a banner-like appearance
        textAlign: 'center', // center the text
      }}>
        <h1 style={{
          transition: 'opacity 0.5s ease',
          color: '#FFD700', // golden text color
          margin: 0, // remove default margin
          opacity: fadeClass.includes('text-hidden') ? 0 : 1,
        }} onClick={changeText}>
          {h1Text}
        </h1>
      </div>
      <GamesCarousel />

    </>
  );
}
