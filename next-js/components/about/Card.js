import Image from "next/image"
import Link from "next/link"
import React from 'react'

function randomColor(){
    const colors = ["#E9A400", "#152A64", "#00032F"]
    const random = Math.floor(Math.random() * colors.length);
    return colors[random]
}

export default function Card({ name, link = "", imgSrc, description, contact, discord }) {

    return (
        <div className="col">
            <div className="h-100 card m-1">
                {
                    imgSrc ? (
                        <Image
                            src={imgSrc}
                            alt="Picture of the author"
                            className="card-img-top img-fluid"
                            width={300}
                            height={300}
                            style={{backgroundColor:randomColor()}}
                        />
                    ) : (
                        <div className="rounded-top d-flex align-items-center justify-content-center" style={{width:"100%", height:"400px", backgroundColor: randomColor(), fontSize:"4rem", color: "white"}}>
                            <span style={{textShadow: "2px 2px #000000"}}>{name[0]}</span>
                        </div>
                    )
                }

                <div className="card-body d-flex flex-column justify-content-end">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <Link href={link} className="btn btn-primary">{name}&apos;s Page</Link>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">
                    <span class="position-relative badge text-secondary">
                        <a href={"mailto:" + contact} className="card-img-icon text-secondary text-decoration-none">
                            <Image style={{mixBlendMode: "luminosity"}} src="/about/email.png" height={30} width={30} alt="Email Icon"></Image  >
                            {" "+contact}
                        </a>
                    </span>
                    <span class="position-relative badge text-secondary">
                    <img src="/about/discord.png" height={25} width={45} alt="Discord Icon"></img>
                        {discord}
                    </span>
                    </small>
                </div>
            </div>
        </div>)
}
