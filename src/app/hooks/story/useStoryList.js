import {useQuery} from 'react-query';
import {GET_ALL_STORIES}  from '../../remotes/api';
import {all} from '../../remotes/Story'

const useStoryList = (lastUpdate) => {
  return useQuery([GET_ALL_STORIES,lastUpdate], all);
}

export default useStoryList;
