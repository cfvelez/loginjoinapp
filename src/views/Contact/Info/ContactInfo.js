import React,{useLayoutEffect} from 'react';
import { SafeAreaView, Text, View,StyleSheet, Button} from 'react-native';
import useContact from '../../../app/hooks/contacts/useContact';
import ContactInfoStyle from './ContactInfoStyle';
import { contactRoute } from '../../../app/routes';

const styles = StyleSheet.create(ContactInfoStyle);

const ContactInfo = ({navigation, route}) => {
  const {contactId} = route.params;
  const {data: contact ,isLoading, isSuccess} =  useContact(contactId);
  let content = null;

  useLayoutEffect(function() {
    if (isSuccess) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() =>
              navigation.navigate(contactRoute.edit, {
                contactId: contact.id,
              })
            }
            title="Editar"
          />
        ),
        title: contact.name + contact.lastname,
      });
    }
  });


  if(!isLoading){
    content = <View style={styles.form}>
                <View style={styles.row}>
                  <Text style={styles.labelBold}>Nombre:</Text><Text style={styles.label}>{contact.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.labelBold}>Apellido:</Text><Text style={styles.label}>{contact.lastname}</Text>
                </View>
            </View>;
  }
  else{
    content = <Text>Cargando..</Text>;
  }

  return (
    <SafeAreaView>
      {content}
    </SafeAreaView>
  );
}

export default ContactInfo;
