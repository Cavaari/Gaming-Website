import Card from "@/components/about/Card";

export default function About() {
    return (
        <div className="p-5 bg-third d-flex flex-column align-items-center mx-auto">
            <h1 style={{fontSize: "5rem"}} className="text-first text-center align-self-md-start">About Us</h1>
            <div class="mt-3 mb-3 w-100 row row-cols-1 row-cols-md-3 row-cols-lg-4 g-2 d-flex  justify-content-around">
                <Card name="Eric" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" description="Eric's description" link="/about/edearing" />
                <Card name="Egor" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" description="Egor's description" link="/about/eivanov"/>
                <Card name="Cavaari" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" description="Cavaari's description" link="/about/cavaari" />
                <Card name="Karina" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" description="Karina's description" link="/about/kgarmend" />
                <Card name="Kalindu" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" description="Kalindu's description" link="/about/kkehelba" />
                <Card name="Muhammad" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" description="Muhammad's description" link="/about/msalmaan" />
                <Card name="Eric" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" />
                <Card name="Greg" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" />
            </div>
        </div>
    )
}
