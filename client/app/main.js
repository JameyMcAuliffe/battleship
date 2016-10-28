'use strict'



// const socket = io()
//const User = require('../../server/models/user')

const battleship = angular
	.module('battleship', ['ngRoute'])
	.config($routeProvider => 
		$routeProvider
			.when('/', {
				controller: 'MainCtrl',
				templateUrl: 'partials/main.html'
			})
			.when('/login', {
				controller: 'LoginCtrl',
				templateUrl: 'partials/login.html'
			})
			.when('/register', {
				controller: 'RegisterCtrl',
				templateUrl: 'partials/register.html'
			})
			.when('/battle', {
				controller: 'BattleCtrl',
				templateUrl: 'partials/battle.html'
			})
	)
	const socket = io()

	battleship.controller('MainCtrl', function($scope, $http) {
		
	})
	battleship.controller('RegisterCtrl', function($scope, $http, $location) {
		$scope.registerUser = () => {
			const user = {
				email: $scope.email,
				password: $scope.password
			}
			if (socket.connected) {
				return socket.emit('registerUser', user)
			}
			$http.post('/api/users', user)
			.then(() => {
				$scope.users.push(user)
			})
			.catch(console.error)	
		}	
	})
	battleship.controller('LoginCtrl', function($scope, $http, $location) {
		$scope.loginUser = () => {
			const user = {
				email: $scope.email,
				password: $scope.password
			}		
		}
	})
	battleship.controller('BattleCtrl', function($scope, $http) {
		const board_1 = document.querySelector('.board_1')
		const board_2 = document.querySelector('.board_2')
		const boardState = [
			['', '', ''],
			['', '', ''],
			['', '', '']
		]

		//const boardState

		const drawBoard = b => {
			board_1.innerHTML = `
				<table>
					<tr>
						<td>${b[0][0]}</td>
						<td>${b[0][1]}</td>
						<td>${b[0][2]}</td>
					</tr>
					<tr>
						<td>${b[1][0]}</td>
						<td>${b[1][1]}</td>
						<td>${b[1][2]}</td>
					</tr>
					<tr>
						<td>${b[2][0]}</td>
						<td>${b[2][1]}</td>
						<td>${b[2][2]}</td>
					</tr>
				</table
			`
			// board_2.innerHTML = `
			// 	<table>
			// 		<tr>
			// 			<td>${b[0][0]}</td>
			// 			<td>${b[0][1]}</td>
			// 			<td>${b[0][2]}</td>
			// 		</tr>
			// 		<tr>
			// 			<td>${b[1][0]}</td>
			// 			<td>${b[1][1]}</td>
			// 			<td>${b[1][2]}</td>
			// 		</tr>
			// 		<tr>
			// 			<td>${b[2][0]}</td>
			// 			<td>${b[2][1]}</td>
			// 			<td>${b[2][2]}</td>
			// 		</tr>
			// 	</table
			// `
		}
		drawBoard(boardState)
	})

socket.on('connect', () => console.log(`Socket connected: ${socket.id}`))
socket.on('disconnect', () => console.log('Socket disconnected'))
socket.on('update board', gameBoard => drawBoard(gameBoard))





