# attribution
Explain your JavaScript

## install

```
npm install attribution
```

## usage

**Parsing JavaScript**

```js
var parse = require('attribution');
var src = fs.readSync('some-js-file.js');
var attributes = parse(src);

console.log(attributes); // => array of Attribute
```

**Gulp**

```js
var wrap = require('gulp-wrap');
var attribution = require('gulp-attribution');

gulp.task('js', function() {
  gulp.src('src/*.js')
    .pipe(attribution())
    .pipe(wrap('// this is the <%= file.attributes.name %> module'))
    .pipe(gulp.dest('dist'));
});
```

## API

### parse(src)

**Arguments**

 - **`src`** - A `Buffer` or `String` of JavaScript

**Returns**

An `Array` of `Attribute` objects.

### Attribute

**Properties**

 - `name` - the name of the attribute (eg. `@foo => 'foo'`)
 - `value` - the first value provided (eg. `@foo bar => 'bar'`)
 - `line` - the line `Number` of the attribute within the JavaScript source
