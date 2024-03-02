import { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';




// functions needed here

export default function Hidden({ quotes }) {
  const [background, setBackground] = useState(randomHexColor());
  const [factOne, setFactOne] = useState(null);
  const [factTwo, setFactTwo] = useState(null);
  const [position, setPosition] = useState({ x: 50, y: 50, vx: 2, vy: 2 });

  useEffect(() => {
    if (quotes && quotes.length > 0) {
      setFactOne(quotes[Math.floor(Math.random() * quotes.length)]);
      setFactTwo(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, [quotes]);

  useEffect(() => {
    const move = () => {
      setPosition(prev => {
        let newX = prev.x + prev.vx;
        let newY = prev.y + prev.vy;
        const newVx = (newX <= 0 || newX >= window.innerWidth - 200) ? -prev.vx : prev.vx;
        const newVy = (newY <= 0 || newY >= window.innerHeight - 100) ? -prev.vy : prev.vy;
        return { x: newX, y: newY, vx: newVx, vy: newVy };
      });
    };

    const intervalId = setInterval(move, 50);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackground(randomHexColor());
    }, 10000); // Change background color every 10 seconds

    return () => clearInterval(intervalId);
  }, []);


// factstyle needed here

  return (
    <div style={{ height: "100vh", backgroundColor: background, transition: "background-color 10s ease", overflow: 'hidden' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', position: 'absolute', width: '100%' }}>Congratulations</h1>
      {factOne && (
        <div style={factStyle(0)}>
          <p>"{factOne.Fact}" - {factOne.Category}</p>
        </div>
      )}
      {factTwo && (
        <div style={factStyle(1)}>
          <p>"{factTwo.Fact}" - {factTwo.Category}</p>
        </div>
      )}
    </div>
  );
}
