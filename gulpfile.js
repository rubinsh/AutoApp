var gulp        = require('gulp');
var ejs         = require("gulp-ejs");
var filter      = require("gulp-filter");
var coffee      = require("gulp-coffee");
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
uglify          = require('gulp-uglify');

var cachebust = new CacheBuster();

var config = {
    bootstrapDir: './bower_components/bootstrap-sass',
    publicDir: './public',
};

gulp.task("bower-files", function(){
		return gulp.src(mainBowerFiles())
		.pipe(gulp.dest("./public/assets/lib"));
});

gulp.task('jst', function () {
	return gulp.src('./app/frontend/javascripts/templates/**/*.ejs')
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
		"public/assets/lib/angular.js",
		"public/assets/lib/matchmedia-ng.js",
		"public/assets/lib/angular-route.js",
		"public/assets/lib/angular-resource.js",
		"public/assets/lib/angular-animate.js",
		"public/assets/lib/angular-touch.js",
		"public/assets/lib/angular-cache.js",
		"public/assets/lib/angular-carousel.js",
		"public/assets/lib/loading-bar.js",
		"public/assets/lib/bootstrap.js",
		"public/assets/lib/bootstrap-select.js",
		
		"app/frontend/javascripts/main.js",
		"app/frontend/javascripts/services/**/*",
		"app/frontend/javascripts/controllers/**/*",
		"app/frontend/javascripts/directives/**/*",
		"app/frontend/javascripts/appConfiguration.js"])
		.pipe(sourceMaps.init())
		.pipe(concat("application.js"))
		// .pipe(uglify())
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

gulp.task("images", function() {
	return gulp.src("app/frontend/images/**/*")
		.pipe(cachebust.resources())
		.pipe(gulp.dest("./public/assets/images/"))
		// .pipe(liveReload());
});

gulp.task("fonts", function() {
	return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
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
				proxies: [{source: '/autoapi.svc', target: 'http://m.auto.co.il/autoapi.svc'}],
				fallback: 'index.html'
		}));
});

gulp.task("watch", function() {
	liveReload.listen();
	gulp.watch("./app/frontend/stylesheets/**/*", { interval: 500 }, ["html"]);
	gulp.watch(["./app/frontend/javascripts/**/*","gulpfile.js"],  { interval: 500 }, ["html"]);
});

gulp.task("default", ["bower-files","jst","js", "sass", "images","html"]);
gulp.task("reload", ["watch","bower-files","jst", "js", "sass", "images","html"]);
gulp.task("server", ["watch","bower-files","jst", "js", "sass", "images","html","webserver"]);

