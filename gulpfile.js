var gulp = require('gulp'),
    del = require('del'),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    coffee = require('gulp-coffee'),
    uglify = require('gulp-uglify');

var need_uglify = false;

var SRC_DIR = './zblog',
    SRC_STYLUS = SRC_DIR + '/stylus',
    SRC_COFFEE = SRC_DIR + '/coffee',

    CLIENT_DIR = SRC_DIR + '/public',
    CLIENT_STYLE = CLIENT_DIR + '/styles',
    CLIENT_SCRIPT = CLIENT_DIR + '/scripts',

    SERVER_ROUTE = SRC_DIR + '/routes'
    SERVER_SERVICE = SRC_DIR + '/service',
    SERVER_VIEW_BUILT_STYLE = SRC_DIR + '/views/built/css';
    SERVER_VIEW_BUILT_JS = SRC_DIR + '/views/built/js';

var server_process;
var cp = require('child_process');

var tasks = {
    stylus_server: function() {
        del.sync([
            SERVER_VIEW_BUILT_STYLE
        ], {
            force: true
        });
        return gulp.src(SRC_STYLUS + '/built/**/*.styl')
            .pipe(stylus())
            .pipe(gulp.dest(SERVER_VIEW_BUILT_STYLE));
    },
    stylus_client: function() {
        del.sync([
            CLIENT_STYLE
        ], {
            force: true
        });
        return gulp.src(SRC_STYLUS + '/global/style.styl')
            .pipe(stylus())
            .pipe(gulp.dest(CLIENT_STYLE));
    },
    coffee_server: function() {
        del.sync([
            SERVER_SERVICE,
            SERVER_ROUTE,
            SERVER_VIEW_BUILT_JS
        ], {
            force: true
        });
        return gulp.src([SRC_COFFEE + '/server/**/*.coffee'])
            .pipe(coffee({bare: true}).on('error', gutil.log))
            .pipe(gulp.dest(SRC_DIR));
    },
    coffee_client: function() {
        del.sync([
            CLIENT_SCRIPT
        ], {
            force: true
        });
        return gulp.src([SRC_COFFEE + '/client/**/*.coffee'])
            .pipe(coffee({bare: true}).on('error', gutil.log))
            .pipe(gulp.dest(CLIENT_SCRIPT));
    },
    watch: function() {
        gulp.watch(SRC_COFFEE + '/server/**/*.coffee', ['server', 'restart']);
        gulp.watch(SRC_COFFEE + '/client/**/*.coffee', ['client']);
        gulp.watch(SRC_STYLUS + '/built/**/*.styl', ['stylus_server']);
        gulp.watch(SRC_STYLUS + '/global/**/*.styl', ['stylus_client']);
    },
    restart: function() {
        var started = false;
        if (server_process) {
            started = false;
            cp.exec('killall node');
        }
        server_process = cp.exec('DEBUG=zblog npm start', {
            cwd: '/home/zoei/git/zblog/zblog'
        });
        server_process.stdout.on('data', function(data){
            console.log(data.toString('utf8').trim());
        });
        server_process.stderr.on('data', function(data){
            if (!started) return;
            console.error(data.toString('utf8').trim());
        });
        server_process.on('exit', function(code, signal){
            started = false;
            console.log(code, signal);
        });
        console.log('server restarted');
        started = true;
    }
};

gulp.task('coffee_server', tasks.coffee_server);
gulp.task('stylus_server', tasks.stylus_server);
gulp.task('server', ['coffee_server', 'stylus_server']);

gulp.task('coffee_client', tasks.coffee_client);
gulp.task('stylus_client', tasks.stylus_client);
gulp.task('client', ['coffee_client', 'stylus_client']);

gulp.task('restart', tasks.restart);

gulp.task('watch', ['restart'], tasks.watch);
gulp.task('default', ['server', 'client']);
