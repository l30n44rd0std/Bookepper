import { useState } from "react";
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

import requestsUser from "../api/requests/user";
import { useUserContext } from '../contexts/UserContext';

export default function TelaLogin() {
  //criando estados p/ e-mail e senha
  const { updateUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //navegação p/ outras telas
  const navigation = useNavigation();

  const handleTelaCriarConta = () => {
    navigation.navigate("TelaCriarConta");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = async () => {
    try {
      if (email === '' || password === '') {
        console.info('E-mail e/ou senha vazios.');
        ToastAndroid.showWithGravityAndOffset(
          'E-mail e/ou senha vazios.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        return;
      }

      const response = await requestsUser.login({ email: email, password: password });

      updateUser({ email: email, username: response.data.username }); // Inclua o nome de usuário do servidor na atualização do usuário

      console.log('Sucesso no Login', response.data);

      navigation.navigate("BottomTabNavigator");
      ToastAndroid.showWithGravityAndOffset(
        'Sucesso no login!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } catch (error) {
      console.error('Falha no login', error);
      if (error.message === 'Network Error') {
        ToastAndroid.showWithGravityAndOffset(
          'Problema de Rede',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'E-mail/senha incorretos ou usuário não cadastrado.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.icone} source={require("../icons/bookepper.png")} />
      <Text style={styles.titulo}>Bookeeper</Text>
      <Text style={styles.subtitulo}>
        Organize suas leituras com Bookepper!
      </Text>

      <View style={styles.formulario}>
        <Text style={{color:'#fff', paddingBottom: 5}}>E-mail</Text>
        <TextInput
        label="E-mail"
        placeholder="Digite o e-mail"
        value={email}
        style={styles.input}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        />
        
        <Text style={{color:'#fff', paddingBottom: 5}}>Senha</Text>
        <View style={styles.passwordInputContainer}>
        <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={[styles.input, {flex: 1, height: 40, width: '100%'}]}
        secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="#1F1F1F"
            style={{ paddingRight: 20, position: "absolute" }}
          />
        </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={handleLogin}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30}}>
        <Text style={{color: '#fff'}}>Não tem uma conta?</Text>
        <Text
          onPress={handleTelaCriarConta}
          style={{color: '#fff', fontWeight: 'bold', textAlign: "center",}}
        >
          Criar Conta
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icone: {
    width: 150,
    height: 150,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1975D2",
    padding: 20,
  },

  titulo: {
    fontSize: 55,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFFFFF",
  },

  subtitulo: {
    fontSize: 15,
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 60,
    color: "#FFFFFF",
  },

  formulario: {
    width: "80%",
  },

  input: {
    borderRadius: 10,
    marginBottom: 15,
    placeholder: "#1F1F1F",
    placeholderTextColor: "#1F1F1F",
    textColor: "#1F1F1F",
    color: "#1F1F1F",
    backgroundColor: "#7BAFE3",
    // outlineStyle: '#1F1F1F'
    fontSize: 16,
    height: 40,
    paddingLeft: 14
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#1F1F1F",
  },
  btn: {
    uppercase: "",
    color: "#4E0189",
    backgroundColor: "#104C87",
    borderRadius: 8,
    height: 50,
    width: "100%",
    marginTop: 15,
    marginBottom: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
