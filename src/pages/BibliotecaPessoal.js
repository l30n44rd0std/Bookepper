import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const BibliotecaPessoal = () => {

    const [libraryBooks, setLibraryBooks] = useState([]);

    const navigation = useNavigation();

    const handleBookPress = (book) => {
        navigation.navigate('DetalhesLivro', { book });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleBookPress(item.book)}>
            <View style={styles.bookContainer}>
                <Image source={{ uri: item.book.imageLinks?.thumbnail }} styles={styles.bookImage}/>
                <Text style={styles.bookTitle}>{item.book.title}</Text>
            </View>
        </TouchableOpacity>
    )

    return(
        <View style={styles.container}>
            <FlatList 
                data={libraryBooks}
                renderItem={renderItem}
                keyExtractor={(item) => item.book.id}
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
          flexDirection: 'row',
          alignItems: 'center',
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
          textAlign: 'center',
        },
      });

export default BibliotecaPessoal