import Head from "next/head"
export default function About() {
    return (
        <>
             <Head>
                <title>Karina Garmendez</title>
                {/* eslint-disable */}
                <link rel="stylesheet" type="text/css" href="/about/kgarmend.css"/>
                {/* eslint-enable */}
            </Head>
            <section>
                <div className="sec" id="sec">
                    <h2>About Me</h2>
                    <p>I&apos;m in my final academic semester of 5th year Software Engineering Co-op here at UofG. I began coding in my 1st year at Guelph, and love using computers
                        to not only solve complex problems, but to create and add my skills to new things. I finished my minor in music this past F23 semester and specialized in jazz guitar.
                    </p>
                </div>
            </section>
        </>
    )
}
