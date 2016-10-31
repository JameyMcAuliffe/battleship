'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('ship', {
	ship: {
		name: String,
		size: Number
	}	
})
