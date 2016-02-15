"use strict";

let gulp = require("gulp");
let config = require("./gulp.config")();
let $ = require("gulp-load-plugins")({ lazy: true });


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