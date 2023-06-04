# Initializer #

Helps to initialize your project, optionally specifiying priority and/or a folder to load scripts from. I was inspired by the idea from [Jared Hanson's Bootable](https://github.com/jaredhanson/bootable) project.

### Getting Started ###
___
Initializer was built to help you out, not get in your way. There are very minor differences you'll need to make in your code and chances are you've already accomidated some of them such as exporting a function.


Install with npm:
`npm install initializer --save`

Create a folder to house all your startup scripts aka initializers
```
+run.js
|
+initializers/
    |
    +-server.js
    +-database.js
    +-otherasyncstuff.js
```

Each file should at the very least export a function (but it's completely up to you)

Here's a sample of what database.js might look like:
```js
// import any modules
var db = require('db');

module.exports = function database (done) {

    // establish a connection to your database
    db.connect('localhost', done);

};

// optionally set a priority for this initializer,
// the lower the number, the sooner it executes
module.exports.priority = 10;
```

And here's what your run.js might look like:
```js
var initializer = require('initializer');

// pass the folder as the first argument to search for initializers and start initializing
var init = initializer('./initializers').start();
```

### Other Examples ###
___

You can also add a function right from the function instance.
```js
var initializer = require('initializer');

var init = initializer();

init.add(function first (next) {
    console.log('starting misc init');
    setTimeout(function () {
        next();
    }, 1000);
});

init.start();
```

Chaining works too
```js
var init = require('initializer');

init().add(function(){console.log('hello')}).start();
```

Initializer is also an instance of EventEmitter
```js
var init = initializer('./initializers');

init.on('error', function (err) {
    console.error(err);
});

init.start();
```

### TODO ###
___
- create tests with mocha
- detailed documentation
- added before/after events when running each initializer


### License ###
[MIT](http://www.opensource.org/licenses/MIT)
