import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //try to console the file method.
    }
})

export const upload = multer({
    // storage: storage   (if both are equall then we can simply write it at one time. {es6 feature})
    storage
})