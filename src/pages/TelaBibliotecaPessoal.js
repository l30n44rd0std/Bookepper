import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const BibliotecaPessoal = () => {
  const [libraryBooks, setLibraryBooks] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const loadFavoritos = () => {
      const apiUrl = `https://api-backend-bd-tarde.onrender.com/bookeeper/usuario/1/perfil`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((dataPerfil) => {
          setLibraryBooks(dataPerfil.livros);
        })
        .catch((error) => console.error(error));
    };
    loadFavoritos();
  }, []);

  const handleBookPress = (book) => {
    navigation.navigate("DetalhesLivro", { book, googleId: book.google_id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleBookPress(item)}>
      <View style={styles.bookContainer}>
        <Image source={{ uri: item.imagem_capa }} styles={styles.bookImage} />
        <Text style={styles.bookTitle}>{item.titulo}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={libraryBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhum livro adicionado.</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bookContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 16,
  },
  bookTitle: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default BibliotecaPessoal;
