import CustomSocket from "@/components/socket/CustomSocket";

export const metadata = {
    title: "Game",
    description: "Game Page",
  };


const getData = async  () => {
    const res = await fetch("http://localhost:3000/api/game")
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}




export default async function Game(){
    const data = await getData()
    return (
        <div className="p-5 new-section bg-second d-flex flex-column align-items-center justify-content-end">
            <CustomSocket/>
        </div>
    )
}