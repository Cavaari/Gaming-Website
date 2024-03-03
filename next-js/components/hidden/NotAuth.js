import Image from "next/image";

export default function NotAuth() {
    return (
        <div className='text-center m-5 d-flex flex-column align-items-center'>
            <p className="fs-1 fw-bold mb-5">This Page is hidden</p>
            <p className="fs-1 fw-bold">You Shall Not Pass!</p>
            <Image className="image-fluid" width={241} height={135} src="/hidden/hidden.jpg"/>
        </div>
    )
}