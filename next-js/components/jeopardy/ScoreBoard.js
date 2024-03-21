export default function ScoreBoard({ player }) {
    return (
        <div className="p-2 mt-4 rounded">
            <h2 className="text-secondary">Scoreboard</h2>
            <div className="bg-secondary p-2 rounded">
                <span className="text-primary">Player: {player}</span>
                <span className="text-primary">Score: 100</span> {/* Sample score */}
                <span className="text-primary"> | </span>
            </div>
        </div>
    );
}
