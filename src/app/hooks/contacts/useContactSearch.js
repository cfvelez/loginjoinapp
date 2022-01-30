import {useQuery} from 'react-query';
import {GET_SEARCH_CONTACTS}  from '../../remotes/api';
import {search} from '../../remotes/Contact'

const useContactSearch = (term) => {
  return useQuery([GET_SEARCH_CONTACTS, term], () => search(term));
}

export default useContactSearch;
