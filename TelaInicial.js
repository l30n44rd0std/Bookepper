import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

import TelaPesquisa from './TelaPesquisa';
import TelaPerfil from './TelaPerfil';

const Tab = createBottomTabNavigator();

const InicioRoute = () => <Text>Inicio</Text>;
const PesquisaRoute = () => <Text>Pesquisa</Text>;
const PerfilRoute = () => <Text>Perfil</Text>;

const TelaInicial = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'inicio', title: 'Inicio', focusedIcon: 'home-variant', unfocused: 'home-variant-outline' },
    { key: 'pesquisa', title: 'Pesquisa', focusedIcon: 'book-search', unfocused: 'book-search-outline' },
    { key: 'perfil', title: 'Perfil', focusedIcon: 'account', unfocused: 'account-outline' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    inicio: InicioRoute,
    pesquisa: PesquisaRoute,
    perfil: PerfilRoute,
  });

  return (
    <View>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={TelaInicial} />
        <Tab.Screen name="Pesquisa" component={TelaPesquisa} />
        <Tab.Screen name="Perfil" component={TelaPerfil} />
      </Tab.Navigator>

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
  );
};

export default TelaInicial;