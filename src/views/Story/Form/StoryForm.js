import React, {useState} from 'react';
import {Button, Text, View,StyleSheet, Alert} from 'react-native';
import { create,update } from '../../../app/remotes/Story/';
import Story from '../../../app/domains/Story';
import { TextInput } from 'react-native-gesture-handler';
import { storyRoute } from '../../../app/routes';
import {useMutation} from 'react-query';
import { useDispatch } from "react-redux";
import StoryFormStyle from './StoryFormStyle';
import { QueryClient } from 'react-query';
import { GET_ALL_STORIES } from '../../../app/remotes/api';
import { story_list_update } from '../../../app/redux/actions/list/index';

const StoryForm = ({navigation, isEditing, story, contactId} ) => {
  const [title, setTitle] = useState(story?.title ?? '');
  const [description, setDescription] = useState(story?.description ?? '');
  const storyId = story?.id ?? null;
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const styles = StyleSheet.create(StoryFormStyle);

  const invalidateCacheQuery = async () => {
    queryClient.invalidateQueries(GET_ALL_STORIES);
    dispatch(story_list_update(Date.now()));
  }

  const operation = isEditing ? update : create;
  let {mutate,isLoading} = useMutation(operation, {onSuccess:invalidateCacheQuery});

  const handleSubmit = async () =>{
    const storyModel = new Story(storyId,contactId,title, description);
    if(storyModel.validate()){
      await mutate(storyModel,{onSuccess:navigation.navigate(storyRoute.list)})
    }
    else{
      Alert.alert('Error al crear la historia', 'Complete los datos del formulario');
    }
  }

  return (
    <React.Fragment>
    <View style={styles.form}>
      <Text style={styles.label}>Titulo</Text>
      <TextInput onChangeText={(text)=> setTitle(text)} style={styles.textInput} value={title}></TextInput>
      <Text style={styles.label}>Descripción</Text>
      <TextInput onChangeText={(text) => setDescription(text)} style={styles.textInput} value={description}></TextInput>
      <Button onPress={handleSubmit} disabled={isLoading} title={ isEditing ? 'Actualizar' : 'Crear'  }></Button>
      {isLoading && <Text>Cargando...</Text>}
    </View>
    </React.Fragment>
  );

 }

export default StoryForm;
