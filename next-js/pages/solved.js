import Head from 'next/head';

const PuzzleSolvedPage = () => {
  return (
    <div>
      <Head>
        <title>Puzzle Solved</title>
      </Head>
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="solved-card card">
            <div className="card-header">
              Congratulations!
            </div>
            <div className="card-body">
              <h5 className="card-title">Puzzle Solved</h5>
              <p className="card-text">Here's your code for solving the puzzle:</p>
              <div className="alert alert-success" role="alert">
                <code>PUZZLE-SOLVED-CODE-123</code>
              </div>
              <a href="/" className="home-button btn btn-secondary">Go Home</a>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background-color: var(--third-color); /* Use global color */
        }
      `}</style>

<style jsx>{`
        .solved-card {
          background-color: var(--second-color);
          color: white;
        }
        .home-button{
            background-color: var(--first-color);
        }
        `}</style>
    </div>
  );
};

export default PuzzleSolvedPage;
