import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactList from '../../views/Contact/List/ContactList';
import ContactForm from '../../views/Contact/Form/ContactForm';

const ContactStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ContactStackViews = () =>{
  return(
        <ContactStack.Navigator>
          <ContactStack.Screen name="ContactList" component={ContactList} options={{ title: 'Contactos'}} />
        </ContactStack.Navigator>);
}

const AuthorizedStackViews = () =>
  <Tab.Navigator>
    <Tab.Screen name="ContactTab" component={ContactStackViews} options={{ title: 'Mis Contactos'}} />
    <Tab.Screen name="AddContactTab" component={ContactForm} options={{ title: 'Nuevo Contacto'}} />
  </Tab.Navigator>

export default AuthorizedStackViews;
