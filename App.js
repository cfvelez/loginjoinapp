import React from 'react';
import {QueryClient,QueryClientProvider} from 'react-query';
import ContactList from './src/views/Contact/List/ContactList';
import ContactForm from './src/views/Contact/Form/ContactForm';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Create a client
const queryClient = new QueryClient()

const ContactStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ContactStackViews = () =>{
  return(
        <ContactStack.Navigator>
          <ContactStack.Screen name="ContactList" component={ContactList} options={{ title: 'Contactos'}} />
        </ContactStack.Navigator>);
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="ContactTab" component={ContactStackViews} options={{ title: 'Mis Contactos'}} />
          <Tab.Screen name="AddContactTab" component={ContactForm} options={{ title: 'Nuevo Contacto'}} />
        </Tab.Navigator>
    </NavigationContainer>
  </QueryClientProvider>
);

export default App;
