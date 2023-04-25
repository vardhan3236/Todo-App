class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


export const errorMiddleware = async(err, req, res, next) => {

    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 404;

    return res.status(err.statusCode)
    .json({
        success: false,
        message: err.message
    });
};

export default ErrorHandler;