const { src, dest, watch, series } = require('gulp');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();

// https://sendhtmail.ru/  сервис для тестирования рассылки

browserSync.init({
    server: {
        baseDir: "./build",
        notify: false
    }
});

function buildHTML() {
    return src('src/**/*.pug').pipe(pug({ pretty: '    ' })).pipe(dest('build')).pipe(browserSync.reload({ stream: true }));
}

function reload() {
    return src('./build').pipe(browserSync.reload({ stream: true }));
}

function watchPug() {
    return watch("src/components/*.pug").on("change", buildHTML);
}

function update() {
    return watch("**/*.html").on("change", reload);
}

exports.default = series(buildHTML, watchPug, update);