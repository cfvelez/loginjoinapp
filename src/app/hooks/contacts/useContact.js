import {useQuery} from 'react-query';
import {GET_INFO_CONTACT}  from '../../remotes/api';
import {get} from '../../remotes/Contact/'

const useContact = (contactId) => {
  return useQuery([GET_INFO_CONTACT, contactId], () => get(contactId));
}

export default useContact;
