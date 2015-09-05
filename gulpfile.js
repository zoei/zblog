var gulp = require('gulp'),
    del = require('del'),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    coffee = require('gulp-coffee'),
    uglify = require('gulp-uglify');

var need_uglify = false;

var tasks = {
    clean: function() {
        del.sync(['./build/www'], {
            force: true
        });
    },
    res: function() {
        gulp.src('./src/www/index.html')
            .pipe(gulp.dest('./build/www'));
        gulp.src([
                // './app/css/bootstrap.customize.min.css',
            ])
            .pipe(gulp.dest('./build/www/styles'));
    },
    lib: function() {
        return gulp.src([
                './src/www/lib/**/*.*',
            ]).pipe(gulp.dest('./build/www/lib'));
    },
    view: function() {
        return gulp.src('./src/www/views/**/*.html')
            .pipe(gulp.dest('./build/www/views'));
    },
    stylus: function() {
        return gulp.src('./src/www/style/zblog.styl')
            .pipe(stylus())
            .pipe(gulp.dest('./build/www/styles'));
    },
    coffee: function() {
        return gulp.src(['./src/www/scripts/**/*.coffee'])
            .pipe(coffee({bare: true}).on('error', gutil.log))
            .pipe(gulp.dest('./build/www/scripts'));
    }
};

gulp.task('clean', tasks.clean);
gulp.task('view', tasks.view);
gulp.task('res', tasks.res);
gulp.task('styl', tasks.stylus);
gulp.task('coffee', tasks.coffee);
gulp.task('lib', tasks.lib);

gulp.task('default', ['clean', 'coffee', 'lib', 'styl', 'view', 'res']);
