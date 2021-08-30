import React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Button } from 'react-native';
import { useQuery } from 'react-query';
import TodoService from '../services/todo.service';
import TodoElement from './TodoElement'

const todo_service = new TodoService();

const handleDeleteRequest = (id: String) => {
  todo_service.deleteTodoById(id)
}

const navigateToEditScreen = (navigation: any, id: String) => {
  navigation.push('EditTodoScreen', {id: id})
}

export default function TodoContainer({ navigation }: { navigation: any }) {

  const { data, status } = useQuery('todos', async () => {
    const { data } = await todo_service.getTodos();
    return data;
  });

  const renderItem = ({ item }: { item: any }) => { 
    return (
      <TodoElement
        navigation={navigation}
        title={item.title} 
        description={item.description}
        id={item._id}
        date={item.date}
        isCompleted={item.isCompleted}
        isPublic={item.isPublic}
        handleDeleteRequest={handleDeleteRequest}
        navigateToEditScreen={navigateToEditScreen}
      />
    )
  }
  
  return(
    <SafeAreaView style={styles.container}>
      <FlatList
        scrollEnabled={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});