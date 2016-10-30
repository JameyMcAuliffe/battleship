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

	battleship.factory('socket', function ($rootScope) {
  const socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        let args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        let args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

	battleship.controller('BattleCtrl', function($scope, $http, socket) {
		const board_1 = document.querySelector('.board_1')
		const board_2 = document.querySelector('.board_2')

		const drawBoard = b => {
			board_1.innerHTML = `
				<table>
					<tr>
						<td>${b[0][0]}</td>
						<td>${b[0][1]}</td>
						<td>${b[0][2]}</td>
						<td>${b[0][3]}</td>
						<td>${b[0][4]}</td>
						<td>${b[0][5]}</td>
						<td>${b[0][6]}</td>
						<td>${b[0][7]}</td>
						<td>${b[0][8]}</td>
						<td>${b[0][9]}</td>
					</tr>
					<tr>
						<td>${b[1][0]}</td>
						<td>${b[1][1]}</td>
						<td>${b[1][2]}</td>
						<td>${b[1][3]}</td>
						<td>${b[1][4]}</td>
						<td>${b[1][5]}</td>
						<td>${b[1][6]}</td>
						<td>${b[1][7]}</td>
						<td>${b[1][8]}</td>
						<td>${b[1][9]}</td>
					</tr>
					<tr>
						<td>${b[2][0]}</td>
						<td>${b[2][1]}</td>
						<td>${b[2][2]}</td>
						<td>${b[2][3]}</td>
						<td>${b[2][4]}</td>
						<td>${b[2][5]}</td>
						<td>${b[2][6]}</td>
						<td>${b[2][7]}</td>
						<td>${b[2][8]}</td>
						<td>${b[2][9]}</td>
					</tr>
					<tr>
						<td>${b[3][0]}</td>
						<td>${b[3][1]}</td>
						<td>${b[3][2]}</td>
						<td>${b[3][3]}</td>
						<td>${b[3][4]}</td>
						<td>${b[3][5]}</td>
						<td>${b[3][6]}</td>
						<td>${b[3][7]}</td>
						<td>${b[3][8]}</td>
						<td>${b[3][9]}</td>
					</tr>
					<tr>
						<td>${b[4][0]}</td>
						<td>${b[4][1]}</td>
						<td>${b[4][2]}</td>
						<td>${b[4][3]}</td>
						<td>${b[4][4]}</td>
						<td>${b[4][5]}</td>
						<td>${b[4][6]}</td>
						<td>${b[4][7]}</td>
						<td>${b[4][8]}</td>
						<td>${b[4][9]}</td>
					</tr>
					<tr>
						<td>${b[5][0]}</td>
						<td>${b[5][1]}</td>
						<td>${b[5][2]}</td>
						<td>${b[5][3]}</td>
						<td>${b[5][4]}</td>
						<td>${b[5][5]}</td>
						<td>${b[5][6]}</td>
						<td>${b[5][7]}</td>
						<td>${b[5][8]}</td>
						<td>${b[5][9]}</td>
					</tr>
					<tr>
						<td>${b[6][0]}</td>
						<td>${b[6][1]}</td>
						<td>${b[6][2]}</td>
						<td>${b[6][3]}</td>
						<td>${b[6][4]}</td>
						<td>${b[6][5]}</td>
						<td>${b[6][6]}</td>
						<td>${b[6][7]}</td>
						<td>${b[6][8]}</td>
						<td>${b[6][9]}</td>
					</tr>
					<tr>
						<td>${b[7][0]}</td>
						<td>${b[7][1]}</td>
						<td>${b[7][2]}</td>
						<td>${b[7][3]}</td>
						<td>${b[7][4]}</td>
						<td>${b[7][5]}</td>
						<td>${b[7][6]}</td>
						<td>${b[7][7]}</td>
						<td>${b[7][8]}</td>
						<td>${b[7][9]}</td>
					</tr>
					<tr>
						<td>${b[8][0]}</td>
						<td>${b[8][1]}</td>
						<td>${b[8][2]}</td>
						<td>${b[8][3]}</td>
						<td>${b[8][4]}</td>
						<td>${b[8][5]}</td>
						<td>${b[8][6]}</td>
						<td>${b[8][7]}</td>
						<td>${b[8][8]}</td>
						<td>${b[8][9]}</td>
					</tr>
					<tr>
						<td>${b[9][0]}</td>
						<td>${b[9][1]}</td>
						<td>${b[9][2]}</td>
						<td>${b[9][3]}</td>
						<td>${b[9][4]}</td>
						<td>${b[9][5]}</td>
						<td>${b[9][6]}</td>
						<td>${b[9][7]}</td>
						<td>${b[9][8]}</td>
						<td>${b[9][9]}</td>
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
		socket.on('update board', function (gameBoard) {
			$scope.boardState = gameBoard
			console.log("gb", $scope.boardState)
			drawBoard($scope.boardState)
		})

		//drawBoard(boardState)
	})

socket.on('connect', () => console.log(`Socket connected: ${socket.id}`))
socket.on('disconnect', () => console.log('Socket disconnected'))
// socket.on('update board', gameBoard => drawBoard(gameBoard))





