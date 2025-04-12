const User = require("../models/user.model");

async function getAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.send(allUsers);
}

async function getUserById(req, res) {
  const payload = req.params._id;
  const user = await User.findById({ _id: payload });

  if (!user) {
    return res.status(200).json({
      status: true,
      msg: "user with the _id does not exist",
    });
  }

  return res.status(200).send(user);
}

async function createUser(req, res) {
  const userPayload = req.body;

  if (
    !userPayload.first_name ||
    !userPayload.last_name ||
    !userPayload.email ||
    !userPayload.gender ||
    !userPayload.job_title
  ) {
    return res.status(400).json({
      status: false,
      msg: "All fields are required",
    });
  }

  const exist = await User.findOne({ email: userPayload.email });

  if (exist) {
    return res.status(200).json({
      status: true,
      msg: "username or email already exist",
    });
  }

  const newCreatedUser = await User.create({
    first_name: userPayload.first_name,
    last_name: userPayload.last_name,
    email: userPayload.email,
    gender: userPayload.gender,
    job_title: userPayload.job_title,
  });

  if (newCreatedUser) {
    return res.status(201).json({
      status: true,
      msg: "user created successfully",
      userDetails: newCreatedUser,
    });
  } else {
    return res.status(500).json({
      status: false,
      msg: "Something went wrong while creating the user",
    });
  }
}

async function updateUser(req, res) {
  const userPayload = req.body;

  if (!userPayload.email) {
    return res.status(400).json({
      status: false,
      msg: "email is required to update the profile",
    });
  }

  const updatedUser = await User.findOneAndUpdate(
    { email: userPayload.email },
    { ...userPayload }
  );

  if (updatedUser) {
    return res.status(200).json({
      status: true,
      msg: "user updated successfully",
      userDetails: updatedUser,
    });
  } else {
    return res.status(500).json({
      msg: "Something went wrond while updating the user",
    });
  }
}

async function deleteUser(req, res) {
  const payload = req.body;

  if (!payload.email) {
    return res.status(400).json({
      status: false,
      msg: "email is required to delete the account",
    });
  }

  const existUser = await User.findOne({ email: payload.email });

  if (!existUser) {
    return res.status(400).json({
      status: false,
      msg: "user does not exist",
    });
  }

  const deletedUser = await User.findOneAndDelete({ email: payload.email });

  if (deletedUser) {
    return res.status(200).json({
      status: true,
      msg: "account deleted successfully",
    });
  } else {
    return res.status(500).json({
      status: false,
      msg: "Something went wrong while deleting the account",
    });
  }
}

async function deleteById(req, res) {
  const id = req.params._id;

  if (!id) {
    return res.status(400).json({
      status: false,
      msg: "_id is required to delete the account",
    });
  }

  const existUser = await User.findOne({ _id: id });

  if (!existUser) {
    return res.status(400).json({
      status: false,
      msg: "user does not exist",
    });
  }

  const deletedUser = await User.findOneAndDelete({ _id: id });

  if (deletedUser) {
    return res.status(200).json({
      status: true,
      msg: "account deleted successfully",
    });
  } else {
    return res.status(500).json({
      status: false,
      msg: "Something went wrong while deleting the account",
    });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteById,
};
