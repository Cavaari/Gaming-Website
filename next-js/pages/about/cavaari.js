import Head from "next/head"
import Image from "next/image"
import { useEffect } from "react"

export default function About() {
    useEffect(()=>{
        document.getElementById('currentYear').innerText = new Date().getFullYear();
    },[])
    return (
        <>
            <Head>
                <link rel="stylesheet" type="text/css" href="/about/cavaari.css"/>
            </Head>
            <main>
                <div id="about" class="form-section">
                    <h2>About Me</h2>
                    <p>Hi, I'm Cavaari Taylor. I love web development and programming.
                        I hail from the island of Saint Lucia in the Caribbean. A lovely island
                        in the Caribbean where the sun is always shining and the people are always smiling.
                        I am currently in my final semester of my Software Engineering degree at the University of Guelph.
                        I am a very hardworking and dedicated individual who is always willing to learn new things.
                        I am in my 4th year at the University of Guelph and I am eager to break into the industry.
                    </p>
                </div>

            </main>
            <footer>
                <p>&copy; <span id="currentYear"></span> Cavaari</p>
            </footer>
        </>
    )
}
