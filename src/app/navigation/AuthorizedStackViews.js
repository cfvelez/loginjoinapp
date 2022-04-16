import React from 'react';
import {Button} from 'react-native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import ContactList from '../../views/Contact/List/ContactList';
import StoryList from '../../views/Story/List/StoryList';
import StoryPointList from '../../views/StoryPoint/List/StoryPointList'

import {contactRoute, storyRoute, storypointRoute} from '../routes/index';

import ContactInfo from '../../views/Contact/Info/ContactInfo';
import ContactAdd from '../../views/Contact/Form/ContactAdd';
import ContactEdit from '../../views/Contact/Form/ContactEdit';

import StoryAdd from '../../views/Story/Form/StoryAdd';
import StoryInfo from '../../views/Story/Info/StoryInfo';
import StoryEdit from '../../views/Story/Form/StoryEdit';

import StoryPointInfo from '../../views/StoryPoint/Info/StoryPointInfo';
import StoryPointEdit from '../../views/StoryPoint/Form/StoryPointEdit';
import StoryPointAdd from '../../views/StoryPoint/Form/StoryPointAdd';

import { useDispatch } from "react-redux";
import { set_contact_stack , set_story_stack} from '../redux/actions/stackview';


const ContactStack = createNativeStackNavigator();
const StoryStack = createNativeStackNavigator();
const StoryPointStack = createNativeStackNavigator();

export const ContactStackViews = () =>{
  return(
        <ContactStack.Navigator>
          <ContactStack.Screen name={contactRoute.list} component={ContactList} options={{ title: 'Contactos'}}/>
          <ContactStack.Screen name={contactRoute.info} component={ContactInfo} options={{ title: 'Información'}} />
          <ContactStack.Screen name={contactRoute.edit} component={ContactEdit} options={{ title: 'Editar'}} />
          <ContactStack.Screen name={contactRoute.add} component={ContactAdd} options={{ title: 'Nuevo'}} />
        </ContactStack.Navigator>);
}

export const StoryStackViews = ({prevStoryId, contactId}) =>{
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
            initialParams={{contactId:contactId, prevStoryId:prevStoryId}}
            />
            <StoryStack.Screen name={storyRoute.add} component={StoryAdd} options={{ title: 'Nuevo'}} />
            <StoryStack.Screen name={storyRoute.info} component={StoryInfo} options={{ title: 'Historia'}}/>
            <StoryStack.Screen name={storyRoute.edit} component={StoryEdit} options={{ title: 'Editar'}}/>
        </StoryStack.Navigator>
        );
}

export const StoryPointStackViews = ({storyId, contactId}) =>{
  const dispatch = useDispatch();
  return (
          <StoryPointStack.Navigator
              initialRouteName={storypointRoute.list}
              component={StoryPointList}
            >
            <StoryPointStack.Screen
              name={storypointRoute.list}
              component={StoryPointList}
              options={ () => (
                { title: 'Historial',
                  headerLeft: () => (
                    <Button
                      title="Historias"
                      onPress={() => {dispatch(set_story_stack({prevStoryId:storyId, contactId})) } } />
                  )
                })
              }
              initialParams={{storyId, contactId}}
            />
            <StoryPointStack.Screen name={storypointRoute.info} component={StoryPointInfo} options={{ title: 'Evento'}}/>
            <StoryPointStack.Screen name={storypointRoute.edit} component={StoryPointEdit} options={{ title: 'Editar'}}/>
            <StoryPointStack.Screen name={storypointRoute.add} component={StoryPointAdd} options={{ title: 'Nuevo'}}/>
          </StoryPointStack.Navigator>
  )

}


