
import { findPuzzleGame, handlePuzzleUserInput } from "@/lib/puzzle"

// ex: /api/puzzle/make_move?id=socket_id&game=color%20poem&user_input="white%20green%20red%20yellow"
// Params description
// game types: switch, color poem, wire
// switch: <array of switches in positions>  ex: [01, 10, 01, 01, 10]  - 10 top, 01 bottop, 00 netural
// wire: <color> ex: red
// color poem: <colors array with order user inputed> ex: green white red yellow

export default function handler(req, res) {
    if(!req.query.game){
        res.status(400).json('Provide Game Type!')
    }

    if(!req.query.user_input){
        res.status(400).json('Provide Users Input!')
    }

    if(!req.query.id){
        res.status(400).json('Provide Socket!')
    }

    // const game = findPuzzleGame(req.query.id)
    // if(!game){
    //     res.status(404).json({ message: 'No Such Game!' })
    // }

    switch(req.query.game){
        case "switch":
            res.status(201).json(handlePuzzleUserInput(req.query.id, "switch", req.query.user_input))
            break;
        case "color poem":
            res.status(201).json(handlePuzzleUserInput(req.query.id, "color poem", req.query.user_input)) 
            break;
        case "wire":
            res.status(201).json(handlePuzzleUserInput(req.query.id, "wire", req.query.user_input))
            break;
        default: 
            res.status(400).json({ message: 'Wrong Game Type!' })
    }
}



// const move = {
//     id: "socket_id",
//     game: "switch",
//     user_input: "01110"
// }

// const move = {
//     id: "socket_id",
//     game: "color poem",
//     user_input: "white green red yellow"
// }

// const move = {
//     id: "socket_id",
//     game: "color poem",
//     user_input: "green white red yellow"
// }

// const move = {
//     id: "socket_id",
//     game: "wire",
//     user_input: "red"
// }