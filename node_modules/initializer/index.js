var fs      = require('fs');
var path    = require('path');
var util    = require('util');
var events  = require('events');
var noop    = function noop(){};
var async   = require('async');
var glob    = require('glob');

function initializer (options) {
    events.EventEmitter.call(this);

    if(typeof options === 'string') options = {path: options};

    this.options = options || {};
    this.tasks = [];
    return this;
}

util.inherits(initializer, events.EventEmitter);

initializer.prototype.start = function start () {
    var self = this;

    async.waterfall([
        function (done) {
            if (self.options.path) {
                glob(path.join(self.options.path, self.options.pattern || '**/*.js'), done);
            } else {
                done(null, []);
            }
        },
        function (tasks, done) {
            async.each(tasks, function (task, next) {
                try {
                    task = require(task);
                } catch (e) {
                    return next(e);
                }

                if(typeof task !== 'function') {
                    task = noop;
                }

                self.add(task);
                next();
            }, done);
        },
        function (done) {
            async.sortBy(self.tasks, function (task, next) {
                next(null, task.hasOwnProperty('priority') ? task.priority : 0);
            }, done);
        },
        function (tasks, done) {
            async.filter(tasks, function (task, next) {
                var isAsync = task.length > 0;

                if (!isAsync) {
                    try {
                        task();
                    } catch(e) {
                        done(e);
                    }
                }

                next(isAsync);
            }, function (tasks) {
                done(null, tasks);
            });
        }
    ], function finish (err, tasks) {
        if (err) return self.emit('error', err);
        async.waterfall(tasks, function complete (err) {
            self.complete(err);
        });
    });

    return this;
};

initializer.prototype.add = function (task, priority) {
    if (typeof task !== 'function') throw new TypeError('only functions can be added to the initialization stack');
    if (typeof task.priority === 'undefined') task.priority = priority || 0;
    this.tasks.push(task);
    this.emit('add', task)
    return this;
};

initializer.prototype.complete = function complete (err) {
    if (err) return this.emit('error', err);
    this.emit('complete');
};

module.exports = function wrapper (options) {
    return new initializer(options);
};