import {useDispatch} from 'react-redux';
import {set_token} from '../redux/actions/token/index'

const useLogOut = () =>{
  const dispach = useDispatch();
  dispach(set_token(null));
}

export default useLogOut;
