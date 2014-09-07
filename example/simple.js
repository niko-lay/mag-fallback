
var Logger = require('mag-logger-facade');
var fallback = require('../');

var logger = new Logger(fallback, 'simple');

logger.info('info message');
logger.debug('debug');
logger.warn('OMG!!!');
logger.panic('err:', new Error('test panic'));
