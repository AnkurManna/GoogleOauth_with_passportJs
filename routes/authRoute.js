const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile']
    }));
    
   

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
    // Successful authentication, redirect home.
    console.log("succes log")
    console.log("req.user",req.user)

    res.redirect('/');
    });

    app.get('/api/current_user',(req,res)=>{
        //console.log("current_user",req)
        
        res.send(req.user)
    })

    app.get('/api/logout',(req,res)=>{
        console.log("here loggin out")
        req.logout();
        res.redirect('/');
    })

  app.post('/auth/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

    

}
