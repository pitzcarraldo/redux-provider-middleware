# Redux Provider Middleware

A redux middleware which provides Angular-like providers.

[![Build Status](https://travis-ci.org/reduxible/redux-provider-middleware.svg)](https://travis-ci.org/reduxible/redux-provider-middleware)
[![Coverage Status](https://coveralls.io/repos/github/reduxible/redux-provider-middleware/badge.svg?branch=master)](https://coveralls.io/github/reduxible/redux-provider-middleware?branch=master)
[![npm version](https://img.shields.io/npm/v/redux-provider-middleware.svg?style=flat-square)](https://www.npmjs.com/package/redux-provider-middleware)
[![npm downloads](https://img.shields.io/npm/dm/redux-provider-middleware.svg?style=flat-square)](https://www.npmjs.com/package/redux-provider-middleware)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/reduxible/redux-provider-middleware)


### API

## `providerMiddleware(providers: array)`

The `providerMiddleware` provides providers that similar with [providers of Angular.js](https://docs.angularjs.org/guide/providers). A `providerMiddleware` injects providers that returns new or cached objects to action. It also similar with [Spring Beans](http://www.tutorialspoint.com/spring/spring_bean_definition.htm).

### `provider`

To use providerMiddleware, you should create `provider`. `provider` is pure JavaScript Object. It must has propeties `name` and `$get`.

* `name`: A name of the provider. You can call provided object by this name in actions.
* `$get({dispatch, getState})`: A method that provides something. This can return anything you want. Variables, new instance, utility functions, singleton object...etc. `$get` will received object contains `dispatch` and `getState` like `redux-thunk`. It would help you when you need something related with redux state.
* :warning: Caution: `$get` would called only one time when initializing providers. So if you want to get new instance from provider, you can retrun function from provider.

### `providedThunk(providers: object)`

If you applied redux-provider-middleware to your redux application, you can dispatch `providedThunk` as action. `providedThunk` is function which reciedved providers object as argument. You can get provided things by name that you defined into provider. `providedThunk` should returns redux action. It could be also `redux-thunk` or `promise`. If you want to use other middleware with `providerMiddleware`, should add them after `providerMiddleware`.


## USAGE 

`httpProvider.js`

```js
const HTTP_CLIENT = new HttpClient(); // Abstract http client. You could make this with fetch, superagent or axios.

export default {
  name: '$http',
  $get({ dispatch, getState }) {
    const { context: { req } } = getState();
    return req ? new HttpClient(req) : HTTP_CLIENT;
  }
};
```

`createStore.js`
```js
import { createStore, applyMiddleware } from 'redux';
import providerMiddleware from 'redux-provider-middleware';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './reducers/index';
import httpProvider from './httpProvider';

const store = createStore(
  rootReducer,
  applyMiddleware(
    providerMiddleware([httpProvider]),
    // You can also use other middleware with providers
    thunk,
    promiseMiddleware()
  )
);
```

`actions.js`
```js
function getEntities() {
    // This is the provided thunk.
    return async ({ $http }) => {
      const response = await $http.get('/entities');
      return {
        type: 'UPDATE_ENTITIES',
        payload: {
            entities: response.body.entities
        }
      }
    }
}

function getEntityForUser() {
    // Use with redux-thunk
    return ({ $http }) => async (dispatch, getState) => {
        const { user: { id } } = getState();
        const response = await $http.get(`/entities/user/${id}`);
        return dispatch({
          type: 'UPDATE_ENTITY',
          payload: {
              entity: response.body.entity
          }
        })
    }
}
```
