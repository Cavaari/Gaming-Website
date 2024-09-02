import Head from "next/head"
import Image from "next/image"

export default function About() {

    return (
        <>
            <Head>
                <title>Egor Ivanov</title>
            </Head>
            <div className="mt-5 container col-12 col-md-6">

                <div className="bg-secondary text-center card shadow d-flex align-items-center justify-content-center mb-3">
                    <div style={{ height: "16rem", width: "12rem", position: "relative", margin:"2rem" }}>
                        <Image fill={true} className="m-3 rounded " src="/about/egor.jpg" alt="Picture of Egor Ivanov" />
                    </div>
                    <h1 className="mb-3 fw-bold text-primary">Egor Ivanov</h1>
                    <span className="mb-3 text-primary">Software Engineering <br /><i>5th Year</i></span>
                </div>

                <div className="bg-secondary text-center card shadow d-flex align-items-center justify-content-center mb-3">
                    <span className="m-3 fs-4 text-primary">Part-Time Full-stack Web Developer at <a className="text-warning text-decoration-none" href="ei2i.com">ei2i</a></span>
                    <span className="m-3 fs-4 text-primary">Delevoper of <a className="text-warning text-decoration-none" href="https://ei2i.com/editor">Digital Business Card Editor</a> made with Next.js</span>
                </div>

                <div className="bg-secondary text-center card shadow d-flex align-items-center justify-content-center mb-3">
                    <span className="mb-5 fs-1 text-primary">Favourite Web Dev Tools</span>
                    <div className="m-2 d-none d-lg-flex align-items-center justify-content-center">
                        
                        <Image height="72" width="100" className="img-fluid ms-2 me-2"  src="/about/next-js.png" alt="" />
                        
                        
                        <Image height="72" width="100" className="img-fluid ms-2 me-2" src="/about/MySQL.png" alt="" />
                        
                        
                        <Image height="72" width="72" className="img-fluid ms-2 me-2" src="/about/nginx.png" alt="" />
                      
                       
                        <Image height="72" width="100" className="img-fluid ms-2 me-2" src="/about/bootstrap.png" alt="" />
                       
                    </div>
                    <div id="carouselExampleIndicators" className="m-2 d-lg-none carousel slide" style={{ height: "250px", width: "250px" }}>
                        <div className="carousel-indicators bg-dark">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active position-relative" style={{ height: "250px"}}>
                                <Image fill="true" src="/about/next-js.png" className="d-block w-100" alt="..." />
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
