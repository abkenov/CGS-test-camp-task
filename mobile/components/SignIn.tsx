import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Formik } from 'formik';

export default function SignIn({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={
        { 
          username: '',
          password: '',
        }
      }
        onSubmit={values => console.log(values)}
      >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}  
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView>
                <Text style={styles.header}>Username</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                />
                <Text style={styles.header}>Password</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={true}
                />
              </ScrollView>
            </TouchableWithoutFeedback>
          <Button 
            onPress={() => handleSubmit()} 
            title="Sign In"
            disabled={!isValid || !dirty}
          />
          <Button 
            onPress={() => navigation.push('Registration')} 
            title="Register" 
          />
        </KeyboardAvoidingView>
      )}
    </Formik>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
  },
  header: {
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
    marginBottom: 36
  },
});
