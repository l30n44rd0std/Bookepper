import { useState } from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const TelaPesquisa = () => {
  const [query, setQuery] = useState("");
  const [bookData, setBookData] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const searchBooks = () => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const books = data.items.map((item) => item);
          setBookData(books);
          setTotalResults(data.totalItems);
        } else {
          setBookData([]);
          setTotalResults(0);
        }
      })
      .catch((error) => console.error(error));
  };

  const navigation = useNavigation();

  const handleBookPress = (book) => {
    console.log('telapesquisa', book);
    navigation.navigate("TelaDetalhesLivro", { book, googleId: book.id });
  };

  // const renderItem = ({ item }) => (
  //   <TouchableOpacity key={item.id} onPress={() => handleBookPress(item)}>
  //     <View style={{ marginBottom: 16 }}>
  //       {item.imageLinks && item.imageLinks.thumbnail ? (
  //         <Image
  //           source={{ uri: item.imageLinks.thumbnail }}
  //           style={{ width: 200, height: 300, borderRadius: 15 }}
  //         />
  //       ) : (
  //         <Image
  //           source={require("../icons/imagem-de-capa-indisponivel.png")}
  //           style={{ width: 200, height: 300, borderRadius: 15 }}
  //         />
  //       )}
  //       <Text style={{ color: "#fff", fontWeight: "bold" }}>{item.title}</Text>
  //       <Text style={{ color: "#fff" }}>{item.authors?.join(", ")}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Appbar.Header style={{ backgroundColor: "#1975D2" }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#fff",
              paddingLeft: 10,
            }}
          >
            Explorar
          </Text>
        </Appbar.Header>

        <Searchbar
          placeholder="Digite o título do livro"
          style={styles.searchBar}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={searchBooks} style={styles.btnPesquisar}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Buscar</Text>
        </TouchableOpacity>

        <ScrollView style={styles.listaResultado} showsVerticalScrollIndicator={false}>
          {bookData &&
            bookData.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleBookPress(item)}>
                <View style={{ marginBottom: 16 }}>
                  {item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? (
                    <Image
                      source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                      style={{ width: 200, height: 300, borderRadius: 15 }}
                    />
                  ) : (
                    <Image
                      source={require("../icons/imagem-de-capa-indisponivel.png")}
                      style={{ width: 200, height: 300, borderRadius: 15 }}
                    />
                  )}
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    {item.volumeInfo.title}
                  </Text>
                  <Text style={{ color: "#fff" }}>
                    {item.volumeInfo.authors?.join(", ")}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          {bookData && bookData.length === 0 && (
            <Text style={{ color: "#fff" }}>Nenhum livro encontrado.</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041A30",
  },
  searchBar: {
    borderRadius: 25,
    marginBottom: 15,
    placeholder: "#1F1F1F",
    placeholderTextColor: "#1F1F1F",
    textColor: "#1F1F1F",
    color: "#1F1F1F",
    backgroundColor: "#7BAFE3",
    margin: 8,
  },
  listaResultado: {
    padding: 15,
    // justifyContent: "center",
    // alignItems: "center",
    textColor: "#FFFF",
  },
  btnPesquisar: {
    backgroundColor: "#204C77",
    width: 400,
    height: 30,
    borderRadius: 10,
    fontWeight: "normal",
    marginLeft: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

export default TelaPesquisa;
