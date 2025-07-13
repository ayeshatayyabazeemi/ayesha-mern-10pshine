const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pino=require('pino');
const logger=pino();
// Register
const signup = async (req, res) => {
  try {
    const { username, email, pwd } = req.body;

    // Check if user exists
    if (await User.findOne({ email })) {
      logger.warn(`Login failed: ${username} already exist`);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashed_pwd = await bcrypt.hash(pwd, 10);

    // Create and save user
    const newUser = new User({ username, email, password: hashed_pwd });
    await newUser.save();
    logger.info(`${username} has sign up successfully`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
     logger.error(`Login error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// Login
const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      logger.warn(`Login failed: ${username} not  found`);
      return res.status(400).json({ message: 'Username not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: ${username} has enterted incorrect password`);
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    logger.info(`${username} has sign in successfully`);
    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// const changepassword=async(res,req)=>{
//   try{
//     const{username,newpassword}=req.body;
//     const user=await User.findOne(username);
//     if (!user){
//       logger.warn(`${username} user is not found`)
//       return  res.status(404).json({ message: "User not found" });
//     }
    
//     user.password=await bcrypt.hash(newpassword,10);
//     await user.save()
//     logger.info(`password of ${username} is updated`)
//      res.status(200).json({ message: "Password updated successfully" });

//   }catch(error){
//     logger.error(`password changing error: ${error.message}`);
//      res.status(500).json({ message: error.message });
//   }
// }
module.exports = { signup, signin };
