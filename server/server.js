'use strict'

const express = require('express')
const { Server } = require('http')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const socketio = require('socket.io')
const User = require('./models/user')
const Game = require('./models/gameBoard')
const Ships = require('./models/ship')
const app = express()
const server = Server(app)
const io = socketio(server)

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/battleship'
const PORT = process.env.PORT || 3000

//middlewares

app.use(express.static('client'))
app.use(json())



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
	socket.on('startGame', () => {
		Game.create({})
			.then(game => emitBoard(game))
			.then(createShips())
	})
})

const emitBoard = (gameObj) => {
	//sends to sockets on front end
	io.emit('update board', gameObj.board)
	return gameObj
}

const createShips = () => {
	Ships.create({
		ships: [
			{
				name: 'Carrier',
				size: 5
			},
			{
				name: 'Battleship',
				size: 4
			},
			{
				name: 'Submarine',
				size: 3
			},
			{
				name: 'Cruiser',
				size: 3
			},
			{
				name: 'Destroyer',
				size: 2
			}
		]
	})
}






// const fireMissile = (board) => {
// 	board.addEventListener('click', evt => {
// 	  let col = evt.target.parentNode.cellIndex
// 	  let row = evt.target.closest('tr').rowIndex
// 	  console.log("clicked on row: ", row);
// 	  console.log("clicked on col: ", col);
// 	  io.emit('fire', { row, col })
// 	})
// }

// Game.create({})
// 	.then(game => emitBoard(game))

//Game.create({}).then(game => console.log("game", game));



// const emitBoard = (gameObj) => {
// 	//sends to sockets on front end
// 	io.emit('update board', gameObj.board)
// 	return gameObj
// }





