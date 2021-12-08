import React, {useState} from 'react';
import {Button, Text, View,StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ContactFormStyle from './ContactFormStyle';
import {create,update} from '../../../app/remotes/Contact';
import {GET_ALL_CONTACTS} from '../../../app/remotes/api';
import Contact from '../../../app/domains/Contact';
import {useMutation} from 'react-query';
import { contactRoute } from '../../../app/routes';
import { QueryClient } from 'react-query';
import { useDispatch } from "react-redux";
import {contact_list_update} from '../../../app/redux/actions/list';

const ContactForm = ({navigation, isEditing, contact}) => {
  const [name, setName] = useState(contact?.name ?? '');
  const [lastName, setLastName] = useState(contact?.lastname ?? '');
  const contactId = contact?.id ?? null;
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const styles = StyleSheet.create(ContactFormStyle);

  const invalidateCacheQuery = async () => {
    queryClient.invalidateQueries(GET_ALL_CONTACTS);
    dispatch(contact_list_update(Date.now()));
  }

  const resetForm = () =>{
    setName('');
    setLastName('');
  }

  const operation = isEditing ? update : create;
  let {mutate,isLoading} = useMutation(operation, {onSuccess:invalidateCacheQuery, onSettled:resetForm});

  const handleSubmit = async() =>{
    let contact = new Contact(contactId, name, lastName);
    if (contact.validate()){
      await mutate(contact,{onSuccess:navigation.navigate(contactRoute.list)})
    }
    else
      alert('Complete los datos del formulario')
  }

  return (
    <React.Fragment>
    <View style={styles.form}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput onChangeText={(text)=> setName(text)} style={styles.textInput} value={name}></TextInput>
      <Text style={styles.label}>Apellido</Text>
      <TextInput onChangeText={(text) => setLastName(text)} style={styles.textInput} value={lastName}></TextInput>
      <Button onPress={handleSubmit} disabled={isLoading} title={ isEditing ? 'Actualizar' : 'Crear'  }></Button>
      {isLoading && <Text>Cargando...</Text>}
    </View>
    </React.Fragment>
  );
}

export default ContactForm;
