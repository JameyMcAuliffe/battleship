'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('game', {
	board: {
		type: [
			[String, String, String],
			[String, String, String],
			[String, String, String]
		],
		default: [
			['', '', ''],
			['', 'X', 'X'],
			['', '', '']
		]
	}
})

// [String, String, String, String, String, String, String, String, String, String],
// 		[String, String, String, String, String, String, String, String, String, String],
// 		[String, String, String, String, String, String, String, String, String, String],
// 		[String, String, String, String, String, String, String, String, String, String],
// 		[String, String, String, String, String, String, String, String, String, String],
// 		[String, String, String, String, String, String, String, String, String, String],
// 		[String, String, String, String, String, String, String, String, String, String],
// 		[String, String, String, String, String, String, String, String, String, String],
// 		[String, String, String, String, String, String, String, String, String, String],
// 		[String, String, String, String, String, String, String, String, String, String]
