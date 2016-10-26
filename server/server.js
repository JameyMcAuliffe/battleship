'use strict'

const express = require('express')
// const { connect } = require('../db/database')
const { Server } = require('http')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const socketio = require('socket.io')

//initialize app into express
const app = express()

//creates a secondary http server to listen to web sockets
const server = Server(app)
const io = socketio(server)

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/battleship'
const PORT = process.env.PORT || 3000

//middlewares
//express.static executes in the context of where your node_moduels dir is
app.use(express.static('client'))
app.use(json())

app.get('/api/title', (req, res) => {
	res.json({title: 'Battleship'})
})

const User = mongoose.model('user', {
	email: String,
	password: String
})

//using es6 promises as promise library
mongoose.Promise = Promise

mongoose.connect(MONGODB_URL, () => {
	//server.listen listens for both app and server
	server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
})


//Listens to Port for changes
io.on('connection', socket => {
	console.log(`Socket connected: ${socket.id}`)
	socket.on('disconnect', () => console.log(`Socket disconnected: ${socket.id}`))
	socket.on('registerUser', user => {
		User
		.create(user)
		.then(user => io.emit('newUser', user))
		.catch(console.error)
	})
})

