exports.isAuth = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
};

exports.isAdmin = (req,res,next) =>{
    console.log(req.session)
    if(req.session.user.userLevel > 1){
        return res.redirect('/');
    }
    next();
};