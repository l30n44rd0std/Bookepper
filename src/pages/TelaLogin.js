import { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import requestsUser from "../api/requests/user";

import { useUserContext } from '../UserContext';

export default function TelaLogin() {
  //criando estados p/ e-mail e senha
  const { updateUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //navegação p/ outras telas
  const navigation = useNavigation();

  const navegarParaTelaCriarConta = () => {
    navigation.navigate("TelaCriarConta");
  };
  const navegarParaTelaInicial = () => {
    navigation.navigate("BottomTabNavigator");
  };

  const handleLogin = async () => {
    try {
      const response = await requestsUser.login({username: username, email: email, password: password})
      const user = { username: response.data?.username, email: email, password: password }

      updateUser(user);
      console.log('Sucesso no Login', response.data);
      navigation.navigate("BottomTabNavigator");
    } catch (error) {
      console.error('Falha no login', error);
      if (error.response){
        console.log('Data:', error.response.data);
        console.log('Status:', error.response.status);
        console.log('Headers:', error.response.headers);
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
        <TextInput
        label="E-mail"
        placeholder="Digite o e-mail"
        value={email}
        style={styles.input}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        />
        <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry //oculta o que é digitado
        // right={<TextInput.Icon name="eye" />}
        />

        <Button
          mode="contained"
          style={styles.botao}
          onPress={handleLogin}
        >
          Entrar
        </Button>
      </View>

      <View style={styles.footer}>
        <Text style={styles.textoAbaixoDoBotao}>Não tem uma conta?</Text>
        <Button
          onPress={navegarParaTelaCriarConta}
          style={styles.textoLinkCriarConta}
        >
          Criar Conta
        </Button>
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
    borderRadius: 5,
    marginBottom: 15,
    placeholder: "#1F1F1F",
    placeholderTextColor: "#1F1F1F",
    textColor: "#1F1F1F",
    color: "#1F1F1F",
    backgroundColor: "#7BAFE3",
    // outlineStyle: '#1F1F1F'
    fontSize: 16
  },

  botao: {
    uppercase: "",
    backgroundColor: "#104C87",
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 30,
  },
  textoAbaixoDoBotao: {
    color: "#ffff",
  },
  textoLinkCriarConta: {
    color: "#ffff",
    marginTop: 0.5,
    fontWeight: "bold",
    textAlign: "center",
  },
});
