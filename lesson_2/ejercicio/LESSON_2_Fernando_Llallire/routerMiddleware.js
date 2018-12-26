module.exports = {
    msgHandle : (req, res, next) => {
        if(req.params.id === null)
         res.send("No mandaste nada en el id");
        next();
    }
}