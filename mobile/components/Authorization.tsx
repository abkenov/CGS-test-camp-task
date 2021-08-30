import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registration from './Registration';
import SignIn from './SignIn';

const AuthStack = createStackNavigator();

export default function Authorization() {
  return(
  <AuthStack.Navigator>
    <AuthStack.Screen
      name='SignIn'
      component={SignIn}
      options={{ title: 'Sign In'}}
    />
    <AuthStack.Screen
      name='Registration'
      component={Registration}
      options={{ title: 'Registration'}}
    />
  </AuthStack.Navigator>
)
}