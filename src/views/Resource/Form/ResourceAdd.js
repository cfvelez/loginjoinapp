import React from 'react';
import ResouceForm from './ResourceForm';

const ResourceAdd= ({navigation, route}) => {
  const contactId = route?.params?.contactId;
  const prevStoryPointId = route?.params?.prevStoryPointId;
  return (
      <ResouceForm resource={null} isEditing={false} navigation={navigation} storyPointId={prevStoryPointId} contactId={contactId} />
  );
}

export default ResourceAdd;

