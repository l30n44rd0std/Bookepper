import { View, StyleSheet } from "react-native";
import { Avatar, Button, Text, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import requestsUser from "../api/requests/user";

import { useUserContext } from '../UserContext';

const TelaPerfil = () => {
  const { user } = useUserContext();

    // const loadPerfil = async () => {
    //   try {
    //     const response = await requestsUser.loadProfile({ username: username, email: email }); // Chame a função loadProfile do módulo requestsUser
    //     setUser(response.data);
    //     setUsername(response.data.username);
    //     setEmail(response.data.email);
    //   } catch (error) {
    //     console.error("Erro ao carregar perfil:", error);
    //   }
    // };

  const navigation = useNavigation();

  const handleOpenLibrary = () => {
    navigation.navigate("TelaBibliotecaPessoal");
  };

  const handleEditProfile = () => {
    navigation.navigate("EditarInfoUsuario");
  }

  const handleLogout = () => {
    // Lógica para sair da conta do usuário
    // ...
  };

  // useEffect(() => {
  //   loadPerfil();
  // }, []);

  return (
    <View style={styles.container}>
        <View style={styles.profileContainer}>
            <Avatar.Image source={require('../icons/clicia.jpg')} size={400} />
          <Text style={styles.nome}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <IconButton
            icon="pencil"
            mode="contained"
            size={20}
            onPress={handleEditProfile}
          />
        </View>

      <Button
        mode="contained"
        onPress={handleOpenLibrary}
        style={styles.button}
      >
        Ir para biblioteca pessoal
      </Button>

      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Sair da conta
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#104C87",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  nome: {
    color: "#ffff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  email: {
    color: "#ffff",
    fontSize: 18,
    marginTop: 8,
  },
  loadingText: {
    color: "#ffff",
    fontSize: 18,
  },
  button: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#204C77",
    width: 300,
    borderRadius: 10,
    fontWeight: "normal",
  },
});

export default TelaPerfil;
