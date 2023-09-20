import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOKS_KEY = "user_books";

export const addBookToLibrary = async (book) => {
  try {
    const existingBooks = await AsyncStorage.getItem(BOOKS_KEY);

    
    let userBooks = [];

    if (existingBooks) {
      userBooks = JSON.parse(existingBooks);
    }

    userBooks.push(book);

    await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(userBooks));
  } catch (error) {
    console.log("erro ao adicionar livro na biblioteca: ", error);
  }
};

export const getUserLibrary = async () => {
  try {
    const userBooks = await AsyncStorage.getItem(BOOKS_KEY);

    if (userBooks) {
      return JSON.parse(userBooks);
    }

    return [];
  } catch (error) {
    console.error("Erro getting user library: ", error);
    return [];
  }
};
