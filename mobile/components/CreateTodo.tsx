import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import TodoService from '../services/todo.service';
import TodoFormValidation from '../validations/TodoFormValidation';

const toDoService = new TodoService();

export default function CreateTodo({ navigation } : { navigation: any }) {

  const initialValues = {
    title: '',
    description: '',
    year: '',
    isPublic: false,
    isCompleted: false,
  }

  const toggleIsPublic = (values: any) => {
    values.isPublic = !values.isPublic
  }

  const toggleIsCompleted = (values: any) => {
    values.isCompleted = !values.isCompleted
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        toDoService.createNewTodo(values)
        navigation.navigate('TodoContainer')
      }}
      validationSchema={TodoFormValidation()}
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
            <BouncyCheckbox
              onPress={() => toggleIsPublic(values)}>
            </BouncyCheckbox>

          <Text>isComplete</Text>
            <BouncyCheckbox 
              onPress={() => toggleIsCompleted(values)}>
            </BouncyCheckbox>

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
