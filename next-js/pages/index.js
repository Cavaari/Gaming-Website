import React, { useState, useEffect } from 'react';
// import GamesCarousel from '../components/carousel/carousel';
import AboutCards from '@/components/about/AboutCards';
import Image from 'next/image';

export default function Home() {
  const [h1Text, setH1Text] = useState("Welcome to team 9’s web app");
  const [fadeClass, setFadeClass] = useState("text-fade");
  const [clicked, setClicked] = useState(false);



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
    <div className="container-fluid">
      {/* <style jsx>{`
        body{
          background-image: url("https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg") !important;
          
        }
      `}</style> */}
      <h1 className={"mt-5 mb-5 text-center"} onClick={changeText}>{h1Text}</h1>

      {/* <div className="carousel-container" >
          <GamesCarousel />
      
        </div> */}
      <div id="carouselExample" className="carousel slide bg-secondary rounded p-2">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image src="/mainPage/card-matching.gif" height={1000} width={1000} style={{objectFit: "scale-down"}} className="d-block img-fluid mx-auto rounded" alt="..."/>
          </div>
          <div className="carousel-item">
            <Image src="/mainPage/wordle.gif" height={1000} width={1000} style={{objectFit: "scale-down"}} className="d-block img-fluid mx-auto rounded" alt="..."/>
          </div>
          <div className="carousel-item">
            <Image src="/mainPage/Jeopardy.gif" height={1000} width={1000} style={{objectFit: "scale-down"}} className="d-block img-fluid mx-auto rounded" alt="..."/>
          </div>
          <div className="carousel-item">
            <Image src="/mainPage/comingSoon.gif" height={1000} width={1000} style={{objectFit: "scale-down"}} className="d-block img-fluid mx-auto rounded" alt="..."/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <br></br>
      <AboutCards>
        <h1 className="fs-1 text-secondary mx-auto">About Us</h1>
      </AboutCards>
    </div>
  );
}
