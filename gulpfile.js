var DEST_CLIENT, DEST_CLIENT_SCRIPT, DEST_CLIENT_STYLE, DEST_ROOT, DEST_SERVER, DEST_SERVER_DB, DEST_SERVER_ROUTE, DEST_SERVER_SERVICE, SRC_CLIENT, SRC_CLIENT_SCRIPT, SRC_CLIENT_STYLE, SRC_ROOT, SRC_SERVER, SRC_SERVER_DB, SRC_SERVER_ROUTE, SRC_SERVER_SERVICE, coffee, cp, del, gulp, gutil, need_uglify, server_process, stylus, tasks, uglify, concat, angularFileSort;

gulp = require('gulp');
del = require('del');
gutil = require('gulp-util');
stylus = require('gulp-stylus');
coffee = require('gulp-coffee');
uglify = require('gulp-uglify');
concat = require('gulp-concat'),
angularFileSort = require('gulp-angular-filesort');

need_uglify = false;

SRC_ROOT = './src';
SRC_CLIENT = SRC_ROOT + '/app';
SRC_CLIENT_STYLE = SRC_CLIENT + '/styles';
SRC_CLIENT_SCRIPT = SRC_CLIENT + '/scripts';
SRC_CLIENT_SCRIPT_DEPS = SRC_CLIENT + '/bower_components';
SRC_SERVER = SRC_ROOT + '/server';
SRC_SERVER_ROUTE = SRC_SERVER + '/routes';
SRC_SERVER_SERVICE = SRC_SERVER + '/service';
SRC_SERVER_DB = SRC_SERVER + '/db';

DEST_ROOT = './build';
DEST_SERVER = DEST_ROOT + '/zblog';
DEST_SERVER_ROUTE = DEST_SERVER + '/routes';
DEST_SERVER_SERVICE = DEST_SERVER + '/service';
DEST_SERVER_DB = DEST_SERVER + '/db';
DEST_CLIENT = DEST_SERVER + '/public';
DEST_CLIENT_STYLE = DEST_CLIENT + '/styles';
DEST_CLIENT_SCRIPT = DEST_CLIENT + '/scripts';

server_process = null;

cp = require('child_process');

tasks = {
  coffee_server: function() {
    del.sync([DEST_SERVER_SERVICE, DEST_SERVER_ROUTE, DEST_SERVER_DB], {
      force: true
    });
    gulp.src([SRC_SERVER + '/**/*.coffee']).pipe(coffee({
      bare: true
    }).on('error', gutil.log)).pipe(gulp.dest(DEST_SERVER));
  },
  copy_server: function() {
    del.sync([
        DEST_SERVER + '/bin',
        DEST_SERVER + '/node_modules',
        DEST_SERVER + '/views',
        DEST_SERVER + '/app.js',
        DEST_SERVER + '/package.json',
      ], {
      force: true
    });
    gulp.src([
        SRC_SERVER + '/bin/**'
      ]).pipe(gulp.dest(DEST_SERVER + '/bin'));
    gulp.src([
        SRC_SERVER + '/views/**/*.*'
      ]).pipe(gulp.dest(DEST_SERVER + '/views'));
    gulp.src([
        SRC_SERVER + '/node_modules/**/*.*'
      ]).pipe(gulp.dest(DEST_SERVER + '/node_modules'));
    gulp.src([
        SRC_SERVER + '/app.js'
      ]).pipe(gulp.dest(DEST_SERVER));
    gulp.src([
        SRC_SERVER + '/package.json'
      ]).pipe(gulp.dest(DEST_SERVER));
    gulp.src([
        SRC_SERVER + '/config.json'
      ]).pipe(gulp.dest(DEST_SERVER));
  },
  stylus_client: function() {
    del.sync([DEST_CLIENT_STYLE], {
      force: true
    });
    return gulp.src(SRC_CLIENT_STYLE + '/zblog.styl').pipe(stylus()).pipe(gulp.dest(DEST_CLIENT_STYLE));
  },
  style_deps_client: function() {
    return gulp.src([
      SRC_CLIENT_SCRIPT_DEPS + '/bootstrap/dist/css/bootstrap.css'
    ])
    .pipe(concat('deps.css'))
    .pipe(gulp.dest(DEST_CLIENT_STYLE));
  },
  coffee_client: function() {
    del.sync([DEST_CLIENT_SCRIPT], {
      force: true
    });
    return gulp.src([SRC_CLIENT_SCRIPT + '/**/*.coffee']).pipe(coffee({
      bare: true
    }).on('error', gutil.log))
    .pipe(angularFileSort())
    .pipe(concat('zblog.js'))
    .pipe(gulp.dest(DEST_CLIENT_SCRIPT));
  },
  script_deps_client: function() {
    gulp.src([
      SRC_CLIENT_SCRIPT_DEPS + '/xheditor/**/*.*',
    ])
    .pipe(gulp.dest(DEST_CLIENT_SCRIPT + '/xheditor'));
    var s = gulp.src([
      SRC_CLIENT_SCRIPT_DEPS + '/jquery/dist/jquery.js',
      SRC_CLIENT_SCRIPT_DEPS + '/bootstrap/dist/js/bootstrap.js',
      SRC_CLIENT_SCRIPT_DEPS + '/angular/angular.js',
      SRC_CLIENT_SCRIPT_DEPS + '/angular-route/angular-route.js',
      SRC_CLIENT_SCRIPT_DEPS + '/angular-resource/angular-resource.js',
      SRC_CLIENT_SCRIPT_DEPS + '/angular-animate/angular-animate.js',
    ]);
    if(need_uglify) {
      s = s.pipe(uglify());
    }
    s.pipe(concat('deps.js'))
    .pipe(gulp.dest(DEST_CLIENT_SCRIPT));
  },
  copy_client: function() {
    del.sync([
        DEST_CLIENT + '/index.html',
        DEST_CLIENT + '/favicon.ico',
        DEST_CLIENT + '/partials',
        DEST_CLIENT + '/images'
      ], {
      force: true
    });
    gulp.src([
        SRC_CLIENT + '/partials/**/*.*'
      ]).pipe(gulp.dest(DEST_CLIENT + '/partials'));
    gulp.src([
        SRC_CLIENT + '/images/**/*.*'
      ]).pipe(gulp.dest(DEST_CLIENT + '/images'));
    gulp.src([
        SRC_CLIENT + '/index.html',
        SRC_CLIENT + '/favicon.ico'
      ]).pipe(gulp.dest(DEST_CLIENT));
  },
  watch: function() {
    gulp.watch([SRC_SERVER_ROUTE + '/**/*.coffee', SRC_SERVER_SERVICE + '/**/*.coffee'], ['coffee_server', 'restart']);
    gulp.watch(SRC_CLIENT_SCRIPT + '/**/*.coffee', ['coffee_client']);
    return gulp.watch(SRC_CLIENT_STYLE + '/**/*.styl', ['stylus_client']);
  },
  restart: function() {
    var started;
    started = false;
    if (server_process) {
      started = false;
      cp.exec('killall node');
    }
    server_process = cp.exec('DEBUG=zblog npm start', {
      cwd: process.cwd() + DEST_ROOT
    });
    server_process.stdout.on('data', function(data) {
      return console.log(data.toString('utf8').trim());
    });
    server_process.stderr.on('data', function(data) {
      if (!started) {
        return;
      }
      return console.error(data.toString('utf8').trim());
    });
    server_process.on('exit', function(code, signal) {
      started = false;
      return console.log(code, signal);
    });
    console.log('server restarted');
    return started = true;
  }
};

gulp.task('coffee_server', tasks.coffee_server);
gulp.task('copy_server', tasks.copy_server);
gulp.task('server', ['coffee_server', 'copy_server']);

gulp.task('coffee_client', tasks.coffee_client);
gulp.task('script_deps_client', tasks.script_deps_client);
gulp.task('stylus_client', tasks.stylus_client);
gulp.task('style_deps_client', tasks.style_deps_client);
gulp.task('copy_client', tasks.copy_client);
gulp.task('client', ['coffee_client', 'script_deps_client', 'stylus_client', 'style_deps_client', 'copy_client']);

gulp.task('restart', tasks.restart);
gulp.task('watch', ['default', 'restart'], tasks.watch);
gulp.task('default', ['server', 'client']);

gulp.task('product', function(){
    need_uglify = true;
});
gulp.task('release', ['product', 'default']);