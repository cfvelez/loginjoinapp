import React,{useLayoutEffect} from 'react';
import { SafeAreaView, Text, View,StyleSheet, Button} from 'react-native';
import {GET_ALL_STORIESPOINT} from '../../../app/remotes/api';
import StoryPointInfoStyle from './StoryPointInfoStyle';
import MyConfirmDialog from '../../../components/MyConfirmDialog/MyConfirmDialog.js';
import { remove } from '../../../app/remotes/StoryPoint';
import { storypointRoute } from '../../../app/routes';
import { QueryClient } from 'react-query'
import { useMutation } from 'react-query';
import { useDispatch } from "react-redux";
import {storypoint_list_update} from '../../../app/redux/actions/list';
import {set_storypoint_stack} from '../../../app/redux/actions/stackview'
import useStoryPoint from '../../../app/hooks/storypoint/useStoryPoint';


const styles = StyleSheet.create(StoryPointInfoStyle);

const StoryPointInfo = ({navigation, route}) => {
  const {storypointId} = route.params;
  const {data: storypoint ,isLoading, isSuccess} =  useStoryPoint(storypointId);
  let content = null;
  const dispatch = useDispatch();
  const queryClient = new QueryClient();

  const invalidateCacheQuery = () => {
    queryClient.invalidateQueries(GET_ALL_STORIESPOINT);
    dispatch(storypoint_list_update(Date.now()));
  }

  let {mutate,isLoading: isProcessing} = useMutation(remove, {onSuccess:invalidateCacheQuery});

  useLayoutEffect(function() {
    if (isSuccess) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() => {} //dispatch(set_storypoint_stack({storyId: storyId, storypointId:storypointId }))
            }
            title="Recursos"
          />
        ),
        title: storypoint.name,
      });
    }
  });

  const removeStoryPointAction = async () =>{
    return await mutate(storypoint.id,{onSuccess:navigation.navigate(storypointRoute.list)});
  }

  const handleEdit = () => {
      navigation.navigate(storypointRoute.edit, {
        storypointId: storypoint.id
    })
  }

  const handleDelete = async() =>{
    let dialog = {
                  title:'Borrar evento',
                  message:'¿Esta seguro que desea borrar este evento?',
                  cancelAction:() => false,
                  confirmAction:removeStoryPointAction,
                };

    MyConfirmDialog(dialog);
  }

  if(!isLoading && !isProcessing){
    content = <View style={styles.form}>
                <View style={styles.row}>
                  <Text style={styles.labelBold}>Nombre:</Text><Text style={styles.label}>{storypoint.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.labelBold}>Descripción:</Text><Text style={styles.label}>{storypoint.description}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.labelBold}>Fecha:</Text><Text style={styles.label}>{storypoint.appointment_time}</Text>
                </View>
                <View style={{flexDirection:'row', alignSelf: "center"}}>
                  <View style={styles.btn}><Button onPress={handleEdit} disabled={isLoading} title='Editar'></Button></View>
                  <View style={styles.btn}><Button onPress={handleDelete} disabled={isLoading} title='Borrar'></Button></View>
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

export default StoryPointInfo;
