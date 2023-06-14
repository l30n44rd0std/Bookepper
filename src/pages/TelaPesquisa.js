import { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';

export default function TelaPesquisa() {
  //query - armazena o valor digitado pelo usuário no campo de entrada de texto, parâmetro para a consulta à API
  const [query, setQuery] = useState('');
  const [bookData, setBookData] = useState(null);
  const [totalBookData, setTotalBookData] = useState('');

  const resultadoTotalLivros = () => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    fetch(apiUrl)
    .then((response) => response.json())
    .then((totalBookData) => {
      if (totalBookData.totalItems && totalBookData.totalItems.length > 0) {
        const resultTotalBooks = totalBookData.totalItems;
        setTotalBookData(resultTotalBooks);
      } else {
        setTotalBookData('');
      }
    })
    .catch((error) => console.log(error));
  }

  const pesquisarLivros = () => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const book = data.items[0].volumeInfo;
          setBookData(book);
        } else {
          setBookData(null);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Digite o título do livro"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Buscar" onPress={pesquisarLivros}/>
      {bookData && (
        <View>
          <Text>Resultados encontrados: {totalBookData.totalItems}</Text>
          <Image
            source={{ uri: bookData.imageLinks?.thumbnail }}
            style={{ width: 200, height: 300 }}
          />
          <Text>{bookData.title}</Text>
          <Text>Autor: {bookData.authors?.join(', ')}</Text>
          <Text>Descrição: {bookData.description}</Text>
          <Text>Data de publicação: {bookData.publishedDate}</Text>
          <Text>ISBN: {bookData.industryIdentifiers?.join(', ').identifier}</Text>
          <Text>Número de páginas: {bookData.pageCount}</Text>
          <Text>Categorias: {bookData.categories}</Text>
        </View>
      )}
    </View>
  )
}