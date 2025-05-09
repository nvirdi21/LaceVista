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
