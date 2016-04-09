'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports['default'] = providerMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PROVIDERS = {};
function providerMiddleware() {
  var _this = this;

  for (var _len = arguments.length, willProvide = Array(_len), _key = 0; _key < _len; _key++) {
    willProvide[_key] = arguments[_key];
  }

  return function (_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;

    PROVIDERS = willProvide.reduce(function (prevProviders, provider) {
      prevProviders[provider.name] = provider.$get({ dispatch: dispatch, getState: getState });
      return prevProviders;
    }, {});
    return function (next) {
      return function () {
        var ref = (0, _asyncToGenerator3['default'])(_regenerator2['default'].mark(function () {
          function _callee(action) {
            return _regenerator2['default'].wrap(function () {
              function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;

                      if (!(typeof action === 'function' && action.name && action.name.indexOf('callee') > -1)) {
                        _context.next = 5;
                        break;
                      }

                      _context.next = 4;
                      return action(PROVIDERS);

                    case 4:
                      action = _context.sent;

                    case 5:
                      return _context.abrupt('return', next(typeof action === 'function' ? action(PROVIDERS) : action));

                    case 8:
                      _context.prev = 8;
                      _context.t0 = _context['catch'](0);
                      return _context.abrupt('return', next({ type: '@@provider/ERROR', payload: _context.t0 }));

                    case 11:
                    case 'end':
                      return _context.stop();
                  }
                }
              }

              return _callee$;
            }(), _callee, _this, [[0, 8]]);
          }

          return _callee;
        }()));
        return function (_x) {
          return ref.apply(this, arguments);
        };
      }();
    };
  };
}
module.exports = exports['default'];
//# sourceMappingURL=providerMiddleware.js.map