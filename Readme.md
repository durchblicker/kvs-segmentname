# KVS Segment Name
[KVS](http://npmjs.org/package/kvs) or   *K*ey *V*alue *S*tore is an abstract KeyValueStore system. The *kvs-** group of node modules, are intended to present a unified interface to key value stores of every persuasion. This allows for substituting them without changing anything but the initializing parameters.

*KVS-filter* modules are modules that are used to modify the requests to the KVS system. They can transform the *key* or the *value* or both in some way. However they need to take either be transparent and keep to the KVS-system definition (i.e.: values are buffers, etc...) or be used close to the consumer of the API.

*KVS-segmentname* is a *KVS filter* module that is transparent. It keeps to the kvs conventions. It takes the *key* and transforms it by splitting the first *n* characters up and segmenting them individually with a separator.

**For Example**

> abcdefghijklmnop is transformed into a/b/c/d/e/fghijklmnop

This is useful if you are using [kvs-file](http://npmjs.org/package/kvs-file) or [kvs-awss3](http://npmjs.org/package/kvs-awss3) to split your data into multiple folders. This in turn is especially effective if you have for example the hex representation of a hash as your key.

## Install
    npm install kvs-segmentname
    
## Use
    var KVS=require('kvs-segmentname');
    var store = new KVS(store, { // pass in the KVS-Instance that is used as storage
    	level:5, // how many character to segment (default 5)
    	segment:'/', // the character to use as a segmentor
    }); 
    store.set('name', new Buffer('value is a buffer'), function(err) {…});
    store.get('name', function(err, value) {
    	// attention! value will be an object
    });
    store.remove('name', function(err) { … });
    store.list('name', function(err, value) { … });

## License (MIT)
**Copyright (c) 2013 [Philipp Dunkel](mailto:pip@pipobscure.com)**

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
