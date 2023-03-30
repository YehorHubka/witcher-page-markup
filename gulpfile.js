const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const sync = require('browser-sync').create()
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default
const imagemin = require('gulp-imagemin')

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist/css'))
}

function fonts() {
    return src('src/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(dest('dist/fonts'));
};

function clear() {
    return del('dist')
}

function js() {
    return src([
       'src/js/**.js',
    ])
       .pipe(concat('common.js'))
       .pipe(uglify())
       .pipe(dest('./dist/js/'))
}

function images() {
    return src('src/images/**/*')
       .pipe(imagemin())
       .pipe(dest('dist/images'))
 }

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
    watch('src/js/**.js', series(js)).on('change', sync.reload)
}

exports.build = series(clear, scss, js, images, fonts, html)
exports.serve = series(clear, scss, js, images, fonts, html, serve)
exports.clear = clear