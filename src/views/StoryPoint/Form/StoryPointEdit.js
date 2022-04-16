import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import useStoryPoint from '../../../app/hooks/storypoint/useStoryPoint';
import StoryPointForm from './StoryPointForm';

const StoryPointEdit = ({navigation, route}) => {
  const {storypointId, contactId, storyId} = route.params;
  const {data: storypoint ,isLoading, isSuccess} = useStoryPoint(storypointId);
  const isEditing = Boolean(storypoint?.id);

  let screen = <Text><ActivityIndicator/>Cargando..</Text>;

  if(!isLoading && isSuccess){
    screen = <StoryPointForm storypoint={storypoint} isEditing={isEditing} navigation={navigation} storyId={storyId} route={route} contactId={contactId}  />;
  }

  return (
    <React.Fragment>
      {screen}
     </React.Fragment>
  );
}

export default StoryPointEdit;
