import React, {useState} from 'react';
import {FlatList,Text, View, StyleSheet, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ContactItem from '../Item/ContactItem';
import {contactRoute} from '../../../app/routes/index'
import useContactList from '../../../app/hooks/contacts/useContactList';
import ContactFormStyle from '../Form/ContactFormStyle';
import Icon from 'react-native-ionicons';

import {connect} from 'react-redux';

const ContactList = ({navigation,lastUpdate}) => {
  const [text, setText] = useState('');
  const handleOnPress = (contactId) => {navigation.navigate(contactRoute.info, {contactId}); }
  const {data:contacts, isLoading } = useContactList(lastUpdate);
  let screen = null;

  const styles = StyleSheet.create(ContactFormStyle);

  if(!isLoading){
    screen = <FlatList
                data={contacts}
                renderItem={({item})=> <ContactItem contact={item} onPress={()=>handleOnPress(item.id)}/>}
                keyExtractor={item => item.id}
              />;
  }
  else{
    screen = <Text>Cargando..</Text>;
  }

   return (
    <React.Fragment>
      <View style={{flexDirection:'row', borderBottomWidth:1}}>
        <View style={{flex:0.6}}>
          <TextInput placeholder={"Buscar"} onChangeText={(value)=> setText(value)} style={styles.textInput} value={text}></TextInput>
        </View>
        <View style={{flex:0.4}}>
          <Icon name="search"  style={{marginLeft:'auto', paddingRight:10, paddingTop:20}} onPress={()=>alert('Buscar')}/>
        </View>
      </View>
      <View key={lastUpdate}>
        {screen}
      </View>
    </React.Fragment>);
};

const mapStateToProps = state => ({
  lastUpdate: state.contact_list_update
});

export default connect(mapStateToProps)(ContactList);
