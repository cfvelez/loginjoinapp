import React from 'react';
import StoryPointForm from './StoryPointForm';

const StoryPointAdd = ({navigation, route}) => {
  const contactId = route?.params?.contactId;
  const storyId = route?.params?.storyId;
  return (
      <StoryPointForm storypoint={null} isEditing={false} navigation={navigation} storyId={storyId} contactId={contactId} />
  );
}

export default StoryPointAdd;

