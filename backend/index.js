const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')
const bcrypt = require('bcryptjs')
const imageDownloader = require('image-downloader')
const CookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.use(CookieParser());

const bcryptSalt = bcrypt.genSaltSync(12)
const jwtSecret = "abcdjasfnasjfk"
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    res.send('test ok')
})

app.post('/register',async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userDoc = await User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcryptSalt),
        });
        console.log(userDoc);
        res.json(userDoc);
    }
    catch (err) {
        res.status(422).json(err);
    }
}) 

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email });
    if (user) {
        const isPsaswordMatch = bcrypt.compareSync(password, user.password)
        if (isPsaswordMatch) {
            jwt.sign(
                { email: user.email, id: user._id, name: user.name},
                "abcdjasfnasjfk", {}, (err, token) => {
                    if (err) throw err
                    res.cookie('token', token).json(user)
                }
            );
        } else {
            res.status(422).json('not ok')
        }
    } else {
        res.json('not found')
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, jwtSecret, {},async (err, user) => {
            if (err) throw err
            const {name, email, _id} = await User.findById(user.id)
            res.json({name, email, _id})
        })
    } else {
        res.json(null)
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async(req, res) => {
    const { link } = req.body
    console.log(link);
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads' + newName
    })
    res.json(newName)
})

app.listen(4000)