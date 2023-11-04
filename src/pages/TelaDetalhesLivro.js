import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  Modal,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import { addBookToLibrary } from "../BookStorage";
import { useUserContext } from "../UserContext";

import { useNavigation } from "@react-navigation/native";

const DetalhesLivro = ({ route }) => {
  const [book, setBook] = useState(route.params?.book || null);
  const { googleId } = route.params;

  const [showDialog, setShowDialog] = useState(false);
  const [readingStatus, setReadingStatus] = useState("");

  const { user } = useUserContext();

  const [review, setReview] = useState(""); //resenha do usuário sobre o livro

  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const starImgFilled =
    "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true";
  const starImgCorner =
    "https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true";
  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= defaultRating
                    ? { uri: starImgFilled }
                    : { uri: starImgCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

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
  }, [book, googleId]);

  const handleAmazonLink = () => {
    const formattedTitle = book.title.replace(/ /g, "+");
    const amazonLink = `https://www.amazon.com.br/s?k=${formattedTitle}`;

    Linking.openURL(amazonLink);
  };

  const handleAlterarStatus = async (status) => {
    setReadingStatus(status);
    console.log("Status alterado para: ", status);
  };

  const handleEnviarAdicionarNaLivraria = async () => {
    const newBook = {
      imagem_capa: book?.volumeInfo.imageLinks.thumbnail,
      titulo: book?.volumeInfo.title,
      autor: book?.volumeInfo.authors,
      usuario_id: user.id,
      google_id: googleId,
      status: readingStatus,
      avaliacao: defaultRating,
      review: review
    };

    await addBookToLibrary(newBook);
    setShowDialog(false);

    console.log("newbook: ", newBook);
    console.log("Adicionado/Alterado!");
  };

  const navigation = useNavigation();
  const handleTelaAutor = () => {
    if (book?.volumeInfo?.authors) {
      const authorName = book.volumeInfo.authors.join(", ");
      console.log("TelaDetalhesLivro, authorName é ", authorName);
      navigation.navigate("TelaAutor", { authorName });
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.viewCapa}>
              {book?.volumeInfo?.imageLinks &&
              book?.volumeInfo?.imageLinks?.thumbnail ? (
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

            <View style={styles.viewInfoAuthor}>
              <Text style={styles.bookName}>{book?.volumeInfo?.title}</Text>
              <TouchableOpacity onPress={() => handleTelaAutor()}>
                <Text style={styles.authorName}>
                  {book?.volumeInfo?.authors?.join(", ")}
                </Text>
              </TouchableOpacity>
              <Text style={styles.info}>
                Editora: {book?.volumeInfo?.publisher}
              </Text>
              <Text style={styles.info}>
                Publicação: {book?.volumeInfo?.publishedDate}
              </Text>
              <Text style={styles.info}>
                ISBN: {book?.volumeInfo?.industryIdentifiers?.[0]?.identifier}
              </Text>
              <Text style={styles.info}>
                Categoria:
                <Text style={styles.infoCategories}>
                  {book?.volumeInfo?.categories?.join(", ")}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.header2}>
            <Text style={styles.info2}>
              Avaliações: {book?.volumeInfo?.averageRating}
            </Text>
            <Text style={styles.info2}>Tipo: Físico</Text>
            <Text style={styles.info2}>
              Número de páginas: {book?.volumeInfo?.pageCount}
            </Text>
          </View>

            <View style={styles.viewBtns}>
              <TouchableOpacity
                style={[styles.botaoAmazon]}
                onPress={handleAmazonLink}
              >
                <Text style={{ color: "#fff" }}>Ver na loja da Amazon</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoAdd}
                onPress={() => setShowDialog(true)}
              >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>

          <View style={styles.descricao}>
            <Text style={styles.descricaoTitulo}>Descrição</Text>
            <Text style={styles.descricaoTexto}>
              {book?.volumeInfo?.description}
            </Text>
          </View>

          {book && (
            <Modal
              visible={showDialog}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.conteudoModal}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.tituloModal}>Leitura</Text>
                    <TouchableOpacity onPress={() => setShowDialog(false)}>
                      <Ionicons name="close" size={30} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.subtituloModal}>Status da leitura:</Text>
                  <View style={styles.botoesModal}>
                    <TouchableOpacity
                      onPress={() => handleAlterarStatus("Lido")}
                      style={styles.btnStatus}
                    >
                      <Text style={styles.btnStatusText}>Lido</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAlterarStatus("Lendo")}
                      style={styles.btnStatus}
                    >
                      <Text style={styles.btnStatusText}>Lendo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAlterarStatus("Quero Ler")}
                      style={styles.btnStatus}
                    >
                      <Text style={styles.btnStatusText}>Quero Ler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAlterarStatus("Abandonado")}
                      style={styles.btnStatus}
                    >
                      <Text style={styles.btnStatusText}>Abandonado</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: "blue",
                      marginVertical: 30,
                    }}
                  ></View>

                  <View style={styles.viewBookReview}>
                    <Text style={styles.tituloModal}>Resenha</Text>

                    <TextInput
                      placeholder="Digite aqui o que você achou sobre o livro"
                      style={styles.inputReview}
                      value={review}
                      onChangeText={setReview}
                    />
                  </View>

                  <View
                    style={{
                      width: "100%",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: "black",
                      marginVertical: 30,
                    }}
                  ></View>

                  <View style={styles.viewRating}>
                    <Text style={styles.tituloModal}>Avaliação</Text>
                    <Text style={styles.subtituloModal}>Mudar avaliação:</Text>
                    <View
                      style={{ margin: 0, padding: 0, alignItems: "center" }}
                    >
                      <CustomRatingBar />
                      <Text style={{ color: "#000" }}>
                        {" "}
                        {defaultRating + " / " + maxRating.length}{" "}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[styles.btnStatus, { marginTop: 40 }]}
                    onPress={() => handleEnviarAdicionarNaLivraria()}
                  >
                    <Text style={styles.btnStatusText}>
                      {" "}
                      Adicionar ou alterar livro{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
    </>
  );
};

// Estilos de CSS
const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1975D2",
    flexDirection: "row",
  },
  viewInfoAuthor: {
    flex: 1
  },
  header2: {
    flex: 1,
    paddingLeft: 40,
    paddingBottom: 20,
    backgroundColor: "#1975D2",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 50
  },

  viewBtns: {
    flex: 1,
    backgroundColor: "#1975D2",
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-evenly"
  },
  authorName: {
    color: "#fff",
    paddingTop: -30,
    paddingBottom: 10,
    fontWeight: 'bold'
  },
  capa: {
    width: 200,
    height: 300,
    margin: 20,
    borderRadius: 15,
  },
  bookName: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    margin: 8,
    marginLeft: -2,
    marginTop: 50,
    marginBottom: 1,
  },
  info: {
    color: "#fff",
    paddingBottom: 10,
  },
  info2: {
    color: "#000",
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
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
  botaoAmazon: {
    backgroundColor: "#104C87",
    width: 200,
    borderRadius: 10,
    fontWeight: "normal",
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 25
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between" 
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
  btnStatus: {
    backgroundColor: "#104C87",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  btnStatusText: {
    color: "#fff",
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  inputReview: {
    width: 350,
    height: 100,
    paddingLeft: 10,
    backgroundColor: '#7BAFE3',
    borderRadius: 20,
    color: '#000'
  }
});

export default DetalhesLivro;
