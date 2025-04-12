const {getUser} = require('../utils/authUser.utils')

async function restrictToLoggedInUserOnly(req, res, next){
    const userSessionId = req.cookies?.sessionId;

    if(!userSessionId){
        res.redirect('/login')
    }

    const user = getUser(userSessionId);

    if(!user){
        res.redirect('/login')
    }

    res.user = user
    next()

}

async function checkAuth(req, res, next){
    const userSessionId = req.cookies?.sessionId;

    const user = getUser(userSessionId);

    res.user = user
    next()
}

module.exports = restrictToLoggedInUserOnly