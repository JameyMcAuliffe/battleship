'use strict'


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
