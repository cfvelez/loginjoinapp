import React from 'react';
import {FlatList,Text, View} from 'react-native';
import ContactItem from '../Item/ContactItem';
import {all} from '../../../app/remotes/Contact';
import {GET_ALL_CONTACTS} from '../../../app/remotes/remotes';
import {useQuery} from 'react-query';

import {useDispatch} from 'react-redux';
import {set_token} from '../../../app/redux/actions/token/index'


const ContactList = ({navigation}) => {
  const dispatch = useDispatch();
  const handleOnPress = () => {dispatch(set_token(null))};
  const query = useQuery(GET_ALL_CONTACTS, all);

  let content = null;

  if(!query.isLoading){
    content = <FlatList
              data={query.data}
              renderItem={({item})=> <ContactItem contact={item} onPress={handleOnPress}/>}
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
