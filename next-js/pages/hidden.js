import { useState, useEffect, useContext } from 'react';
import fs from 'fs';
import useAuthWinner from '@/components/hidden/useAuthWinner';

import SocketContext from '@/components/SocketContext';
import NotAuth from '@/components/hidden/NotAuth';




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
  const [position, setPosition] = useState({ x: 0, y: 81, vx: 2, vy: 2 });


  // check auth
  const socket = useContext(SocketContext)
  const auth = useAuthWinner(socket)

  useEffect(() => {
    if (quotes && quotes.length > 0) {
      const fact_one = quotes[Math.floor(Math.random() * quotes.length)]
      const fact_two = quotes[Math.floor(Math.random() * quotes.length)]

      fact_one.Fact = fact_one.Fact.replace('"', '')
      fact_one.Category = fact_one.Category.replace('"', '')

      fact_two.Fact = fact_two.Fact.replace('"', '')
      fact_two.Category = fact_two.Category.replace('"', '')

      setFactOne(fact_one);
      setFactTwo(fact_two);
    }
  }, [quotes]);

  useEffect(() => {
    if (auth) {
      const move = () => {
        const area = document.getElementById("bounce-area")
        const object = document.getElementById("bounce-object")
        const navbar = document.getElementById("navbar")

        setPosition(prev => {
          let newX = prev.x + prev.vx;
          let newY = prev.y + prev.vy;
          const newVx = (newX <= 0 || newX >= area.offsetWidth - (object.offsetWidth + 1)) ? -prev.vx : prev.vx;
          const newVy = (newY <= navbar.offsetHeight || newY >= area.offsetHeight - (object.offsetHeight - navbar.offsetHeight)) ? -prev.vy : prev.vy;

          return { x: newX, y: newY, vx: newVx, vy: newVy };
        });
      };
      const intervalId = setInterval(move, 50);
      return () => clearInterval(intervalId);
    }

  }, [auth]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackground(randomHexColor());
    }, 5000); // Change background color every 5 seconds

    return () => clearInterval(intervalId);
  }, []);


  const factStyle = {
    position: 'absolute',
    top: position.y + 'px',
    left: position.x + 'px',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    color: '#333',
    textAlign: 'center',
    maxWidth: '60%',
    whiteSpace: 'wrap'
  }



  return (
    <>
      {auth ?
        <div id='bounce-area' style={{ width: "100%", height: "calc(100vh - 5rem)", backgroundColor: background, transition: "background-color 10s ease", overflow: 'hidden' }}>
          <h1 className="bounce pt-5" style={{ textAlign: 'center', fontWeight: 'bold', position: 'absolute', width: '100%' }}>Congratulations !!!</h1>

          {factOne && factTwo && (
            <div id='bounce-object' style={factStyle}>
                <blockquote class="blockquote">
                <p>{factOne.Fact}</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                <cite title="Source Title">{factOne.Category}</cite>
                </figcaption>
            </div>
          )}

        </div> :
        <NotAuth />
      }
    </>

  );
}
