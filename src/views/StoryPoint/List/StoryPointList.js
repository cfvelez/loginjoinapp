import React, {useState,useLayoutEffect} from 'react';
import {View, Text , StyleSheet, FlatList, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import StoryPointItem from './Item/StoryPointItem';
import StoryPointFormStyle  from './../Form/StoryPointFormStyle';
import useStoryPointList from '../../../app/hooks/storypoint/useStoryPointList';
import {storypointRoute,storyRoute} from '../../../app/routes/index';

import {connect} from 'react-redux';
//import useStorySearch from '../../../app/hooks/story/useStorySearch';

const StoryPointList = ({navigation, route, lastUpdate}) => {
  const storyId = route?.params?.storyId;
  const [text, setText] = useState('');
  const {data:storypoints, isLoading } = useStoryPointList(storyId,lastUpdate);
  //const {data:storypointsFilter, isLoadingFilter } = useStoryPointsSearch(storyId,text);
  let isLoadingFilter = false;
  let screen = null;

  const styles = StyleSheet.create(StoryPointFormStyle);
  const handleOnPress = (storypointId) => navigation.navigate(storypointRoute.info, {storypointId, storyId});

  useLayoutEffect(function() {
    if (!isLoading) {
      navigation.setOptions(
        {
          headerRight: () => (
           <Button
              onPress={() => navigation.navigate(storypointRoute.add, {storyId})}
              title="Nuevo"
          />),
           title: 'Seguimiento',
        },
      );
    }
  });

  if(!isLoading && !isLoadingFilter){
    //let list = storypointsFilter && storypointsFilter.length > 0 ? storypointsFilter : (text.length === 0) ? storiespoint : [];
    let list = storypoints;
    screen = <FlatList
                data={list}
                renderItem={({item})=> <StoryPointItem storypoint={item} onPress={()=>handleOnPress(item.id)}/>}
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
  lastUpdate: state.storypointListUpdate
});

export default connect(mapStateToProps)(StoryPointList);
