var gulp        = require('gulp');
var ejs         = require("gulp-ejs");
var filter      = require("gulp-filter");
var coffee      = require("gulp-coffee");
var concat      = require("gulp-concat");
var insert      = require('gulp-insert');
var sass        = require("gulp-sass");
var rename      = require("gulp-rename");
mainBowerFiles  = require('main-bower-files'),
autoPrefixer    = require("gulp-autoprefixer"),
sourceMaps      = require("gulp-sourcemaps"),
CacheBuster     = require('gulp-cachebust'),
liveReload      = require("gulp-livereload"),
jst             = require('gulp-jst2'),
uglify          = require('gulp-uglify');

var cachebust = new CacheBuster();

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
  return gulp.src(["app/frontend/stylesheets/application.css"])
    .pipe(sourceMaps.init())
    .pipe(sass({includePaths: "./stylesheets", sourceComments: true, errLogToConsole: true}))
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
  return gulp.src("app/frontend/fonts/**/*")
    .pipe(cachebust.resources())
    .pipe(gulp.dest("./public/assets/fonts/"))
    // .pipe(liveReload());
});

gulp.task('html',["js","sass"], function () {

    return gulp.src('public/index-orig.html')
        .pipe(cachebust.references())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('public'))
        .pipe(liveReload());
});



gulp.task("watch", function() {
  liveReload.listen();
  gulp.watch("./app/frontend/stylesheets/**/*", { interval: 500 }, ["html"]);
  gulp.watch(["./app/frontend/javascripts/**/*","gulpfile.js"],  { interval: 500 }, ["html"]);
});

gulp.task("default", ["bower-files","jst","js", "sass", "images","html"]);
gulp.task("reload", ["watch","bower-files","jst", "js", "sass", "images","html"]);

