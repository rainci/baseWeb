var gulp = require('gulp'),
    less = require('gulp-less'),//转换less用的
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),//压缩
    uglify = require('gulp-uglify'),//混淆js
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task("css",function(){//处理less编译成css
	gulp.src(["./public/less/**/*.less"])
	    .pipe(less())
	    .pipe(autoprefixer({ //自动为css添加兼容前缀
		    browsers: ['Explorer >= 9.0', 'Firefox >= 11.0','Chrome >= 17.0'],
		    remove:true //是否去掉不必要的前缀 默认：true 
		}))
        .pipe(cleancss()) 
        // .pipe(rename({suffix:'.min'}))
	    .pipe(gulp.dest("./dist/public/css"))
	    .pipe(reload({stream: true}))
});
gulp.task("image",function(){//压缩图片
	gulp.src("./public/images/**/*")
		.pipe(imagemin())
		.pipe(gulp.dest("./dist/public/images"));
});
gulp.task("js",function(){
    gulp.src("./public/javascripts/**/*.js")
        .pipe(uglify({mangle: true,compress: true}))
		.pipe(gulp.dest("./dist/public/js"))
        .pipe(reload({stream: true}))
});

gulp.task("templates", function() {//html
 var YOUR_LOCALS = {};
 gulp.src( "./views/**/*.html")
   .pipe(gulp.dest("./dist/"))
});

//启动热更新  
gulp.task('serve', function() {
    // gulp.start('lyx'); 
    var files = [
        'views/**/*.html',
        'public/less/../*.less',
        'public/javascripts/../*.js'
     ]; 
    browserSync.init({
        port: 8888,
        server: {  
            baseDir: './dist'
        },
        files: files,
    }); 
   
}); 
gulp.task('watch',function(){//监听事件
    gulp.watch(["./public/less/**/*.less"],["css"]);
    gulp.watch(["./public/javascripts/**/*.js"],["js"]);
    gulp.watch(["./views/**/*.html"],["templates"]); 
    gulp.watch('./public/images/**/*.*', ['image']);  
});
// gulp.task("lyx",["css","image","js","templates","watch","serve"]);
gulp.task("default",["css","image","js","templates","watch","serve"]);
