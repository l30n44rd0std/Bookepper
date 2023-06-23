import { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function TelaCriarConta() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [file, setFile] = useState(null);

  const handleNomeChange = (nome) => {
    setNome(nome);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handleSenhaChange = (senha) => {
    setSenha(senha);
  };

  const handleSubmit = () => {
    console.log(`Nome: ${nome}, Email: ${email}, Senha: ${senha}`);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permissão para acessar a galeria negada");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setFile(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require("../icons/bookepper.png")} />
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>
        Transforme sua leitura com o Bookeeper!
      </Text>

      <View style={styles.form}>
        <TextInput
          label="Nome"
          placeholder="Digite seu nome"
          value={nome}
          style={styles.input}
          onChangeText={handleNomeChange}
        />
        <TextInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={email}
          style={styles.input}
          onChangeText={handleEmailChange}
        />
        <TextInput
          label="Senha"
          placeholder="Digite sua senha"
          value={senha}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={handleSenhaChange}
        />
      </View>

      <Button
        mode="contained"
        uppercase=""
        color="#4E0189"
        style={styles.button}
        onPress={handleSubmit}
      >
        Cadastrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 10,
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  form: {
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
  button: {
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
