import React, {useState} from 'react';
import {View, Text , StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import StoryFormStyle  from './../Form/StoryFormStyle';

const StoryList = ({navigation,route}) => {
  const {contactId} = route.params;
  const [text, setText] = useState('');

 // let screen = <Text>{contactId}</Text>;
  const styles = StyleSheet.create(StoryFormStyle);

  console.log('xxx:', StoryFormStyle)


  console.log(styles);

  return (
    <React.Fragment>
      <View style={{flexDirection:'row', borderBottomWidth:1}}>
        <View style={{flex:1}}>
          <TextInput placeholder={"Buscar"} onChangeText={(value)=> setText(value)} style={styles.textInput} value={text}/>
        </View>
      </View>
    </React.Fragment>
    );
}

export default StoryList;
