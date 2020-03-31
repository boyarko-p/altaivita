let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoPrefixer  = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('scss', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })) //expanded (без сжатия)
    .pipe(rename({suffix:'.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(autoPrefixer(['last 5 versions']))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', function () {
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('libs-js', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/object-fit-images/dist/ofi.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    'node_modules/owl.carousel/dist/owl.carousel.js',
    'node_modules/lazysizes/lazysizes.js',
    'app/libs/modernizt-webp/modernizr-custom.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
})


gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('js'))
})

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    notify: false
  })
})

gulp.task('default', gulp.parallel('scss','libs-js', 'browser-sync', 'watch'))
gulp.task('prod', gulp.parallel('scss','libs-js', 'watch'))
