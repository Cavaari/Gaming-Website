import Image from "next/image"
import Link from "next/link"

export default function Card({ name, link = "", imgSrc, description }) {

    return (
        <div class="col">
            <div className="card m-1">
                <Image
                    src={imgSrc}
                    alt="Picture of the author"
                    class="card-img-top"
                    width={150}
                    height={200}
                />
                <div class="card-body">
                    <h5 class="card-title">{name}</h5>
                    <p class="card-text">{description}</p>
                    <Link href={link} class="btn btn-primary">{name}'s Page</Link>
                </div>
            </div>
        </div>)
}
