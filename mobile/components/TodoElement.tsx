import React from 'react';
import { Text, Button } from 'react-native';

export default function TodoElement({ 
      title, 
      description, 
      id, 
      date, 
      isCompleted, 
      isPublic, 
      navigation,
      navigateToEditScreen,
      handleDeleteRequest
    }: {
      title: String, 
      description: String, 
      id: String, 
      date: String, 
      isCompleted: Boolean, 
      isPublic: Boolean, 
      navigation: any,
      navigateToEditScreen: Function,
      handleDeleteRequest: Function,
    }) {
    return(
      <>
        <Text>title: {title}</Text>
        <Text>description: {description}</Text>
        <Text>date: {date}</Text>
        <Text>isCompleted: {`${isCompleted}`}</Text>
        <Text>isPublic: {`${isPublic}`}</Text>
        <Button title={'edit'} onPress={() => navigateToEditScreen(navigation, id)}></Button>
        <Button title={'delete'} onPress={() => handleDeleteRequest(id)}></Button>
      </>
    )
  }