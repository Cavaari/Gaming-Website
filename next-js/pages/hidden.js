import { useState, useEffect } from 'react';
import fs from 'fs';





function parseCSV(data) {
  const lines = data.split('\n').map(line => line.trim()).filter(line => line);
  const headers = lines.shift().split(',');
  return lines.map(line => {
    const values = line.split(',');
    return headers.reduce((object, header, index) => {
      object[header.trim()] = values[index].trim();
      return object;
    }, {});
  });
}

function randomHexColor() {
  return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;
}

export async function getServerSideProps() {
  const filePath = 'lib/hidden_quotes/quotes.csv';
  const data = fs.readFileSync(filePath, 'utf8');
  const records = parseCSV(data).filter(record => record.Fact && record.Category);

  return {
    props: {
      quotes: records,
    },
  };
}

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


  const factStyle = index => ({
    position: 'absolute',
    top: position.y + (index * 50) + 'px',
    left: position.x + 'px',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    color: '#333',
    whiteSpace: 'nowrap'
  });

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
