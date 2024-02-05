import Head from "next/head"
import { useEffect } from "react"

export default function About() {
    useEffect(()=>{
        document.getElementById('currentYear').innerText = new Date().getFullYear();
    },[])
    return (
        <>
            <Head>
                <title>Cavaari Taylor</title>
                {/* eslint-disable */}
                <link rel="stylesheet" type="text/css" href="/about/cavaari.css"/>
                {/* eslint-enable */}
            </Head>
            <main>
                <div id="about" className="form-section">
                    <h2>About Me</h2>
                    <p>Hi, I&apos;m Cavaari Taylor. I love web development and programming.
                        I hail from the island of Saint Lucia in the Caribbean. A lovely island
                        in the Caribbean where the sun is always shining and the people are always smiling.
                        I am currently in my final semester of my Software Engineering degree at the University of Guelph.
                        I am a very hardworking and dedicated individual who is always willing to learn new things.
                        I am in my 4th year at the University of Guelph and I am eager to break into the industry. Apart 
                        from my love of programming, I also love my home and am very proud of my island. A beautiful place
                        with beautiful people. I am lived in this beautiful place for many years now i'll share that beauty 
                        with you. Here is my island, Saint Lucia.
                    </p>
                    <div className="image-container">
                        <image src="/about/Pitons.jpg" alt="Pitons" className="form-image"/>
                        <image src="/about/Marigot.jpg" alt="Marigot" className="form-image"/>
                        <image src="/about/Sunset.jpg" alt="Sunset" className="form-image"/>
                        <image src="/about/Ciceron.jpg" alt="Ciceron" className="form-image"/>
                    </div>
                </div>

            </main>
            <footer>
                <p>&copy; <span id="currentYear"></span> Cavaari</p>
            </footer>
        </>
    )
}
