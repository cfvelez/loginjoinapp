import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../views/Login/Login'

const LoginStack = createNativeStackNavigator();

const LoginStackViews = () =>
        <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={Login} />
        </LoginStack.Navigator>


export default LoginStackViews;
