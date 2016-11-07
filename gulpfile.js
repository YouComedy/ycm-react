const fs = require('fs')
const gulp = require('gulp')
const package = require('./package.json')

gulp.task('version', () => {
	const v = package.version.split('.')
	package.version = (v.push(Number(v.pop()) + 1), v).join('.')
	fs.writeFileSync('./package.json', JSON.stringify(package, null, 2))
})