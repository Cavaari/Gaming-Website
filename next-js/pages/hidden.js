import Quote from "@/components/hidden/Quote";

function randomColor(){
    const colors = ["#3d1538", "#00032F", "#5e8768", "#15333d", "#264a56"]
    const random = Math.floor(Math.random() * colors.length);
    return colors[random]
}

export default function Hidden() {
    return (
        <div style={{height: "1400px", backgroundColor: randomColor()}} className="p-5 bg-third d-flex flex-column align-items-center mx-auto">
            <h1 style={{fontSize: "5rem", color: "white", textShadow: "2px 2px black", padding: "40px"}} className="text-first text-center align-self-md-start">Hidden Page</h1>
            <Quote quote="A dynamic quote choice from a libaray of quotes" author="Some brilliant author"/>
            <Quote quote="Wow another quote" author="Cool author"/>
            <Quote quote="Last example quote" author="Dope author"/>
        </div>
    )
}
