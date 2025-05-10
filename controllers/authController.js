const User = require('../models/user');
// const bcrypt = require('bcryptjs');

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

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, mobile, password } = req.body;

    // sanity‐check inputs
    if (!first_name || !last_name || !email || !mobile || !password) {
      return res.status(400).send('All fields are required');
    }

    // const existingUser = await User.findOne({ email });
    // if (existingUser) return res.send('User already exists');
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
      mobile
    });

    await newUser.save();
    // res.send('User registered successfully');
    res.render('login', {
      title: 'Login',
      stylesheet: 'login',
      script: 'login'
    });
  }
  catch (err) {
    // correctly log the caught error
    console.error('Error in createUser:', err);
    // send back the actual message in dev, or a generic in prod
    res.status(500).send(process.env.NODE_ENV === 'development'
      ? `Server Error: ${err.message}`
      : 'Server Error');
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login Input:', req.body);
    const userFind = await User.findOne({ email });
    console.log('Found:', userFind);
    if (userFind && userFind.password === password) {
      console.log('Validated:', userFind);
      req.session.user = userFind;
      res.redirect('shop'); // Redirect to shop or home page
    } else {
      res.render('login', { error: 'Invalid email or password' });
    }
  }
  catch (err) {
    console.error('Login Error:', err);
    res.render('login', { error: 'Something went wrong. Please try again.' });
  }
};

// cls