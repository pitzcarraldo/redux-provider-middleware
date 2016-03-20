"use strict";

exports.__esModule = true;
exports.default = providerMiddleware;
function providerMiddleware() {
  for (var _len = arguments.length, willProvide = Array(_len), _key = 0; _key < _len; _key++) {
    willProvide[_key] = arguments[_key];
  }

  return function (_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;
    return function (next) {
      return function (action) {
        var nextAction = action;
        var providers = willProvide.reduce(function (prevProviders, Provider) {
          var nextProviders = prevProviders;
          var provider = new Provider();
          nextProviders[provider.name] = provider.$get(nextAction.context || {});
          return nextProviders;
        }, {});

        if (nextAction.thunk) {
          return nextAction.thunk(dispatch, getState, providers);
        }

        nextAction.providers = providers;
        return next(nextAction);
      };
    };
  };
}
//# sourceMappingURL=providerMiddleware.js.map