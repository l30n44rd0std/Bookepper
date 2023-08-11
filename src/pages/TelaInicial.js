// import { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Appbar, Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const TelaInicial = () => {
  const navigation = useNavigation();

  const handleOpenLibrary = () => {
    navigation.navigate("TelaBibliotecaPessoal");
  };

  // const [state, setState] = useState({ open: false });
  // const onStateChange = ({ open }) => setState({ open });
  // const { open } = state;
  // const getFABIcon = () => (open ? "close" : "plus");

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
        {/* <Card.Title title="Olá, Joe" style={styles.olaUsuario} /> */}
        <View style={styles.apresentacao}>
          <Text style={styles.olaUsuario}>Olá, @user!</Text>
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
        {/* <FAB.Group
          style={styles.fabGroup}
          open={open}
          icon={getFABIcon(open)} // Passando o ícone diretamente
          actions={[
            {
              icon: "plus",
              label: "Add Book",
              onPress: () => console.log("Add Book Pressed"),
            },
            {
              icon: "star",
              label: "Favorite",
              onPress: () => console.log("Favorite Pressed"),
            },
          ]}
          onStateChange={onStateChange}
        /> */}
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
