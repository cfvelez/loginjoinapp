import {useQuery} from 'react-query';
import {GET_ALL_STORIES}  from '../../remotes/api';
import {getByContact} from '../../remotes/Story'

const useStoryList = (contactId,lastUpdate) => {
  return useQuery([GET_ALL_STORIES,contactId,lastUpdate], () => getByContact(contactId));
}

export default useStoryList;
