import React from 'react';
import { SafeAreaView, Text, View,StyleSheet} from 'react-native';
import ContactInfoStyle from './ContactInfoStyle';
import {get} from '../../../app/remotes/Contact';
import {GET_INFO_CONTACT} from '../../../app/remotes/remotes';
import {useQuery} from 'react-query';

const styles = StyleSheet.create(ContactInfoStyle);

const ContactInfo = ({navigation, route}) => {
  const {contactId} = route.params;
  const {isLoading,data} =  useQuery([GET_INFO_CONTACT, contactId], () => get(contactId))
  let content = null;

  if(!isLoading){

    content = <View style={styles.form}>
                <View style={styles.row}>
                  <Text style={styles.labelBold}>Nombre:</Text><Text style={styles.label}>{data.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.labelBold}>Apellido:</Text><Text style={styles.label}>{data.lastname}</Text>
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
