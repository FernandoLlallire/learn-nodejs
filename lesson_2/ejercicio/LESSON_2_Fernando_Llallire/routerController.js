
module.expot = {
    addMsg : (req,res) => {
        res.send("El numero de usuario es : " + req.params.id)
    }
}