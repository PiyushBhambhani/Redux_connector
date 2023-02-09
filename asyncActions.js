
// Our Application Fetches a list of users from an API endpoint
// and stores it in redux store

// we define state action and reducers
// step 1: was we made initial state and actions
// step 2: we made our reducer which returns new state which takes a prevstate and action
// based on the action we modify state here
// then we import and create store.

const redux= require('redux');
const CreateStore= redux.CreateStore;

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
const fetchUserFailure= (users) =>{
    return {
        type: fetchUserFailure,
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

// now final step is to create our redux store.

const store= CreateStore(reducer);

// Store methods we can use were 
//store.getState(), 
//store.subscribe() which returns the unsubscribe thing,
//store.subscribe()  is used to register the listeners
// returns() ex unsubscribe(); un registers the listeners
//store.dispatch to diapatch actions,

// What is left now is to make api calls and dispatch appropriate actions
