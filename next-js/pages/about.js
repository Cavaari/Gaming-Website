import Card from "@/components/about/Card";

export default function About() {
    return (
        <div className="p-3 bg-third d-flex flex-column align-items-center mx-auto">
            <h1 style={{fontSize: "5rem"}} className="text-first text-center align-self-md-start">About Us</h1>
            <div class="mt-3 mb-3 w-100 row row-cols-1 row-cols-md-6 g-2 d-flex  justify-content-around">
                <Card name="Eric" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" />
                <Card name="Eric" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" />
                <Card name="Eric" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" />
                <Card name="Eric" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" />
                <Card name="Eric" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" />
                <Card name="Eric" imgSrc="/runeTextures/Blue/Rectangle/runeBlue_rectangle_001.png" />
            </div>
        </div>
    )
}
