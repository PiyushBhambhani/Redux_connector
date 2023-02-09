
const redux = require('redux')
const CreateStore= redux.legacy_createStore;
const combineReducers= redux.combineReducers;

const BUY_CAKE ='BUY_CAKE'
const BUY_ICECREAM="BUY_ICECREAM"
function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}
function buyIceCream(){
    return{
        type: BUY_ICECREAM
    }
}
//(previousState,Action) => newState
// we already have the action defined, so let's define what our state looks like
//old state
// const initialState={
//     numOfCakes:8,
//     numOfIceCreams:20
// }
const initialCakeState={
    numOfCakes:8
}
const initialIceCreamState={
    numOfIceCreams:20
}
// console.log(initialState);
// old reducer
// const reducer=(state= initialState, action)=>{
//     switch(action.type){ 
//         case BUY_CAKE:
//              return {
//                 ...state,
//                 numOfCakes: state.numOfCakes-1
//             }
//         case BUY_ICECREAM:
//             return {
//                 ...state,
//                 numOfIceCreams: state.numOfIceCreams-1
//             }
//             default: return state;
//     }
// }
const cakeReducer=(state= initialCakeState, action)=>{
    switch(action.type){ 
        case BUY_CAKE:
             return {
                ...state,
                numOfCakes: state.numOfCakes-1
            }
            default: return state;
    }
}
const iceCreamReducer=(state= initialIceCreamState, action)=>{
    switch(action.type){ 
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams-1
            }
            default: return state;
    }
}
// console.log(reducer(initialState,buyCake()));
// before we create a store we combine our reducers, convention is to call combination of all reducer is rootReducer
const rootReducer= combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
// so now the store would accept our root reducer
// but the thing wich is different is the overall wrapped in an object as shown in o/p
// if we now wish to access num of ice creams we have to do it as
// state.iceCream.numofIceCreams and similar in cake as the cake/ iceCream are the keys in combine reducer
// Also we must know that when we dispatch the action both the reducers recieve the action the diff is one of that acts the action another just ignores it.
//responsibilty 1 done Holds application state by Attaching itself to a reducer
const store = CreateStore(rootReducer)
// responsibilty 2 (Allows access to state via getState() )
console.log("Initial state ", store.getState());
//responsibility 4 (Registers listeners via subscribe(listener))
const unsubscribe= store.subscribe(()=>{
    console.log('Updated state is :',store.getState());
})
//responsibilty 3: Allows state modification via dispatch(ation)
// store provides a dispacth method to update a state
store.dispatch(buyCake());
// to cause few more state transitions , we can call it multiple times
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
//responsibilty 5 Handles unregestering of listeners by the function which is returned by subscribe(listener)
unsubscribe();