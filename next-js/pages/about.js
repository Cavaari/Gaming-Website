import Card from "@/components/about/Card";

export default function About() {
    return (
        <div className="p-5 bg-primary d-flex flex-column align-items-center mx-auto">
            <h1 style={{fontSize: "5rem"}} className="text-secondary text-center align-self-md-start">About Us</h1>
            <div className="mt-3 mb-3 w-100 row row-cols-1 row-cols-md-3 row-cols-lg-4 g-2 d-flex justify-content-around">
                <Card name="Eric" imgSrc="/about/eric.png" description="IT Manager & Software Developer at Perpetual Motion Sports and creator of 3ric Games" link="/about/edearing" contact="edearing@uoguelph.ca" discord="ericdear"/>
                <Card name="Egor" imgSrc="/about/egor_card.png" description="PWAs are the future!" link="/about/eivanov" contact="eivanov@uoguelph.ca" discord="redfish"/>
                <Card name="Cavaari" imgSrc="/about/Memoji.png" description="An island boy with a passion for programming!" link="/about/cavaari" contact="cavaari@uoguelph.ca" discord="ctaylor_758"/>
                <Card name="Karina" imgSrc="/about/karina.png" description="I mostly enjoy backend development and HCI!" link="/about/kgarmend" contact="kgarmend@uoguelph.ca" discord="r111n"/>
                <Card name="Kalindu" imgSrc="/about/kalindu.png" description="I like playing basketball and making apps!" link="/about/kkehelba" contact="kkehelba@uoguelph.ca" discord="synapsee"/>
                <Card name="Muhammad" imgSrc="/about/Muhammad.png" description="" link="/about/msalmaan" contact="msalmaan@uoguelph.ca" discord="msalmaan"/>
                <Card name="Tehreem" imgSrc="/about/tehreem.png" description="AI Better not take my jobs" link="/about/tnazar"  contact="tnazar@uoguelph.ca" discord="sshutup"/>
                <Card name="Greg" imgSrc="/about/greg.png" description="Read about me at uoguelph.ca/computing/people/greg-klotz" contact="gklotz@uoguelph.ca">
                    <span className="badge badge-pill text-primary bg-info position-absolute align-items-right start-100 translate-middle">
                        PROF
                    </span>
                </Card>
            </div>
        </div>
    )
}
