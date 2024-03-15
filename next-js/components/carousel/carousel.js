import React from 'react';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import matchPic from '../../public/mainPage/match.png'; 
import wordlePic from '../../public/mainPage/wordle.png'; 

const GamesCarousel = () => { 
  const games = [
    {
      name: 'Card Matching',
      description: 'Test your memory with this matching game.',
      image: matchPic,
      alt: 'Card Matching Game',
      href: '/game',
    },
    {
      name: 'Wordle',
      description: 'Challenge your vocabulary with Wordle.',
      image: wordlePic,
      alt: 'Wordle Game',
      href: '/wordle',
    },

  ];

  return (
    <Carousel>
      {games.map((game, index) => (
        <Carousel.Item key={index} style={{position: 'relative', color: 'white', textAlign: 'center', height: '75vh'}}>
          <Image src={game.image} alt={game.alt} layout="fill" objectFit="cover" />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2
          }}>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default GamesCarousel;
