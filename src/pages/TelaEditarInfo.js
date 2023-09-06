import { View, Image, StyleSheet, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const TelaPerfil = () => {

  return (
    <View style={styles.container}>
      <View style={styles.viewFotoPerfil}>
        <TouchableOpacity style={styles.clicarFotoPerfil}>
            <Image 
            style={styles.fotoPerfil}
                source={require('../icons/clicia.jpg')}
            />
        </TouchableOpacity>
      </View>

        <View style={styles.forms}>
          <View style={{marginBottom: 20}}>
            <Text style={styles.labelInput}>Nome do usuário:</Text>
            <TextInput 
            style={styles.input}
            placeholder="Digite o nome do usuário"
            />
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={styles.labelInput}>E-mail:</Text>
            <TextInput 
            style={styles.input}
            placeholder="Digite o nome do usuário"
            />
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={styles.labelInput}>Senha:</Text>
            <TextInput 
            style={styles.input}
            placeholder="Digite o nome do usuário"
            />
            </View>
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
    padding: 16,
    backgroundColor: "#104C87",
  },
  viewFotoPerfil: {
    alignItems: "center",
    justifyContent: "center",
    margin: 80
  },
  fotoPerfil: {
    borderRadius: 200,
    width: 300,
    height: 300
  },
  forms: {
    paddingBottom: 15,
    margin: 20,
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
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    height: 35,
    margin: 180,
    marginLeft: 30
  },
  btnSalvarText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default TelaPerfil;
