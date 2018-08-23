var middlewareObject = {};

middlewareObject.isLoggedIn = function(req, res, next){
  
  if(req.isAuthenticated()){
      return next();
  }
  req.flash("error", "Oops! Please Login..!!");
  res.redirect("/login");
    
};

module.exports = middlewareObject;