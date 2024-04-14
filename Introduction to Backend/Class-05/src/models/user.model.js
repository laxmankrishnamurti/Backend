import monggose from "mongoose"
import emailValidator, { validate } from "email-validator"


const userSchema = new monggose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email)
        }
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String,
        validate: function () {
            return this.password === this.confirmPassword
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    profileImage: {
        type: String,
        default: '/public/deault/profileImage.jpeg'
    }
})

//Defining database hooks

userSchema.pre('save', function () {
    this.confirmPassword = undefined
})

const User = monggose.model("User", userSchema)
export { userSchema, User }