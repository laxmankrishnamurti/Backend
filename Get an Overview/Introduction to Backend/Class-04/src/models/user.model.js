import mongoose from "mongoose"
import emailValidator from "email-validator"
import bcrypt from "bcrypt"


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

// userSchema.pre('save', async function () {
//     try {
//         let salt = await bcrypt.genSalt(10);
//         let hashedPassword = await bcrypt.hash(this.password, salt)
//         this.password = hashedPassword
//     } catch (error) {
//         console.log('Error while bcrypting password', error)
//     }
// })

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         return next()
//     } else {
//         this.password = bcrypt.hash(this.password, 10)
//         next()
//     }
// })

// userSchema.methods.isValidPassword = async function (password) {
//     return await bcrypt.compare(password, this.password)
// }


userSchema.pre('save', function (next) {
    this.confirmPassword = undefined
    next()
})


const User = mongoose.model('User', userSchema)

export { User, userSchema }