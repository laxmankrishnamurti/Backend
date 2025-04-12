import { User } from "../models/user.model.js";

const updateProfile = async function (req, res) {
    let dataToBeUpdated = req.body;
    let requestedUser = req.cookies.username
    console.log(requestedUser)
    let fetchedUser = await User.findOne({ username: requestedUser })

    for (let key in dataToBeUpdated) {
        fetchedUser[key] = dataToBeUpdated[key]
    }

    const updatedUser = await fetchedUser.save()
    res.json({
        "message": "User updated successfully",
        "updatedData": updatedUser
    })
}

export default updateProfile