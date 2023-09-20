import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getUserLibrary } from '../BookStorage';

const BibliotecaPessoal = () => {

  const [filter, setFilter] = useState('all');
  const [userBooks, setUserBooks] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchUserLibrary() {
      const books = await getUserLibrary();
      console.log('Na TelaBibliotecaPessoal, books é: ', books);
      setUserBooks(books);
      // console.log('Na TelaBibliotecaPessoal, userBooks é: ', userBooks)
    }

    fetchUserLibrary();
  }, []);

  const getImageSource = (item) => {
    // console.log('Na TelaBibliotecaPessoal, dentro de getImageSource, item é: ', item);
    if (item.imagem_capa) {
      return { uri: item.imagem_capa };
    } else {
      return require('../icons/imagem-de-capa-indisponivel.png');
    }
  }  

  const getColorForStatus = (status) => {
    switch (status) {
      case 'ja_li':
      case 'já li':
      case 'Já Li':
      case 'finalizado':
        return '#0ABA31'; //Verde
      case 'lendo':
      case 'Lendo':
        return '#C0AF0E'; // Amarelo
      case 'quero_ler':
      case 'Quero ler':
        return '#017790'; // Azul
      case 'abandonei':
      case 'Abandonado':
      case 'abandonado':
        return '#451F04'; // Marrom
      default:
        return '#000' // Preto (Indisponível/Não encontrado)
    }
  };

  const filteredBooks = userBooks.filter((book) => {
    if (filter === 'all') {
      return true;
    }
    return book === filter;
  });

  const handleInfoBook = (item) => {
    console.log('====================================');
    console.log(item);
    console.log('====================================');
    navigation.navigate("TelaDetalhesLivro", {googleId: item.google_id});
  };
  

  return (
    <View style={styles.container}>
    <StatusBar/>
      <View style={styles.header}>

      {/* style={{flexDirection: "row"}} */}
        <View>
          <Text style={styles.headerTitle}>Meus Livros</Text>

          <Image 
          source={require('../icons/clicia.jpg')}
          style={styles.iconUserPhoto}
          />
        </View>

        <ScrollView horizontal style={styles.filters}>
          <TouchableOpacity style={styles.btnFilters} onPress={() => setFilter("all")} >
            <Text style={styles.textBtnFilters}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnFilters} onPress={() => setFilter("lendo")} >
            <Text style={styles.textBtnFilters}>Lendo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnFilters, {width: 80}]} onPress={() => setFilter("finalizado")} >
            <Text style={styles.textBtnFilters}>Finalizado</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnFilters, {width: 80}]} onPress={() => setFilter("quero_ler")} >
            <Text style={styles.textBtnFilters}>Quero ler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnFilters, {width: 90}]} onPress={() => setFilter("abandonado")} >
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
              style={{ width: 100, height: 100, borderRadius: 15}}
              />
            </View>

            <View style={styles.viewOtherInfo}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>{item.titulo ? item.titulo : 'Título não encontrado'}</Text>
              <Text style={{color: '#fff', marginTop: 3,}}>{item.autor ? item.autor : 'Autor não encontrado'}</Text>

              <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={styles.btnInfo} onPress={() => handleInfoBook(item) }> 
                  <Text style={styles.textBtnInfo}>+Info</Text>
                </TouchableOpacity>
                <Text style={[styles.status, { backgroundColor: getColorForStatus(item.status) }]}>{item.status ? item.status : 'Indisponível'}</Text>
              </View>
            </View>

          </View>
        )}
      ListEmptyComponent={() =>
        <View style={styles.viewNotFoundOrEmpty}> 
          <Text style={styles.notFoundOrEmpty}>Nenhum livro encontrado ou lista vazia.</Text>
        </View>
      }
      />
    )}
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
    backgroundColor: '#1975D2',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 38,
    paddingLeft: 20,
    paddingTop: 40
  },
  iconUserPhoto: {
    width: 50,
    height: 50,
    borderRadius: 150,
    marginLeft: 390,
    marginTop: -50
  },
  filters: {
    padding: 10
  },
  btnFilters: {
    backgroundColor: '#041A30',
    width: 60,
    height: 30,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 7,
    margin: 10
  },
  textBtnFilters: {
    color:'#fff' ,
  },
  btnInfo: {
    backgroundColor: '#fff', 
    borderRadius: 10,
    width: 80,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginRight: 10
  },
  textBtnInfo: {
    fontWeight: "bold"
  },
  status: {
    color: '#Fff',
    width: 130,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 50
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
    marginTop: 400
  },
  notFoundOrEmpty: {
    color: '#fff',
  },
});

export default BibliotecaPessoal;
