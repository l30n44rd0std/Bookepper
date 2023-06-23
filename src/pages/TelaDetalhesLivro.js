import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const DetalhesLivro = ({ route }) => {
  const [book, setBook] = useState(route.params?.book || null);

  const { googleId } = route.params;

  const [showDialog, setShowDialog] = useState(false);
  const [readingStatus, setReadingStatus] = useState("");

  useEffect(() => {
    const loadLivro = () => {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes/${googleId}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((dataLivro) => {
          setBook(dataLivro);
        })
        .catch((error) => console.error(error));
    };
    if (!book) loadLivro();
  }, [googleId]);

  const handleAmazonLink = () => {
    const formattedTitle = book.title.replace(/ /g, "+");
    const amazonLink = `https://www.amazon.com.br/s?k=${formattedTitle}`;

    Linking.openURL(amazonLink);
  };

  const handleAddToLibrary = async (status) => {
    setShowDialog(false);
    setReadingStatus(status);

    // Adicione o livro à lista da biblioteca pessoal
    const newBook = {
      titulo: book.volumeInfo.title,
      resenha: book.volumeInfo.description,
      imagem_capa: book.imageLinks.thumbnail,
      usuario_id: 1,
      google_id: book.id,
      status: status,
    };

    const livroAdicionado = await fetch(
      "https://api-backend-bd-tarde.onrender.com/bookeeper/usuario/livro",
      {
        method: POST,
        body: newBook,
      }
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {book.imageLinks && book.imageLinks.thumbnail ? (
          <Image
            source={{ uri: book.imageLinks.thumbnail }}
            style={styles.coverImage}
          />
        ) : (
          <Image
            source={require("../icons/imagem-de-capa-indisponivel.png")}
            style={styles.coverImage}
          />
        )}
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Autor: {book.authors?.join(", ")}</Text>
        <Text style={styles.description}>{book.description}</Text>

        <Text style={styles.label}>Editora:</Text>
        <Text>{book.publisher}</Text>

        <Text style={styles.label}>Data de publicação:</Text>
        <Text>{book.publishedDate}</Text>

        <Text style={styles.label}>ISBN:</Text>
        <Text>{book.industryIdentifiers?.[0]?.identifier}</Text>

        <Text style={styles.label}>Categoria:</Text>
        <Text>{book.categories?.join(", ")}</Text>

        <Text style={styles.label}>Avaliações:</Text>
        <Text>{book.averageRating}</Text>

        <Text style={styles.label}>Número de páginas:</Text>
        <Text>{book.pageCount}</Text>

        <Button title="Ver na loja da Amazon" onPress={handleAmazonLink} />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowDialog(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>

        <Modal
          visible={showDialog}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowDialog(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Adicionar Livro na Biblioteca Pessoal
              </Text>
              <Text style={styles.modalSubtitle}>Status da leitura:</Text>
              <View style={styles.modalButtons}>
                <Button
                  title="Já li"
                  onPress={() => handleAddToLibrary("Já li")}
                />
                <Button
                  title="Lendo"
                  onPress={() => handleAddToLibrary("Lendo")}
                />
                <Button
                  title="Quero Ler"
                  onPress={() => handleAddToLibrary("Quero Ler")}
                />
                <Button
                  title="Abandonado"
                  onPress={() => handleAddToLibrary("Abandonado")}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

// Estilos de CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  coverImage: {
    width: 200,
    height: 300,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  addButton: {
    backgroundColor: "green",
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 24,
    right: 24,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalSubtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default DetalhesLivro;
