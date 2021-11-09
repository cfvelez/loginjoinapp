import {useQuery} from 'react-query';
import {GET_ALL_CONTACTS}  from '../../remotes/api';
import {all} from '../../remotes/Contact'

const useContactList = () => {
  console.log('Trying to fetch contact list...')
  return useQuery(GET_ALL_CONTACTS, all);
}

export default useContactList;
