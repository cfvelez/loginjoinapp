import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import useContact from '../../../app/hooks/contacts/useContact';
import ContactForm from './ContactForm';

const ContactEdit = ({navigation, route}) => {
  const {contactId} = route.params;
  const {data: contact ,isLoading, isSuccess} = useContact(contactId);
  const isEditing = Boolean(contact?.id);

  let screen = <Text><ActivityIndicator/>Cargando..</Text>;

  if(!isLoading && isSuccess){
    screen = <ContactForm contact={contact} isEditing={isEditing} navigation={navigation} route={route} />;
  }

  return (
    <React.Fragment>
      {screen}
     </React.Fragment>
  );
}

export default ContactEdit;
