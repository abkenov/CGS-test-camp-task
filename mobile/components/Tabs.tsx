import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Authorization from './Authorization';
import CreateTodo from './CreateTodo';
import React from 'react';
import TodoContainer from './TodoContainer';
import { Button } from 'react-native';
import EditTodo from './EditTodo';

const Tab = createBottomTabNavigator();
const NewTodoStack = createStackNavigator();
const TodoContainerStack = createStackNavigator();

const TodoContainerStackScreen = ({ navigation }) => (
  <TodoContainerStack.Navigator>
    <TodoContainerStack.Screen name='TodoContainer' component={TodoContainer} options={{
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('CreateTodoScreen')}
              title="New Todo"
              color="gray"
            />
          ),
        }}/>
    <TodoContainerStack.Screen name='CreateTodoScreen' component={CreateTodo} />
    <TodoContainerStack.Screen name='EditTodoScreen' component={EditTodo} />
  </TodoContainerStack.Navigator>
)

const TodoStackScreen = () => (
  <NewTodoStack.Navigator>
    <NewTodoStack.Screen name='CreateTodoScreen' component={CreateTodo} />
  </NewTodoStack.Navigator>
)

export default function Tabs() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Todos" component={TodoContainerStackScreen} options={{headerShown: false}} />
      </Tab.Navigator>
  );
}