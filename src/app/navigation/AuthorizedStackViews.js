import React from 'react';
import {Button} from 'react-native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactList from '../../views/Contact/List/ContactList';
import ContactInfo from '../../views/Contact/Info/ContactInfo';
import StoryList from '../../views/Story/List/StoryList';
import {contactRoute, storyRoute} from '../routes/index';
import ContactAdd from '../../views/Contact/Form/ContactAdd';
import ContactEdit from '../../views/Contact/Form/ContactEdit';
import StoryAdd from '../../views/Story/Form/StoryAdd';
import StoryInfo from '../../views/Story/Info/StoryInfo';
import StoryEdit from '../../views/Story/Form/StoryEdit';

import { useDispatch } from "react-redux";
import { set_contact_stack } from '../redux/actions/stackview';

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

export const StoryStackViews = ({contactId}) =>{
  const dispatch = useDispatch();
  return(
        <StoryStack.Navigator
              initialRouteName={storyRoute.list}
              screenOptions={{ headerShown: true }}
              >
          <StoryStack.Screen
            name={storyRoute.list}
            component={StoryList}
            options={ () => (
              { title: 'Historial',

                headerLeft: () => (
                  <Button
                    title="Contactos"
                    onPress={() => { dispatch(set_contact_stack({contactId})) } } />
                )

              })
            }
            initialParams={{contactId:contactId}}
            />
            <StoryStack.Screen name={storyRoute.add} component={StoryAdd} options={{ title: 'Nuevo'}} />
            <StoryStack.Screen name={storyRoute.info} component={StoryInfo} options={{ title: 'Historia'}}/>
            <StoryStack.Screen name={storyRoute.edit} component={StoryEdit} options={{ title: 'Editar'}}/>
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


