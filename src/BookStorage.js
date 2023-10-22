import AsyncStorage from "@react-native-async-storage/async-storage";
import handleVerificationExistingBook from "./utils/handleVerificationExistingBook";


const BOOKS_KEY = "user_books"
export const addBookToLibrary = async (book) => {


  try {
    const existingBooks = await AsyncStorage.getItem(BOOKS_KEY)

    let userBooks = [];

    if (existingBooks) {
      userBooks = JSON.parse(existingBooks);

      const check = await handleVerificationExistingBook({
        userBooks: userBooks,
        book: book})

        if(check){
          return
        }
    }
   
    console.log("passou");

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

export const removeBookFromLibrary = async (googleId) => {
  try {
    const existingBooks = await getUserLibrary();
    const updatedBooks = existingBooks.filter((item) => item.google_id !== googleId);
    await AsyncStorage.setItem(BOOKS_KEY , JSON.stringify(updatedBooks));
  } catch (error) {
    console.log("Erro ao remover livro da biblioteca: ", error);
    throw error;
  }
};

export const updateBookInLibrary = async (googleId, newStatus, newRating) => {
  try {
    const userBooks = await getUserLibrary();

    const updatedBooks = userBooks.map((book) => {
      if (book.google_id === googleId) {
        return {
          ...book,
          status: newStatus,
          rating: newRating,
        };
      }
      return book;
    });

    await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(updatedBooks))
  } catch (error) {
    console.error("Erro ao atualizar status e avalição do livro: ", error)
    console.log("Erro na função updateBookInLibray dentro de BookStorage.js")
  }
};


