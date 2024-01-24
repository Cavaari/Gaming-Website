import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className="d-flex sticky-top">
            <div className={styles.nav_rect + " bg-first"}>
                <div className={styles.nav_tri}></div>
            </div>

            <div className={styles.nav_content + " bg-second d-flex align-items-center"}>
                <a className={styles.new_nav_link + " me-5 d-flex align-items-center"} href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                    </svg>
                </a>

                <span className={styles.new_nav_link + " me-5 dropdown-toggle"} data-bs-toggle="dropdown" aria-expanded="false">About Us</span>
                <ul className="dropdown-menu bg-second">
                    <li><a className={"dropdown-item new-nav-link " + styles.new_nav_link} href="aboutme/edearing">Eric Dearing</a></li>
                    <li><a className={"dropdown-item new-nav-link " + styles.new_nav_link} href="aboutme/eivanov">Eivanov</a></li>
                    <li><a className={"dropdown-item new-nav-link " + styles.new_nav_link} href="aboutme/kgarmend">Kgarmend</a></li>
                    <li><a className={"dropdown-item new-nav-link " + styles.new_nav_link} href="aboutme/kkehelba">Kkehelba</a></li>
                    <li><a className={"dropdown-item new-nav-link " + styles.new_nav_link} href="aboutme/msalmaan">Muhammad Salmaan</a></li>
                    <li><a className={"dropdown-item new-nav-link " + styles.new_nav_link} href="aboutme/tnazar">Tehreem</a></li>
                    <li><a className={"dropdown-item new-nav-link " + styles.new_nav_link} href="aboutme/cavaari">Cavaari</a></li>
                </ul>
            </div>
        </nav>
    );
}