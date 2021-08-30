import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Registration from './Registration';
import SignIn from './SignIn';

const AuthStack = createStackNavigator();

export default function Authorization() {
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen
        name='SignIn'
        component={ SignIn }
        options={{ title: 'Sign In'}}
      />
      <AuthStack.Screen
        name='Registration'
        component={ Registration }
        options={{ title: 'Registration' }}
      />
    </AuthStack.Navigator>
  )
}