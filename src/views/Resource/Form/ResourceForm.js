import React, {useState} from 'react';
import {Button, Text, View,StyleSheet, Alert} from 'react-native';
import { upload } from '../../../app/remotes/Resource';
import Resource from '../../../app/domains/Resource';
import { TextInput } from 'react-native-gesture-handler';
import { resourceRoute } from '../../../app/routes';
import {useMutation} from 'react-query';
import { useDispatch } from "react-redux";
import ResourceFormStyle from './ResourceFormStyle';
import { QueryClient } from 'react-query';
import { GET_ALL_RESOURCES } from '../../../app/remotes/api';
import { resource_list_update } from '../../../app/redux/actions/list/index';
import AudioRecorder from '../AudioRecorder/AudioRecorder'


const ResourceForm = ({navigation, resource, storyPointId, contactId} ) => {

  const [title, setTitle] = useState(resource?.title ?? '');

  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const styles = StyleSheet.create(ResourceFormStyle);

  const invalidateCacheQuery = async () => {
    queryClient.invalidateQueries(GET_ALL_RESOURCES);
    dispatch(resource_list_update(Date.now()));
  }

  const operation = upload
  let {mutate,isLoading} = useMutation(operation, {onSuccess:invalidateCacheQuery});

  const handleSubmit = async () =>{
    const storypointModel = new Resource(title, storyPointId,contactId, uri);
    if(storypointModel.validate()){
      await mutate(storypointModel,{onSuccess:navigation.navigate(resourceRoute.list,{contactId,prevStoryPointId:storyPointId})})
    }
    else{
      Alert.alert('Error al crear la historia', 'Complete los datos del formulario');
    }
  }

  return (
    <React.Fragment>
       <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput onChangeText={(text)=> setTitle(text)} style={styles.textInput} value={title}></TextInput>

        <View style={styles.row}>
          <AudioRecorder />
        </View>

        {isLoading && <Text>Cargando...</Text>}
      </View>
    </React.Fragment>
  );

 }

export default ResourceForm;
