import React from 'react';
import {QueryClient,QueryClientProvider} from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { Provider} from 'react-redux';
import store from './src/app/redux/store.js';
import GetViewStack from './src/app/navigation/GetViewStack.js';

// Create a client
const queryClient = new QueryClient()

const App = () =>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
        <NavigationContainer>
            <GetViewStack></GetViewStack>
        </NavigationContainer>
    </QueryClientProvider>
  </Provider>

export default App;
