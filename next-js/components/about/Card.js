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
                            className="card-img-top"
                            width={150}
                            height={200}
                            layout="responsive"
                            objectFit="fill"
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
                    <small class="text-body-secondary">Contact: <a className="link-underline link-underline-opacity-0"></a>
                    <span class="position-relative badge text-bg-light">
                        <a href={"mailto:" + contact} className="card-img-icon">
                            <img src="/about/email.png" height={30} width={30} alt="Email Icon"></img>
                        </a>
                        {" "+contact}
                    </span>
                    <span class="position-relative badge text-bg-light">
                    <img src="/about/discord.png" height={25} width={45} alt="Discord Icon"></img>
                        {discord}
                    </span>
                    </small>
                </div>
            </div>
        </div>)
}
