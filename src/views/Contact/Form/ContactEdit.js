import React from 'react';
import {ActivityIndicator,SafeAreaView, Text} from 'react-native';
import useContact from '../../../app/hooks/contacts/useContact';
import ContactForm from './ContactForm';

const ContactEdit = ({navigation, route}) => {
  const {contactId} = route.params;
  const {data: contact ,isLoading, isSuccess} = useContact(contactId);
  const isEditing = Boolean(contact?.id);

  let content = <Text><ActivityIndicator/>Cargando..</Text>;

  if(!isLoading && isSuccess){
    content = <ContactForm contact={contact} isEditing={isEditing} navigation={navigation} route={route} />;
  }

  return (
    <SafeAreaView>
      {content}
    </SafeAreaView>
  );
}

export default ContactEdit;
