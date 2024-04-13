import mongoose from "mongoose"
import emailValidator from "email-validator"

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email)
        }
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
        validate: function () {
            return this.confirmPassword == this.password
        }
    }
})

userSchema.pre('save', function (next) {
    this.confirmPassword = undefined
    next()
})

const User = mongoose.model('User', userSchema)


export { User, userSchema }