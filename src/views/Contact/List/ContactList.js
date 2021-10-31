import React from 'react';
import {FlatList,Text, View} from 'react-native';
import ContactItem from '../Item/ContactItem';
import {all} from '../../../app/remotes/Contact';
import {GET_ALL_CONTACTS} from '../../../app/remotes/remotes';
import {useQuery} from 'react-query';
import {contactRoute} from '../../../app/routes/index'


const ContactList = ({navigation}) => {
  const handleOnPress = (contactId) => { console.log('contactId:',contactId); navigation.navigate(contactRoute.info, {contactId}); }
  const query = useQuery(GET_ALL_CONTACTS, all);

  let content = null;

  if(!query.isLoading){
    content = <FlatList
              data={query.data}
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
