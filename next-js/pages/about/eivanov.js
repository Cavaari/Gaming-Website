import Head from "next/head"
import Image from "next/image"
import { useEffect } from "react"

export default function About() {

    // useEffect(() => {
    //     const script = document.createElement("script")
    //     script.onload = function () {
    //         AOS.init();
    //     };
    //     script.src = "https://unpkg.com/aos@next/dist/aos.js"
    // }, [])

    return (
        <>
            <Head>
                <title>Egor Ivanov</title>
                {/* <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" /> */}
            </Head>
            <div className="mt-5 container">

                <div style={{ backgroundColor: "#E7EDE8" }} className="new-section text-center card shadow d-flex align-items-center justify-content-center mb-3">
                    <div style={{ height: "16rem", width: "12rem", position: "relative", margin:"2rem" }}>
                        <Image fill={true} className="m-3 rounded " src="/about/egor.jpg" alt="Picture of Egor Ivanov" />
                    </div>
                    <h1 className="mb-3 fw-bold">Egor Ivanov</h1>
                    <span className="mb-3">Software Engineering <br /><i>5th Year</i></span>
                </div>

                <div style={{ backgroundColor: "#E7EDE8" }} data-aos="fade-right" className="new-section text-center card shadow d-flex align-items-center justify-content-center mb-3">
                    <span data-aos="zoom-in" data-aos-duration="3000" className="m-3 fs-4">Part-Time Full-stack Web Developer at <a href="ei2i.com">ei2i</a></span>
                    <span data-aos="zoom-out" data-aos-duration="3000" className="m-3 fs-4">Delevoper of <a href="https://ei2i.com/editor">Digital Business Card Editor</a> made with Next.js</span>
                </div>

                <div style={{ backgroundColor: "#E7EDE8" }} data-aos="fade-left" className="new-section text-center card shadow d-flex align-items-center justify-content-center mb-3">
                    <span data-aos="zoom-out" data-aos-duration="3000" className="mb-5 fs-1">Favourite Web Dev Tools</span>
                    <div className="d-none d-lg-flex align-items-center justify-content-center">
                        <div style={{ height: "145px", width: "145px", position: "relative", margin:"2rem"}}>
                            <Image fill="true" data-aos="zoom-out-right" data-aos-duration="3000" className="img-fluid m-2"  src="/about/next-js.webp" alt="" />
                        </div>
                        <div style={{ height: "145px", width: "200px", position: "relative", margin:"2rem"}}>
                            <Image fill="true" data-aos="zoom-out-up" data-aos-duration="3000" className="img-fluid m-2" src="/about/MySQL.png" alt="" />
                        </div>
                        <div style={{ height: "145px", width: "145px", position: "relative", margin:"2rem"}}>
                            <Image fill="true" data-aos="zoom-out-up" data-aos-duration="3000" className="img-fluid m-2" src="/about/nginx.png" alt="" />
                        </div>
                        <div style={{ height: "145px", width: "200px", position: "relative", margin:"2rem"}}>
                            <Image fill="true" data-aos="zoom-out-left" data-aos-duration="3000" className="img-fluid m-2" src="/about/bootstrap.png" alt="" />
                        </div>
                    </div>
                    <div id="carouselExampleIndicators" className="d-lg-none carousel slide" style={{ height: "250px", width: "250px" }}>
                        <div className="carousel-indicators bg-dark">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active position-relative" style={{ height: "250px"}}>
                                <Image fill="true" src="/about/next-js.webp" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item" style={{ height: "250px"}}>
                                <Image fill="true" src="/about/MySQL.png" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item" style={{ height: "250px"}}>
                                <Image fill="true" src="/about/nginx.png" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item" style={{ height: "250px"}}>
                                <Image fill="true" src="/about/bootstrap.png" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
