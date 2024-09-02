import Image from "next/image"
import Head from "next/head"
import { useEffect } from "react"

export default function About() {
    useEffect(() => {
        const text = "Hi, I'm Muhammad Salmaan";
        const typingText = document.getElementById("typing-text");

        let index = 0;

        function type() {
            typingText.textContent += text[index];
            index++;

            if (index === text.length) {
                clearInterval(intervalId);
                typingText.style.removeProperty("::after");
            }
        }

        const intervalId = setInterval(type, 100);
    }, [])
    return (
        <>
            <Head>
                <title>Muhammad Salmaan</title>
                {/* eslint-disable */}
                <link rel="stylesheet" type="text/css" href="/about/msalmaan.css" />
                {/* eslint-enable */}
            </Head>
            <section id="home" className="home">
                <h1><span id="typing-text"></span></h1>
                <nav>
                    <ul>
                        <li><a href="Home">Home</a></li>
                        <li><a href="#about" >About</a></li>
                    </ul>
                </nav>
                <p>Software Engineering student @ UOG</p>
                <div className="about-text">
                    <h2>About Me</h2>
                    <p><br /></p>
                    <p id="about-paragraph">
                        I&apos;m Muhammad Salmaan, a passionate software developer in my fifth year
                        of software engineering.I have a very diverse background both in the
                        software and business field. Currently I work at NCR Corporation which
                        helped in fortifying my skills in programming languages, from Java and
                        JavaScript to React and AngularJS. Whether it&apos;s front-end or backend
                        solutions, I&apos;ve navigated both with equal enthusiasm. My time at
                        Reeldata Artificial Intelligence was very enjoyable and it helped me
                        in my dedication to pushing technological boundaries. Apart from
                        academics, I like to read and watch anime. Right now, I am looking
                        forward to graduation and starting the next phase of my life.
                        <br /><br />
                    </p>
                    <p><br /><br /></p>
                </div>
            </section>
        </>
    )
}
