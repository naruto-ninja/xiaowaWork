import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

const toutiaoProcessor = (state = { list: [] }, action) => {
  if(action.type === 'PUSH_LIST') {
    return {
      ...state,
      list: state.list.concat(action.data)
    }
  }
  return state;
}

const reduxPromise = ({dispatch, getState}) => next => action => {
  console.log('middle ware', action, next)
  if(typeof action.then === 'function') {
    return action
      .then(next)
  }
  return next(action);
}

// make thunk
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    console.log('make thunk::', action, next);
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;



const store = createStore(toutiaoProcessor, applyMiddleware(thunk));

export default store;