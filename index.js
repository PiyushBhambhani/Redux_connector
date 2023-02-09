const redux = require('redux')
const CreateStore= redux.legacy_createStore;
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
const initialState={
    numOfCakes:8,
    numOfIceCreams:20
}
// console.log(initialState);

const reducer=(state= initialState, action)=>{
    switch(action.type){ 
        case BUY_CAKE:
             return {
                ...state,
                numOfCakes: state.numOfCakes-1
            }
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams-1
            }
            default: return state;
    }
}
// console.log(reducer(initialState,buyCake()));
//responsibilty 1 done Holds application state by Attaching itself to a reducer
const store = CreateStore(reducer)
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