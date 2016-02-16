"use strict";

var gulp = require("gulp");
var config = require("./gulp.config")();
var $ = require("gulp-load-plugins")({ lazy: true });
var wiredep = require("wiredep").stream;


gulp.task("tslint", () => {
    log("** TSLint Check **");

    return gulp
        .src(config.appTsDev)
        .pipe($.tslint())
        .pipe($.tslint.report("verbose"));

});


gulp.task("eslint", () => {
    log("*** Validating via ESLint ** ");

    return gulp.src([config.solutionsJavaScriptFiles, config.excludeNodeModulesDirectory])
        .pipe($.eslint({
            config: "eslint.config.json"
        }))
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task("transpile", () => {

    log("** Transpiling Dev Folder **");

    let typescriptOptions = {

        removeComments: false,
        target: "es6",
        noImplicitAny: true
    };

    return gulp
        .src([config.typeScriptFiles, config.tsTypingDefinitions])
        .pipe($.typescript(typescriptOptions))
        .pipe(gulp.dest(config.applicationPath));
});

gulp.task("wiredep-app", () => {
    log("*** Wiring up bower css, js and application into html page");

    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.layoutInjector)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js,
            { read: false }),
            { relative: true }
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