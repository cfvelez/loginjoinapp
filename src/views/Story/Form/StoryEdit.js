import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import useStory from '../../../app/hooks/story/useStory';
import StoryForm from './StoryForm';

const StoryEdit = ({navigation, route}) => {
  const {storyId, contactId} = route.params;
  const {data: story ,isLoading, isSuccess} = useStory(storyId);
  const isEditing = Boolean(story?.id);

  let screen = <Text><ActivityIndicator/>Cargando..</Text>;

  if(!isLoading && isSuccess){
    screen = <StoryForm story={story} isEditing={isEditing} navigation={navigation} route={route} contactId={contactId}  />;
  }

  return (
    <React.Fragment>
      {screen}
     </React.Fragment>
  );
}

export default StoryEdit;
