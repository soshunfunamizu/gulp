const autoprefixer = require('autoprefixer'),
			assets = require('postcss-assets'),
			babel = require('gulp-babel'),
			browserSync = require("browser-sync"),
			clean = require('postcss-clean'),
			concat = require('gulp-concat'),
			del = require('del'),
			flexBugsFixes = require('postcss-flexbugs-fixes'),
			gulp = require('gulp'),
			header = require('gulp-header'),
			imagemin = require('gulp-imagemin'),
			mozjpeg = require('imagemin-mozjpeg'),
			notify = require("gulp-notify"),
			order = require('gulp-order'),
			plumber = require("gulp-plumber"),
			pngquant = require('imagemin-pngquant'),
			postcss = require('gulp-postcss'),
			pug = require('gulp-pug'),
			rename = require('gulp-rename'),
			replace = require('gulp-replace'),
			sass = require('gulp-sass')(require('sass'));
			sorting = require('postcss-sorting'),
			uglify = require('gulp-uglify');
      sassGlob = require("gulp-sass-glob-use-forward");

const paths = {
  root: './src',
  html: {
    src: './src/html/**/*.pug',
    dest: './dist/',
  },
  styles: {
    src: './src/sass/**/*.scss',
    dest: './dist/css',
    map: './dist/css/maps',
  },
  scripts: {
    src: './src/js/**/*.js',
    jsx: './src/js/**/*.jsx',
    dest: './dist/js',
    map: './dist/js/maps',
    core: 'src/js/core/**/*.js',
    app: 'src/js/app/**/*.js',
  },
  images: {
    src: './src/img/**/*.{jpg,jpeg,png,svg,gif}',
    dest: './dist/img/',
  },
};


// Post CSS
const autoprefixerOption = {
  grid: 'autoplace',
};
const sortingOptions = require('./postcss-sorting.json');
const postcssOption = [
  assets({
    baseUrl: '/',
    basePath: 'src/',
    loadPaths: ['img/'],
    cachebuster: true,
  }),
  flexBugsFixes,
  autoprefixer(autoprefixerOption),
  //sorting(sortingOptions),
];


// HTML整形
function html() {
  return gulp
    .src(paths.html.src, { since: gulp.lastRun(html) })
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      }),
    )
    .pipe(pug({
	    pretty: true,
	  }))
    .pipe(gulp.dest(paths.html.dest));
}


// Sassコンパイル(非圧縮)
function styles() {
  return gulp
    .src(paths.styles.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      }),
    )
    .pipe(sassGlob()) 
    .pipe(
      sass({
        outputStyle: 'expanded',
      }),
    )
    .pipe(replace(/@charset "UTF-8";/g, ''))
    .pipe(header('@charset "UTF-8";\n\n'))
    .pipe(postcss([
      autoprefixer({grid: 'autoplace'})
    ]))
    .pipe(gulp.dest(paths.styles.dest, { sourcemaps: './maps' }))
    .pipe(browserSync.reload({stream: true}));
}

// JSコンパイル
function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(order([paths.scripts.core, paths.scripts.app],{ base: './' }))
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(plumber())
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(gulp.dest(paths.scripts.dest, { sourcemaps: './maps' }));
}
// 画像最適化
const imageminOption = [
  pngquant({
    quality: [0.7, 0.85],
  }),
  mozjpeg({
    quality: 85,
  }),
  imagemin.gifsicle(),
  imagemin.mozjpeg(),
  imagemin.optipng(),
  imagemin.svgo({
    removeViewBox: false,
  }),
];

function images() {
	console.log("images in");
  return gulp
    .src(paths.images.src, {
      since: gulp.lastRun(images),
    })
    .pipe(imagemin(imageminOption))
    .pipe(gulp.dest(paths.images.dest));
}
// マップファイル除去
function cleanMapFiles() {
  return del([paths.styles.map, paths.scripts.map]);
}

// ブラウザ更新&ウォッチタスク
const browserSyncOption = {
  port: 8080,
  server: {
    baseDir: './dist/',
    index: 'guide.html',
  },
  reloadOnRestart: true,
};
function browsersync(done) {
  browserSync.init(browserSyncOption);
  done();
}


function watchFiles(done) {
  const browserReload = () => {
    browserSync.reload();
    done();
  };
  gulp.watch(paths.styles.src).on('change', gulp.series(styles, browserReload));
  gulp.watch(paths.html.src).on('change', gulp.series(html, browserReload));
  gulp.watch(paths.scripts.src).on('change', gulp.series(scripts, browserReload));
}


gulp.task('default', gulp.series(gulp.parallel(browsersync, watchFiles)));

gulp.task('clean', cleanMapFiles);
gulp.task('imagemin', images);

gulp.task('build', gulp.series(gulp.parallel(scripts, 'imagemin', html), 'clean'));