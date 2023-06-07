import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet } from 'react-native'; // Importe o StyleSheet do React Native


import TelaPesquisa from './TelaPesquisa';
import TelaPerfil from './TelaPerfil';

const InicioRoute = () => <Text>Inicio</Text>
const PesquisaRoute = () => <TelaPesquisa/>
const PerfilRoute = () => <TelaPerfil/>

export default function TelaInicial () {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'inicio', title: 'Início', icon:'home', color: '#FFFFFF' },
    { key: 'pesquisa', title: 'Pesquisa', icon: 'book-search', color: '#FFFFFF' },
    { key: 'perfil', title: 'Perfil', icon: 'account', color: '#FFFFFF' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    inicio: InicioRoute,
    pesquisa: PesquisaRoute,
    perfil: PerfilRoute,
  });

  const renderIcon = ({ route, color }) => {
    return <Icon name={route.icon} size={24} color={route.color} />;
  };

  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text></Text>
          <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          renderIcon={renderIcon}
          barStyle={{ backgroundColor: '#1975D2' }}
          activeColor="#FFFFFF"
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#104C87',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#1975D2',
  },
});
