"use strict";

let gulp = require("gulp");
let config = require("./gulp.config")();
let $ = require("gulp-load-plugins")({ lazy: true });
let wiredep = require("wiredep").stream;


gulp.task("tslint", function () {
    log("** TSLint Check **");

    return gulp
        .src(config.appTsDev)
        .pipe($.tslint())
        .pipe($.tslint.report("verbose"));

});


gulp.task("wiredep-app", function () {
    log("*** Wiring up bower css, js and application into html page");

    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.layoutInjector)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js,
            { read: false }), {
                transform: function (filepath) {
                    // ReSharper disable once StringLiteralWrongQuotes
                    return '<script src="~' + filepath + '"></script>'; // jshint ignore:line
                }
            }
            ))
        .pipe(gulp.dest(config.layoutPage));

});


gulp.task("default", ["run-tests"]);

gulp.task("help", $.taskListing);

function log(msg) {
    if (typeof (msg) === "object") {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.green(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}