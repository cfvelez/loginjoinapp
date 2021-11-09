import {useSelector} from 'react-redux';

const useAuth = () =>{
  const token = useSelector(state => state.token);
  return (token && token?.token !== 'undefined' && token?.token !== null) ? true : false;
}

export default useAuth;
