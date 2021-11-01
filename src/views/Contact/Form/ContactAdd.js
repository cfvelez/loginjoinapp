import React from 'react';
import {SafeAreaView} from 'react-native';
import ContactForm from './ContactForm';

const ContactAdd = ({navigation, route}) => {
  return (
    <SafeAreaView>
       <ContactForm contact={null} isEditing={false} navigation={navigation} route={route} />
    </SafeAreaView>
  );
}

export default ContactAdd;
