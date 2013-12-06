/*
** © 2013 by Philipp Dunkel <pip@pipobscure.com>. Licensed under MIT-License.
*/
/*jshint node:true, browser:false*/
'use strict';

module.exports = Segment;
module.exports.kvt = 'utility';

var Abstract = require('kvs-abstract');

Abstract.bequeath(Segment);
function Segment(store, options) {
  Abstract.instantiate(this);
  options = options || {};
  this.level = options.level || 5;
  this.segment = String(options.segment || '/')[0];
  this.client = store;
}

function segment(name, level, chr) {
  name = String(name||'').split('');
  name = name.slice(0,level).join(chr)+chr+name.slice(level).join('');
  return name;
}
function unsegment(name, level, chr) {
  name = String(name||'');
  var pre = name.substr(0, level * 2).split(chr).join('');
  var rst = name.substr(level * 2);
  return [pre, rst].join('');
}

Segment.prototype._set = function(name, value, callback) {
  if (name.length <= this.level) return callback(new Error('name too short'));
  this.client.set(segment(name, this.level, this.segment), value, callback);
};
Segment.prototype._get = function(name, callback) {
  if (name.length <= this.level) return callback(new Error('name too short'));
  this.client.get(segment(name, this.level, this.segment), callback);
};
Segment.prototype._remove = function(name, callback) {
  if (name.length <= this.level) return callback(new Error('name too short'));
  this.client.get(segment(name, this.level, this.segment), callback);
};
Segment.prototype._list = function(name, callback) {
  if (name.length <= this.level) return callback(new Error('name too short'));
  var self = this;
  this.client.list(segment(name, this.level, this.segment), function(err, val) {
    if (err) return callback(err);
    if (!val || !val.values) return callback(new Error('bad data'));
    val.values = val.values.map(function(item) {
      return unsegment(item, self.level, self.segment);
    });
    callback(null, val);
  });
};
