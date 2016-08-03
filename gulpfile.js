var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    babel = require('gulp-babel'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    config = {
      style: {
        main: './app/sass/cssef.scss',
        watch: './app/**/*.scss',
        ouput: './build/css',
        minTarget: './build/css/cssef.css'
      },
      html: {
        watch: './app/*.html'
      },
      js: {
        main: './app/js/app.js',
        watch: './app/js/**/*.js',
        ouput: './build/js'
      },
      jade: {
        main: './app/index.jade',
        watch: './app/**/*.jade',
        ouput: './build'
      }
    };

gulp.task('server', function (){
  gulp.src('./build')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8080,
      livereload: true
    }));
});

gulp.task('build:css', function (){
  gulp.src(config.style.main)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(config.style.ouput));

  gulp.src(config.style.minTarget)
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.style.ouput));
});

gulp.task('build:js', function() {
	return gulp.src(config.js.main)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(config.js.ouput));
});

gulp.task('build:jade', function(){
  return gulp.src(config.jade.main)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.jade.ouput));
});

gulp.task('watch', function() {
  gulp.watch(config.js.watch, ['build:js']);
  gulp.watch(config.style.watch, ['build:css']);
  gulp.watch(config.jade.watch, ['build:jade']);
});

gulp.task('build', ['build:css', 'build:js', 'build:jade'])

gulp.task('default', ['server', 'watch', 'build']);
