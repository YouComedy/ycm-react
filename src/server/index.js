const express = require('express')
const {PORT = 8080} = process.env

express()
	.use(require('morgan')('combined'))
	.use(express.static('public', {maxAge: '1y'}))
	.use(require('./health'))
	.use(require('./proxy'))
	.use(require('./render'))
	.listen(PORT, () => console.info(`Server listening on port ${PORT}`))
