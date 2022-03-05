import React from 'react';
import StoryForm from './StoryForm';

const StoryAdd= ({navigation, route}) => {
  const contactId = route?.params?.contactId;
  return (
      <StoryForm story={null} isEditing={false} navigation={navigation} contactId={contactId} />
  );
}

export default StoryAdd;

