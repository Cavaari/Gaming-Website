import Image from "next/image";

export default function Lose() {
    return (
        <div className='text-center m-5 d-flex flex-column align-items-center' style={{background: "var(--third-color)"}}>
            <p className="fs-1 fw-bold" style={{color: "var(--second-color)"}}>You Died!</p>
            <Image width={200} height={200} className="image-fluid" src="/puzzle/explode.gif"/>
        </div>
    )
}
