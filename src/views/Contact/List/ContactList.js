import React, {useState,useLayoutEffect} from 'react';
import {FlatList,Text, View, StyleSheet, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ContactItem from '../Item/ContactItem';
import {contactRoute} from '../../../app/routes/index'
import useContactList from '../../../app/hooks/contacts/useContactList';
import useContactSearch from '../../../app/hooks/contacts/useContactSearch';
import ContactFormStyle from '../Form/ContactFormStyle';

import {connect} from 'react-redux';

const ContactList = ({navigation,lastUpdate}) => {
  const [text, setText] = useState('');
  const handleOnPress = (contactId) => {navigation.navigate(contactRoute.info, {contactId}); }
  const {data:contacts, isLoading } = useContactList(lastUpdate);
  const {data:contactsFilter, isLoadingFilter } = useContactSearch(text);
  let screen = null;

  useLayoutEffect(function() {
    if (!isLoading) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() =>
              navigation.navigate(contactRoute.add)
            }
            title="Nuevo"
          />),
           title: 'Contactos',
      });
    }
  });

  const styles = StyleSheet.create(ContactFormStyle);
  if(!isLoading || !isLoadingFilter){

    let list = contactsFilter && contactsFilter.length > 0 ? contactsFilter : contacts;
    screen = <FlatList
                data={list}
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
        <View style={{flex:1}}>
          <TextInput placeholder={"Buscar"} onChangeText={(value)=> setText(value)} style={styles.textInput} value={text}></TextInput>
        </View>
      </View>
      <View key={lastUpdate}>
        {screen}
      </View>
    </React.Fragment>
    );
};

const mapStateToProps = state => ({
  lastUpdate: state.contact_list_update
});

export default connect(mapStateToProps)(ContactList);
