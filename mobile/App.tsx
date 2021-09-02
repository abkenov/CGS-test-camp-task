import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import Authorization from './components/Authorization';

const queryClient = new QueryClient();

export default function App() {

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
            <Authorization />
        </SafeAreaView>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
