export default function providerMiddleware(...willProvide) {
  return ({ dispatch, getState }) => next => action => {
    const nextAction = action;
    const providers = willProvide.reduce((prevProviders, Provider) => {
      const nextProviders = prevProviders;
      const provider = new Provider();
      nextProviders[provider.name] = provider.$get(nextAction.context || {});
      return nextProviders;
    }, {});

    if (nextAction.thunk) {
      return nextAction.thunk(dispatch, getState, providers);
    }

    nextAction.providers = providers;
    return next(nextAction);
  };
}
