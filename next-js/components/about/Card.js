import Image from "next/image"
import Link from "next/link"

export default function Card({name, imgSrc, description}) {

    return (
        <div class="card p-4 col-12 col-md-2">
            <Image
                    src={imgSrc}
                    alt="Picture of the author"
                    class="card-img-top"
                    fill="true"
                />
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <p class="card-text">{description}</p>
                <Link href="" class="btn btn-primary">Go somewhere</Link>
            </div>
            {name}
        </div>)
}
