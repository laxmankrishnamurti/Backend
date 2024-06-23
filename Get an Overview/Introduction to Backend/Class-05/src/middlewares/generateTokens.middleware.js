import jwt from "jsonwebtoken"

const generateJWTTokens = async function (username, password) {
    return jwt.sign(
        {
            username: username,
            password: password
        },
        process.env.SECRET_KEY
    )
}


export default generateJWTTokens