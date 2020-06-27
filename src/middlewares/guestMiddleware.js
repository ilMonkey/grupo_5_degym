// Creo una function middleware
function guestMiddleware(req, res, next){

	//Preguntamos si alguien no esta en session--> si no hay nadie en session la variable va a estar indefinida. Si es undefined quiere decir que no esta logeado y lo redirigimos a login
	if(req.session.idDelUsuario != undefined){
		return res.redirect('/')
	}
	next();

}

// Lo llevamos a  nivel de rutas
module.exports = guestMiddleware