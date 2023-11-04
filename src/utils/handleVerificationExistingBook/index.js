import AsyncStorage from "@react-native-async-storage/async-storage";

 async function handleVerificationExistingBook({userBooks, book}){

  const BOOKS_KEY = "user_books"

  const idsBooks =  userBooks.map( (book, index) => book.google_id,
      )
      const index =  idsBooks.indexOf(book.google_id);

      if(index != -1){
        userBooks[index] = book
        await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(userBooks));
        return true
      }else{
        return false
      }
}


// async function handleChangeStatus_rating({book, status, rating}){

//   const BOOKS_KEY = "user_books"

//   const idsBooks =  userBooks.map( (book, index) => book.google_id,
//       )
//       const index =  idsBooks.indexOf(book.google_id);

//       if(index != -1){
//         userBooks[index] = book
//         await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(userBooks));
//         return true
//       }else{
//         return false
//       }
// }

export default handleVerificationExistingBook