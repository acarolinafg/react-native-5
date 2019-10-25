import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Image, Text } from 'react-native'
import { AsyncStorage } from 'react-native';
import axios from 'axios'

export default Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [carregando, setCarregando] = useState(false);
  AsyncStorage.getItem('user').then(user => {
    if (user)
      props.navigation.navigate('Acceleration');
  });

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const checklogin = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'))
    if (user)
      props.navigation.navigate('Acceleration')
  };
  const handleClick = async () => {
    setCarregando(true)
    const { data } = await axios.post('https://api.codenation.dev/v1/user/auth', {
      email,
      password
    });

    await AsyncStorage.setItem('user', JSON.stringify(data));
    setCarregando(false);
    props.navigation.navigate('Acceleration');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={{ uri: 'https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png' }}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          className={'email-input'}
          style={styles.input}
          autoCompleteType={'email'}
          keyboardType={'email-address'}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          className={'password-input'}
          style={styles.input}
          autoCompleteType={'password'}
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Button
          title="Entrar"
          className={'submit-login'}
          disabled={!(validateEmail(email) && password.length > 0 && !carregando)}
          color="#7800ff"
          onPress={handleClick}
        />
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#7800ff',
    borderBottomWidth: 2,
    padding: 16,
    paddingTop: 55
  },
  headerImage: {
    height: 45,
    width: 250
  },
  form: {
    padding: 25
  },
  title: {
    fontSize: 40,
    color: '#7800ff',
    marginBottom: 12
  },
  label: {
    color: '#7800ff'
  },
  input: {
    height: 40,
    fontSize: 20,
    borderRadius: 6,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10
  }
});