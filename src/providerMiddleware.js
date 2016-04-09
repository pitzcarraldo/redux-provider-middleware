let PROVIDERS = {};
export default function providerMiddleware(...willProvide) {
  return ({ dispatch, getState }) => {
    PROVIDERS = willProvide.reduce((prevProviders, provider) => {
      prevProviders[provider.name] = provider.$get(dispatch, getState);
      return prevProviders;
    }, {});
    return next => action => next(typeof action === 'function' ? action(PROVIDERS) : action);
  };
}
