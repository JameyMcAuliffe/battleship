'use strict'


const battleship = angular
	.module('battleship', ['ngRoute'])
	.config($routeProvider => 
		$routeProvider
			.when('/', {
				controller: 'MainCtrl',
				templateUrl: 'partials/main.html'
			})
			.when('/battle', {
				controller: 'BattleCtrl',
				templateUrl: 'partials/battle.html'
			})
	)
	
const socket = io()
socket.on('connect', () => console.log(`Socket connected: ${socket.id}`))
socket.on('disconnect', () => console.log('Socket disconnected'))



	






	/****************** Full Game Functionality *****************/
			// .when('/login', {
			// 	controller: 'LoginCtrl',
			// 	templateUrl: 'partials/login.html'
			// })
			// .when('/register', {
			// 	controller: 'RegisterCtrl',
			// 	templateUrl: 'partials/register.html'
			// })
			// .when('/profile', {
			// 	controller: 'ProfileCtrl',
			// 	templateUrl: 'partials/profile.html'
			// })
	// battleship.controller('LoginCtrl', function($scope, $http, $location) {
	// 	$scope.loginUser = () => {
	// 		const user = {
	// 			email: $scope.email,
	// 			password: $scope.password
	// 		}		
	// 	}
	// })

//Dragula setup
// const angular = require('angular')
// const angularDragula = require('angular-dragula')
