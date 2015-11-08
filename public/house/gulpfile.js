/**
 * Created by Changyin on 14-10-27.
 */

var gulp = require('gulp');
var through = require('through2');
var kmc = require('gulp-kmc');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var through = require('through2');
var rename = require('gulp-rename');
var kclean = require('gulp-kclean');
var XTemplate = require('xtemplate');
var connect = require('gulp-connect');
var watch = require('gulp-watch');


var src = "./src";
var dest = "./build/";

kmc.config({
    packages: [
        {
            name: 'alicareActivity',
            base: src
        }
    ]
});




gulp.task('kmc', function () {

    gulp.src(src + "/**/*.js")
        //转换cmd模块为kissy模块
        .pipe(kmc.convert({
            define: true,
            exclude: [],
            requireCss: false,
            ignoreFiles: []
        }))
        //.pipe(concat('alipay.js'))
//        .pipe(kclean({
//            files:[{
//                src:'find.js',
//                outputModule:'find/index'
//            }]
//        }))
        .pipe(uglify())
        // .pipe(function () {
        //     return through.obj(function (file, encoding, callback) {
        //         if (file.isBuffer()) {
        //             var tmp = file.contents.toString();
        //             tmp = tmp.replace(/[^\u0000-\u00FF]/g, function ($0) {
        //                 return escape($0).replace(/(%u)(\w{4})/gi, "\\u$2")
        //             });
        //             file.contents = new Buffer(tmp);
        //         }
        //         this.push(file);
        //         callback();
        //     })
        // }())
        .pipe(gulp.dest(dest));

});




gulp.task('less', function(){
    gulp.src(src + "/**/*.less")
        .pipe(rename(function (path) {
            path.extname = ".css"
        }))
        .pipe(gulp.dest(src));
});


gulp.task('css', function () {
    gulp.src(src + "/**/*.css")
        //.pipe(concatCss('alipay.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(dest));
});



gulp.task('xtemplate', function () {
  gulp.src(src + "/**/*.html")
    .pipe(function () {
      return through.obj(function (file, encoding, callback) {
        if (file.isBuffer()) {
          var tmp = file.contents.toString();
          tmp = new XTemplate.compile(tmp).toString();
          tmp = 'define(function (require, exports, module) {\n' + tmp + '\nmodule.exports=anonymous;\n});'

          file.contents = new Buffer(tmp);
        }
        this.push(file);
        callback();
      })
    }())
    .pipe(rename(function (path) {
      //path.basename += "-tpl";
      path.extname = ".js"
    }))
    .pipe(gulp.dest(src));
})



gulp.task('connect', function() {
    connect.server({
        root: [__dirname],
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch(['./*.htm'], ['html']);
    gulp.watch([src+'/**/*.less'], ['less','css']);
});



gulp.task('watchall', ['parse','connect', 'watch']);
gulp.task('parse', ['less', 'css', 'kmc','tpl']);
gulp.task('default', [ 'css', 'kmc','tpl']);

gulp.task('tpl', ['xtemplate']);