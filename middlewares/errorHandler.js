const errorHandler = (error, req, res, next) => {

    // error.statusCode = error.statusCode || 500;

    // res.status(error.statusCode).json({
    //     message: error.message
    // });

    return res.status(500).json({ message: error.message });

    //console.log(error);
};

module.exports = errorHandler;
