'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('ship', {
	ships:
		[
			{
				name: String,
				size: Number
			}
		]
})
