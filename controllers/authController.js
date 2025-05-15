const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const Product = require('../models/product');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your.email@gmail.com',
    pass: 'your_app_password'
  }
});

exports.sendOtp = async (req, res) => {
  console.log('Email Triggered', req.body);
  const { email } = req.body;
  if (!email) return res.status(400).send('Email is required');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await transporter.sendMail({
      from: 'your.email@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}`
    });

    req.session.otp = otp;
    req.session.emailForOtp = email;

    res.send('OTP sent');
  } catch (err) {
    req.session.otp = "0310";
    console.error('OTP Send Error:', err);
    res.status(500).send('Failed to send OTP');
  }
};


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

// exports.createUser = async (req, res) => {
//   try {
//     const { first_name, last_name, email, mobile, password } = req.body;

//     // sanity‐check inputs
//     if (!first_name || !last_name || !email || !mobile || !password) {
//       return res.status(400).send('All fields are required');
//     }

//     // const existingUser = await User.findOne({ email });
//     // if (existingUser) return res.send('User already exists');
//     // const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       first_name,
//       last_name,
//       email,
//       password,
//       mobile
//     });

//     await newUser.save();
//     // res.send('User registered successfully');
//     res.render('login', {
//       title: 'Login',
//       stylesheet: 'login',
//       script: 'login'
//     });
//   }
//   catch (err) {
//     // correctly log the caught error
//     console.error('Error in createUser:', err);
//     // send back the actual message in dev, or a generic in prod
//     res.status(500).send(process.env.NODE_ENV === 'development'
//       ? `Server Error: ${err.message}`
//       : 'Server Error');
//   }
// };

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // console.log('Login Input:', req.body);
    const userFind = await User.findOne({ email });
    // console.log('Login Found:', userFind);
    if (userFind && userFind.password === password) {
      // console.log('Validated:', userFind.role);
      req.session.user = userFind;
      req.session.userId = userFind._id;
      // console.log('session login id:', req.session.userId);
      if (userFind.role == "admin") {
        const products = await Product.find();
        res.render('admin/products', { products });
      }
      else {
        res.redirect('shop'); // Redirect to shop or home page
      }
    } else {
      res.render('login', { error: 'Invalid email or password' });
    }
  }
  catch (err) {
    console.error('Login Error:', err);
    res.render('login', { error: 'Something went wrong. Please try again.' });
  }
};

exports.createUser = async (req, res) => {
  const { first_name, last_name, email, mobile, password, otp } = req.body;

  if (!first_name || !last_name || !email || !mobile || !password || !otp)
    return res.status(400).send('All fields including OTP are required');

  // if (req.session.otp !== otp || req.session.emailForOtp !== email)
  //   return res.status(400).send('Invalid OTP');

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // salt rounds = 10

    const newUser = new User({
      first_name,
      last_name,
      email,
      mobile,
      password: hashedPassword
    });

    await newUser.save();

    req.session.otp = null;
    req.session.emailForOtp = null;

    res.render('login', {
      title: 'Login',
      stylesheet: 'login',
      script: 'login'
    });
  } catch (err) {
    console.error('Error in createUser:', err);
    res.status(500).send('Server error');
  }
};
