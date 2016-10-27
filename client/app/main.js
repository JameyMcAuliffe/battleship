'use strict'


//const User = require('../../server/models/user')
const socket = io()
socket.on('connect', () => console.log(`Socket connected: ${socket.id}`))
socket.on('disconnect', () => console.log('Socket disconnected'))

angular
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
	)
	.controller('MainCtrl', function($scope, $http) {
		// $http
		// 	.get('/api/title')
		// 	.then(({ data: { title }}) => 
		// 		$scope.title = title
		// 	)
	})
	.controller('RegisterCtrl', function($scope, $http) {
		// $http
		// 	.get('/api/title')
		// 	.then(({ data: { title }}) => 
		// 		$scope.title = title
		// 	)
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
	.controller('LoginCtrl', function($scope, $http) {
		$scope.loginUser = () => {
			const user = {
				email: $scope.email,
				password: $scope.password
			}
		}
	})




