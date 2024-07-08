const USER = require('../models/user.model')

async function handleUserRegistration(req, res){
    const userPayload = req.body

    if(!userPayload.name || !userPayload.email || !userPayload.password){
        return res.render("userRegistration", {
            status: "missing",
            msg: "All fields are required"
        })
    }

    const existUser = await USER.findOne({"email": userPayload.email})

    if(existUser){
        res.render("userRegistration", {
            status: "exist",
            msg: "user already exist, Please login"
        })
    }

    const createUserAccount = await USER.create({
        name: userPayload.name,
        email: userPayload.email,
        password: userPayload.password
    })

    if(createUserAccount){
        res.redirect('/url')
    }else {
        res.render("userRegistration", {
            "msg": "Internal server error, please try after some time"
        })
    }

}

module.exports = {handleUserRegistration}