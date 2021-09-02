import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import CreateTodo from './CreateTodo';
import React from 'react';
import TodoContainer from './TodoContainer';
import { Button } from 'react-native';
import EditTodo from './EditTodo';
import Profile from './Profile';

const Tab = createBottomTabNavigator();
const TodoContainerStack = createStackNavigator();

const navigateToCreateTodo = (navigation: any) => {
  navigation.navigate('CreateTodoScreen')
}

const TodoContainerStackScreen = ({ navigation }: { navigation: any }) => (
  <TodoContainerStack.Navigator>
    <TodoContainerStack.Screen name='TodoContainer' component={ TodoContainer } options={{
      title: 'List of Tasks',
      headerRight: () => (
        <Button
          onPress={() => navigateToCreateTodo(navigation)}
          title="New Todo"
          color="blue"
        />
      ),
    }}/>
    <TodoContainerStack.Screen name='CreateTodoScreen' component={ CreateTodo } />
    <TodoContainerStack.Screen name='EditTodoScreen' component={ EditTodo } />
  </TodoContainerStack.Navigator>
)

export default function Tabs({ route }: { route: any }) {
  const { username } = route.params
  
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Todos" component={ TodoContainerStackScreen } options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ Profile } initialParams={{ username: username }}/>
    </Tab.Navigator>
  );
}