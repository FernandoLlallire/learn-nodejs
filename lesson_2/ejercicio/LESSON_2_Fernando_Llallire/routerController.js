const uuid4 = require("uuid4");
const file =  require('./File.js');
const msgs = require('./Msgs.js');
//const argv = require('yargs').argv;
//const msg = argv.msg;

const id = uuid4();
const msgs = [];
module.exports = {
    addMsg : (req,res) => {
        if(!req.params.id){
            return res.status(404).render("No pasaste ID")
        }
        res.send("El numero de usuario es : " + req.params.id)
    },
    principalPage : (req,res,next) => {
      //  res.send("Pagina principal \n Ingrese usuario por get \"localhost:800/:id\"" + JSON.stringify(testing));
        testing.push({hola: "asdasd", uuid4: id});
        res.send("Pagina principal \n Ingrese usuario por get \"localhost:800/:id\"" );
        next();
    }
}