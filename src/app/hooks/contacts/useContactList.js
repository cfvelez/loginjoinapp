import {useQuery} from 'react-query';
import {GET_ALL_CONTACTS}  from '../../remotes/api';
import {all} from '../../remotes/Contact'

const useContactList = (lastUpdate) => {
  return useQuery([GET_ALL_CONTACTS,lastUpdate], all);
}

export default useContactList;
