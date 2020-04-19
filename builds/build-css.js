const {
	src,
	dest
} = require('gulp')
const sass = require('gulp-sass')

return src([__dirname + '/../development/scss/*.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(dest(__dirname + '/../public/css'))