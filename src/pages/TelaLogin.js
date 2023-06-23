import { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";

export default function TelaLogin() {
 
  //criando estados p/ e-mail e senha
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  //navegação p/ outras telas
  const navigation = useNavigation();

  const navegarParaTelaCriarConta = () => {
    navigation.navigate("TelaCriarConta");
  };
  const navegarParaTelaInicial = () => {
    navigation.navigate("BottomTabNavigator");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.icone} source={require("../icons/bookepper.png")} />
      <Text style={styles.titulo}>Bookeeper</Text>
      <Text style={styles.subtitulo}>Organize suas leituras com Bookepper!</Text>

      <View style={styles.formulario}>
        <TextInput
          label="E-mail"
          value={email}
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          secureTextEntry //oculta o que é digitado
          right={<TextInput.Icon name="eye" />}
        />

        <Button
          mode="contained"
          style={styles.botao}
          onPress={navegarParaTelaInicial}
        >
          {" "}
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
    width: 100,
    height: 100,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1975D2",
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#FFFFFF",
  },

  subtitulo: {
    fontSize: 10,
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 20,
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
  },

  botao: {
    uppercase:"",
    backgroundColor: "#104C87",
    borderRadius: 5,
    marginBottom: 15,
  },
  textoAbaixoDoBotao: {
    color: "#fffffffff",
  },
  textoLinkCriarConta: {
    color: "#4E0189",
    marginTop: 0.5,
    fontWeight: "bold",
    textAlign: "center",
  },
});