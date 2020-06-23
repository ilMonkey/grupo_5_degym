function cookieAuth(req,res,next){
	// Tenemos que preguntar si hay una cookie o si ya hay alguien en session
	if(req.session.idDelUsuario || req.cookies.userCookie){
        // Si viene el usuario en session usa el usuario en session, sino usa al que venga por cookies 
	    req.session.idDelUsuario = req.session.idDelUsuario ? req.session.idDelUsuario : req.cookies.userCookie 
    }
    next()
}
module.exports = cookieAuth;