import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top bg-second">
                <div className="container-fluid">
                    {/* Collapse trigger button */}
                    <button className="ms-2 navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                     {/* Yellow shape from Figma desing */}
                    <div className={styles.nav_rect + " bg-first d-none d-lg-block"}>
                        <div className={styles.nav_tri}></div>
                    </div>

                    {/* Navbar content */}
                    <div className="z-0 collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="z-1 w-100 navbar-nav d-flex justify-content-around mb-2 mb-lg-0">
                            {/* Home Icon */}
                            <li className="nav-item d-flex align-items-center justify-content-center">
                                <Link className={styles.new_nav_link + " d-flex align-items-center"} href="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                                    </svg>
                                </Link>
                            </li>
                            {/* About Us Dropdown */}
                            <li className="nav-item d-flex align-items-center justify-content-center">
                                <Link className={styles.new_nav_link} href={"/about"} >About Us</Link>
                                
                            </li>
                            {/* Other Links */}
                            <li className="nav-item d-flex align-items-center justify-content-center">
                                <Link className={styles.new_nav_link} href="/chat">
                                    Chat Rooms
                                </Link>
                            </li>
                            <li className="nav-item d-flex align-items-center justify-content-center">
                                <Link className={styles.new_nav_link} href="/game">
                                    Game
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}



