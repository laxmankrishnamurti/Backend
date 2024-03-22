const connectDB = (fun) => {
    (req, res, next) => {
        Promise.resolve(fun(req, res, next)).catch((error) => next(error))
    }
}

export { connectDB }


// Using async & await

// const requestHandler = (fun) => async (req, res, next) => {
//     try {
//         await fun(req, res, next)
//     } catch (error) {
//         res.Status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// export { requestHandler }