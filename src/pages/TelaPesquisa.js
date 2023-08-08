import { useState } from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { 
  Appbar, 
  Searchbar,
  Button,
} from "react-native-paper";
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
          const books = data.items.map((item) => item.volumeInfo);
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
    console.log("handleBookPress");
    navigation.navigate("TelaDetalhesLivro", { book, googleId: book.id });
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} onPress={() => handleBookPress(item)}>
      <View style={{ marginBottom: 16 }}>
        {item.imageLinks && item.imageLinks.thumbnail ? (
          <Image
            source={{ uri: item.imageLinks.thumbnail }}
            style={{ width: 200, height: 300 }}
          />
        ) : (
          <Image
            source={require("../icons/imagem-de-capa-indisponivel.png")}
            style={{ width: 200, height: 300 }}
          />
        )}
        <Text>{item.title}</Text>
        <Text>Autor: {item.authors?.join(", ")}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
      <StatusBar style="auto" />

        <Appbar.Header style={{ backgroundColor: "#1975D2" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Explorar</Text>
        </Appbar.Header>

        <Searchbar
          placeholder="Digite o título do livro"
          style={styles.searchBar}
          value={query}
          onChangeText={setQuery}
        />
        <Button mode="contained" onPress={searchBooks} style={styles.botaoPesquisar}>
          Buscar
        </Button>

        <View style={styles.listaResultado}>
          {bookData && (
            <FlatList
              data={bookData}
              renderItem={renderItem}
              keyExtractor={(items) => items.id}
              ListEmptyComponent={() => <Text>Nenhum livro encontrado.</Text>}
            />
          )}
        </View> 
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchBar: {
    borderRadius: 25,
    marginBottom: 15,
    placeholder: "#1F1F1F",
    placeholderTextColor: "#1F1F1F",
    textColor: "#1F1F1F",
    color: "#1F1F1F",
    backgroundColor: "#7BAFE3",
    margin: 8
  },
  listaResultado: {
    padding: 15,
    // justifyContent: "center",
    // alignItems: "center",
    textColor: "#FFFFFFF",
  },
  botaoPesquisar: {
    backgroundColor: '#104C87',
    width: 200,
    borderRadius: 10,
    fontWeight:"normal",
    marginLeft: 140
  }
});

export default TelaPesquisa;
