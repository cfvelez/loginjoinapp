import {useQuery} from 'react-query';
import {GET_INFO_STORYPOINT}  from '../../remotes/api';
import {getStoryPointById} from '../../remotes/StoryPoint'

const useStoryListPoint = (storyId,lastUpdate) => {
  return useQuery([GET_INFO_STORYPOINT, storyId,lastUpdate], () => getStoryPointById(storyId));
}

export default useStoryListPoint;
