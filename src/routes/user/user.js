const router = require('express').Router();
const User = require('../../model/User');



router.get('/', (req, res) => {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await findOne(id)
    res.json(user)
});


router.post('/post', async (req, res) => {

    const emailExist = await User.findOne({
        email: req.body.email
    })

    if (emailExist) return res.status(400).send('Email alredy exists')

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
    })

    try {
        const savedPost = await user.save()
        res.json(savedPost)
    } catch (err) {
        res.status(400).send(err)
    }
});


router.put('/update/:id', async (req, res) => {

    const user = {
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
    };

    const id = req.params.id;
    const findUser = await findOne(id);

    try {
        const savedPost = await findUser.updateOne(user)
        res.send(savedPost)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const findUser = await findOne(id);
   
    try {
       await findUser.delete()
        res.send('ok')
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;


const findOne = (id) => {
    return User.findOne({ _id: id })
}