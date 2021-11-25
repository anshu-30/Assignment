const express = require('express')
const app=express(); // call as fucntion
const cors = require('cors')
const mongoose = require('mongoose')
const User =  require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json()) //middleware

mongoose.connect('mongodb://localhost:27017/assignment')

app.post('/api/register',async(req,res) =>{
    console.log(req.body)
    try{
        await User.create({
            firstname: req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password,
            date:req.body.date,
            phone:req.body.phone,
        })
        res.json({status:'ok'})
    } catch(err){
        console.log(err)
        res.json({status:'error', error: 'Duplicate email' })
    }
    
})

app.post('/api/login',async(req,res) =>{
    console.log(req.body)
    const user = await User.findOne({
        email: req.body.email
    })
    if(!user)
    {
        return { status: 'error', error: 'Invalid login' }
    }
    let isPasswordValid = (
		(req.body.password)===(user.password)
	)
    
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				firstname: user.firstname,
                lastname: user.lastname,
				email: user.email,
                date: user.date,
                phone: user.phone,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
       
})


app.get('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', quote: user.quote })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.listen(1337,() => {
    console.log('Server started on 1337')
})