import Image from "next/image";
import Head from "next/head";

export default function About() {
    return (
        <>
            <Head>
                <title>About Tehreem Nazar</title>
            </Head>
            <div className="d-flex flex-column min-vh-100">
                <div className="container my-5 flex-grow-1">
                    <div style={{ backgroundColor: 'var(--about-bg-color)', color: 'var(--about-text-color)', borderRadius: '0.25rem', padding: '1rem', boxShadow: '0 0.3rem 0.25rem rgba(0, 0, 0, 0.075)' }} className="rounded shadow-sm">
                        <div className="row align-items-center">
                        <div className="col-lg-4 mb-4" style={{ backgroundColor: '#B47978', padding: '0px', borderRadius: '100%' }}> 
                            <Image width={400} height={400} src="/about/tehreem.png" alt="My Cat Zeus" className="img-fluid rounded-circle border" style={{ borderColor: '#ddd', borderWidth: '5px' }}/>
                        </div>
                            <div className="col-lg-8">
                                <h1 className="mb-3">Tehreem Nazar</h1>
                                <h2 className="mb-3">About Me</h2>
                                <p style={{ marginBottom: '20px' }}>I am a 5th year student studying Software Engineering at the University of Guelph. I enjoy backend development and currently work at National Defence as a Programmer Analyst. I have a cat that annoys me a lot and loves to sit on my keyboard when I'm programming. In my spare time, I enjoy reading philosophical books, trying out new cuisines and photography is something I've recently become interested in. Take a look at some of my amateur pictures below!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-2"> 
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <img src="/about/photo1.JPG" alt="Photo 1" className="img-fluid rounded"/>
                        </div>
                        <div className="col-md-4 mb-4">
                            <img src="/about/photo2.JPG" alt="Photo 1" className="img-fluid rounded"/>
                        </div>
                        <div className="col-md-4 mb-4">
                            <img src="/about/photo3.JPG" alt="Photo 1" className="img-fluid rounded"/>
                        </div>
                        <div className="col-md-4 mb-4">
                            <img src="/about/photo4.JPG" alt="Photo 1" className="img-fluid rounded"/>
                        </div>
                        <div className="col-md-4 mb-4">
                            <img src="/about/photo5.JPG" alt="Photo 1" className="img-fluid rounded"/>
                        </div>
                        <div className="col-md-4 mb-4">
                            <img src="/about/photo6.JPG" alt="Photo 1" className="img-fluid rounded"/>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="mt-5 py-3" style={{backgroundColor: '#B47978', color: '#ffffff'}}>
                <div className="container text-center">
                    <span>Connect with me on <a href="https://www.linkedin.com/in/tehreem-nazar-b30724183/" target="_blank" rel="noopener noreferrer" style={{color: '#0d6efd'}}>LinkedIn</a>.</span>
                </div>
            </footer>
        </>
    );
}
