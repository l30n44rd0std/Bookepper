import { useState } from 'react';
import { View, Text, TextInput, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TelaPesquisa = () => {
  const [query, setQuery] = useState('');
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
    console.log('handleBookPress')
    navigation.navigate('DetalhesLivro', { book });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} onPress={() => handleBookPress(item)}>
      <View style={{ marginBottom: 16 }}>
        <Image
          source={{ uri: item.imageLinks?.thumbnail }}
          style={{ width: 200, height: 300 }}
        />
        <Text>{item.title}</Text>
        <Text>Autor: {item.authors?.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Digite o título do livro"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Buscar" onPress={searchBooks} />
      {bookData && (
        <FlatList
          data={bookData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <Text>Nenhum livro encontrado.</Text>
          )}
        />
      )}
    </View>
  );
};

export default TelaPesquisa;
