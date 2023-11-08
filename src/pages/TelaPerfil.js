import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Avatar, Button, Text, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
// import requestsUser from "../api/requests/user";
import { useUserContext } from "../contexts/UserContext";
// import ImagePicker, { openPicker } from 'react-native-image-crop-picker';
// import * as ImagePicker from 'expo-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';

// import { useUserProfile } from '../contexts/UserProfileContext';

const TelaPerfil = () => {
  const { user } = useUserContext();
  // const { userProfile, setUserProfile } = useUserProfile();

  const [profilePhoto, setProfilePhoto] = useState('');
  const defaultImg= 'https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png';

  // const loadPerfil = async () => {
  //   try {
  //     const response = await requestsUser.loadProfile({ username: username, email: email }); // Chame a função loadProfile do módulo requestsUser
  //     setUser(response.data);
  //     setUsername(response.data.username);
  //     setEmail(response.data.email);
  //   } catch (error) {
  //     console.error("Erro ao carregar perfil:", error);
  //   }
  // };

  const navigation = useNavigation();

  const handleOpenLibrary = () => {
    navigation.navigate("TelaBibliotecaPessoal");
  };

  const handleEditProfile = () => {
    navigation.navigate("EditarInfoUsuario");
  };

  const handleLogout = () => {
    // Lógica para sair da conta do usuário
    // ...
  };

  // const handleImagePicker = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     aspect: [4, 4],
  //     allowsEditing: true,
  //     base64: true,
  //     quality: 1
  //   });
  
  //   if (!result.canceled) {
  //     setProfilePhoto(result.assets[0].uri);
  //     setUserProfile({ imageUri: result.assets[0].uri });
  //     // setUserProfile({ imageUri: result.assets[0].uri });
  //     console.log(result.assets[0].uri)
  //     // console.log('userProfile: ', userProfile);
  //     console.log('profilePhoto: ', profilePhoto);
  //   }
  // }

  // useEffect(() => {
  //   loadPerfil();
  // }, []);

  // const imagePick = () => {
  //   ImagePicker.openPicker({
  //     width: 400,
  //     height: 400,
  //     cropping: true
  //   }).then(image => {
  //     console.log(image);
  //     setProfilePhoto(image.path);
  //   }).catch(error => {
  //     console.error('Erro ao selecionar uma imagem: ', error)
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.photoProfile}>
          {profilePhoto ? (
          <Image style={styles.img} source={ {uri:profilePhoto}} />
          ) : (
            <Image style={styles.img} source={ {uri:'https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png'}} />
          )}

          <TouchableOpacity onPress={handleEditProfile} style={{ alignItems:'flex-end', top: -10 }}>
            <Entypo name="pencil" size={20} color={"#0000ff"}/>
          </TouchableOpacity>

        </View>
        <Text style={styles.nome}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <Button
        mode="contained"
        onPress={handleOpenLibrary}
        style={styles.button}
      >
        Ir para biblioteca pessoal
      </Button>

      <Button mode="contained" onPress={handleEditProfile} style={styles.button}>
        Editar informações
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#041A30",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  nome: {
    color: "#ffff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  email: {
    color: "#ffff",
    fontSize: 18,
    marginTop: 8,
  },
  loadingText: {
    color: "#ffff",
    fontSize: 18,
  },
  button: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#204C77",
    width: 300,
    borderRadius: 10,
    fontWeight: "normal",
  },
  img: {
    width: 300,
    height: 300,
    borderRadius: 150
  }
});

export default TelaPerfil;
