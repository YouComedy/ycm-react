module.exports = require('express')()
	.get('/*', (req, res) => res.sendFile('public/index.html'))
