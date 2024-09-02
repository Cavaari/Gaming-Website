const square = {
    width: 50,
    height: 50,
    margin: 5,
    border: "1px solid #dedede",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;",
    fontWeight: "bold",
    fontSize: 24,
}

export default function Square({ value }) {
    return (
        <div style={square} className="wordle-square">
            {value}
        </div>
    );
}