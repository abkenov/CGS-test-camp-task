import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
// import 'localstorage-polyfill';
import CreateTodo from './components/CreateTodo';
import Registration from './components/Registration';
import TodoContainer from './components/TodoContainer';
import Tabs from './components/Tabs';
import Authorization from './components/Authorization';

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <Tabs />
          {/* <Authorization /> */}
        </SafeAreaView>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
