import {useQuery} from 'react-query';
import {GET_SEARCH_STORYPOINT}  from '../../remotes/api';
import {search} from '../../remotes/StoryPoint';

const useStoryPointSearch = (storyId,term) => {
  return useQuery([GET_SEARCH_STORYPOINT, storyId, term], () => search(storyId,term));
}
export default useStoryPointSearch;
