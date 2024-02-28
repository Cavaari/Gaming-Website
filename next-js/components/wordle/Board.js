import Square from "./Square";
export default function Board({ trials }) {
    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className='mb-5'>Welcome to Wordle Game</h1>
            <div id="row-1" className="d-flex">
                <Square value={trials[0][0]} />
                <Square value={trials[0][1]} />
                <Square value={trials[0][2]} />
                <Square value={trials[0][3]} />
                <Square value={trials[0][4]} />
            </div>
            <div id="row-2" className="d-flex">
                <Square value={trials[1][0]} />
                <Square value={trials[1][1]} />
                <Square value={trials[1][2]} />
                <Square value={trials[1][3]} />
                <Square value={trials[1][4]} />
            </div>
            <div id="row-3" className="d-flex">
                <Square value={trials[2][0]} />
                <Square value={trials[2][1]} />
                <Square value={trials[2][2]} />
                <Square value={trials[2][3]} />
                <Square value={trials[2][4]} />
            </div>
            <div id="row-4" className="d-flex">
                <Square value={trials[3][0]} />
                <Square value={trials[3][1]} />
                <Square value={trials[3][2]} />
                <Square value={trials[3][3]} />
                <Square value={trials[3][4]} />
            </div>
            <div id="row-5" className="d-flex">
                <Square value={trials[4][0]} />
                <Square value={trials[4][1]} />
                <Square value={trials[4][2]} />
                <Square value={trials[4][3]} />
                <Square value={trials[4][4]} />
            </div>
            <div id="row-6" className="d-flex">
                <Square value={trials[5][0]} />
                <Square value={trials[5][1]} />
                <Square value={trials[5][2]} />
                <Square value={trials[5][3]} />
                <Square value={trials[5][4]} />
            </div>
        </div>
    );
}