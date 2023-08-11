import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Chip, Appbar, Butto, SegmentedButtons } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const BibliotecaPessoal = () => {

  const [value, setValue] = useState('');

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
    navigation.navigate("TelaDetalhesLivro", {
      book,
      googleId: book.google_id,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleBookPress(item)}>
      <View style={styles.containerLivro}>
        <Image source={{ uri: item.imagem_capa }} styles={styles.imagemLivro} />
        <Text style={styles.tituloLivro}>{item.titulo}</Text>
        <View style={styles.chipsContainer}>
          {item.status === "Lendo" && <Chip style={styles.chip}>Lendo</Chip>}
          {item.status === "Finalizado" && (
            <Chip style={styles.chip}>Finalizado</Chip>
          )}
          {item.status === "Quero ler" && (
            <Chip style={styles.chip}>Quero ler</Chip>
          )}
          {item.status === "Abandonei" && (
            <Chip style={styles.chip}>Abandonei</Chip>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Appbar.Header style={{ backgroundColor: "#1975D2" }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#fff",
              paddingLeft: 10,
            }}
          >
            Meus livros
          </Text>
        </Appbar.Header>
        <View>
          <SegmentedButtons 
            value={value}
            onValueChange={setValue}
            density='regular'
            buttons={[
              {
                value: 'lendo',
                label: 'Lendo',
              },
              {
                value: 'finalizaod',
                label: 'Finalizado',
              },
              { 
                value: 'quero-ler', 
                label: 'Quero ler' 
              },
              {
                value: 'abandonei',
                label: 'Abandonei'
              }
            ]}
          />
          {/* <Button
            mode="contained"
            onPress={() => handleAdicionarNaLivraria("Já li")}
            style={styles.botaoFiltros}
          >
            Já li
          </Button>
          <Button
            mode="contained"
            onPress={() => handleAdicionarNaLivraria("Lendo")}
            style={styles.botaoFiltros}
          >
            Lendo
          </Button>
          <Button
            mode="contained"
            onPress={() => handleAdicionarNaLivraria("Quero Ler")}
            style={styles.botaoFiltros}
          >
            Quero Ler
          </Button>
          <Button
            mode="contained"
            onPress={() => handleAdicionarNaLivraria("Abandonado")}
            style={styles.botaoFiltros}
          >
            Abandonado
          </Button> */}
        </View>
      </View>
      <FlatList
        data={libraryBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.textoVazio}>Nenhum livro adicionado.</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "#104C87",
    flexDirection: "column",
  },
  filtros: {
    backgroundColor: "#104C87",
    flexDirection: "row",
  },
  botaoFiltros: {
    width: 150,
  },
  containerLivro: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  imagemLivro: {
    width: 50,
    height: 75,
    marginRight: 16,
  },
  tituloLivro: {
    fontSize: 16,
    color: "#fff",
  },
  textoVazio: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    paddingTop: 30,
  },
  chipsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
  },
});

export default BibliotecaPessoal;
