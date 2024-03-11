import Image from "next/image";

export default function NotAuth() {
    return (
        <div className='new-section text-center p-5 d-flex flex-column align-items-center' style={{background: "var(--third-color)"}}>
            <p className="fs-1 fw-bold mb-5" style={{color: "var(--first-color)"}}>This Page is hidden</p>
            <p className="fs-1 fw-bold" style={{color: "var(--second-color)"}}>You Shall Not Pass!</p>
            <Image className="image-fluid" width={241} height={135} src="/hidden/hidden.jpg"/>
        </div>
    )
}