module.exports = require('express')()
	.get('/health', (req, res) => res.sendStatus(200))
