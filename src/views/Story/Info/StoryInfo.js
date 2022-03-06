import React,{useLayoutEffect} from 'react';
import { SafeAreaView, Text, View,StyleSheet, Button} from 'react-native';
import useStory from '../../../app/hooks/story/useStory';
import {GET_ALL_STORIES} from '../../../app/remotes/api';
import StoryInfoStyle from './StoryInfoStyle';
import MyConfirmDialog from '../../../components/MyConfirmDialog/MyConfirmDialog.js';
import { remove } from '../../../app/remotes/Story';
import { storyRoute } from '../../../app/routes';
import { QueryClient } from 'react-query'
import { useMutation } from 'react-query';
import { useDispatch } from "react-redux";
import {story_list_update} from '../../../app/redux/actions/list';
import {set_history_stack} from '../../../app/redux/actions/stackview'


const styles = StyleSheet.create(StoryInfoStyle);

const StoryInfo = ({navigation, route}) => {
  const {storyId,contactId} = route.params;
  const {data: story ,isLoading, isSuccess} =  useStory(storyId);
  let content = null;
  const dispatch = useDispatch();
  const queryClient = new QueryClient();

  const invalidateCacheQuery = () => {
    queryClient.invalidateQueries(GET_ALL_STORIES);
    dispatch(story_list_update(Date.now()));
  }

  let {mutate,isLoading: isProcessing} = useMutation(remove, {onSuccess:invalidateCacheQuery});

  useLayoutEffect(function() {
    if (isSuccess) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() =>
              alert(storyId)
            }
            title="Eventos"
          />
        ),
        title: story.title,
      });
    }
  });

  const removeStoryAction = async () =>{
    return await mutate(story.id,{onSuccess:navigation.navigate(storyRoute.list)});
  }

  const handleEdit = () => {
      navigation.navigate(storyRoute.edit, {
      storyId: story.id,
      contactId: contactId,
    })
  }

  const handleDelete = async() =>{
    let dialog = {
                  title:'Borrar historia',
                  message:'¿Esta seguro que desea borrar la historia?',
                  cancelAction:() => false,
                  confirmAction:removeStoryAction,
                };

    MyConfirmDialog(dialog);
  }

  if(!isLoading && !isProcessing){
    content = <View style={styles.form}>
                <View style={styles.row}>
                  <Text style={styles.labelBold}>Titulo:</Text><Text style={styles.label}>{story.title}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.labelBold}>Descripción:</Text><Text style={styles.label}>{story.description}</Text>
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

export default StoryInfo;
