
var util = require('util');
var through2 = require('through2');


var fallback = through2.obj(function(data, encoding, cb) {
  data.severity = data.severity || 'DEBUG';
  data.timestamp = data.timestamp || new Date();

  if (!data.message){
    if (data.arguments) {
      data.message = util.format.apply(this, data.arguments);
    } else {
      data.message = 'something wrong, arguments are not specified: ' +
        JSON.stringify(data);
    }
  }

  var str = data.timestamp.toLocaleTimeString() + '.' +
    data.timestamp.getMilliseconds();

  if (data.namespace) {
    str += ' [' + data.namespace + ']';
  }

  str += ' <' + data.severity + '> ' + data.message + '\n';

  cb(null, str);
});

fallback.pipe(process.stdout);

module.exports = fallback;


