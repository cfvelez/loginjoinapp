import React from 'react';
import {SafeAreaView} from 'react-native';
import ContactForm from './ContactForm';

const ContactAdd = ({navigation, route}) => {
  return (
      <ContactForm contact={null} isEditing={false} navigation={navigation} route={route} />
  );
}

export default ContactAdd;
