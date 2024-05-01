const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../midddleware/fetchuser');
const JWT_SECRET = "lernwiths2isverygood@";// process.env.JWT_SECRET;// import from env file

//ROUTE 1:*****************************Create a user using: POST "/api/auth"/createuser. Doesn't require auth **********************************

router.post('/createuser',
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Enter a valid Password').isLength({ min: 6 }),

  // Send data 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check the user exists with this email 
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        var success = false
        return res.status(400).json({ success: success, error: 'This email is alrady exists with a user' })
      }
      // create a password hash
      const salt = bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user 
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
        user: {
          id: user.id
        }
      }
      // create a authontication tocken
      const authtoken = jwt.sign(data, JWT_SECRET);
      var success = true;
      res.json({ success: success, authtoken: authtoken })
    }
    // get error if try part not working
    catch (error) {
      var success = false;
      res.status(500).send({ success: success, error: 'Some error occured' })
    }

  })



//ROUTE 2: *****************************Login a user using: POST "/api/auth"/login. Doesn't require auth **********************************
router.post('/login',
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Please enter valid crediantions').exists(),

  // Send data 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var success = false;
      return res.status(400).json({ success: success, errors: errors.array() });
    }

    let password = req.body.password;
    let email = req.body.email;
    try {
      // check the user exists with this email 
      let user = await User.findOne({ email })
      if (!user) {
        var success = false;
        return res.status(400).json({ success: success, error: 'Please enter valid email' })
      }
      //password compare
      const passwordCompare = await bcrypt.compare(password, user.password)
      if (!passwordCompare) {
        var success = false;
        return res.status(400).json({ success: success, error: 'Please enter valid password' })
      }

      const data = {
        user: {
          id: user.id
        }
      }
      // create a authontication tocken
      const authtoken = jwt.sign(data, JWT_SECRET);
      var success = true;
      res.json({ success: success, authtoken: authtoken })
    }
    // get error if try part not working
    catch (error) {
      var success = false;
      res.status(500).send({ success: success, error: 'Some error occured' })
    }

  })


//ROUTE 3:*****************************Get logedin user details using: POST "/api/auth"/getuser. Doesn't require auth **********************************
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    // check the user exists with this email 
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user)
  }
  // get error if try part not working
  catch (error) {
    var success = false;
    res.status(500).send({ success: success, error: 'Invalid server error' })
  }

})

//ROUTE 4:*****************************Get all users details using: POST "/api/auth"/fetchallusers. Doesn't require auth **********************************
router.get('/fetchallusers', async (req, res) => {

  try {
    // check the user exists with this email 
    const user = await User.find();
    res.send(user)
  }
  // get error if try part not working
  catch (error) {
    var success = false;
    res.status(500).send({ success: success, error: 'Invalid server error' })
  }

})

module.exports = router