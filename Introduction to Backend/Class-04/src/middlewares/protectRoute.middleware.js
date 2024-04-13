const protectRoute = async function (req, res, next) {
    let userStatus = req.cookies.isLoggedIn
    if (userStatus) {
        next()
    } else {
        res.json({
            "message": "User logged-out, Operation not allowed",
            "status": 404
        })
    }
}

export default protectRoute