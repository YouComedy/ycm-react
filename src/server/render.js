const {resolve} = require('path')

module.exports = require('express')()
	.get('/*', (req, res) => res.sendFile(resolve('public/index.html')))
