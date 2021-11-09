import React from 'react';
import {FlatList,Text, View} from 'react-native';
import ContactItem from '../Item/ContactItem';
import {contactRoute} from '../../../app/routes/index'
import useContactList from '../../../app/hooks/contacts/useContactList';


const ContactList = ({navigation}) => {
  const handleOnPress = (contactId) => {navigation.navigate(contactRoute.info, {contactId}); }
  const {data:contacts, isLoading } = useContactList();

  let content = null;

  if(!isLoading){
    content = <FlatList
                data={contacts}
                renderItem={({item})=> <ContactItem contact={item} onPress={()=>handleOnPress(item.id)}/>}
                keyExtractor={item => item.id}
              />;
  }
  else{
    content = <Text>Cargando..</Text>;
  }

   return (
      <View>
        {content}
      </View>);

};

  export default ContactList;
