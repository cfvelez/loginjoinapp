import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactList from '../../views/Contact/List/ContactList';
import ContactInfo from '../../views/Contact/Info/ContactInfo';
import {contactRoute} from '../routes/index';
import ContactAdd from '../../views/Contact/Form/ContactAdd';
import ContactEdit from '../../views/Contact/Form/ContactEdit';
import { Button } from 'react-native';

const ContactStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Test = () =>{
   return (<></>);
}

export const ContactStackViews = () =>{

  return(
        <ContactStack.Navigator>
          <ContactStack.Screen name={contactRoute.list} component={ContactList} options={{ title: 'Contactos'}}/>
          <ContactStack.Screen name={contactRoute.info} component={ContactInfo} options={{ title: 'Información'}} />
          <ContactStack.Screen name={contactRoute.edit} component={ContactEdit} options={{ title: 'Editar'}} />
          <ContactStack.Screen name={contactRoute.add} component={ContactAdd} options={{ title: 'Nuevo'}} />
        </ContactStack.Navigator>);
}

export const AuthorizedStackViews = () =>{
  return(
      <Tab.Navigator>
        <Tab.Screen name="ContactTab" component={ContactInfo} options={{ title: 'Mis Contactos'}} />
        <Tab.Screen name="HistoryTab" component={Test} options={{ title: 'Historial'}} />
      </Tab.Navigator>);
};


