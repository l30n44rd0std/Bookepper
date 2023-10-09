import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Button, Modal, Portal, Provider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import { addBookToLibrary } from "../BookStorage";
import { useUserContext } from "../UserContext";

import { useNavigation } from "@react-navigation/native";

const DetalhesLivro = ({ route }) => {
  const [book, setBook] = useState(route.params?.book || null);
  const {googleId} = route.params;
  console.log(googleId);

  const [showDialog, setShowDialog] = useState(false);
  const [readingStatus, setReadingStatus] = useState("");

  const { user } = useUserContext();
  
  useEffect(() => {
    const carregarLivro = () => {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes/${googleId}`;
      
      fetch(apiUrl)
      .then((response) => response.json())
      .then((dataLivro) => {
        setBook(dataLivro);
      })
      .catch((error) => console.error(error));
    };
    if (!book) carregarLivro();
  }, [book]);
  
  const handleAmazonLink = () => {
    const formattedTitle = book.title.replace(/ /g, "+");
    const amazonLink = `https://www.amazon.com.br/s?k=${formattedTitle}`;
    
    Linking.openURL(amazonLink);
  };
  
  const handleAdicionarNaLivraria = async (status) => {
    console.log("entrou na handleAdicionarNaLivraria");
    setShowDialog(false);
    setReadingStatus(status);
    
    // console.log('dentro de handleAdicionarNaLivraria, valor do book: ', book)
    // if(googleId && user && user.id) {

      const newBook = {
        imagem_capa: book?.volumeInfo.imageLinks.thumbnail,
        titulo: book?.volumeInfo.title,
        autor: book?.volumeInfo.authors,
        usuario_id: user.id,
        google_id: googleId,
        status: readingStatus,
      };
      console.log("TelaDetalhesLivro book", book);
      console.log("TelaDetalhesLivro newBook", newBook);
      
      await addBookToLibrary(newBook);
    // }
  };

  const navigation = useNavigation();
  const handleTelaAutor = () => {
    if (book?.volumeInfo?.authors) {
      const authorName = book.volumeInfo.authors.join(", ");
      console.log("TelaDetalhesLivro, authorName é ", authorName)
      navigation.navigate("TelaAutor", { authorName })
    }
  };

  return (
    <Provider>
      <>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.viewCapa}>
                {book?.volumeInfo?.imageLinks && book?.volumeInfo?.imageLinks?.thumbnail ? (
                  <Image
                    source={{ uri: book?.volumeInfo?.imageLinks?.thumbnail }}
                    style={styles.capa}
                  />
                ) : (
                  <Image
                    source={require("../icons/imagem-de-capa-indisponivel.png")}
                    style={styles.capa}
                  />
                )}
              </View>

              <View style={styles.container2}>
                <Text style={styles.titulo}>{book?.volumeInfo?.title}</Text>
                <TouchableOpacity onPress={() => handleTelaAutor()}>
                  <Text style={styles.autor}>{book?.volumeInfo?.authors?.join(", ")}</Text>
                </TouchableOpacity>
                <Text style={styles.informacoes}>Editora: {book?.volumeInfo?.publisher}</Text>
                <Text style={styles.informacoes}>Publicação: {book?.volumeInfo?.publishedDate}</Text>
                <Text style={styles.informacoes}>ISBN: {book?.volumeInfo?.industryIdentifiers?.[0]?.identifier}</Text>
                <Text style={styles.informacoes}>Categoria: {book?.volumeInfo?.categories?.join(", ")}</Text>
              </View>

              <View style={styles.container3}>
                <Text style={styles.informacoes}>
                  Avaliações: {book?.volumeInfo?.averageRating}
                </Text>
                <Text style={styles.informacoes}>Tipo: Físico</Text>
                <Text style={styles.informacoes}>
                  Número de páginas: {book?.volumeInfo?.pageCount}
                </Text>
              </View>

              <View style={styles.container4}>
                <Button
                  style={styles.botaoAmazon}
                  mode="contained"
                  onPress={handleAmazonLink}
                >
                  Ver na loja da Amazon
                </Button>
                <TouchableOpacity
                  style={styles.botaoAdd}
                  onPress={() => setShowDialog(true)}
                >
                  <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.descricao}>
              <Text style={styles.descricaoTitulo}>Descrição</Text>
              <Text style={styles.descricaoTexto}>{book?.volumeInfo?.description}</Text>
            </View>

            {book && (
              <Portal>
                <Modal
                  visible={showDialog}
                  onDismiss={() => setShowDialog(false)}
                  contentContainerStyle={styles.modalContainer}
                >
                  <View style={styles.conteudoModal}>
                    <Text style={styles.tituloModal}>Leitura</Text>
                    <Text style={styles.subtituloModal}>
                      Status da leitura:
                    </Text>
                    <View style={styles.botoesModal}>
                      <Button
                        mode="contained"
                        onPress={() => handleAdicionarNaLivraria("Já li")}
                      >
                        Já li
                      </Button>
                      <Button
                        mode="contained"
                        onPress={() => handleAdicionarNaLivraria("Lendo")}
                      >
                        Lendo
                      </Button>
                      <Button
                        mode="contained"
                        onPress={() => handleAdicionarNaLivraria("Quero Ler")}
                      >
                        Quero Ler
                      </Button>
                      <Button
                        mode="contained"
                        onPress={() => handleAdicionarNaLivraria("Abandonado")}
                      >
                        Abandonado
                      </Button>
                    </View>
                  </View>
                </Modal>
              </Portal>
            )}
          </View>
        </ScrollView>
      </>
    </Provider>
  );
};

// Estilos de CSS
const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
    backgroundColor: "#1975D2",
    flexDirection: "column",
  },
  container4: {
    flexDirection: "row",
  },
  autor: {
    color: '#fff'
  },
  capa: {
    width: 200,
    height: 300,
    margin: 20,
    borderRadius: 15,
  },
  titulo: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    margin: 8,
    // height: 100,
    // width: 100
  },
  informacoes: {
    color: "#fff",
  },
  descricao: {
    padding: 20,
  },
  descricaoTitulo: {
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 6,
  },
  descricaoTexto: {
    fontSize: 16,
    marginBottom: 8,
  },
  // informacoes: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   marginTop: 8,
  // },
  botaoAmazon: {
    backgroundColor: "#104C87",
    width: 200,
    borderRadius: 10,
    fontWeight: "normal",
  },
  botaoAdd: {
    backgroundColor: "#104C87",
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  conteudoModal: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    minWidth: 300,
  },
  tituloModal: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtituloModal: {
    fontSize: 18,
    marginBottom: 8,
  },
  botoesModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default DetalhesLivro;
