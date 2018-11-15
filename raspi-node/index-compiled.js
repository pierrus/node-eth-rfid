'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _blinkExample = require('./examples/blinkExample');

var _blinkExample2 = _interopRequireDefault(_blinkExample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import example from './examples/switchExample';
//import example from './examples/erc20Example';

var PORT = 3030;

var app = new _express2.default();
app.set('port', PORT);

app = (0, _blinkExample2.default)(app);

app.listen(app.get('port'), function () {
  console.log('PI-Node on port ' + app.get('port'));
  app.blinkLeds();
});
