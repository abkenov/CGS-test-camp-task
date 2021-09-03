import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, FlatList, Button, Switch } from 'react-native';
import { useQuery } from 'react-query';
import TodoService from '../services/todo.service';
import TodoElement from './TodoElement'

const todo_service = new TodoService();

export default function TodoContainer({ navigation }: { navigation: any }) {

  const [isFetching, setIsFetching] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)

  const handleFilter = () => {
    setIsFiltering(true)
    refetch()
  }

  const handleResetFilters = () => {
    setIsPublic(false)
    setIsCompleted(false)
    setIsFiltering(false)
    setShowFilter(false)
    refetch()
  }

  const handleFilterPublic = () => {
    setIsPublic(!isPublic)
  }

  const handleFilterCompleted = () => {
    setIsCompleted(!isCompleted)
  }

  const toggleShowFilter = () => {
    setShowFilter(!showFilter)
  }

  const onRefresh = () => {
    setIsFetching(true)
    refetch()
    setIsFetching(false)
  }

  const { data, refetch } = useQuery('todos', async () => {
    const { data } = isFiltering
      ? await todo_service.getTodos(isPublic, isCompleted)
      : await todo_service.getTodos(null, null)
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
      <Button title={'show filter'} onPress={toggleShowFilter} />
      {
        showFilter
        ?
        <View>
        <Text>Public</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isPublic ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleFilterPublic}
          value={isPublic}
        />

        <Text>Completed</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isCompleted ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleFilterCompleted}
          value={isCompleted}
        />

        <Button title={'Filter'} onPress={handleFilter} />
        <Button title={'Reset Filters'} onPress={handleResetFilters} />
      </View>
      :  
      null
    }

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