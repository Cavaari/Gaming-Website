import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'

export default function Quote({ quote, author }) {
    const router = useRouter()
    return (
        <figure className="text-center">
        <blockquote className="blockquote" style={{width:"100%", fontSize:"4rem", color: "white"}}>
            <p>{quote}</p>
        </blockquote>
        <figcaption className="blockquote-footer" style={{width:"90%", fontSize:"2rem", color: "#dadada", textShadow: "2px 2px #4d2635"}}>
            Source: <cite title="Source Title">{author}</cite>
        </figcaption>
        </figure>
    )
}
