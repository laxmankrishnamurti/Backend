const asyncHandler = (fun) => {
    (req, res, next) => {
        Promise.resolve(fun(req, res, next)).catch((error) => next(error))
    }
}

export { asyncHandler }


// Using async & await

// 1st type 

// const connectDB = (fun) => {
//     return (
//         async (req, res, next) => {
//             try {
//                 await connectDB(req, res, next)
//             } catch (error) {
//                 res.Status(error.code || 500).json({
//                     success: false,
//                     message: error.message
//                 })
//             }
//         }
//     )
// }

// export { connectDB }

// 2nd type 

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
