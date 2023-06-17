import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const TelaPerfil = () => {
  // Informações fictícias do usuário
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg',
  };
  
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
        {user.profilePicture ? (
          <Avatar.Image
            source={{ uri: user.profilePicture }}
            size={150}
          />
        ) : (
          <Avatar.Text
            label={user.name[0].toUpperCase()}
            size={150}
          />
        )}
        <Text style={styles.name}>{user.name}</Text>
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
  name: {
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
