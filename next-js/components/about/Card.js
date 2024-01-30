import Image from "next/image"
import Link from "next/link"

export default function Card({ name, imgSrc, description }) {

    return (
        <div class="col">
            <div className="card m-1">
                <Image
                    src={imgSrc}
                    alt="Picture of the author"
                    class="card-img-top"
                    width={150}
                    height={250}
                />
                <div class="card-body">
                    <h5 class="card-title">{name}</h5>
                    <p class="card-text">{description}</p>
                    <Link href="" class="btn btn-primary">Go somewhere</Link>
                </div>
            </div>
        </div>)
}
