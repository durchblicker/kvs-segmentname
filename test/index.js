/*
** © 2013 by Philipp Dunkel <pip@pipobscure.com>. Licensed under MIT-License.
*/
/*jshint node:true, browser:false*/
'use strict';

var Lab = require('lab');
var Segmenter = require('../');

var store = {
  data:{},
  get:function(name, cb) {
    setImmediate(cb.bind(null, null, this.data[name]));
  },
  set:function(name, value, cb) {
    this.data[name]=value; setImmediate(cb.bind(null, null));
  },
  list:function(name, cb) {
    var d = Object.keys(this.data).filter(function(item) { return item.indexOf(name)===0; });
    setImmediate(cb.bind(null, null, { count:d.length, values:d }));
  },
  remove:function(name, cb) {
    delete this.data[name];
    setImmediate(cb.bind(null, null));
  }
};

var kvsS = new Segmenter(store);
var testKey='0123456789abcdefg';
var testSeg='0/1/2/3/4/56789abcdefg';
var testData = { key:'value', num:2 };

Lab.test('set a value', function(done) {
  kvsS.set(testKey, testData, function(err) {
    Lab.expect(!err).to.equal(true);
    Lab.expect(!!store.data[testSeg]).to.equal(true);
    done();
  });
});

Lab.test('get a value', function(done) {
  kvsS.get(testKey, function(err,val) {
    Lab.expect(!err).to.equal(true);
    Lab.expect(val).to.be.an('object');
    Lab.expect(val).to.eql(testData);
    done();
  });
});

Lab.test('list proxy', function(done) {
  kvsS.list(testKey, function(err, res) {
    Lab.expect(!err).to.equal(true);
    Lab.expect(res).to.eql({ count:1, values: [testKey] });
    done();
  });
});

Lab.test('remove proxy', function(done) {
  kvsS.remove(testKey, function(err) {
    Lab.expect(!err).to.equal(true);
    Lab.expect(!store.data.test).to.equal(true);
    done();
  });
});
