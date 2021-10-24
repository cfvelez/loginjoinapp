import httpClient from '../httpClient';
import store from '../../redux/store';
import {set_token} from '../../redux/actions/token';

export const authUser = async(data) =>{
 var http = new httpClient();
 var info = {username: data.username, password: data.password};

 return http.axios.post('/login_check', info)
  .then((data) => {
    setToken(data.data);
    return true;
  })
  .catch((e) =>{
    setToken(null);
    return false;
  }
  );
}

export const setToken = (jwtoken) =>{
  store.dispatch(set_token(jwtoken));
}



