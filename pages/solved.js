import Head from 'next/head';

import useAuthWinner from '@/components/puzzle/useAuthWinner';

import { useContext } from 'react';
import SocketContext from '@/components/SocketContext';
import NotAuth from '@/components/hidden/NotAuth';

const PuzzleSolvedPage = () => {
  const socket = useContext(SocketContext);
  const auth = useAuthWinner(socket);

  if (auth) {
    return (
      <div className="solvedContainer">
        <Head>
          <title>Puzzle Solved</title>
        </Head>
        <div className="titleContainer">
          <h1 className="title">Congratulations!</h1>
          <div className="card-body">
            <h5 className="card-title">Puzzle Solved</h5>
            <p className="card-text">Here's your code for solving the puzzle:</p>
            <p className="card-text">Make sure you copy the code before proceeding</p>
            <div className="alert alert-success" role="alert">
              <code>p8mU45McP</code>
            </div>
            <a href="https://cis4250w24-10.socs.uoguelph.ca/qRpLmNoStU" className="mysteryButton">More Mystery ?!?!</a>
          </div>
        </div>

        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background-color: var(--third-color);
            font-family: 'Arial', sans-serif;
            overflow: hidden;
          }
          :root {
            --first-color: #E9A400; 
            --second-color: #152A64; 
            --third-color: #00032F;
          }
        `}</style>

        <style jsx>{`
          .solvedContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            position: relative;
            background-color: var(--third-color);
            color: var(--first-color);
          }
  
          .titleContainer {
            background-color: var(--second-color);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 600px;
            width: 80%;
            margin: auto;
          }
  
          .title {
            color: white;
            margin-bottom: 20px;
          }
  
          .card-body {
            color: white;
          }
  
          .mysteryButton {
            padding: 10px 20px;
            border-radius: 5px;
            border: none;
            background-color: var(--first-color);
            color: var(--third-color);
            cursor: pointer;
            display: inline-block; 
            text-decoration: none; 
            transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
          }
  
          .mysteryButton:hover {
            background-color: white;
            color: var(--second-color);
            transform: scale(1.1);
          }
        `}</style>
      </div>
    );
  }else{
    return (
      
        <NotAuth/>
      
    )
    
  }

};

export default PuzzleSolvedPage;
