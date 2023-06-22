import { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

function TelaLogin () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const navigation = useNavigation();

  const handleCriarContaPress = () => {
    navigation.navigate('TelaCriarConta');
  };
  const handleEntrarPress = () => {
    console.log('handleEntrarPress')
    navigation.navigate('Home');
  };

return (

  <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require('../icons/bookepper.png')}
      />
      <Text style={styles.title}>Bookeeper</Text>
      <Text style={styles.subtitle}>Organize suas leituras com Bookepper!</Text>

      <View style={styles.form}>

      <TextInput
        label="E-mail"
        value={email}
        style={styles.input}
        onChangeText={setEmail}
        />
      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        right={<TextInput.Icon name={secureTextEntry ? 'eye' : 'eye-off'} onPress={toggleSecureEntry} />}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        />

      <Button mode="contained" uppercase='' style={styles.button} onPress={handleEntrarPress}> Entrar</Button>

      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Não tem uma conta?
        </Text>
        <Button uppercase='' color='#FFFFFF' onPress={handleCriarContaPress} style={styles.footerLink}>Criar Conta</Button>
      </View>
    </View>

);
}

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1975D2',
  },
  
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFFFFF'
  },
  
  subtitle: {
    fontSize: 10,
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF'
  },
  
  form: {
    width: '80%',
  },
  
  input: {
    borderRadius: 5,
    marginBottom: 15,
    placeholder: '#1F1F1F',
    placeholderTextColor: '#1F1F1F',
    textColor:'#1F1F1F',
    color: '#1F1F1F',
    backgroundColor:'#7BAFE3'
  },

  button: {
    backgroundColor: '#104C87',
    borderRadius: 5,
    marginBottom: 15,
  },
  footerText: {
    color: '#fffffffff'
  },
  footerLink: {
    color: '#4E0189',
    marginTop: 0.5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TelaLogin;