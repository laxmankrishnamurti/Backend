const getResetToken = async function (req, res) {
    console.log(req.cookies)
    let fetchedToken = req.cookies.resetToken
    console.log(fetchedToken)

    res.json({
        "message": "Token fetched successfully",
        "TokenValue": fetchedToken
    })
}

export default getResetToken