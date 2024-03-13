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
    // Any other aditional games we will add here
  ];

  return (
    <Carousel>
      {games.map((game, index) => (
        <Carousel.Item key={index}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image
              src={game.image}
              alt={game.alt}
              layout="fill"
              objectFit="contain" // Maintain aspect ratio
            />
          </div>
          <Carousel.Caption>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default GamesCarousel;
