import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faGift } from '@fortawesome/free-solid-svg-icons';

export default function MysteryPage() {
  const [stage, setStage] = useState('asteroid');
  const [mysteryCode, setMysteryCode] = useState(''); // State to hold the mystery code input
  const [isVerified, setIsVerified] = useState(false); // State to show/hide the verified text and button

  useEffect(() => {
    let timers = [];
    timers.push(setTimeout(() => setStage('content'), 4000));

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page


    const r = await fetch(
        `${process.env.HOST_URL}/api/puzzle/check_code?` +
        new URLSearchParams({
            code: mysteryCode 
        })
    );
    const data = await r.json();

    if(data == "Right Code!"){
      setIsVerified(true); // Show verified text and button
      // update the cookie or local storage
      localStorage.setItem("code", "solved");
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--about-bg-color)',
      color: 'var(--about-text-color)',
      borderRadius: '0.25rem',
      padding: '1rem',
      boxShadow: '0 0.3rem 0.25rem rgba(0, 0, 0, 0.075)'
    }} className="rounded shadow-sm d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <div className="mysteryContainer w-100"> 
        <div className="titleContainer d-flex flex-column align-items-center"> 
          <h1 className="title fadeIn">Welcome to Team 9 Mystery</h1>
        </div>
        <form className="inputGroup fadeIn d-flex flex-column align-items-center" onSubmit={handleSubmit}> 
          <input
            type="text"
            placeholder="Enter your mystery code..."
            className="mysteryInput"
            value={mysteryCode}
            onChange={(e) => setMysteryCode(e.target.value)}
          />
          <button type="submit" className="mysteryButton mt-2"> 
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        {isVerified && (
          <div className="verifiedSection fadeIn">
            <p>Verified</p>
            <button onClick={() => { window.location.href = '/puzzle'; }}>Click here to proceed</button>
          </div>
        )}
      </div>
    </div>
  );
}
     