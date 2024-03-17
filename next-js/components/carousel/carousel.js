import React from 'react';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import matchPic from '../../public/mainPage/match.png';
import wordlePic from '../../public/mainPage/wordle.png';

const GamesCarousel = () => {
  // Carousel items data
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
    // This is where we add jeapordy
  ];

  return (
    <div className="new-section bg-third d-flex align-items-center justify-content-center text-first">
      <div style={{
        maxWidth: '600px',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
      }}>
        <Carousel>
          {games.map((game, index) => (
            <Carousel.Item key={index} style={{ position: 'relative', height: '300px' }}>
              <Link href={game.href} passHref>
                <div className="custom-carousel-item" style={{ display: 'block', width: '100%', height: '100%' }}>
                  <Image src={game.image} alt={game.alt} layout="responsive" width={600} height={300} objectFit="cover" />
                  <div className="carousel-caption" style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    color: '#E9A400',
                  }}>
                    <h3>{game.name}</h3>
                    <p>{game.description}</p>
                  </div>
                </div>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default GamesCarousel;
