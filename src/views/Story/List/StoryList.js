import React, {useState,useLayoutEffect, useEffect} from 'react';
import {View, Text , StyleSheet, FlatList, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import StoryItem from './Item/StoryItem';
import StoryFormStyle  from './../Form/StoryFormStyle';
import useStoryList from '../../../app/hooks/story/useStoryList';
import {storyRoute} from '../../../app/routes/index';

import {connect} from 'react-redux';
import useStorySearch from '../../../app/hooks/story/useStorySearch';

const StoryList = ({navigation, route, lastUpdate}) => {
  const contactId = route?.params?.contactId;
  const prevStoryId = route?.params?.prevStoryId ?? false;
  const [text, setText] = useState('');
  const {data:stories, isLoading } = useStoryList(contactId,lastUpdate);
  const {data:storiesFilter, isLoadingFilter } = useStorySearch(contactId,text);
  let screen = null;

  const styles = StyleSheet.create(StoryFormStyle);
  const handleOnPress = (storyId) => navigation.navigate(storyRoute.info, {storyId, contactId});

  useLayoutEffect(function() {
    if (!isLoading) {
      navigation.setOptions(
        {
          headerRight: () => (
           <Button
              onPress={() => navigation.navigate(storyRoute.add, {contactId})}
              title="Nuevo"
          />),
           title: 'Historias',
        },
      );
    }
  });

  //handle when we came from a back button
  useEffect(()=>{
    if(prevStoryId){
      navigation.navigate(storyRoute.info, {storyId:prevStoryId, contactId});
      return () => false
    }
  });

  if(!isLoading && !isLoadingFilter){
    let list = storiesFilter && storiesFilter.length > 0 ? storiesFilter : (text.length === 0) ? stories : [];
    screen = <FlatList
                data={list}
                renderItem={({item})=> <StoryItem story={item} onPress={()=>handleOnPress(item.id)}/>}
                keyExtractor={item => item.id}
              />;
  }
  else{
    screen = <Text>Cargando..</Text>;
  }

  return (
    <React.Fragment>
      <View  key='search' style={{flexDirection:'row', borderBottomWidth:1}}>
        <View style={{flex:1}}>
          <TextInput placeholder={"Buscar"} onChangeText={(value)=> setText(value)} style={styles.textInput} value={text}/>
        </View>
      </View>
      <View key={'main'}>
        {screen}
      </View>
    </React.Fragment>
    );
}

const mapStateToProps = state => ({
  lastUpdate: state.storyListUpdate
});

export default connect(mapStateToProps)(StoryList);
