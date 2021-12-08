import {combineReducers} from 'redux';
import {user} from './reducers/user';
import {token} from './reducers/token';
import {contact_list_update} from './reducers/list';
export default combineReducers({user,token,contact_list_update});
