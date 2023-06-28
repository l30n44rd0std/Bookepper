import { View, Image, Text, StyleSheet } from "react-native";
import { Appbar, Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const TelaInicial = () => {

  const navigation = useNavigation();

  const handleOpenLibrary = () => {
    navigation.navigate("TelaBibliotecaPessoal");
  };

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: "#1975D2" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../icons/bookepper.png")}
            style={{ width: 65, height: 65 }}
          />
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>ookepper</Text>
        </View>
      </Appbar.Header>
      <Card.Title
        title="Olá, Joe"
      />
      <Button
        mode="contained"
        onPress={handleOpenLibrary}
        style={styles.button}
      >
        Biblioteca Pessoal
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 16,
    backgroundColor: '#104C87',
    width: 200,
    borderRadius: 10,
    fontWeight:"normal"
  },
})


export default TelaInicial;
