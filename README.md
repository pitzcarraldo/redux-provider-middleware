# Redux Provider Middleware

A redux middleware which provides Angular-like providers.

[![Build Status](https://travis-ci.org/reduxible/redux-provider-middleware.svg)](https://travis-ci.org/reduxible/redux-provider-middleware)
[![Coverage Status](https://coveralls.io/repos/github/reduxible/redux-provider-middleware/badge.svg?branch=master)](https://coveralls.io/github/reduxible/redux-provider-middleware?branch=master)
[![npm version](https://img.shields.io/npm/v/redux-provider-middleware.svg?style=flat-square)](https://www.npmjs.com/package/redux-provider-middleware)
[![npm downloads](https://img.shields.io/npm/dm/redux-provider-middleware.svg?style=flat-square)](https://www.npmjs.com/package/redux-provider-middleware)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/reduxible/redux-provider-middleware)


## providerMiddleware

The `providerMiddleware` provides providers that similar with [providers of Angular.js](https://docs.angularjs.org/guide/providers). A `providerMiddleware` injects providers that returns new or cached objects to action. To use providers, you can make providers by extends abstract class `Provider` and initialize `providerMiddleware` with them. For implement `Provider` class, child class must have below two properties.
* name: A name of the provider. You can call provided object by this name in actions.
* $get: A method that returns provided object. This can return anything you want. Static variables, new instance, utility functions, singleton object...etc. `$get` will receive `context` by argument from `contextMiddleware`. If you use this middleware, you may not use other middlewares. But providerMiddleware could solve many requirements at once by angular like way.


```js

class HttpProvider extends Provider {
    static DEFAULT_CLIENT = new HttpClient();
    name = '$http'
    $get({ req }) {
        if (req) {
           return DEFAULT_CLIENT;
        }
        return new HttpClient(req);
    }
}

const middlewares = [providerMiddleware([HttpProvider])];

const reduxible = new Reduxible({
    ...
    middlewares
    ...
});

//Get providers in action as thunk.
const action = createAction('todo', {
    GET_TODO: () => ({
        thunk: async(dispatch, getState, { $http }) => {
          const { data: todos } = await $http.get('/todos');
          return dispatch(action('UPDATE_TODOS')(todos));
        }
    }),
    UPDATE_TODOS: todos => ({ payload: { todos } })
});

//Also can get providers in reducer.
const reducer = createReducer(initialState, [
  {
    types: [ action.type('UPDATE_TODOS') ],
    reduce: ({ payload: { todos }, providers: { $http } }, state) => ({ ...state, todos })
  }
]);

```
