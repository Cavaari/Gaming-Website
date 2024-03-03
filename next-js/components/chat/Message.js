const messageRight = {
    padding: 15,
    backgroundColor: "#e8e8e8",
    color: "#000000",
    borderRadius: 8,
    width: "auto",
    margin: 12,
    alignSelf: "end",
    width: "auto"
}

const messageLeft = {
    padding: 15,
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: 8,
    width: "auto",
    margin: 12,
    alignSelf: "start",
    width: "auto"
}



export default function Message({ text, side, color }) {
    return (
        <span  style={(side == "left" ? messageLeft : messageRight)} className={(color ? "bg-success text-white" : "")}>{text}</span>
    )
}