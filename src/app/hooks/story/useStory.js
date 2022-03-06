import {useQuery} from 'react-query';
import {GET_INFO_STORY}  from '../../remotes/api';
import {get} from '../../remotes/Story'

const useStory = (storyId) => {
  return useQuery([GET_INFO_STORY, storyId], () => get(storyId));
}

export default useStory;
