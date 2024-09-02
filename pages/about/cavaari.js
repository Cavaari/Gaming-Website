import Head from "next/head"
import { useEffect } from "react"
import Image from 'next/image';

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
                    <div className="col-lg-4 mb-4" style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Image width={400} height={400} src="/about/Pitons.jpg" alt="Pitons" className="img-fluid mb-2" style={{ borderColor: '#ddd', borderWidth: '5px' }}/>
                      <Image width={400} height={400} src="/about/Marigot.jpg" alt="Marigot" className="img-fluid mb-2" style={{ borderColor: '#ddd', borderWidth: '5px' }}/>
                      <Image width={400} height={400} src="/about/Sunset.jpg" alt="Sunset" className="img-fluid mb-2" style={{ borderColor: '#ddd', borderWidth: '5px' }}/>
                      <Image width={400} height={400} src="/about/Ciceron.jpg" alt="Ciceron" className="img-fluid mb-2" style={{ borderColor: '#ddd', borderWidth: '5px' }}/>
                    </div>


                </div>

            </main>
            <footer>
                <p>&copy; <span id="currentYear"></span> Cavaari</p>
            </footer>
        </>
    )
}
