import React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View } from 'react-native';

export default function TodoElement(title: String) {
  return(
    <>
      <Text>{title}</Text>
    </>
  )
}