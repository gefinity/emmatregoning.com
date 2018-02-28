const path            = require('path');
const gulp            = require('gulp');
const sourcemaps      = require('gulp-sourcemaps');
const source          = require('vinyl-source-stream');
const buffer          = require('vinyl-buffer');
const browserify      = require('browserify');
const watchify        = require('watchify');
const babel           = require('babelify');
const envify          = require('envify');
const sass            = require('gulp-sass');
const watch           = require('gulp-watch');
const postcss         = require('gulp-postcss');
const autoprefixer    = require('autoprefixer');
const ejs             = require('gulp-ejs');
const zip             = require('gulp-zip');
const git             = require('git-rev-sync');
const browserSync     = require('browser-sync').create();

const paths = {
    buildRoot: './build/.tmp',
    packages: './build/packages'
};

function makeCssBundle () {
    return gulp.src('assets/css/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                path.join(__dirname, '/node_modules/normalize-scss/sass/'),
                './styles',
            ]
        }).on('error', sass.logError))
        .pipe(postcss(
            [
                autoprefixer({
                    browsers: ['last 2 versions']
                })
            ]
        ))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.buildRoot+'/static/css'))
        .pipe(browserSync.stream());
}

function jsBundler () {
    return browserify('src/main.js', { debug: true })
        .transform(envify, {
            NODE_ENV: 'production',
            __DEV__: true,
        })
        .transform(babel, {
            presets: ['es2015', 'react'],
            plugins: [
                'transform-strict-mode',
                'transform-class-properties',
                'transform-object-rest-spread'
            ]
        }
    );
}

function makeJsBundle (bundler) {
    return bundler.bundle()
        .on('error', (err) => { console.error(err); this.emit('end'); })
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.buildRoot+'/static'))
        .pipe(browserSync.stream());
}

gulp.task('make-css-bundle', () => {
    return makeCssBundle();
});

gulp.task('make-js-bundle', () => {
    return makeJsBundle(jsBundler());
})

gulp.task('copy-assets', () => {
    return gulp.src([
        'assets/images/**/*.*',
        'assets/css/vendor/**/*.css',
    ], {base: './assets'})
        .pipe(gulp.dest(paths.buildRoot+'/static'));
});

gulp.task('copy-server', () => {
    return gulp.src([
        './server.js',
        './package.json',
    ])
        .pipe(gulp.dest(paths.buildRoot));
});

gulp.task('make-index', () => {
    return gulp.src('./src/index.ejs')
        .pipe(ejs({}, {}, {ext: '.html'}))
        .pipe(gulp.dest(paths.buildRoot+'/static'));
});

gulp.task('build', ['make-index', 'make-js-bundle', 'make-css-bundle', 'copy-assets', 'copy-server']);

gulp.task('make-package', ['build'], () => {
    return gulp.src(paths.buildRoot+'/**/*')
        .pipe(zip(`package-${git.short()}.zip`))
        .pipe(gulp.dest(paths.packages))
});

gulp.task('watch', ['make-index', 'make-css-bundle'], () => {

    require('./server');

    const bundler = watchify(jsBundler());
    bundler.on('update', () => {
        console.log('-> bundling JS...');
        makeJsBundle(bundler);
    });

    makeJsBundle(bundler);

    gulp.watch('assets/css/**/*.scss', () => {
        console.log('-> bundling CSS...');
        makeCssBundle();
    });

    browserSync.init(null, {
        open: true,
        proxy: 'http://localhost:8080',
    });
    

});

gulp.task('default', ['watch']);