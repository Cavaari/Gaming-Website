import Image from "next/image"
import Head from "next/head"


export default function About() {
    return (
        <>
            <Head>
                <title>About Tehreem Nazar</title>
                <link rel="stylesheet" type="text/css" href="/about/tnazar.css" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet"></link>
            </Head>
            <div class="container mt-5">
                <div class="row">
                    <div class="col-lg-4">
                        <img src="/about/Zeus.jpeg" alt="My Cat Zeus" class="img-fluid mb-3"/>
                    </div>
                    <div class="col-lg-8">
                        <h1>Tehreem Nazar</h1>
                        <h2>About Me</h2>
                        <p>I am a 5th year student studying Software Engineering at the University of Guelph. I enjoy backend development and currently work at National Defence as a Programmer Analyst. I have a cat that annoys me a lot and loves to sit on my keyboard when I'm programming (he's pictured above). In my spare time, I enjoy reading philosophical books and trying out new cuisines.</p>
                    </div>
                </div>
            </div>

            <footer class="footer mt-5 py-3 bg-light">
                <div class="container text-center">
                    <span class="text-muted">Connect with me on <a href="https://www.linkedin.com/in/tehreem-nazar-b30724183/" target="_blank">LinkedIn</a>.</span>
                </div>
            </footer>
        </>
    )
}
