import Image from "next/image"
import Head from "next/head"
export default function About() {
    return (
        <>
            <Head>
                <title>Kalindu Fernando</title>
                <link rel="stylesheet" type="text/css" href="/about/kalindu.css"/>
            </Head>
            <div class="headbar" id="headbar">
                <div class="portrait">
                    <img
                        src="/about/background.jpeg"
                        width="30%"
                    />
                    <br/>
                </div>

                <div class="about-me" id="about-me">
                    <h1>Kalindu Fernando</h1>
                </div>
            </div>
            <div class="bio" id="bio">
                <h2 style={{fontSize: "30px"}} class="heading">About</h2>
                <p>
                    Hi I'm Kalindu! I'm a fifth year <strong>software engineering</strong> student at
                    the <strong>University of Guelph</strong>. From a young age I've had a
                    passion for programming and creating all sorts of things on the
                    computer. In my free time, you can find me working out, playing video
                    games, or making something interesting.
                </p>
            </div>

            <a href="https://www.vecteezy.com/free-photos">Free Stock photos by Vecteezy</a>
        </>
    )
}
