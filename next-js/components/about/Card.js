import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'

function randomColor(){
    const colors = ["#E9A400", "#152A64", "#00032F"]
    const random = Math.floor(Math.random() * colors.length);
    return colors[random]
}

export default function Card({ name, link = "", imgSrc, description, contact }) {
    const router = useRouter()
    return (
        <div className="col">
            <div className="card m-1">
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
                        <div className="rounded-top d-flex align-items-center justify-content-center" style={{width:"100%", height:"200px", backgroundColor: randomColor(), fontSize:"4rem", color: "white"}}>
                            <span style={{textShadow: "2px 2px #000000"}}>{name[0]}</span>
                        </div>
                    )
                }

                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <Link href={link} className="btn btn-primary">{name}&apos;s Page</Link>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">Contact at {contact}</small>
                </div>
            </div>
        </div>)
}
