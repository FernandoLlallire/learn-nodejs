module.exports = {
    /*msgHandle : (req,res,next) => {
        if(isNaN(req.params.id)){
            //console.log(req.params.id);
            res.send("No mandaste nada en el id"+req.params.id+isNaN(req.params.id));
        }
        next();
    },*/
    idHandle : (req,res,next,id) =>{
        if(isNaN(id)){
            return res.status(404).send("El formato de la ruta get tiene que ser \"localhost:800/:id\" <br> Con :id =  numeric")
        }
        next();
    }
}