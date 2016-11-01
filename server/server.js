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
let globalGameId
let globalShipsId

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/battleship'
const PORT = process.env.PORT || 3000

//middlewares
app.use(express.static('client'))
app.use(json())

// app.post('/#/battle/create', createGame)

// app.get('/#/battle/create', (req, res, err) =>
//   Game
//     .find()
//     .then(game => console.log(game))
//     .catch(err)
// )



// const startGame = (gameId) => {
// 	console.log('starting game:', gameId)
// }


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
	socket.on('createGame', () => {
		Game.create({})
			//.then(game => emitBoard(game))
			.then(game => {
				globalGameId = game._id
				console.log('gameId:', globalGameId)
				return globalGameId
			})
			.then(createShips())
	})
	socket.on('fireMissile', target => {
		console.log('missile fired')
		fireMissile(target)
	})
})

// function createGame(next) {
// 	Game
// 		.create({})
// 		.then(gameObj => {
// 			console.log('gameObj:', gameObj.board)
// 			//emitBoard(gameObj.board)
// 		})
// 		.catch(err => {
//       if (next) {
//         return next(err)
//       }
//       console.error(err)
//     })
// }


const updateBoard = (gameObj) => {
	//console.log("updateBoard", gameObj);
	let gameId = gameObj.id
	let boardObj = gameObj.board
	console.log('gameId:', gameId)
	console.log('board before going to mongo:', boardObj)
	//send new board to update the db
	return Game
		//finds game on db by id, updates the game object with object passed + returns entire game object
		.findOneAndUpdate({_id: gameId}, { $set: { board: boardObj } }, { upsert: true, new: true }, (err, game) => {
			console.log('game post update:', game)
		})
		// .then(updatedObj => {
		// 	//console.log(updatedObj)
		// 	return updatedObj
		// })
}

//accepts target object containing col and row from fire missile emit event
const fireMissile = (target) => {
	let col = target.col
	let row = target.row
	console.log('row:', row)
	console.log('col:', col)
	Game
		.findById(globalGameId)
		.then(gameObj => {
			// console.log('gameId:', gameObj._id)
			// return gameObj
			//let gameId = gameObj._id
			//gamePlay(gameObj)
			gameObj.board[row][col] = `X`
			//console.log('targeted box:', gameObj.board)
			let updatedObj = {
				board: gameObj.board,
				id: gameObj._id
			}
			return updatedObj
		})
		.then(updatedObj => {
			updateBoard(updatedObj)
		})
}

function gamePlay(gameObj) {
	console.log('current game board:', gameObj._id)
}


const emitBoard = (gameObj) => {
	//sends to sockets on front end
	io.emit('draw board', gameObj.board)
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
	.then(ships => {
		globalShipsId = ships._id
		console.log('shipsArrayId:', globalShipsId)
	})
}







