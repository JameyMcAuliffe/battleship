'use strict'

angular
	.module('battleship', [])
	.controller('main', function($scope, $http) {
		$http
			.get('/api/title')
			.then(({ data: { title }}) => 
				$scope.title = title
			)
	})
