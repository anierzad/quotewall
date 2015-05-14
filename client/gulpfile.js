var gulp = require('gulp'),
	tinylr = require('tiny-lr'),
	livereload = require('gulp-livereload'),
	nodemon = require('gulp-nodemon');

var lr;

function startLivereload() {
	lr = tinylr();
	lr.listen(35729);
};

function notifyLivereload(event) {
	var changedFile = require('path').relative(__dirname, event.path);

	console.log(changedFile + ' has changed.');

	lr.changed({
		body: {
			files: [changedFile]
		}
	});
};

gulp.task('default', function() {
	startLivereload();

	gulp.watch(['./public/*.html','./public/app.js'], notifyLivereload);

	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 3500
		},
		ignore: ['./node_modules/**','./public/']
	})
	.on('restart', function() {
		console.log('Client restarted.');
	});
});
