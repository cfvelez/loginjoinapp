import {combineReducers} from 'redux';
import {user} from './reducers/user';
import {token} from './reducers/token';
import {contactListUpdate, storyListUpdate, storypointListUpdate, resourceListUpdate} from './reducers/list';
import {stackView} from './reducers/stackview'
export default combineReducers({user,token,contactListUpdate,storyListUpdate,storypointListUpdate, resourceListUpdate, stackView});
