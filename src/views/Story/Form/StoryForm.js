import React, {useState} from 'react';
import {Button, Text, View,StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const StoryForm = ({navigation, isEditing, contact}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const styles = StyleSheet.create(StyleFormStyle);

  return (
    <React.Fragment>
    <View style={styles.form}>
      <Text style={styles.label}>Titulo</Text>
      <TextInput onChangeText={(text)=> setTitle(text)} style={styles.textInput} value={title}></TextInput>
      <Text style={styles.label}>Apellido</Text>
      <TextInput onChangeText={(text) => setDescription(text)} style={styles.textInput} value={description}></TextInput>
      <Button onPress={handleSubmit} disabled={isLoading} title={ isEditing ? 'Actualizar' : 'Crear'  }></Button>
      {isLoading && <Text>Cargando...</Text>}
    </View>
    </React.Fragment>
  );

 }

export default StoryForm;
