import React, {useState} from 'react';
import {Button, SafeAreaView, Text, View,StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ContactFormStyle from './ContactFormStyle';
import {create} from '../../../app/remotes/Contact';
import {GET_ALL_CONTACTS} from '../../../app/remotes/remotes';
import Contact from '../../../app/domains/Contact';
import {useQueryClient, useMutation} from 'react-query';

const styles = StyleSheet.create(ContactFormStyle);

const ContactForm = ({navigation}) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const queryClient = useQueryClient()

  const invalidateCacheQuery = () => {
    setName('');
    setLastName('');
    console.log('executed');
    queryClient.invalidateQueries('todos');

  }

  const {mutate,isLoading} = useMutation(create, {onSuccess:invalidateCacheQuery});


  const handleSubmit = async() =>{
    let contact = new Contact(null, name, lastName);
    if (contact.validate()){
      await mutate(contact)
    }
    else
      alert('Complete los datos del formulario')
  }

  return (
    <SafeAreaView>
    <View style={styles.form}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput onChangeText={(text)=> setName(text)} style={styles.textInput}></TextInput>
      <Text style={styles.label}>Apellido</Text>
      <TextInput onChangeText={(text) => setLastName(text)} style={styles.textInput}></TextInput>
      <Button onPress={handleSubmit} title='Nuevo Contacto'></Button>
      {isLoading && <Text>Cargando...</Text>}
    </View>
    </SafeAreaView>
  );
}

export default ContactForm;
