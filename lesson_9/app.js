const SwaggerExpress = require('swagger-express-mw');
const SwagerUi = require('swagger-tools/middleware/swagger-ui');
const express = require('express');
const port = 3000;
let app = express();
const config = {
	appRoot: __dirname // required config
};

app.get("/hello/:name", (req, res) => {
	const response = {
		"message": `Hello World ${req.params.name}`
	}
	
    res.send(response);
});



SwaggerExpress.create(config, (err, swagger) => {
	if (err) { throw err; }

	app.use(SwagerUi(swagger.runner.swagger));
	
	// install middleware
	swagger.register(app);

	app.listen(port, () => (console.log("Server on localhost:"+port)));
});