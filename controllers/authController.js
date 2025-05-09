exports.getLogin = (req, res) => {
    res.render('login', {
      title: 'Login',
      stylesheet: 'login', 
      script: 'login'
    });
  };

  
exports.getSignup = (req, res) => {
    res.render('signup', {
      title: 'Signup',
      stylesheet: 'signup', 
      script: 'signup'
    });
  };
