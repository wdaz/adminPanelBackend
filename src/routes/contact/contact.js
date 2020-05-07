const router = require('express').Router();
const Contact= require('../../model/Contact');



router.get('/', (req, res) => {
    Contact.find({}, function (err, contacts) {
        res.json(contacts);
    });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const contact= await findOne(id)
    res.json(contact)
});


router.post('/post', async (req, res) => {

    const emailExist = await Contact.findOne({
        email: req.body.email
    })

    if (emailExist) return res.status(400).send('Email alredy exists')

    const contact = new Contact({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
    })

    try {
        const savedPost = await contact.save()
        res.json(savedPost)
    } catch (err) {
        res.status(400).send(err)
    }
});


router.put('/update/:id', async (req, res) => {

    const contact = {
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
        const savedPost = await findUser.updateOne(contact)
        res.json(savedPost)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const findUser = await findOne(id);
   
    try {
       await findUser.delete()
        res.json('ok')
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;


const findOne = (id) => {
    return Contact.findOne({ _id: id })
}