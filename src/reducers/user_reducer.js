import {UPDATE_USER, USER_INFO, DELETE_USER} from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case USER_INFO:
      return {...state, email: action.payload.email, first_name: action.payload.first_name, last_name: action.payload.last_name, description: action.payload.description, photo_url: action.payload.photo_url};
    case UPDATE_USER:
      return {...state, email: action.payload.email, first_name: action.payload.first_name, last_name: action.payload.last_name, description: action.payload.description, photo_url: action.payload.photo_url};
    case DELETE_USER:
    	// return empty object ???
    	return state
  }

  return state;
}
