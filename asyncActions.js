
// Our Application Fetches a list of users
//  from an API endpoint , so the actions should have been 
//fetchusers instead of user btw.
// and stores it in redux store

// we define state action and reducers
// step 1: was we made initial state and actions
// step 2: we made our reducer which returns new state which takes a prevstate and action
// based on the action we modify state here
// then we import and create store.

const redux= require('redux');
const CreateStore= redux.legacy_createStore;
const applyMiddleware=redux.applyMiddleware
const thunkMiddleware =require("redux-thunk").default
const axios=require('axios')

const initialState={
    loading: false,
    users:[],
    error:''
}

const FETCH_USER_REQUEST="FETCH_USER_REQUEST"
const FETCH_USER_SUCCESS="FETCH_USER_SUCCESS"
const FETCH_USER_FAILURE="FETCH_USER_FAILURE"

const fetchUserRequest=()=>{
    return {
        type:FETCH_USER_REQUEST
    }
}

//2nd action creater is to store the list of 
//users if the request is successful
const fetchUserSuccess=(users)=>{
    return{
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

//3rd action creater is to store the error 
//if the request is failed
const fetchUserFailure= (error) =>{
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

const reducer =(state=initialState,action)=>{
    switch(action.type)
    {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                users:action.payload,
                error:''
            }
        case FETCH_USER_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload,
                users:[]
            } 
    }
}

// What is left now is to make api calls and dispatch appropriate actions



//final step is to define async action creator
// defining an actioncreator function fetchusers

// but what thunk middleware brings to table is
// to return a function instead of action
//  the function doesn't need to be pure, so we can have side effects like async api calls
//and can also dispatch actions as it recieves dispatch method as an arguement.
//step 3 ;)
const fetchUsers=()=>{
    return function(dispatch) {
        
        dispatch(fetchUserRequest()) 
        // sets loading to true
       //now we call an api
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            // response.data is array of users 
            // we don't want to flood our state with all user info but just Id
            const users= response.data.map(user=>user.id)
            dispatch(fetchUserSuccess(users))
        })
        .catch((error)=>{
            // error.message is error description
            dispatch(fetchUserFailure(error.message))
        })

    }
}


// thunkMiddleware
//  what thunk middleware brings table is
// to return a function instead of action
//  the function doesn't need to be pure, so we can have side effects like async api calls
//and can also dispatch actions as it recieves dispatch method as an arguement.
// step 2 ;)
const store= CreateStore(reducer,applyMiddleware(thunkMiddleware));

// finally we subscribe to the store and dispatch this actionCreator
const unsubscribe=store.subscribe(()=>{
    console.log(store.getState());
})

store.dispatch(fetchUsers())
// unsubscribe() adding this here would unsubscribe first as Async API calls

// summary:
// so this is pretty much how you have a sync actions in your application
//  you import the redux thunk middleware and 
// pass it to the create store function 
// what this allows is for an action creator
//  to return a function instead of an action 
// the function can now perform side effects such as asynchronous tasks
//  the function also can dispatch regular actions 
// which Will be handled by the reducer 
// now this concept holds good when you're working with react redux as well 