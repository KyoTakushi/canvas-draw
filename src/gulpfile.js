const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');

const paths = {
	src: {
		sass: "scss/**/*.scss",
		pug: "pug/**/*.pug",
		js: "javascripts/**/*",
	},
	dest: {
		html: "../public/",
		css: "../public/css",
		js: "../public/js",
	},
};

const sassOptions = {
	outputStyle: 'compressed'
}

const pugOptions = {
	pretty: true,
};

//Pug
gulp.task('html', () => {
	return gulp.src(paths.src.pug)
	    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
	    .pipe(pug(pugOptions))
	    .pipe(gulp.dest(paths.dest.html));
});

//javascripts
gulp.task('js', () => {
	return gulp.src(paths.src.js)
	.pipe(gulp.dest(paths.dest.js))
})

//Sass
gulp.task('sass', () => {
	return gulp.src(paths.src.sass)
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(sass(sassOptions))
		.pipe(gulp.dest(paths.dest.css))
});

//Browser Sync
gulp.task('bs', () => {
	browserSync({
		server: {
			baseDir: paths.dest.html
		},
		port: 5000,
		reloadOnRestart: true
	});
});

gulp.task('reload', (done) => {
	browserSync.reload();
	done();
});

gulp.task('watch', (done) => {
	gulp.watch(paths.src.sass, gulp.series('sass', 'reload'));
	gulp.watch(paths.src.pug, gulp.series('html', 'reload'));
	gulp.watch(paths.src.js, gulp.series('js', 'reload'));
	done();
})

gulp.task('default', gulp.parallel('watch', 'bs'));
