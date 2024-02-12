import Card from "@/components/about/Card";

export default function About() {
    return (
        <div className="p-5 bg-third d-flex flex-column align-items-center mx-auto">
            <h1 style={{fontSize: "5rem"}} className="text-first text-center align-self-md-start">About Us</h1>
            <div className="mt-3 mb-3 w-100 row row-cols-1 row-cols-md-3 row-cols-lg-4 g-2 d-flex justify-content-around">
                <Card name="Eric" imgSrc="/about/eric.jpg" description="IT Manager & Software Developer at Perpetual Motion Sports and creator of 3ric Games" link="/about/edearing" />
                <Card name="Egor" imgSrc="/about/egor_card.png" description="PWAs are the future!" link="/about/eivanov"/>
                <Card name="Cavaari Taylor" imgSrc="/about/Memoji.jpeg" description="An island boy with a passion for programming!" link="/about/cavaari" />
                <Card name="Karina" imgSrc="/about/karina.png" description="I mostly enjoy backend development and HCI!" link="/about/kgarmend" />
                <Card name="Kalindu" imgSrc="/about/kalindu.png" description="I like playing basketball and making apps!" link="/about/kkehelba" />
                <Card name="Muhammad" imgSrc="/about/Muhammad.png" description="Muhammad's description" link="/about/msalmaan" />
                <Card name="Tehreem" imgSrc="" description="Tehreem's description" link="/about/tnazar"  />
                <Card name="Greg" imgSrc="" /> 
            </div>
        </div>
    )
}
