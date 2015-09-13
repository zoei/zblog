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
    SERVER_SERVICE = SRC_DIR + '/service';

var server_process;
var cp = require('child_process');

var tasks = {
    clean_server: function() {
        del.sync([
            SERVER_SERVICE,
            SERVER_ROUTE
        ], {
            force: true
        });
    },
    clean_client: function() {
        del.sync([
            CLIENT_SCRIPT,
            CLIENT_STYLE
        ], {
            force: true
        });
    },
    clean_client_script: function() {
        del.sync([
            CLIENT_SCRIPT
        ], {
            force: true
        });
    },
    clean_stylus: function() {
        del.sync([
            CLIENT_STYLE
        ], {
            force: true
        });
    },
    stylus: function() {
        return gulp.src(SRC_STYLUS + '/style.styl')
            .pipe(stylus())
            .pipe(gulp.dest(CLIENT_STYLE));
    },
    coffee_server: function() {
        return gulp.src([SRC_COFFEE + '/server/**/*.coffee'])
            .pipe(coffee({bare: true}).on('error', gutil.log))
            .pipe(gulp.dest(SRC_DIR));
    },
    coffee_client: function() {
        return gulp.src([SRC_COFFEE + '/client/**/*.coffee'])
            .pipe(coffee({bare: true}).on('error', gutil.log))
            .pipe(gulp.dest(CLIENT_SCRIPT));
    },
    watch: function() {
        gulp.watch(SRC_COFFEE + '/server/**/*.coffee', ['server', 'restart']);
        gulp.watch(SRC_COFFEE + '/client/**/*.coffee', ['clean_client_script', 'client']);
        gulp.watch(SRC_STYLUS + '/**/*.styl', ['clean_stylus', 'stylus']);
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

gulp.task('clean_server', tasks.clean_server);
gulp.task('coffee_server', tasks.coffee_server);
gulp.task('server', ['clean_server', 'coffee_server']);

gulp.task('clean_stylus', tasks.clean_stylus);
gulp.task('clean_client', tasks.clean_client);
gulp.task('coffee_client', tasks.coffee_client);
gulp.task('stylus', tasks.stylus);
gulp.task('client', ['clean_client', 'coffee_client', 'stylus']);

gulp.task('watch', ['restart'], tasks.watch);
gulp.task('restart', tasks.restart);
gulp.task('default', ['server', 'client']);
