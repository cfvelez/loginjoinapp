import {combineReducers} from 'redux';
import {user} from './reducers/user'
import {token} from './reducers/token'
export default combineReducers({user,token});
