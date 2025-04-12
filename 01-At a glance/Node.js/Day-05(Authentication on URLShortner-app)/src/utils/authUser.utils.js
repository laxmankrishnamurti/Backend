const sessingToUserMap = new Map()

function setUser(id, user){
    sessingToUserMap.set(id, user);
}

function getUser(id){
    sessingToUserMap.get(id);
}


module.exports = { setUser, getUser }