
gulp 小项目实例

1.安装gulp到该项目中 npm install gulp --save-dev 

2.安装配制 npm install

3.目录结构 

只需要复制package.json 与  gulpfile.js 到以后的项目中

---------------------------------------------------------------------------------------------

第一步：安装命令行工具
$ npm install -g gulp

第二步：在项目下把 gulp 安装为开发依赖组件（假设已经创建好了 package.json）
$ cd <PROJECT>
$ npm install gulp --save-dev

第三步：在项目的根路径下创建 Gulpfile.js，初始内容为：
var gulp = require('gulp');
gulp.task('default', function () {
});

第四步：运行！
$ gulp




几个核心的 API 函数
gulp.task(name[, deps], fn)：注册任务name 是任务名称；deps 是可选的数组，其中列出需要在本任务运行要执行的任务；fn 是任务体，这是 gulp.js 的核心了，需要花时间吃透它，详情见此。
gulp.src(globs[, options])：指明源文件路径用过Grunt 的话，globs 一定不会陌生，这里没什么变化；options 是可选的，具体请查看 gulp.js API
gulp.dest(path)：指明任务处理后的目标输出路径
gulp.watch(glob[, options], tasks)／gulp.watch(glob[, options, cb])：监视文件的变化并运行相应的任务。你没看错，watch 作为核心 API 出现在 gulp.js 里了，具体用法还是要多看文档，不过接下来我们会演示简单的例子。



常用的插件：

    语法检查（gulp-jshint）
    合并文件（gulp-concat）
    压缩代码（gulp-uglify）
    
  $ npm install <PLUGIN_NAME> --save-dev


完成所有任务的编写，完整的代码如下：

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 语法检查
gulp.task('jshint', function () {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 合并文件之后压缩代码
gulp.task('minify', function (){
     return gulp.src('src/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist'));
});

// 监视文件的变化
gulp.task('watch', function () {
    gulp.watch('src/*.js', ['jshint', 'minify']);
});

// 注册缺省任务
gulp.task('default', ['jshint', 'minify', 'watch']);


可以看出，基本上所有的任务体都是这么个模式：
gulp.task('任务名称', function () {
    return gulp.src('文件')
        .pipe(...)
        .pipe(...)
        // 直到任务的最后一步
        .pipe(...);
});

非常容易理解！获取要处理的文件，传递给下一个环节处理，然后把返回的结果继续传递给下一个环节……直到所有环节完成。pipe 就是 stream 模块里负责传递流数据的方法而已，至于最开始的 return 则是把整个任务的 stream 对象返回出去，以便任务和任务可以依次传递执行。

这样会更直观：

gulp.task('task_name', function () {
    var stream = gulp.src('...')
        .pipe(...)
        .pipe(...)
        // 直到任务的最后一步
        .pipe(...);
    return stream;
});

gulp插件库
http://gulpjs.com/plugins/
