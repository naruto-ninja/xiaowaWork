import { createStore } from 'redux';

const listProcessor = (state, action) => {
  console.log('state && action', state, action);
  if(action.type == 'PUSH_LIST') {
    return [action.data]
  }
  return state;
}

const store = createStore(listProcessor);

console.log('store 111', store.getState())


store.subscribe(function() {
  console.log('store subscrible', store.getState())
})


store.dispatch({
  type: 'PUSH_LIST',
  data: {
    title: '标题'
  }
})

console.log('store', store.getState())

