'use strict';

// gulp modules that we need for tasks below
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var newer = require('gulp-newer');
var cleanCSS = require('gulp-clean-css');
var gzip = require('gulp-gzip');

// First and most important task, create CSS from Sass.
// At the same time, we first:
//   1. Compile all our Sass to one big CSS file and output it to ../web/stylesheets
//   2. While still in stream, we remove comments and all space (minify) to have compact CSS and output that to ./stylesheets
//   3. Finally, while still in stream, we also gzip it to final, production small styles.min.css.gz
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
      .pipe(sass({
        outputStyle: 'nested',  // expanded, nested, compact, compressed
        includePaths: [
          './node_modules/bootstrap/scss',
          './node_modules/@fortawesome/fontawesome-free/scss'
        ],
        sourceMap: true,              // Inline source maps (preferred)
        sourceMapContents: true,      // Needed for node-sass generation of the maps
        sourceMapEmbed: true,         // Needed to embed (inline) maps
        outFile: './mycss'            // Needed although unused in inline maps
      }).on('error', sass.logError))
      .pipe(gulp.dest('../web/stylesheets'))      // 1. output for webelopment with sourcemaps normal css
      .pipe(cleanCSS())                           // gulp css minify
      .pipe(rename({suffix: '.min'}))             // gulp.rename (added .min)
      .pipe(gulp.dest('../web/stylesheets'))      // 2. output just minimized
      .pipe(gzip({ gzipOptions: { level: 9 } }))  // compress with highest compression
      .pipe(gulp.dest('../web/stylesheets'));     // 3. output gzipped
});

// This task is just an example how simple files could be copied.
// Note that if we need some other font files (which are locally present)
// we would need their paths added
gulp.task('font-copy', function () {
  var fontPaths = [
    './node_modules/@fortawesome/fontawesome-free/webfonts/*',
    './fonts/**/*.{otf,ttf,woff,woff2,svg,eot}'
  ];
  return gulp.src(fontPaths)
      .pipe(gulp.dest('../web/fonts'));
});

// Images are compressed and output to our ../web/images directory
// Compression is not changed so if we want that (and probably we do)
// we need to supply options to imagemin
gulp.task('images', function () {
  return gulp.src('./images/**/*')
      .pipe(changed('../web/images'))
      .pipe(imagemin())
      .pipe(gulp.dest('../web/images'));
});

// The order with javascript inclusion is important as it is with CSS
// Our own JS is included at the end and final JS is in ../web
// and minimized versions are here so they can just be copy/paste for production
gulp.task('javascript', function () {
  var jsOrder = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/popper.js/dist/umd/popper.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/bootstrap-cookie-alert/cookiealert-standalone.js',
    './node_modules/featherlight/src/featherlight.js',
    './node_modules/featherlight/src/featherlight.gallery.js',
    './javascript/custom.js'
  ];
  return gulp.src(jsOrder)
      .pipe(concat('main.js'))
      .pipe(gulp.dest('../web/javascript'))
      .pipe(stripDebug())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('../web/javascript'))
      .pipe(gzip({ gzipOptions: { level: 9 } }))
      .pipe(gulp.dest('../web/javascript'));
});

var browserSync = require('browser-sync').create();

// Static server
gulp.task('static', function() {
  browserSync.init({
    server: {
      baseDir: "../web/"
    }
  });
  gulp.watch("./scss/**/*.scss", ['sass']);
  gulp.watch("../web/**/*.{html,css,js}").on('change', browserSync.reload);
});

var php = require('gulp-connect-php');

// PHP built in server
gulp.task('php', function() {
  php.server({ base: '../web/', port: 8010, keepalive: true});
});

gulp.task('dynamic', ['php'], function() {
  browserSync.init({
    proxy: '127.0.0.1:8010',
    port: 4000,
    open: true,
    // notify: false,
    xip: true,
    tunnel: "milosvukovic"
  });
  gulp.watch("./scss/**/*.scss", ['sass']);
  gulp.watch("../web/**/*.{php,html,css,js}").on('change', browserSync.reload);
});

// Rerun the task When a file changes
gulp.task ( 'watch', function () {
  gulp.watch( './js/**/*.js', [ 'javascript' ]);
  gulp.watch( 'images/**', [ 'images' ]);
  gulp.watch("./scss/**/*.scss", ['sass']);
});

// Default task that includes fonts and other tasks in single run
gulp.task('default', ['sass', 'javascript', 'images']);
