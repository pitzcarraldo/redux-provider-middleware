let PROVIDERS = {};
export default function providerMiddleware(...willProvide) {
  return ({ dispatch, getState }) => {
    PROVIDERS = willProvide.reduce((prevProviders, provider) => {
      prevProviders[provider.name] = provider.$get({ dispatch, getState });
      return prevProviders;
    }, {});
    return next => action => {
      if (typeof action === 'function') {
        const provided = action(PROVIDERS);
        if (provided.then && typeof provided.then === 'function') {
          return provided
            .then(providedAction => next(providedAction))
            .catch(error => {
              throw error;
            });
        }
        action = provided;
      }
      return next(action);
    };
  };
}
