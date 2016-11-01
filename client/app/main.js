'use strict'

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


	/****************** Controllers *****************/

	battleship.controller('MainCtrl', function($scope, $http) {
		
	})

	battleship.controller('LoginCtrl', function($scope, $http, $location) {
		$scope.loginUser = () => {
			const user = {
				email: $scope.email,
				password: $scope.password
			}		
		}
	})

	

socket.on('connect', () => console.log(`Socket connected: ${socket.id}`))
socket.on('disconnect', () => console.log('Socket disconnected'))





