import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import TodoService from '../services/todo.service';
import * as yup from 'yup';

const todo_service = new TodoService();

export default function EditTodo({ navigation, route }) {

  const { id } = route.params

  const validationSchema = yup.object().shape({
    title: yup.string().typeError('string').required('Title can not be empty!'),
    description: yup.string().typeError('string').required('Description can not be empty!'),
  })

  return (
    <Formik
      initialValues={
      { 
        title: '',
        description: '',
        year: '',
        isPublic: false,
        isCompleted: false,
      }
    }
      onSubmit={values => {
        console.log(values)
        todo_service.updateTodoById(values, id)
        navigation.navigate('TodoContainer')
      }}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
        <SafeAreaView>
          <Text>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
          />
          {touched.title && errors.title && <Text>{errors.title}</Text>}

          <Text>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
          />
          {touched.description && errors.description && <Text>{errors.description}</Text>}

          <Text>Year</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('year')}
            onBlur={handleBlur('year')}
            value={values.year}
          />

          <Text>isPublic</Text>
            <BouncyCheckbox onPress={() => values.isPublic = !values.isPublic}></BouncyCheckbox>
          <Text>isComplete</Text>
            <BouncyCheckbox onPress={() => values.isCompleted = !values.isCompleted}></BouncyCheckbox>

          <Button 
            onPress={() => handleSubmit()} 
            title="Submit"
            disabled={!isValid || !dirty}
          />
        </SafeAreaView>
      )}
   </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
  }
});
