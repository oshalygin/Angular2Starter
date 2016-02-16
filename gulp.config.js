module.exports = function () {

    var solutionsJavaScriptFiles = "app/**/*.js";
    var excludeNodeModulesDirectory = "!node_modules/**";
    var karmaConfig = __dirname + "/karma.conf.js";
    var applicationPath = "./app";
    var bowerJson = require("./bower.json");
    var layoutInjector = "./wwwroot/index.html";
    var layout = "./wwwroot/";

    var config = {
        solutionsJavaScriptFiles: solutionsJavaScriptFiles,
        excludeNodeModulesDirectory: excludeNodeModulesDirectory,
        karmaConfiguration: karmaConfig,
        typeScriptFiles: applicationPath + "/**/*.ts",
        tsTypingDefinitions: "./typings/**/*.d.ts",
        applicationPath: applicationPath,
        layoutInjector: layoutInjector,
        layoutPage: layout,
        bowerFiles: "/bower_components/**",
        bower: {
            json: bowerJson,
            directory: "./bower_components/",
            ignorePath: "../.."

        },


        js: [
            applicationPath + "/**/*.js",
        ],

        appTypeScriptFiles: [
            applicationPath + "**/*.ts"
        ],

        nodePort: 3000,
        nodeServer: "./server.js"
    };

    config.getWiredepDefaultOptions = function () {


        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
           // ignorePath: config.bower.ignorePath,
            fileTypes: {
                html: {
                    replace: {
                        // ReSharper disable once StringLiteralWrongQuotes
                        js: '<script src="~{{filePath}}"></script>', // jshint ignore:line
                        css: '<link rel="stylesheet" href="~{{filePath}}" />' // jshint ignore:line
                    }
                }
            }


        };

        return options;
    };


    return config;
};