// import { useState } from "react";
import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { useUserContext } from '../UserContext';
import { getUserLibrary } from '../BookStorage';
import { ScrollView } from "react-native-gesture-handler";

const TelaInicial = () => {

  const [userBooks, setUserBooks] = useState([]);
  const navigation = useNavigation();

  const handleOpenLibrary = () => {
    navigation.navigate("TelaBibliotecaPessoal");
  };

  const { user } = useUserContext();
  console.log(user);


  useEffect(() => {
    async function fetchUserLibrary() {
      const books = await getUserLibrary();
      console.log('Na TelaInicial, books é: ', books);
      setUserBooks(books);
      // console.log('Na TelaBibliotecaPessoal, userBooks é: ', userBooks)
    }

    fetchUserLibrary();
  }, []);

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
          <Text style={styles.textApresentacao}>Olá, {user.username}</Text>
        </View>

        <View style={styles.viewAtividadesRecentes}>
          <Text style={styles.textoAtividadesRecentes}>
            Atividades recentes:
          </Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {userBooks && userBooks.map ((book, index) => (
          <View style={styles.livrosAtvRecentes} key={index}>
            <TouchableOpacity>
             <Image
                source={{uri: book.imagem_capa}}
                resizeMode="contain"
                style={{
                  width: 200,
                  height: 300,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          )) }
        </ScrollView>
        </View>

        <View style={styles.viewBtn}>
          <TouchableOpacity
            onPress={handleOpenLibrary}
            style={styles.btn}
          >
            <Text style={styles.textBtn}>Acessar biblioteca Pessoal</Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041A30",
  },
  viewBtn: {
    // justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    // marginBottom: 16,
    marginTop: 30,
    backgroundColor: "#204C77",
    width: 250,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems:"center"
  },
  textBtn: {
    color:'#fff'
  },
  apresentacao: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  textApresentacao: {
    height: 90,
    padding: 20,
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
    backgroundColor: "#041A30",
    borderRadius: 10,
  },
  viewAtividadesRecentes: {
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
});

export default TelaInicial;
