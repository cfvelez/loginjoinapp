import React, {useEffect} from 'react';
import {FlatList,Text, View} from 'react-native';
import ContactItem from '../Item/ContactItem';
import {contactRoute} from '../../../app/routes/index'
import useContactList from '../../../app/hooks/contacts/useContactList';
import {connect} from 'react-redux';

const ContactList = ({navigation,lastUpdate}) => {
  const handleOnPress = (contactId) => {navigation.navigate(contactRoute.info, {contactId}); }
  const {data:contacts, isLoading } = useContactList(lastUpdate);
  let screen = null;

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
      <View key={lastUpdate}>
        {screen}
      </View>
    </React.Fragment>);
};

const mapStateToProps = state => ({
  lastUpdate: state.contact_list_update
});

export default connect(mapStateToProps)(ContactList);
