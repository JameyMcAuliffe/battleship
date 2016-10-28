'use strict'

const express = require('express')
const { Server } = require('http')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const socketio = require('socket.io')
const User = require('./models/user')
const Game = require('./models/gameBoard')
const app = express()
const server = Server(app)
const io = socketio(server)

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/battleship'
const PORT = process.env.PORT || 3000

//middlewares

app.use(express.static('client'))
app.use(json())
// app.get('/api/title', (req, res) => {
// 	res.json({title: 'Battleship'})
// })

// app.get('/battle', (req, res) => {
// 	Game.create({})
// 		.then( game => res.redirect(`/battle/${game._id}`));
// })


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

const emitBoard = (gameObj) => {
	//sends to sockets on front end
	io.emit('update board', gameObj.board)
	return gameObj
}

Game.create({})
	.then(game => emitBoard(game))

//Game.create({}).then(game => console.log("game", game));



// const emitBoard = (gameObj) => {
// 	//sends to sockets on front end
// 	io.emit('update board', gameObj.board)
// 	return gameObj
// }





