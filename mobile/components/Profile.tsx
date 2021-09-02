import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../services/user.service';

const userService = new UserService()

export default function Profile({ username, navigation }: { username: String, navigation: any }) {
  
  const handleLogOut = async () => {
    await AsyncStorage.clear()
    checkIfLogged()
  }

  const checkIfLogged = async () => {
    const response = await userService.isLogged(username)

    if(!response.data.isLoggedIn) {
      navigation.replace('SignIn')
    }
  }

  return(
    <SafeAreaView>
      <Button onPress={handleLogOut} title={'Log Out'} />
    </SafeAreaView>
  )
}