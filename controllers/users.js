const User=require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
    // res.send("Welcome");
    res.render("users/signup.ejs");
};

module.exports.signup= async(req, res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser =new User({email,username});
        const registeredUser= await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wonderlust");
            res.redirect("/listings");
        });
       

    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm=(req,res)=>{
    // res.send("Welcome");
    res.render("users/login.ejs");
};
module.exports.login= async(req,res)=>{
    // res.send("welcome");
    req.flash("success","Welcome to WanderLust !! You are successfully logged in");
    let redirectURL = res.locals.redirectURL || "/listings";
    res.redirect( redirectURL);

};
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            req.flash("error",err.message);
        }
    });
    req.flash("success","You are successfully logged out");
    res.redirect("/listings");


};
