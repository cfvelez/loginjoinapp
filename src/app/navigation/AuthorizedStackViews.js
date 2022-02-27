import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactList from '../../views/Contact/List/ContactList';
import ContactInfo from '../../views/Contact/Info/ContactInfo';
import StoryList from '../../views/Story/List/StoryList';
import {contactRoute, storyRoute} from '../routes/index';
import ContactAdd from '../../views/Contact/Form/ContactAdd';
import ContactEdit from '../../views/Contact/Form/ContactEdit';

const ContactStack = createNativeStackNavigator();
const StoryStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Stories = () =>{return(<></>);};

export const ContactStackViews = () =>{
  return(
        <ContactStack.Navigator>
          <ContactStack.Screen name={contactRoute.list} component={ContactList} options={{ title: 'Contactos'}}/>
          <ContactStack.Screen name={contactRoute.info} component={ContactInfo} options={{ title: 'Información'}} />
          <ContactStack.Screen name={contactRoute.edit} component={ContactEdit} options={{ title: 'Editar'}} />
          <ContactStack.Screen name={contactRoute.add} component={ContactAdd} options={{ title: 'Nuevo'}} />
        </ContactStack.Navigator>);
}

export const StoryStackViews = (contactId) =>{
  console.log('contactId:',contactId);
  return(
        <StoryStack.Navigator
              initialRouteName={storyRoute.list}
              screenOptions={{ headerShown: true }}
              >
          <StoryStack.Screen
            name={storyRoute.list}
            component={StoryList}
            options={{ title: 'Historial'}}
            screenOptions={{ headerShown: true }}
            initialParams={contactId}
            />
        </StoryStack.Navigator>
        );
}

export const AuthorizedStackViews = () =>{
  return(
      <Tab.Navigator initialRouteName="ContactHistory">
        <Tab.Screen name={contactRoute.info} component={ContactInfo} options={{ title: 'Historial'}} />
        <Tab.Screen name="ContactStories" component={Stories} options={{ title: 'Historias'}} />
      </Tab.Navigator>);
};


