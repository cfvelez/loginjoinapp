import {combineReducers} from 'redux';
import {user} from './reducers/user';
import {token} from './reducers/token';
import {contactListUpdate, storyListUpdate} from './reducers/list';
import {stackView} from './reducers/stackview'
export default combineReducers({user,token,contactListUpdate,storyListUpdate, stackView});
