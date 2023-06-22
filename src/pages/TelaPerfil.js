import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const TelaPerfil = () => {
  // Informações fictícias do usuário
  const userTemp = {
    nome: 'John Doe',
    email: 'johndoe@example.com',
    imagem_avatar: 'https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg',
  };

  const [user, setUser] = useState(userTemp);

  useEffect(() => {
    const loadPerfil = () => {
      const apiUrl = `https://api-backend-bd-tarde.onrender.com/bookeeper/usuario/1/perfil`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((dataPerfil) => {
          setUser(dataPerfil)
        })
        .catch((error) => console.error(error));
    };

    loadPerfil();
  },[]);

  const navigation = useNavigation();

  const handleOpenLibrary = () => {
    navigation.navigate('BibliotecaPessoal');
  };
  const handleLogout = () => {
    // Lógica para sair da conta do usuário
    // ...
  };


  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {user.imagem_avatar ? (
          <Avatar.Image
            source={{ uri: user.imagem_avatar }}
            size={150}
          />
        ) : (
          <Avatar.Text
            label={user.nome.toUpperCase()}
            size={150}
          />
        )}
        <Text style={styles.nome}>{user.nome}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <Button
        mode="contained"
        onPress={handleOpenLibrary}
        style={styles.button}
      >
        Biblioteca Pessoal
      </Button>

      <Button onPress={handleLogout} style={styles.button}>
        Sair
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  email: {
    fontSize: 18,
    marginTop: 8,
    color: 'gray',
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
});

export default TelaPerfil;
