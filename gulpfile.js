const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const pug = require('gulp-pug')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()
const gulpif = require('gulp-if')

let prod = false

const isProd = (done) => {
    prod = true
    done()
}

const sсss = () => {
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(gulpif(!prod, dest("dist/scss")))
        .pipe(gulpif(prod, dest('build/scss')))
}

const pugFile = () => {
    return src('src/**/*.pug')
    
    .pipe(gulpif(!prod, dest('dist')))
    .pipe(gulpif(prod, dest('build')))
}

const fonts = () => {
    return src('src/fonts/**/*', { encoding: false })
    .pipe(gulpif(!prod, dest('dist/fonts')))
    .pipe(gulpif(prod, dest('build/fonts')))
}


const cleanDev = () => {
    return del('dist')
}

const cleanBuild = () => {
    return del('build')
}

const resources = () => {
    return src('src/css/**/*.css')
    .pipe(gulpif(!prod, dest('dist/css')))
    .pipe(gulpif(prod, dest('build/css')))
}

const components = () => {
    return src('src/js/**/*.js')
    .pipe(gulpif(!prod, dest('dist/js')))
    .pipe(gulpif(prod, dest('build/js')))
}

const styles = () => {
    return src('src/css/**/*.css')
        .pipe(gulpif(!prod, sourcemaps.init()))
        .pipe(concat('style.css'))
        .pipe(autoprefixes({
            cascade: false
        }))
        .pipe(gulpif(prod, cleanCSS({
            level: 2
        })))
        .pipe(gulpif(!prod, sourcemaps.write()))
        .pipe(gulpif(!prod, dest('dist/css')))
        .pipe(gulpif(prod, dest('build/css')))
        .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(gulpif(prod, htmlMin({
            collapseWhitespace: true
        })))
        .pipe(gulpif(!prod, dest('dist')))
        .pipe(gulpif(prod, dest('build')))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
    .pipe(gulpif(!prod, sourcemaps.init()))
    .pipe(gulpif(prod, babel({
        presets: ['@babel/env']
    })))
    .pipe(concat('app.js'))
    .pipe(gulpif(prod, uglify().on('error', notify.onError())))
    .pipe(gulpif(!prod, sourcemaps.write()))
    .pipe(gulpif(!prod, dest('dist/js')))
    .pipe(gulpif(prod, dest('build/js')))
    .pipe(browserSync.stream())
}

const images = () => {
    return src(
        'src/images/**/*',
        { encoding: false }
    )
    .pipe(image())
    .pipe(gulpif(!prod, dest('dist/images')))
    .pipe(gulpif(prod, dest('build/images')))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist',
            index: 'index.html'
        }
    })
}

watch('src/**/*.html', htmlMinify)
watch('src/**/*.pug', pugFile)
watch('src/css/**/*.css', styles)
watch('src/scss/**/*.scss', sсss)
watch('src/js/**/*.js', scripts)
watch('src/css/**', resources)
watch('src/js/**', components)


exports.pugFile = pugFile
exports.fonts = fonts
exports.sсss = sсss
exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.dev = series(cleanDev, resources, components, pugFile, htmlMinify, styles, scripts, sсss, fonts, images, watchFiles)
exports.build = series(isProd, cleanBuild, resources, components, htmlMinify, styles, scripts, fonts, images)