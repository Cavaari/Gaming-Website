import Image from "next/image"

export default function About() {
    return (
        <>
            <div className="text-center mt-5 mb-5">
            <h1 className="text-primary">Eric Dearing</h1>
        </div>
        <div className="row mx-2">
            <div className="col">
                <div className="card card-body">
                    <h2 className="text-center mb-3">About Me</h2>
                    <ul className="">
                        <li>
                            <h5>IT Manager & Software Developer at Perpetual Motion Sports</h5>
                        </li>
                        <li>
                            <h5>Creater of <a href="https://play.google.com/store/apps/developer?id=3ric+Games&pli=1">3ric Games</a></h5>
                        </li>
                        <li>
                            <h5>5th Year Software Engineering student at University of Guelph</h5>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col">
                <div className="card card-body">
                    <Image width="791" height="1024" className="img-fluid m-3 rounded" src="/about/EricDearingResume.jpg" alt="Eric Dearing's Resume"/>
                </div>
            </div>
        </div>
        </>
    )
}
