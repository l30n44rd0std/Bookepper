import { useState } from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const TelaPesquisa = () => {
  const [query, setQuery] = useState("");
  const [bookData, setBookData] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [showDefaultBooks, setShowDefaultBooks] = useState(true);

  const maxLength = 30;
  const authorMaxLength = 50;
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const searchBooks = () => {
    setShowDefaultBooks(false);
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

  const handleDefaultBookPress = (googleId) => {
    navigation.navigate("TelaDetalhesLivro", { googleId });
  };  
  
  const handleClearBtn = () => {
    setQuery("");
    setBookData(null);
    setTotalResults(0);;
    setShowDefaultBooks(true);
  }
  
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
        <TouchableOpacity onPress={handleClearBtn} style={[styles.btnPesquisar, {backgroundColor: '#FF0000', marginTop: 10}]}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Limpar</Text>
        </TouchableOpacity>

        <FlatList
          data={bookData}
          keyExtractor={(item, index) => index.toString()}
          vertical={true}
          numColumns={2} // Defina o número de colunas como 3
          contentContainerStyle={styles.listaResultado}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} onPress={() => handleBookPress(item)}>
              <View style={{ marginBottom: 16, flex: 1, padding: 10 }}>
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
                  {truncateText(item.volumeInfo.title, maxLength)}
                </Text>
                <Text style={{ color: "#fff" }}>
                  {item.volumeInfo.authors
                    ? truncateText(item.volumeInfo.authors.join(", "), authorMaxLength)
                    : "Autor desconhecido"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />          
        {bookData && bookData.length === 0 && (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: -600 }}>
            <Text style={{ color: "#fff", fontSize: 15 }}>Nenhum livro encontrado.</Text>
          </View>
        )}
        {showDefaultBooks && (
            <ScrollView>
            <View style={styles.viewTopics}>
              <View style={styles.viewTopic}>
                <Text style={styles.topicName}>Autoajuda</Text>
              </View>
              <ScrollView horizontal>
                <View style={styles.horizontalBook}>
                  <TouchableOpacity onPress={ () => handleDefaultBookPress('aizjDQAAQBAJ')}>
                    <Image
                      source={require('../imgs_books/mindset.jpg')}
                      style={styles.imgBookTopics}
                    />
                  </TouchableOpacity>
                  <Text style={styles.nameBookTopic}>Mindset</Text>
                  <Text style={styles.nameAuthorTopic}>Carol S.Dweck</Text>
                </View>

                <View style={styles.horizontalBook}>
                  <TouchableOpacity onPress={ () => handleDefaultBookPress('-1_8wAEACAAJ')}>
                    <Image
                      source={require('../imgs_books/pairico.jpg')}
                      style={styles.imgBookTopics}
                    />
                  </TouchableOpacity>
                  <Text style={styles.nameBookTopic}>Pai Rico, Pai Pobre</Text>
                  <Text style={styles.nameAuthorTopic}>Robert Kiyosaki</Text>
                </View>

                <View style={styles.horizontalBook}>
                  <TouchableOpacity onPress={ () => handleDefaultBookPress('a6CXtAEACAAJ')}>
                    <Image
                      source={require('../imgs_books/sutilarte.jpg')}
                      style={styles.imgBookTopics}
                    />
                  </TouchableOpacity>
                  <Text style={styles.nameBookTopic}>A Sutil Arte de Ligar o F*da-se</Text>
                  <Text style={styles.nameAuthorTopic}>Mark Manson</Text>
                </View>

              </ScrollView>

              <View style={[styles.viewTopic, {paddingTop: 30}]}>
                <Text style={styles.topicName}>Romance</Text>
              </View>
              <ScrollView horizontal>
                <View style={styles.horizontalBook}>
                  <TouchableOpacity onPress={ () => handleDefaultBookPress('OQn0zwEACAAJ')}>
                    <Image
                      source={require('../imgs_books/orgulho-e-preconceito.jpg')}
                      style={styles.imgBookTopics}
                    />
                  </TouchableOpacity>
                  <Text style={styles.nameBookTopic}>Orgulho e preconceito</Text>
                  <Text style={styles.nameAuthorTopic}>Jane Austen</Text>
                </View>

                <View style={styles.horizontalBook}>
                  <TouchableOpacity onPress={ () => handleDefaultBookPress('RODKzwEACAAJ')}>
                    <Image
                      source={require('../imgs_books/assim-que-comeca.jpg')}
                      style={styles.imgBookTopics}
                    />
                  </TouchableOpacity>
                  <Text style={styles.nameBookTopic}>{truncateText("É assim que começa (Vol. 2 É assim que acaba)", maxLength)}</Text>
                  <Text style={styles.nameAuthorTopic}>Colleen Hoover</Text>
                </View>

                <View style={styles.horizontalBook}>
                  <TouchableOpacity onPress={ () => handleDefaultBookPress('dXGnEAAAQBAJ')}>
                    <Image
                      source={require('../imgs_books/morro-dos-ventos-uivantes.jpg')}
                      style={styles.imgBookTopics}
                    />
                  </TouchableOpacity>
                  <Text style={styles.nameBookTopic}>O morro dos ventos uivantes</Text>
                  <Text style={styles.nameAuthorTopic}>Emily Bronte</Text>
                </View>

              </ScrollView>

              <View style={[styles.viewTopic, {paddingTop: 30}]}>
                <Text style={styles.topicName}>Fantasia</Text>
              </View>
              <ScrollView horizontal>
                <View style={styles.horizontalBook}>
                  <TouchableOpacity onPress={ () => handleDefaultBookPress("R7KuDwAAQBAJ")}>
                    <Image
                      source={require('../imgs_books/senhor-dos-aneis.jpg')}
                      style={styles.imgBookTopics}
                    />
                  </TouchableOpacity>
                  <Text style={styles.nameBookTopic}>{truncateText("O Senhor dos Anéis: A Sociedade do Anel", maxLength)}</Text>
                  <Text style={styles.nameAuthorTopic}>J.R.R. Tolkien</Text>
                </View>

                <View style={styles.horizontalBook}>
                  <TouchableOpacity onPress={ () => handleDefaultBookPress('rkr7zwEACAAJ')}>
                    <Image
                      source={require('../imgs_books/harry-potter.jpg')}
                      style={styles.imgBookTopics}
                    />
                  </TouchableOpacity>
                  <Text style={styles.nameBookTopic}>{truncateText("Harry Potter e a Pedra Filosofal: 1", maxLength)}</Text>
                  <Text style={styles.nameAuthorTopic}>J.K. Rowling</Text>
                </View>

                <View style={styles.horizontalBook}>
                  <TouchableOpacity onPress={ () => handleDefaultBookPress('L-ErEAAAQBAJ')}>
                    <Image
                      source={require('../imgs_books/1984.jpg')}
                      style={styles.imgBookTopics}
                    />
                  </TouchableOpacity>
                  <Text style={styles.nameBookTopic}>1984</Text>
                  <Text style={styles.nameAuthorTopic}>George Orwell</Text>
                </View>

              </ScrollView>

            </View>
            </ScrollView>
        )}
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
  //-----------------------------------------
  viewTopics: {
    paddingLeft: 5,
  },
  viewTopic: {
    flexDirection: "row", 
    alignItems: "baseline", 
    justifyContent:"space-between",
    paddingBottom: 20,
  },
  topicName: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 40,
    paddingLeft: 10,
    paddingTop: 30
  },
  verMais: {
    color: '#ffff',
    fontWeight: "800"
  },
  imgBookTopics: {
    width: 200,
    height: 250,
    borderRadius: 20
  },
  nameBookTopic: {
    color: '#ffff',
    fontWeight: "500",
    fontSize: 15
  },
  nameAuthorTopic: {
    color: '#ffff',
    fontWeight: "200"
  },
  horizontalBook: {
    flex: 1,
    paddingRight: 20
  }
});

export default TelaPesquisa;
