import { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function TelaCriarConta() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View style={styles.container}>
      <Image style={styles.icone} source={require("../icons/bookepper.png")} />
      <Text style={styles.titulo}>Crie sua conta</Text>
      <Text style={styles.subtitulo}>
        Transforme sua leitura com o Bookeeper!
      </Text>

      <View style={styles.formulario}>
        <TextInput
          label="Nome"
          placeholder="Digite seu nome"
          value={nome}
          style={styles.input}
          onChangeText={setNome}
        />
        <TextInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={email}
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          label="Senha"
          placeholder="Digite sua senha"
          value={senha}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setSenha}
        />
      </View>

      <Button mode="contained" style={styles.botao}> //add onPress={}
        Cadastrar
      </Button>
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
    backgroundColor: "#1975D2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
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
    uppercase: "",
    color:"#4E0189",
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
