import {useQuery} from 'react-query';
import {GET_SEARCH_STORY}  from '../../remotes/api';
import {search} from '../../remotes/Story';

const useStorySearch = (contactId,term) => {
  return useQuery([GET_SEARCH_STORY, contactId, term], () => search(contactId,term));
}
export default useStorySearch;
