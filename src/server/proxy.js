const request = require('request')
const YCM_URL = 'http://youcomedy.me'

module.exports = require('express')()
	.use('/ycm', (req, res) => req.pipe(request(YCM_URL + req.url)).pipe(res))
