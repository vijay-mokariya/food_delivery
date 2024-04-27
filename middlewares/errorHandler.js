const errorHandler = (error, req, res, next) => {
    return res.status(500).end(error.message);

    //console.log(error);
};

module.exports = errorHandler;