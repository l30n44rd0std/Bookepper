import { useState } from "react";
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";

import requestsUser from "../api/requests/user";
import { useUserContext } from '../UserContext';

export default function TelaEditarInfo () {

  const { updateUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleUpdate () {
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
        console.info('Sucesso! Informações atualizadas', response.data)
  
        ToastAndroid.showWithGravityAndOffset(
          'Informações atualizadas!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
    } catch (error) {
      console.error(`Não foi possível atualizar as informações ${JSON.stringify(error)}`);
      if (error.response) {
        console.log('Data:', error.response.data);
        console.log('Status:', error.response.status);
        console.log('Headers:', error.response.headers);
      }

      ToastAndroid.showWithGravityAndOffset(
        'Não foi possível atualizar as informações.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewFotoPerfil}>
        <TouchableOpacity style={styles.clicarFotoPerfil}>
          <View style={styles.grayOverlay}>
            <Text style={styles.alterarFotoText}>Alterar Foto</Text>
          </View>
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
            value={username}
            onChangeText={setUsername}
            />
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={styles.labelInput}>E-mail:</Text>
            <TextInput 
            value={email}
            style={styles.input}
            onChangeText={setEmail}
            placeholder="Digite o nome do usuário"
            />
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={styles.labelInput}>Senha:</Text>
            <TextInput 
            placeholder="Digite o nome do usuário"
            value={password}
            secureTextEntry={true}
            style={styles.input}
            onChangeText={setPassword}
            />
            </View>
          </View>

        <TouchableOpacity style={styles.btnSalvar} onPress={handleUpdate}>
            <Text style={styles.btnSalvarText}>Salvar Informações</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1975D2",
  },
  viewFotoPerfil: {
    alignItems: "center",
    justifyContent: "center",
    margin: 80
  },
  alterarFotoText: {
    position: "absolute"
  },
  grayOverlay:{
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center"
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
    paddingBottom: 5
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