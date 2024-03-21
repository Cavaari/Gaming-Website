"use client"

import { useRouter } from "next/router";
import {useEffect, useState}  from "react";
import Link from "next/link";

import { Roboto, Truculenta, Khand } from 'next/font/google'
 
const khand = Khand({
  weight: '700',
  subsets: ['latin'],
})

export default function Navbar({ changeTheme}) {
    const router = useRouter()
    
    const [title, setTitle] = useState("");


    useEffect(()=>{
        if(router.pathname == "/"){
            setTitle("HOME")
        }else{
            setTitle(router.pathname.slice(1, router.pathname.length).toUpperCase())
        }
    },[router.pathname] )

    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg bg-primary fw-bold">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <div className="w-100 d-flex flex-column flex-md-row align-items-center justify-content-evenly">
                            <Link className="navbar-brand text-secondary" href="/">Team 9</Link>
                            <span className={khand.className + " text-secondary fs-4"}>{title}</span>
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link text-secondary" href="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-secondary" href="/about">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-secondary" href="/chat">Chat</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-secondary" href="/games">Games</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-stars" viewBox="0 0 16 16">
                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
                            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
                        </svg>
                        <div className="form-check form-switch d-flex justify-content-center ms-2 me-2">
                            <input onChange={changeTheme} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                        </svg>
                    </div>
                    
                </div>
            </nav>
        </>
    );
}



// <nav id="navbar" className="navbar navbar-expand-lg sticky-top bg-second">
//                 <div className="container-fluid">
//                     {/* Collapse trigger button */}
//                     <button className="ms-2 navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
                    
//                      {/* Yellow shape from Figma desing */}
//                     <div className={styles.nav_rect + " bg-first d-none d-lg-block"}>
//                         <div className={styles.nav_tri}></div>
//                     </div>

//                     {/* Navbar content */}
//                     <div className="z-0 collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="z-1 w-100 navbar-nav d-flex justify-content-around mb-2 mb-lg-0">
//                             {/* Home Icon */}
//                             <li className="nav-item d-flex align-items-center justify-content-center">
//                                 <Link className={styles.new_nav_link + " d-flex align-items-center"} href="/">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
//                                         <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
//                                     </svg>
//                                 </Link>
//                             </li>
//                             {/* About Us Dropdown */}
//                             <li className="nav-item d-flex align-items-center justify-content-center">
//                                 <Link className={styles.new_nav_link} href={"/about"} >About Us</Link>
                                
//                             </li>
//                             {/* Other Links */}
//                             <li className="nav-item d-flex align-items-center justify-content-center">
//                                 <Link className={styles.new_nav_link} href="/chat">
//                                     Chat Rooms
//                                 </Link>
//                             </li>
//                             <li className="nav-item d-flex align-items-center justify-content-center">
//                                 <Link className={styles.new_nav_link} href="/games">
//                                     Games
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>