'use strict'

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
				controller: 'MainCtrl',
				templateUrl: 'partials/register.html'
			})
	)
	.controller('MainCtrl', function($scope, $http) {
		$http
			.get('/api/title')
			.then(({ data: { title }}) => 
				$scope.title = title
			)
	})
	.controller('LoginCtrl', function($scope, $http) {
		$http
			.get('/api/title')
			.then(({ data: { title }}) => 
				$scope.title = title
			)
		
	})
