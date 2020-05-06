const router = require('express').Router();
const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userValidation, singInValidation } = require('../../validation/validation')


router.post('/singup', async (req, res) => {

    const { error } = userValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const emailExist = await User.findOne({
        email: req.body.email
    })

    if (emailExist) return res.status(400).send('Email alredy exists')

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        email: req.body.email,
        password: hashPassword
    })

    try {
        const savedUser = await user.save();
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err)
    }

})

// Sing IN
router.post('/singin', async (req, res) => {

    // Validation 
    const { error } = singInValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Chechin email exit
    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) return res.status(400).send('Email or password is wrong');

    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong');

    const token = jwt.sign(
        { _id: user._id },
        process.env.TOKEN_SECRET,
        { algorithm:  'HS256' },
        { expiresIn: '1h' })
    res.header('auth-token', token).send(token);
})

module.exports = router;