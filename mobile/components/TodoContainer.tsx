import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import TodoService from '../services/todo.service';
import TodoElement from './TodoElement'

const todo_service = new TodoService();

export default function TodoContainer({ navigation }: { navigation: any }) {

  const [isFetching, setIsFetching] = useState(false)

  const onRefresh = () => {
    setIsFetching(true)
    refetch()
    setIsFetching(false)
  }

  const { data, refetch } = useQuery('todos', async () => {
    const { data } = await todo_service.getTodos();
    return data;
  });

  const handleDeleteRequest = (id: String) => {
    todo_service.deleteTodoById(id)
    refetch()
  }

  const navigateToEditScreen = (navigation: any, id: String) => {
    navigation.push('EditTodoScreen', { id: id })
  }

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
        refreshing={isFetching}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});