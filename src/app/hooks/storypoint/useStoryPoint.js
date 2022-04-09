import {useQuery} from 'react-query';
import {GET_INFO_STORYPOINT}  from '../../remotes/api';
import {get} from '../../remotes/StoryPoint'

const useStoryPoint = (storypointId) => {
  return useQuery([GET_INFO_STORYPOINT, storypointId], () => get(storypointId));
}

export default useStoryPoint;
