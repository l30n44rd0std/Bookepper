import { View, Image, StyleSheet, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const TelaPerfil = () => {

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.clicarFotoPerfil}>
            <Image 
            style={styles.fotoPerfil}
                source={{ uri: "https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg" }}
            />
        </TouchableOpacity>

        <View style={styles.forms}>
            <Text style={styles.labelInput}>Nome do usuário:</Text>
            <TextInput 
            style={styles.input}
            placeholder="Digite o nome do usuário"
            />


        <Text style={styles.labelInput}>E-mail:</Text>
        <TextInput 
        style={styles.input}
        placeholder="Digite o nome do usuário"
        />

        <Text style={styles.labelInput}>Senha:</Text>
        <TextInput 
        style={styles.input}
        placeholder="Digite o nome do usuário"
        />
        </View>

        <TouchableOpacity style={styles.btnSalvar}>
            <Text style={styles.btnSalvarText}>Salvar Informações</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 16,
    backgroundColor: "#104C87",
  },
  fotoPerfil: {
    borderRadius: 200,
    width: 300,
    height: 300
  },
  forms: {
    paddingBottom: 15
  },
  labelInput: {
    color:"#fff",
    fontWeight: 'bold',
  },
  input: {
    backgroundColor:"#FFFEFE",
    color: '#000',
    borderRadius: 10
  },
  btnSalvar: {
    backgroundColor: '#204C77',
    borderRadius: 20,
    alignItems: "center"
  },
  btnSalvarText: {
    color: '#fff'
  }
});

export default TelaPerfil;
