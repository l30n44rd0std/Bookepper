import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import requestsUser from "../api/requests/user";
import { useUserContext } from '../UserContext';

export default function TelaCriarConta() {

  const { updateUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  function handleLoginScreen() {
    navigation.navigate("TelaLogin");
  }

  const handleRegister = async () => {
    try {
      const response = await requestsUser.register({username: username, email: email, password: password});
      const user = { username: response.data?.username, email: email, password: password }
    
      if (user.username == '' || user.email == '' || user.password == '') {
        console.info('Nome de usuário, e-mail e/ou senha vazios.')
        ToastAndroid.showWithGravityAndOffset(
          'Nome, e-mail e/ou senha vazios.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        updateUser(user);
        console.info('Sucesso! Novo usuário registrado', response.data)
        navigation.navigate('TelaLogin');
  
        ToastAndroid.showWithGravityAndOffset(
          'Usuário criado com sucesso!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
    } catch (error) {
      console.error(`Erro ao criar o novo usuario ${JSON.stringify(error)}`);
      if (error.response) {
        console.log('Data:', error.response.data);
        console.log('Status:', error.response.status);
        console.log('Headers:', error.response.headers);
      }

      ToastAndroid.showWithGravityAndOffset(
        'Não foi possível registrar o usuário.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.icone} source={require("../icons/bookepper.png")} />
      <Text style={styles.titulo}>Crie sua conta</Text>
      <Text style={styles.subtitulo}>
        Transforme sua leitura com o Bookeeper!
      </Text>

      <View style={styles.formulario}>
        <Text style={{ color: "#fff", paddingBottom: 5 }}>Nome de usuário</Text>
        <TextInput
          placeholder="Digite seu nome"
          value={username}
          style={styles.input}
          onChangeText={setUsername}
        />

        <Text style={{ color: "#fff", paddingBottom: 5 }}>E-mail</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          value={email}
          style={styles.input}
          onChangeText={setEmail}
        />

        <Text style={{ color: "#fff", paddingBottom: 5 }}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          value={password}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={{ color: "#fff", marginTop: 30 }}>Já tem uma conta?</Text>
      <Text
        onPress={handleLoginScreen}
        style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
      >
        Entrar
      </Text>
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
    backgroundColor: "#1975D2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
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
    paddingLeft: 14,
  },
  btn: {
    uppercase: "",
    color: "#4E0189",
    backgroundColor: "#104C87",
    borderRadius: 8,
    height: 50,
    width: "80%",
    marginTop: 15,
    marginBottom: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
