'use strict';

exports.__esModule = true;
exports['default'] = providerMiddleware;
var PROVIDERS = {};
function providerMiddleware() {
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
      return function (action) {
        return next(typeof action === 'function' ? action(PROVIDERS) : action);
      };
    };
  };
}
module.exports = exports['default'];
//# sourceMappingURL=providerMiddleware.js.map