import {useQuery} from 'react-query';
import {GET_INFO_STORYPOINT}  from '../../remotes/api';
import {getStoryPointById} from '../../remotes/StoryPoint'

const useStoryListPoint = (storyId) => {
  return useQuery([GET_INFO_STORYPOINT, storyId], () => getStoryPointById(storyId));
}

export default useStoryListPoint;
