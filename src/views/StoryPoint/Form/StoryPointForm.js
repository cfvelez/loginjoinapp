import React, {useState} from 'react';
import {Button, Text, View,StyleSheet, Alert} from 'react-native';
import { create,update } from '../../../app/remotes/StoryPoint';
import StoryPoint from '../../../app/domains/StoryPoint';
import { TextInput } from 'react-native-gesture-handler';
import { storypointRoute } from '../../../app/routes';
import {useMutation} from 'react-query';
import { useDispatch } from "react-redux";
import StoryPointFormStyle from './StoryPointFormStyle';
import { QueryClient } from 'react-query';
import { GET_ALL_STORIESPOINT } from '../../../app/remotes/api';
import { storypoint_list_update } from '../../../app/redux/actions/list/index';
import DatePicker from 'react-native-date-picker';

const handleDateFromApi = (remoteDate) => {
  let resolvedDateObject = null;

  if(remoteDate){
    let resolvedDateTimestamp = Date.parse(remoteDate.replace(" ", "T"));
    resolvedDateObject = new Date(resolvedDateTimestamp);
  }

  return resolvedDateObject;
}

const StoryPointForm = ({navigation,isEditing, storypoint, storyId, contactId} ) => {
  const [name, setName] = useState(storypoint?.name ?? '');
  const [description, setDescription] = useState(storypoint?.description ?? '');
  const appointmentAt = handleDateFromApi(storypoint?.appointment_time);
  const [appointmentTime, setAppointmentTime] = useState(appointmentAt ? appointmentAt : new Date());
  const [open, setOpen] = useState(false)

  const storypointId = storypoint?.id ?? null;
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const styles = StyleSheet.create(StoryPointFormStyle);

  const getDateForApiFormat = (dateObject) =>{
      return dateObject.toISOString().slice(0,10) + ' ' + dateObject.toLocaleTimeString().slice(0,8) ;
  }

  const prepareForLayoud = (dateObject) =>{
      return getDateForApiFormat(dateObject).slice(0,16);
  }

  const invalidateCacheQuery = async () => {
    queryClient.invalidateQueries(GET_ALL_STORIESPOINT);
    dispatch(storypoint_list_update(Date.now()));
  }

  const operation = isEditing ? update : create;
  let {mutate,isLoading} = useMutation(operation, {onSuccess:invalidateCacheQuery});

  const handleSubmit = async () =>{
    const storypointModel = new StoryPoint(storypointId,name, description, getDateForApiFormat(appointmentTime), storyId);
    console.log('obj:',storypointModel)
    if(storypointModel.validate()){
      await mutate(storypointModel,{onSuccess:navigation.navigate(storypointRoute.list,{contactId,prevStoryPointId:false})})
    }
    else{
      Alert.alert('Error al crear la historia', 'Complete los datos del formulario');
    }
  }

  return (
    <React.Fragment>
       <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput onChangeText={(text)=> setName(text)} style={styles.textInput} value={name}></TextInput>
        <Text style={styles.label}>Descripción</Text>
        <TextInput onChangeText={(text) => setDescription(text)} style={styles.textInput} value={description}></TextInput>
        <View style={styles.row}>
          <View><Text style={styles.label}>Fecha:</Text></View>
          <View><Text style={styles.itemPosition}> {prepareForLayoud(appointmentTime)} </Text></View>
          <View><Button title="Agendar" onPress={() => setOpen(true)} /></View>
          <DatePicker
                modal
                open={open}
                mode={"datetime"}
                date={appointmentTime}
                locale="es"
                onConfirm={(datetime) => {
                  setOpen(false)
                  setAppointmentTime(datetime)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
                />
        </View>
        <Button onPress={handleSubmit} disabled={isLoading} title={ isEditing ? 'Actualizar' : 'Crear'  }></Button>
        {isLoading && <Text>Cargando...</Text>}
      </View>
    </React.Fragment>
  );

 }

export default StoryPointForm;
