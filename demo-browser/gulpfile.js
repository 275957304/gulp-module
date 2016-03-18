var gulp = require('gulp');
// 引入组件
var jshint = require('gulp-jshint'),    // js代码核验
    minifyCss = require('gulp-minify-css'),    // 压缩css
    uglify = require('gulp-uglify'),    // 压缩js代码
    rename = require('gulp-rename'),    // 重新命名文件
    concat = require('gulp-concat');    // 合并js文件
// 静态文件服务器，同时也支持浏览器自动刷新
var browserSync = require('browser-sync').create();
// js代码检查
gulp.task('jshint', function() {
    gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default')); //默认在命令行里输出结果
});

// js 文件合并，压缩文件 在命令行使用 gulp script 启动此任务
gulp.task('concatJs', function() {
        // 找到文件
          gulp.src('js/*.js')
        // js代码合并
        .pipe(concat('index.min.js'))
        // 压缩文件
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});
// 将所有css文件连接为一个文件并压缩，存到public/css
gulp.task('concatCss', function () {
        // 找到文件
        gulp.src('css/*.css')
        // 压缩文件
        .pipe(concat('index.min.css'))
        .pipe(minifyCss())
        // 另存为压缩文件
       .pipe(gulp.dest('./public/css'));
});
// 默认任务
gulp.task('default', ['watch']);
// 监听任务
gulp.task('watch', function() {
    // 建立浏览器自动刷新服务器
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    // 合并压缩
    gulp.watch('./js/*.js', ['concatJs']);
    gulp.watch('./css/*.css', ['concatCss']);
    // 自动刷新
    gulp.watch(['*.html', './**/*.css', './**/*.js'], function() {
        browserSync.reload();
    });
});