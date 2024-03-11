import Image from "next/image";

export default function NotAuth() {
    return (
        <>
            <div className='new-section text-center p-5 d-flex flex-column align-items-center' style={{background: "var(--third-color)"}}>
                <p className="fs-1 fw-bold mb-5" style={{color: "red"}}>This Page is hidden</p>
                <p className="fs-1 fw-bold pulsate" style={{color: "red"}}>You Shall Not Pass!</p>
                <Image className="image-fluid" width={241} height={135} src="/hidden/hidden.jpg" alt="Hidden"/>
            </div>
            <style jsx>{`
                @keyframes pulsate {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .pulsate {
                    animation: pulsate 1s ease-in-out infinite;
                }
            `}</style>
        </>
    )
}
