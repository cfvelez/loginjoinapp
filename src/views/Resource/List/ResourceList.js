import React, {useState,useLayoutEffect, useEffect} from 'react';
import {View, Text , StyleSheet, FlatList, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ResourceItem from './Item/ResourceItem';
import ResourceFormStyle  from './../Form/ResourceFormStyle';
//import useStoryList from '../../../app/hooks/story/useStoryList';
import {resourceRoute} from '../../../app/routes/index';

import {connect} from 'react-redux';
//import useStorySearch from '../../../app/hooks/story/useStorySearch';

const ResourceList = ({navigation, route, lastUpdate}) => {
  const {contactId, storyId, storypointId} = route?.params;

  const [text, setText] = useState('');
  //const {data:stories, isLoading } = useStoryList(contactId,lastUpdate);
  //const {data:storiesFilter, isLoadingFilter } = useStorySearch(contactId,text);
  let screen = null;
  const isLoadingFilter = false;
  const isLoading = true;

  const styles = StyleSheet.create(ResourceFormStyle);
  const handleOnPress = (resourceId) => navigation.navigate(routeRoute.info, {resourceId, storypointId,storyId, contactId});

  useLayoutEffect(function() {
    if (!isLoading) {
      navigation.setOptions(
        {
          headerRight: () => (
           <Button
              onPress={() => navigation.navigate(resourceRoute.add, {storypointId})}
              title="Nuevo"
          />),
           title: 'Recursos',
        },
      );
    }
  });

  //handle when we came from a back button
  /*
  useEffect(()=>{
    if(prevStoryId){
      navigation.navigate(storyRoute.info, {storyId:prevStoryId, contactId});
      return () => false
    }
  });*/

  if(!isLoading && !isLoadingFilter){
    //let list = storiesFilter && storiesFilter.length > 0 ? storiesFilter : (text.length === 0) ? stories : [];
    let list = [];
    screen = <FlatList
                data={list}
                renderItem={({item})=> <ResourceItem resource={item} onPress={()=>handleOnPress(item.id)}/>}
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
  lastUpdate: state.resouceListUpdate
});

export default connect(mapStateToProps)(ResourceList);
