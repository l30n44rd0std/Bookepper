// import { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Appbar, Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import requestsUser from "../api/requests/user";
import { useState, useEffect } from "react";

import { useUserContext } from '../UserContext';

const TelaInicial = () => {
  const navigation = useNavigation();

  const handleOpenLibrary = () => {
    navigation.navigate("TelaBibliotecaPessoal");
  };

  const { user } = useUserContext();
  console.log(user);

  // const loadUsername = async () => {
  //   try {
  //     const response = await requestsUser.loadProfile({ username: username });
  //     setUsername(response.data.username); // Atualize o estado com o nome de usuário do response
  //     console.log('nome do usuario', response.data.username);
  //     console.log('Sucesso ao carregar info do usuário')
  //   } catch (error) {
  //     console.log("Não foi possível carregar info de usuário.");
  //   }
  // }
  
  // if(username){
  //   loadUsername();
  // }

  // useEffect(() => {
  //   loadUsername();
  // }, []);

  return (
    <>
      <View style={styles.header}>
        <Appbar.Header style={{ backgroundColor: "#1975D2" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../icons/bookepper.png")}
              style={{ width: 65, height: 65 }}
            />
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
              ookepper
            </Text>
          </View>
        </Appbar.Header>
      </View>

      <View style={styles.container}>

        <View style={styles.apresentacao}>
          <Text style={styles.olaUsuario}>Olá, {user.username}</Text>
        </View>

        <View style={styles.atividadesRecentes}>
          <Text style={styles.textoAtividadesRecentes}>
            Atividades recentes:
          </Text>

          <View style={styles.livrosAtvRecentes}>
            <Image
              source={require("../icons/imagem-de-capa-indisponivel.png")}
              style={{
                width: 200,
                height: 300,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
            <Image
              source={require("../icons/imagem-de-capa-indisponivel.png")}
              style={{
                width: 200,
                height: 300,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
            <Image
              source={require("../icons/imagem-de-capa-indisponivel.png")}
              style={{
                width: 200,
                height: 300,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
          </View>
        </View>

        <View style={styles.viewBotao}>
          <Button
            mode="contained"
            onPress={handleOpenLibrary}
            style={styles.button}
          >
            Acessar biblioteca Pessoal
          </Button>
        </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#104C87",
  },
  viewBotao: {
    // justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // marginBottom: 16,
    marginTop: 30,
    backgroundColor: "#204C77",
    width: 300,
    height: 70,
    borderRadius: 10,
  },
  apresentacao: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  olaUsuario: {
    height: 90,
    padding: 20,
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
    backgroundColor: "#041A30",
    borderRadius: 10,
  },
  atividadesRecentes: {
    marginTop: 50,
    marginLeft: 10,
    fontSize: 20,
  },
  textoAtividadesRecentes: {
    color: "#Fff",
    fontWeight: "500",
    paddingBottom: 10,
  },
  livrosAtvRecentes: {
    flexDirection: "row",
  },
  fabGroup: {
    position: "absolute",
    color: "#041A30",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TelaInicial;
