var gulp, gulpLoadPlugins, $, webpack, config;

gulp = require('gulp');
gulpLoadPlugins = require('gulp-load-plugins');

$ = gulpLoadPlugins({
    camelize: true,
    lazy: true
});

$.runSequence = require('run-sequence').use(gulp);
$.browserSync = require('browser-sync');

webpack = require('webpack');
config = require('./webpack.config');

gulp.task('default', function () {
    $.runSequence(['webpack'], 'server', 'watch');
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['webpack']);
});

gulp.task("webpack", function () {
    webpack(config, function (err, stats) {
        if (err) {
            $.util.log("[webpack]", stats.toString({}));
        }
        $.browserSync.reload();
    });
});

gulp.task('server', function () {
    var express, http, spa, app, port;

    express = require('express');
    http = require('http');
    spa = require('browser-sync-spa');
    app = express();
    port = 3000;

    app.use(express.static('build/'));

    http.createServer(app).listen(port);

    $.browserSync({
        open: false,
        proxy: 'localhost:' + port,
        port: port,
        logConnections: true
    });

    $.browserSync.use(spa());
});
