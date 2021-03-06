import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Formik } from 'formik';
import RegistrationFormValidation from '../validations/RegistrationFormValidation';
import UserService from '../services/user.service';

const userService = new UserService()

export default function Registration({ navigation }: { navigation: any }) {

  const initialValues = { 
    username: '',
    email: '',
    password: '',
    passwordVerification: '',
  }

  const onFormSubmit = (values: any) => {
    const user = {
      username: values.username,
      email: values.email,
      password: values.password,
    }

    navigation.goBack('SignIn')
    userService.register(user)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => onFormSubmit(values)}
        validationSchema={RegistrationFormValidation()}
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
                {touched.username && errors.username && <Text>{errors.username}</Text>}
                
                <Text style={styles.header}>E-mail</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                />
                {touched.email && errors.email && <Text>{errors.email}</Text>}

                <Text style={styles.header}>Password</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={true}
                />
                {touched.password && errors.password && <Text>{errors.password}</Text>}

                <Text style={styles.header}> Verify password</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('passwordVerification')}
                    onBlur={handleBlur('passwordVerification')}
                    value={values.passwordVerification}
                    secureTextEntry={true}
                />
                {touched.passwordVerification && errors.passwordVerification && <Text>{errors.passwordVerification}</Text>}
              </ScrollView>
            </TouchableWithoutFeedback>
          <Button 
            onPress={handleSubmit} 
            title="Register"
            disabled={!isValid || !dirty} // 'dirty' is a defined prop from Formik API, it checks whether our form has been touched
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
    height: 20,
    borderColor: "#000000",
    borderWidth: 1,
    marginBottom: 16
  },
});
