
module.exports = {
    addMsg : (req,res) => {
        if(!req.params.id){
            return res.status(404).render("No pasaste ID")
        }
        res.send("El numero de usuario es : " + req.params.id)
    },
    principalPage : (req,res,next) => {
        res.send("Pagina principal \n Ingrese usuario por get \"localhost:800/:id\"");
        next();
    }
}