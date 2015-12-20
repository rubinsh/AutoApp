var gulp        = require('gulp');
var ejs         = require("gulp-ejs");
var filter      = require("gulp-filter");
var concat      = require("gulp-concat");
var insert      = require('gulp-insert');
var sass        = require("gulp-sass");
var rename      = require("gulp-rename");
var webserver   = require('gulp-webserver');
mainBowerFiles  = require('main-bower-files'),
autoPrefixer    = require("gulp-autoprefixer"),
sourceMaps      = require("gulp-sourcemaps"),
CacheBuster     = require('gulp-cachebust'),
liveReload      = require("gulp-livereload"),
jst             = require('gulp-jst2'),
uglify          = require('gulp-uglify'),
del 						= require('del'),
gulpif 					= require('gulp-if'),
gulpSlash       = require('gulp-slash'),
gutil           = require( 'gulp-util' ),
ftp             = require('vinyl-ftp');

var cachebust = new CacheBuster({checksumLength: 16, random: true});

var config = {
    bootstrapDir: './bower_components/bootstrap-sass',
    slickFontsDir: './bower_components/slick-carousel/slick/fonts',
    publicDir: './public',
};

var useUglify = true;

gulp.task("bower-files",["clean-assets"], function(){
		return gulp.src(mainBowerFiles())
		.pipe(gulp.dest("./public/assets/lib"));
});

gulp.task("clean-assets", function(cb) {
	return del(['./public/assets/**/*'],cb);
});

gulp.task('jst', ["clean-assets"], function () {
	return gulp.src('./app/frontend/javascripts/templates/**/*.ejs')
    .pipe(gulpSlash())
		.pipe(jst({ prepend: "JST['%s'] = " }))
		.pipe(concat('jst.js', { newLine: ';\n' }))
		.pipe(insert.prepend('window.JST = {};\n\n'))
		.pipe(insert.append(';\n\n'))
		.pipe(gulp.dest('./public/assets/lib'))
})

gulp.task("js", ["jst","bower-files"], function() {
	return gulp.src([
		"public/assets/lib/jst.js",
		"public/assets/lib/jquery.js",
		"app/frontend/requestAnimationFrame.js",
		"app/frontend/modernizrAdditions.js",
		"public/assets/lib/modernizr.js",
		"public/assets/lib/underscore.js",
		"public/assets/lib/headhesive.js",
		"public/assets/lib/angular.js",
		"public/assets/lib/matchmedia-ng.js",
		"public/assets/lib/angular-route.js",
		"public/assets/lib/angular-resource.js",
		"public/assets/lib/angular-animate.js",
		"public/assets/lib/angular-touch.js",
		"public/assets/lib/angular-cache.js",
		"public/assets/lib/slick.min.js",
		"public/assets/lib/angular-slick.js",
		"public/assets/lib/loading-bar.js",
		"public/assets/lib/bootstrap.js",
		"public/assets/lib/bootstrap-select.js",
		// "app/frontend/javascripts/ios9-webview-patch.js",
		"app/frontend/javascripts/main.js",
		"app/frontend/javascripts/services/**/*",
		"app/frontend/javascripts/controllers/**/*",
		"app/frontend/javascripts/directives/**/*",
		"app/frontend/javascripts/appConfiguration.js"])
		.pipe(sourceMaps.init())
		.pipe(concat("application.js"))
		.pipe(gulpif(useUglify,uglify()))
		.pipe(cachebust.resources())
		.pipe(sourceMaps.write("."))
		.pipe(gulp.dest("./public/assets"))
		// .pipe(liveReload());
});


gulp.task("sass", ["bower-files","images","fonts"], function() {
	return gulp.src(["app/frontend/stylesheets/application.scss"])
		.pipe(sourceMaps.init())
		.pipe(sass({includePaths: ["./stylesheets",config.bootstrapDir + '/assets/stylesheets'], sourceComments: true, errLogToConsole: true}))
		.pipe(autoPrefixer())
		.pipe(cachebust.resources())
		.pipe(sourceMaps.write("."))
		.pipe(gulp.dest("./public/assets"))
		// .pipe(liveReload());
});

gulp.task("images",["clean-assets"], function() {
	return gulp.src("app/frontend/images/**/*")
		.pipe(gulp.dest("./public/assets/images/"))
		// .pipe(liveReload());
});

gulp.task("fonts", ["clean-assets"], function() {
	return gulp.src([config.bootstrapDir + '/assets/fonts/**/*',config.slickFontsDir + "/*","app/frontend/fonts/**/*"])
		.pipe(gulp.dest("./public/fonts/"))
		// .pipe(liveReload());
});

gulp.task('html',["js","sass"], function () {
		return gulp.src('public/index-orig.html')
			.pipe(cachebust.references())
			.pipe(rename('index.html'))
			.pipe(gulp.dest('public'))
			.pipe(liveReload());
});

gulp.task('webserver', function() {
	gulp.src('public')
	.pipe(webserver({
			port: 8000,
			host: '0.0.0.0',
			proxies: [{source: '/autoapi.svc', target: 'http://m.auto.co.il/autoapi.svc'}]
	}));
});

gulp.task("watch", function() {
	useUglify = false;
	liveReload.listen();
	gulp.watch("./app/frontend/stylesheets/**/*", { interval: 500 }, ["html"]);
	gulp.watch(["./app/frontend/javascripts/**/*","gulpfile.js","./public/index-orig.html"],  { interval: 500 }, ["html"]);
});


gulp.task('deploy', [], function () {

    var conn = ftp.create( {
        host:     '192.117.187.236',
        user:     'rubinsh',
        password: 'rubinsh#1245',
        parallel: 10,
        log:      gutil.log
    } );

    var globs = [
        'public/fonts/*',
        'public/assets/*.js',
        'public/assets/*.css',
        'public/assets/images/**',
        'public/index.html'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: './public', buffer: false } )
        .pipe(gulpSlash())
        .pipe( conn.newer( '/wwwroot/' ) ) // only upload newer files
        .pipe( conn.dest( 'wwwroot/' ) );

} );

gulp.task("default", ["clean-assets","bower-files","jst","js", "sass", "images","html"]);
gulp.task("reload", ["watch","bower-files","jst", "js", "sass", "images","html"]);
gulp.task("server", ["watch","bower-files","jst", "js", "sass", "images","html","webserver"]);
