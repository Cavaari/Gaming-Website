import Head from "next/head"
import Image from "next/image"

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
                    <h2>About Me
                        <span className="badge badge-pill position-absolute align-items-right m-10 p-2 translate-middle">
                            <img height={600} width={600} src="/about/karina-icon.png"></img>
                        </span>
                    </h2>
                    <p>I&apos;m in my final academic semester of 5th year Software Engineering Co-op here at UofG. I began coding in my 1st year at Guelph, and love using computers
                        to not only solve complex problems, but to create and add my skills to new things. I finished my minor in music this past F23 semester and specialized in jazz guitar.
                    </p>
                    <p>Completing my coop jobs has given me the chance to work in many roles and get a great insight on what I enjoy most. As of Fall 2024 I plan
                        on pursuing graduate school in Computer Science!
                    </p>
                    <div className="d-flex align-items-center justify-content-center mb-3">
                        <div style={{ height: "18rem", width: "14rem", position: "relative", margin:"1rem" }}>
                            <Image className="img-fluid m-2" src="/about/recital-poster.png" fill={true}></Image>
                        </div>
                        <div style={{ height: "18rem", width: "14rem", position: "relative", margin:"1rem" }}>
                            <Image className="img-fluid m-2" src="/about/dkil.jpeg" fill={true}></Image>
                        </div>
                        <div style={{ height: "14rem", width: "20rem", position: "relative", margin:"1rem" }}>
                            <Image className="img-fluid m-2" src="/about/communitech.jpeg" fill={true}></Image>
                        </div>
                        <div style={{ height: "18rem", width: "20rem", position: "relative", margin:"1rem" }}>
                            <Image className="img-fluid m-2" src="/about/catalyst.jpeg" fill={true}></Image>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
