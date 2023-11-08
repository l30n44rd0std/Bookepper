import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  ToastAndroid,
  Pressable,
} from "react-native";

import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import { getUserLibrary, updateBookInLibrary } from "../BookStorage";
import { removeBookFromLibrary } from "../BookStorage";
import handleVerificationExistingBook from "../utils/handleVerificationExistingBook";
// import { useUserProfile } from '../contexts/UserProfileContext';

const BibliotecaPessoal = () => {
  
  // const { userProfile } = useUserProfile();

  const [status, setStatus] = useState("Indefinido");
  const [filter, setFilter] = useState("all");
  const [userBooks, setUserBooks] = useState([]);
  const [bookModal, setBookModal] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // Armazena o livro selecionado para edição

  const [defaultRating, setDefaultRating] = useState(2); //useState para avaliação
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]); //usado para percorrer e descobrir avaliação
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

  const navigation = useNavigation();

  const getImageSource = (item) => {
    // console.log('Na TelaBibliotecaPessoal, dentro de getImageSource, item é: ', item);
    if (item.imagem_capa) {
      return { uri: item.imagem_capa };
    } else {
      return require("../icons/imagem-de-capa-indisponivel.png");
    }
  };

  const getColorForStatus = (status) => {
    switch (status) {
      case "lido":
      case "já li":
      case "Já Li":
      case "finalizado":
        return "#0ABA31"; //Verde
      case "lendo":
      case "Lendo":
        return "#C0AF0E"; // Amarelo
      case "quero_ler":
      case "Quero ler":
        return "#017790"; // Azul
      case "abandonei":
      case "Abandonado":
      case "abandonado":
        return "#451F04"; // Marrom
      default:
        return "#000"; // Preto (Indisponível/Não encontrado)
    }
  };

  const filteredBooks = userBooks.filter((book) => {
    if (filter === "all") {
      return true;
    } else if (book.status && book.status.toLowerCase() === filter.toLowerCase()) {
      return true;
    }
    return false;
  });

  const handleInfoBook = (item) => {
    navigation.navigate("TelaDetalhesLivro", { googleId: item.google_id });
  };

  const toggleModal = (book) => {
    setSelectedBook(book);
    setIsModalVisible(!isModalVisible);
  };

  const handleRemoveBook = async (googleId) => {
    try {
      await removeBookFromLibrary(googleId);
      const existingBooks = await getUserLibrary();
      setUserBooks(existingBooks);
      setIsModalVisible(false);
      ToastAndroid.showWithGravityAndOffset(
        "Livro removido com sucesso!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } catch (error) {
      console.log(
        "(TelaBibliotecaPessoal) Erro ao remover livro da biblioteca: ",
        error
      );
    }
  };

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["25%", "48%", "75%"];

  function handlePresentModal(id) {
    userBooks.forEach((book) => {
      if (book.google_id === id) {
        setBookModal(book);
      }
    });

    bottomSheetModalRef.current?.present();
  }

  async function handleChangeValuesBook(book, status, rating) {
    console.log(book);
    handleVerificationExistingBook();
    return "";
  }

  function handleChangeStatus(newStatusModal) {
    console.log('Status anterior é :', bookModal.status)
    setBookModal({
      ...bookModal,
      status: newStatusModal,
    })
    console.log('newStatusModal: ', newStatusModal, 'e bookModal.status: ', bookModal.status)
  }

  function addOrChangeBook () {

    console.log('bookmodal: ', bookModal);
    const google_id = bookModal.google_id;
    const newStatus = bookModal.status;
    const newRating = bookModal.avaliacao;

    updateBookInLibrary(google_id, newStatus, newRating)
  }

  useEffect(() => {
    async function fetchUserLibrary() {
      const books = await getUserLibrary();
      console.log("Na TelaBibliotecaPessoal, books é: ", books);
      setUserBooks(books);
      // console.log('Na TelaBibliotecaPessoal, userBooks é: ', userBooks)
    }

    fetchUserLibrary();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        {/* style={{flexDirection: "row"}} */}
        <View>
          <Text style={styles.headerTitle}>Meus Livros</Text>
            <Image style={styles.iconUserPhoto} source={ {uri:'https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png'}} />
        </View>

        <ScrollView horizontal style={styles.filters}>
          <TouchableOpacity
            style={styles.btnFilters}
            onPress={() => setFilter("all")}
          >
            <Text style={styles.textBtnFilters}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnFilters, { width: 80 }]}
            onPress={() => setFilter("lido")}
          >
            <Text style={styles.textBtnFilters}>Lido</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnFilters}
            onPress={() => setFilter("lendo")}
          >
            <Text style={styles.textBtnFilters}>Lendo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnFilters, { width: 80 }]}
            onPress={() => setFilter("quero ler")}
          >
            <Text style={styles.textBtnFilters}>Quero ler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnFilters, { width: 90 }]}
            onPress={() => setFilter("abandonado")}
          >
            <Text style={styles.textBtnFilters}>Abandonado</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {filteredBooks && (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultTotal}>
              <View style={styles.viewImage}>
                <Image
                  source={getImageSource(item)}
                  style={{ width: 100, height: 100, borderRadius: 15 }}
                />
              </View>

              <View style={styles.viewOtherInfo}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {item.titulo ? item.titulo : "Título não encontrado"}
                </Text>
                <Text style={{ color: "#fff", marginTop: 3 }}>
                  {item.autor ? item.autor : "Autor não encontrado"}
                </Text>

                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.btnInfo}
                    onPress={() => handleInfoBook(item)}
                  >
                    <Text style={styles.textBtnInfo}>+Info</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlePresentModal(item.google_id)}
                  >
                    <Text
                      style={[
                        styles.status,
                        { backgroundColor: getColorForStatus(item.status) },
                      ]}
                    >
                      {item.status ? item.status : "Indisponível"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRemoveBook(item.google_id)}
                    style={{ paddingLeft: 15 }}
                  >
                    <FontAwesomeIcon name="trash" size={24} color="blue" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.viewNotFoundOrEmpty}>
              <Text style={styles.notFoundOrEmpty}>
                Nenhum livro encontrado ou lista vazia.
              </Text>
            </View>
          )}
        />
      )}

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{
            // backgroundColor: "#104C87",
            borderRadius: 50,
          }}
        >
          <ScrollView>
            <View
              style={{ flex: 1, alignItems: "center", paddingHorizontal: 15 }}
            >
              <Text
                style={{
                  fontWeight: "900",
                  letterSpacing: 0.5,
                  fontSize: 25,
                  marginBottom: 1,
                }}
              >
                Editar info do livro
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 20, paddingBottom: 10, marginBottom: 25 }}
                >
                  {bookModal.titulo}
                </Text>
                <Text style={styles.topicModal}>
                  STATUS: {bookModal.status}
                </Text>
              </View>

              <TouchableOpacity style={styles.row} onPress={() => handleChangeStatus('Lendo')}>
                <Text style={styles.subtitle}>Lendo</Text>
                {bookModal.status == "Lendo" ? (
                  <AntDesign name="checkcircle" size={24} color="#4A98E9" />
                ) : (
                  <Entypo name="circle" size={24} color="#56636F" />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.row} onPress={() => handleChangeStatus('Finalizado')}>
                <Text style={styles.subtitle}>Finalizado</Text>
                {bookModal.status == "Finalizado" ? (
                  <AntDesign name="checkcircle" size={24} color="#4A98E9" />
                ) : (
                  <Entypo name="circle" size={24} color="#56636F" />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.row} onPress={() => handleChangeStatus('Quero Ler')}>
                <Text style={styles.subtitle}>Quero ler</Text>
                {bookModal.status == "Quero Ler" ? (
                  <AntDesign name="checkcircle" size={24} color="#4A98E9" />
                ) : (
                  <Entypo name="circle" size={24} color="#56636F" />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.row} onPress={() => handleChangeStatus('Abandonado')}>
                <Text style={styles.subtitle}>Abandonado</Text>
                {bookModal.status == "Abandonado" ? (
                  <AntDesign name="checkcircle" size={24} color="#4A98E9" />
                ) : (
                  <Entypo name="circle" size={24} color="#56636F" />
                )}
              </TouchableOpacity>

              <View
                style={{
                  width: "100%",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: "black",
                  marginVertical: 30,
                }}
              ></View>

              <View>
                <Text style={styles.topicModal}> Avaliação </Text>
                <View style={{ margin: 0, padding: 0, alignItems: "center" }}>
                  <CustomRatingBar />
                  <Text style={{ color: "#000" }}>
                    {" "}
                    {defaultRating + " / " + maxRating.length}{" "}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: "black",
                  marginVertical: 30,
                }}
              ></View>

              <View style={styles.viewBookReview}>
                <Text style={styles.topicModal}>Resenha</Text>

                <Text>{bookModal.review}</Text>
              </View>

              <View>
                <TouchableOpacity
                  style={[
                    styles.btnStatus,
                    { marginTop: 40, backgroundColor: "#104C87" },
                  ]}
                  onPress={addOrChangeBook}
                >
                  <Text style={styles.btnStatusText}>
                    {" "}
                    Adicionar ou alterar livro{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "#041A30",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#1975D2",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 38,
    paddingLeft: 20,
    paddingTop: 40,
  },
  iconUserPhoto: {
    width: 50,
    height: 50,
    borderRadius: 150,
    marginLeft: 390,
    marginTop: -50,
  },
  filters: {
    padding: 10,
  },
  btnFilters: {
    backgroundColor: "#041A30",
    width: 60,
    height: 30,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 7,
    margin: 10,
  },
  textBtnFilters: {
    color: "#fff",
  },
  btnInfo: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 80,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
  },
  textBtnInfo: {
    fontWeight: "bold",
  },
  status: {
    color: "#Fff",
    width: 130,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 50,
  },
  resultTotal: {
    flexDirection: "row",
    margin: 25,
  },
  viewOtherInfo: {
    marginTop: 5,
    marginLeft: 20,
  },
  viewNotFoundOrEmpty: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 400,
  },
  notFoundOrEmpty: {
    color: "#fff",
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
  topicModal: {
    color: "#101318",
    fontSize: 17,
    fontWeight: "bold",
  },
  inputReview: {
    width: 450,
    height: 100,
    backgroundColor: "#7BAFE3",
    borderRadius: 20,
    color: "#000",
  },
});

export default BibliotecaPessoal;
