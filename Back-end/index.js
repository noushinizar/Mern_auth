const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./db.js')
const User = require('./models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(cors())
app.use(express.json())
connectDB()

// Register Endpoint
app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'error occurred' })
        console.log(err)
    }
})

// Login Endpoint
app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })

        if (user) {
            // Compare hashed password with user-provided password
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            
            if (isPasswordValid) {
                const token = jwt.sign({
                    name: user.name,
                    email: user.email
                }, 'secret123')

                return res.json({ status: 'ok', user: token })
            } else {
                return res.json({ status: 'error', user: false, error: 'Invalid password' })
            }
        } else {
            return res.json({ status: 'error', user: false, error: 'User not found' })
        }
    } catch (err) {
        res.json({ status: 'error', error: 'Something went wrong' })
        console.log(err)
    }
})

app.listen(5000, () => {
    console.log('server started on 3000')
})
