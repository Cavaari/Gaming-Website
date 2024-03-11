const secret_code = "JusGwYrsT"

export default function handler(req, res) {
    if (req.query.code == secret_code) {
        res.status(200).json("Right Code!")
    } else {
        res.status(403).json('Wrong Code!')
    }
}