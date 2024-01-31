import Image from "next/image"
import Link from "next/link"

export default function Card({ name, link = "", imgSrc, description }) {

    return (
        <div className="col">
            <div className="card m-1">
                <Image
                    src={imgSrc}
                    alt="Picture of the author"
                    className="card-img-top"
                    width={150}
                    height={200}
                />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <Link href={link} className="btn btn-primary">{name}'s Page</Link>
                </div>
            </div>
        </div>)
}
