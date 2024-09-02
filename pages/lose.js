import Image from "next/image";
import { useEffect } from "react";

export default function Lose() {
    useEffect(() => {
        // shake effect 
        const container = document.querySelector('.aftermath-container');
        container.classList.add('shake');
        const shakeDuration = 1000; // shake length
        setTimeout(() => container.classList.remove('shake'), shakeDuration);
    }, []);

    return (
        <>
            <div className='aftermath-container text-center d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '100vh', minWidth: '100vw', background: "var(--third-color)", position: 'relative' }}>
                <div className="smoke"></div>
                <p className="fs-1 fw-bold flashing-text charred">YOU DIED!</p>
                <Image width={400} height={400} className="img-fluid" src="/puzzle/explode.gif" alt="Explosion animation"/>
            </div>
            <style jsx global>{`
                html, body, #__next {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    overflow-x: hidden;
                }
                #__next {
                    display: flex;
                    flex-direction: column;
                }
                .aftermath-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: -1;
                }

                @keyframes flashing {
                    0%, 100% { color: red; }
                    50% { color: white; }
                }
                .flashing-text {
                    animation: flashing 2s infinite;
                }
                .shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
            `}</style>
        </>
    )
}
