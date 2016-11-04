'use strict'

battleship.controller('BattleCtrl', function($scope, $http, socket) {
		const board_1 = document.querySelector('.board_1')
		const chip = document.querySelector('.ships')
		const battleDiv = document.querySelector('.battle')
		

		const emptyBoard = [
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '']
        ]

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
		}

			//Starts game play, adds, game play listeners
			$scope.startDemo = () => {
				socket.emit('startDemo')
				$scope.showBoats = false
				$scope.showDemoButton = false
	      $scope.hideNewButton = false
	      $scope.msg = ''
				board_1.addEventListener('click', evt => {
				  let col = evt.target.closest('td').cellIndex
				  let row = evt.target.closest('tr').rowIndex
				  console.log("clicked on row: ", row);
				  console.log("clicked on col: ", col);
				  socket.emit('fireMissile', { row, col }) 
				})
				socket.on('hitTarget', () => {
					$scope.msg = 'Direct hit, you are super'
				})
				socket.on('missedTarget', () => {
					$scope.msg = 'Try hitting the ships, nerd'
				})
				socket.on('previousTarget', () => {
					$scope.msg = 'Try somewhere new'
				})
			}

			//draws original, empty board
		  $scope.createGame = () => {
	      socket.emit('createGame')
	      battleDiv.style.backgroundColor = "darkblue" 
	      console.log(emptyBoard)
	      drawBoard(emptyBoard)
	      $scope.showBoats = true
	      $scope.showDemoButton = true
	      $scope.hideNewButton = true
	    }

	    /***** Functionality for placing the ships *****/
			const mouseOver = () => {
				event.target.style.backgroundColor = "orange"
			}
			const mouseOut = () => {
				event.target.style.backgroundColor = "lightblue"
			}
			const dropShip = () => {
				event.target.style.backgroundColor = "blue"
				let col = event.target.closest('td').cellIndex
			  let row = event.target.closest('tr').rowIndex
				socket.emit('placeShip', { row, col })
				board_1.removeEventListener('mouseover', mouseOver)
				board_1.removeEventListener('mouseout', mouseOut)
				board_1.removeEventListener('click', dropShip)
			}

			chip.addEventListener('click', evt => {
				let size = 0
				let shipId = evt.target.id
				console.log('ship id:', shipId)
				if (shipId === 'carrier') {
					size = 5
				}
				else if (shipId === 'battleship') {
					size = 4
				}
				else if (shipId === 'submarine') {
					size = 3
				}
				else if (shipId === 'cruiser') {
					size = 3
				}
				else if (shipId === 'destroyer') {
					size = 2
				}
				console.log('ship size:', size)

				board_1.addEventListener('mouseover', mouseOver)
				board_1.addEventListener('mouseout', mouseOut)
				board_1.addEventListener('click', dropShip)
			})
     
    //Listens for 'draw board', then draws using gameBoard obj from server 
		socket.on('draw board', function (gameBoard) {
			$scope.boardState = gameBoard
			console.log("board array:", $scope.boardState)
			drawBoard($scope.boardState)
		})
	})
