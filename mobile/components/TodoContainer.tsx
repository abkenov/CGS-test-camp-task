import React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Button } from 'react-native';
import { useQuery } from 'react-query';
import TodoService from '../services/todo.service';

const todo_service = new TodoService();

const TodoElement = ({title, description, id, date, isCompleted, isPublic, navigation}) => {
  return(
    <>
      <Text>title: {title}</Text>
      <Text>description: {description}</Text>
      <Text>date: {date}</Text>
      <Text>isCompleted: {`${isCompleted}`}</Text>
      <Text>isPublic: {`${isPublic}`}</Text>
      <Button title={'edit'} onPress={() => navigation.push('EditTodoScreen', {id: id})}></Button>
      <Button title={'delete'} onPress={() => todo_service.deleteTodoById(id)}></Button>
    </>
  )
}

export default function TodoContainer({ navigation }) {

  const { data, status } = useQuery('todos', async () => {
    const { data } = await todo_service.getTodos();
    return data;
  });
  console.log(data) 

  const renderItem = ( {item} : {item: any} ) => { 
    return (
      <TodoElement
        navigation={navigation}
        title={item.title} 
        description={item.description}
        id={item._id}
        date={item.date}
        isCompleted={item.isCompleted}
        isPublic={item.isPublic}
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