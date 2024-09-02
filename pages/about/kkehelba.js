import Image from "next/image"
import Head from "next/head"
export default function About() {
    return (
        <>
            <Head>
                <title>Kalindu Fernando</title>
                {/* eslint-disable */}
                <link rel="stylesheet" type="text/css" href="/about/kalindu.css"/>
                {/* eslint-enable */}
            </Head>
            <div className="headbar" id="headbar">
                <div className="portrait position-relative mx-auto mt-5 mb-5" style={{ width:"30%", height: "300px"}} >
                    <Image
                        src="/about/background.jpeg"
                        fill={true}
                        alt="..."
                    />
                    <br/>
                </div>

                <div className="about-me" id="about-me">
                    <h1>Kalindu Fernando</h1>
                </div>
            </div>
            <div className="bio" id="bio">
                <h2 style={{fontSize: "30px"}} className="heading">About</h2>
                <p>
                    Hi I&apos;m Kalindu! I&apos;m a fifth year <strong>software engineering</strong> student at
                    the <strong>University of Guelph</strong>. From a young age I&apos;ve had a
                    passion for programming and creating all sorts of things on the
                    computer. In my free time, you can find me working out, playing video
                    games, or making something interesting.
                </p>
            </div>

            <a href="https://www.vecteezy.com/free-photos">Free Stock photos by Vecteezy</a>
        </>
    )
}
