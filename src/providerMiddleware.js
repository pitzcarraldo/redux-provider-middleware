let PROVIDERS = {};
export default function providerMiddleware(...willProvide) {
  return ({ dispatch, getState }) => {
    PROVIDERS = willProvide.reduce((prevProviders, provider) => {
      prevProviders[provider.name] = provider.$get({ dispatch, getState });
      return prevProviders;
    }, {});
    return next => async action => {
      try {
        if (typeof action === 'function' && action.name && action.name.indexOf('callee') > -1) {
          action = await action(PROVIDERS);
        }
        return next(typeof action === 'function' ? action(PROVIDERS) : action);
      } catch (error) {
        return next({ type: '@@provider/ERROR', payload: error });
      }
    };
  };
}
