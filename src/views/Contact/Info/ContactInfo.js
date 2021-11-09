import React,{useLayoutEffect} from 'react';
import { SafeAreaView, Text, View,StyleSheet, Button} from 'react-native';
import useContact from '../../../app/hooks/contacts/useContact';
import {GET_ALL_CONTACTS} from '../../../app/remotes/api';
import ContactInfoStyle from './ContactInfoStyle';
import MyConfirmDialog from '../../../components/MyConfirmDialog/MyConfirmDialog.js';
import {remove} from '../../../app/remotes/Contact';
import { contactRoute } from '../../../app/routes';
import { QueryClient } from 'react-query'
import {useMutation} from 'react-query';

const styles = StyleSheet.create(ContactInfoStyle);

const ContactInfo = ({navigation, route}) => {
  const {contactId} = route.params;
  const {data: contact ,isLoading, isSuccess} =  useContact(contactId);
  let content = null;

  const queryClient = new QueryClient();

  const invalidateCacheQuery = () => {
    queryClient.invalidateQueries(GET_ALL_CONTACTS);
    navigation.navigate(contactRoute.list);
  }

  let {mutate,isLoading: isProcessing} = useMutation(remove, {onSuccess:invalidateCacheQuery});

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

  const removeContactAction = async () =>{
    return await mutate(contact);
  }

  const handleDelete = async() =>{
    let dialog = {
                  title:'Borrar contacto',
                  message:'¿Esta seguro que desea borrar el contacto?',
                  cancelAction:() => false,
                  confirmAction:removeContactAction,
                };

    MyConfirmDialog(dialog);
  }

  if(!isLoading && !isProcessing){
    content = <View style={styles.form}>
                <View style={styles.row}>
                  <Text style={styles.labelBold}>Nombre:</Text><Text style={styles.label}>{contact.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.labelBold}>Apellido:</Text><Text style={styles.label}>{contact.lastname}</Text>
                </View>
                <View style={styles.btn}><Button onPress={handleDelete} disabled={isLoading} title='Borrar'></Button></View>
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
