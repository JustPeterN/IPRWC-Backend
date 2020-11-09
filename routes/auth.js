const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//register
router.post('/register', async (req,res) => {

    //check if email exists
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        streetName: req.body.streetName,
        houseNumber: req.body.houseNumber,
        city: req.body.city,
        postalCode: req.body.postalCode
    });

    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err) {
        res.send({message : err});
    }
});

//login
router.post('/login', async (req,res) =>{

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Password is wrong');

    //create jwt token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    
    res.send('logged in!');
});

module.exports = router;
