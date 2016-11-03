'use strict'

const express = require('express')
const { Server } = require('http')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const socketio = require('socket.io')
const User = require('./models/user')
const Game = require('./models/gameBoard')
//const Ships = require('./models/ship')
const app = express()
const server = Server(app)
const io = socketio(server)
let globalGameId
//let globalShipsId

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
	socket.on('createGame', () => {
		Game.create({})
			//.then(game => emitBoard(game))
			.then(game => {
				globalGameId = game._id
				console.log('gameId:', globalGameId)
				return globalGameId
			})
			//.then(createShips())
	})
	socket.on('fireMissile', target => {
		console.log('missile fired')
		fireMissile(target)
	})
	socket.on('placeShip', location => {
		console.log('ship placed')
		placeShip(location)
	})
	socket.on('startDemo', () => {
		Game
			.findById(globalGameId)
			// .then(gameObj => {
			// 	updateBoard(gameObj)
			// 	return gameObj
			// })
			.then(gameObj => {
				emitBoard(gameObj)
			})
	})
})


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

//accepts target object containing col and row from placeShip emit event
const placeShip = (location) => {
	let col = location.col
	let row = location.row
	console.log('row:', row)
	console.log('col:', col)
	Game
		.findById(globalGameId)
		.then(gameObj => {
			// console.log('gameId:', gameObj._id)
			// return gameObj
			//let gameId = gameObj._id
			//gamePlay(gameObj)
			gameObj.board[row][col] = `.`
			//console.log('targeted box:', gameObj.board)
			let updatedObj = {
				board: gameObj.board,
				id: gameObj._id
			}
			return updatedObj
		})
		.then(updatedObj => {
			updateBoard(updatedObj)
			//return updatedObj
		})
		// .then(updatedObj => {
		// 	emitBoard(updatedObj)
		// 	//console.log('emit obj:', updatedObj)
		// })
}

// const startDemo = (updatedObj) => {
// 	emitBoard(updatedObj)
// }

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
			let target = gameObj.board[row][col]
			console.log('target:', target)
			//gameObj.board[row][col] = `x`
			if (target === '.') {
				gameObj.board[row][col] = 'X'
				console.log('Target Hit')
				//io.emit('hitTarget', target)
				return gameObj
				
			}
			else {
				gameObj.board[row][col] = 'O'
				console.log('Target Missed')
				//io.emit('missedTarget', target)
				return gameObj
			}
			//console.log('targeted box:', gameObj.board)
			let updatedObj = {
				board: gameObj.board,
				id: gameObj._id
			}
			return updatedObj
		})
		.then(updatedObj => {
			updateBoard(updatedObj)
			return updatedObj
		})
		.then(updatedObj => {
			emitBoard(updatedObj)
			//console.log('emit obj:', updatedObj)
		})
}


const emitBoard = (gameObj) => {
	//sends to sockets on front end
	io.emit('draw board', gameObj.board)
	return gameObj
}












/************************ FULL GAME FUNCTIONALITY ***************************/

// function gamePlay(gameObj) {
// 	console.log('current game board:', gameObj._id)
// }

 //const createShips = () => {
// 	Ships.create({
// 		ships: [
// 			{
// 				name: 'Carrier',
// 				size: 5
// 			},
// 			{
// 				name: 'Battleship',
// 				size: 4
// 			},
// 			{
// 				name: 'Submarine',
// 				size: 3
// 			},
// 			{
// 				name: 'Cruiser',
// 				size: 3
// 			},
// 			{
// 				name: 'Destroyer',
// 				size: 2
// 			}
// 		]
// 	})
// 	.then(ships => {
// 		globalShipsId = ships._id
// 		console.log('shipsArrayId:', globalShipsId)
// 		let shipsArray = []
// 		for (let i = 0; i < 5; i++) {
// 			shipsArray.push(ships.ships[i])
// 		}
// 		console.log('shipsArray:', shipsArray)
// 		io.emit('insertShips', (shipsArray))
// 	})
//}







